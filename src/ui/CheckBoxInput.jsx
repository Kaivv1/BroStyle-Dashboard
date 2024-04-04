/*eslint-disable react/prop-types */
function CheckBoxInput({ children, isChecked, onChange, isLoading }) {
  return (
    <div
      className="flex items-center gap-3 rounded-md border-[0.1rem] border-gray-200
bg-white px-10 py-5 dark:border-gray-600 dark:bg-gray-800 dark:shadow-md"
    >
      <input
        type="checkbox"
        id="pending"
        checked={isChecked}
        onChange={onChange}
        className="size-6 focus:outline-none "
        disabled={isLoading}
      />
      <label htmlFor="pending">{children}</label>
    </div>
  );
}

export default CheckBoxInput;
