/*eslint-disable react/prop-types */

function Main({ children }) {
  return (
    <div className="overflow-auto bg-gray-100 px-4 pb-8 pt-10 xl:px-12 xl:pb-16 xl:pt-12 dark:bg-gray-900">
      {children}
    </div>
  );
}

export default Main;
