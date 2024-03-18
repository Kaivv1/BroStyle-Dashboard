/*eslint-disable react/prop-types */

function Main({ children }) {
  return (
    <div className="overflow-auto bg-gray-100 px-12 pb-16 pt-12 dark:bg-gray-900">
      {children}
    </div>
  );
}

export default Main;
