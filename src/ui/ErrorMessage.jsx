/*eslint-disable react/prop-types */

function ErrorMessage({ error }) {
  return (
    <div className="flex items-center justify-center">
      <p className="bg-red-700">{error}</p>
    </div>
  );
}

export default ErrorMessage;
