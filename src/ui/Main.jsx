/*eslint-disable react/prop-types */

function Main({ children }) {
  return (
    <div className="overflow-auto bg-gray-100 px-16 pb-24 pt-16 dark:bg-gray-900">
      {children}
    </div>
  );
}

export default Main;