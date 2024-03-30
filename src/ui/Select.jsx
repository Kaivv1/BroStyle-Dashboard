/* eslint-disable  */

function Select({ value, onChange, options }) {
  return (
    <select
      className="rounded-md border-[0.1rem] border-gray-200 bg-white p-[0.45rem] px-3 text-sm focus-within:ring-color-brand-600 focus:outline-none focus:ring-2 dark:border-gray-700 dark:bg-gray-800 dark:shadow-md"
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
