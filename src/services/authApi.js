import { getImageName } from "../utils/helpers";
import { supabase, supabaseUrl } from "./supabase";

function createUserAvatar(user) {
  const avatarName = `${Math.random()}-${user?.full_name}`;

  const avatarUrl = `${supabaseUrl}//storage/v1/object/public/avatars/${avatarName}`;

  return { avatarName, avatarUrl };
}

export async function register({ email, password, username, full_name }) {
  const currUser = await getCurrentUser();

  if (currUser.access !== "admin" && currUser.access !== "normal")
    throw new Error("You don't have permissions to create a user");

  const {
    data: { user: registeredUser },
    error: authError,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        username,
        avatar: "",
      },
    },
  });

  const { data: userProfile, error: profileError } = await supabase
    .from("profiles")
    .update({ access: "normal" })
    .eq("id", registeredUser?.id)
    .select()
    .single();

  if (authError || profileError)
    throw new Error(authError?.message || profileError?.message);

  return userProfile;
}

export async function login({ email, password }) {
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw new Error("Wrong credentials");

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  return { ...data, isAuthenticated: user?.role === "authenticated" };
}

export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  const {
    data: { user: currentUser },
    currentUserError,
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", currentUser?.id)
    .single();

  if (error || currentUserError) throw new Error(error.message);

  return { ...data, isAuthenticated: currentUser?.role === "authenticated" };
}

export async function updateUser(obj) {
  let avatarUrl = null;

  const { data: userData, error: userDataError } = await supabase
    .from("profiles")
    .select("avatar, email")
    .eq("id", obj.id)
    .single();

  if (userData.email !== obj.email) {
    const { error } = await supabase.auth.updateUser({ email: obj.email });

    if (error) throw new Error("There was a problem updating the user");
  }

  if (obj.avatar && typeof obj.avatar !== "string") {
    if (userData?.avatar && typeof obj.avatar !== "string") {
      const oldAvatarName = getImageName(userData?.avatar);
      const { error: deleteOldAvatarError } = await supabase.storage
        .from("avatars")
        .remove([oldAvatarName]);

      if (deleteOldAvatarError)
        throw new Error("There was a problem updating user profile");
    }

    const { avatarName: newAvatarName, avatarUrl: newAvatarUrl } =
      createUserAvatar(obj);

    avatarUrl = newAvatarUrl;

    const { error: uploadAvatarError } = await supabase.storage
      .from("avatars")
      .upload(newAvatarName, obj.avatar);

    if (uploadAvatarError)
      throw new Error("There was a problem updating user profile");
  } else {
    avatarUrl = userData?.avatar;
  }

  const { data: updatedUser, error: updatingUserError } = await supabase
    .from("profiles")
    .update({ ...obj, avatar: avatarUrl })
    .eq("id", obj.id)
    .select()
    .single();

  if (userDataError || updatingUserError)
    throw new Error("There was a problem updating the user profile");

  return updatedUser;
}

export async function updateUserPassword({ password }) {
  const {
    data: { user },
    error,
  } = await supabase.auth.updateUser({ password });

  if (error) throw new Error(error.message);

  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
