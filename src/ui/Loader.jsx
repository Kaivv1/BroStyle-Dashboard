/* eslint-disable react/prop-types */
function Loader({ size, color, auth }) {
  if (size === "sm" && color === "white")
    return (
      <span
        className={`loader block h-4 w-4 border-2 border-gray-200 border-b-transparent`}
      ></span>
    );

  if (size === "sm" && !color) {
    return <span className="loader block h-4 w-4 border-2"></span>;
  }

  if (size === "md")
    return <span className="loader block h-6 w-6 border-2"></span>;

  if (size === "lg")
    return (
      <div className="flex items-center justify-center py-8">
        <div className="loader h-14 w-14 border-[0.35rem]"></div>
      </div>
    );

  if (auth)
    return (
      <div className="flex h-screen items-center justify-center py-8 dark:bg-gray-900">
        <div className="loader h-16 w-16 border-[0.35rem]"></div>
      </div>
    );
}

export default Loader;
