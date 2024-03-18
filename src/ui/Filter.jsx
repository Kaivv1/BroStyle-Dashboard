/* eslint-disable react/prop-types */
function Filter({ options }) {
  return (
    <div className="flex gap-1 rounded-md border-[0.1rem] border-gray-200 bg-white px-1 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-md">
      {options.map((option, i) => (
        <button
          key={i}
          className="rounded-md border-none px-2 py-1 hover:bg-gray-200 focus:outline-none   active:bg-gray-200 dark:hover:bg-color-brand-600 dark:active:bg-color-brand-600"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
