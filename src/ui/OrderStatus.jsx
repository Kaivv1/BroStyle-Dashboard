/* eslint-disable react/prop-types */

function OrderStatus({ status }) {
  const base =
    "w-fit rounded-2xl px-3 py-1 uppercase shadow-md dark:text-gray-200 text-xs font-semibold";

  if (status === "pending")
    return <p className={`${base} bg-gray-300 dark:bg-gray-600`}>{status}</p>;
  if (status === "processing")
    return (
      <p className={`${base} bg-blue-200 text-blue-800 dark:bg-blue-800`}>
        {status}
      </p>
    );
  if (status === "completed")
    return (
      <p className={`${base} bg-green-200 text-green-800 dark:bg-green-800`}>
        {status}
      </p>
    );
}

export default OrderStatus;
