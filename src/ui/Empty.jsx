/* eslint-disable react/prop-types */

function Empty({ resourceName }) {
  return (
    <div className="text-center font-semibold">
      <p>No {resourceName} have been found</p>
    </div>
  );
}

export default Empty;
