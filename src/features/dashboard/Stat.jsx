/* eslint-disable react/prop-types */

function Stat({ icon, value, title }) {
  return (
    <div className="flex items-center gap-4 rounded-md border-[0.1rem] border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800 dark:shadow-md">
      <div className="flex items-center justify-center">
        <span className="rounded-full bg-gray-100 p-3 text-3xl text-color-brand-600 dark:bg-gray-900">
          {icon}
        </span>
      </div>
      <p className="flex flex-col">
        <span className="text-sm ">{title}</span>
        <span className="text-lg font-semibold">{value}</span>
      </p>
    </div>
  );
}

export default Stat;
