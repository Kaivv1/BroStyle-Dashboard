function UserAvatar() {
  return (
    <div className="flex items-center gap-2">
      <img
        src="../../public/default-user.jpg"
        alt="user avatar"
        className="block aspect-square w-9 rounded-full object-cover object-center outline outline-1 outline-gray-200 dark:outline-gray-800"
      />
      <p>Kaloyan</p>
    </div>
  );
}

export default UserAvatar;
