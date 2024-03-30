import { supabase } from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) throw new Error("Settings could not be loaded");

  return data;
}

export async function updateSettings(obj) {
  const { data, error } = await supabase
    .from("settings")
    .update(obj)
    .eq("id", 1)
    .select()
    .single();

  if (error) throw new Error("There was a problem updating the settings");

  return data;
}
