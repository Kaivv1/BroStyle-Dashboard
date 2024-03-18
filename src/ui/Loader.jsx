/* eslint-disable react/prop-types */
function Loader({ size, color }) {
  if (size === "sm" && color === "white")
    return (
      <span
        className={`loader block h-5 w-5 border-2 border-gray-200 border-b-transparent`}
      ></span>
    );

  if (size === "sm" && !color) {
    return <span className="loader block h-5 w-5 border-2"></span>;
  }

  if (size === "lg")
    return (
      <div className="flex items-center justify-center py-8">
        <div className="loader h-14 w-14 border-[0.35rem]"></div>
      </div>
    );
}

export default Loader;
