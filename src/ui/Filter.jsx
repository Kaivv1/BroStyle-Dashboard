/* eslint-disable */
import { useSearchParams } from "react-router-dom";

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleFilter(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex gap-1 rounded-md border-[0.1rem] border-gray-200 bg-white px-1 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-md">
      {options.map((option, i) => (
        <button
          key={i}
          className={`rounded-md border-none px-2 py-1 hover:bg-gray-200 focus:outline-none   active:bg-gray-200 dark:hover:bg-color-brand-600 dark:active:bg-color-brand-600 ${currentFilter === option.value && "bg-gray-200 disabled:cursor-not-allowed dark:bg-color-brand-600"}`}
          onClick={() => handleFilter(option.value)}
          disabled={currentFilter === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
