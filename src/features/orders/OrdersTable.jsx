/*eslint-disable react/prop-types */

import OrdersTableHeader from "./OrdersTableHeader";
import Loader from "../../ui/Loader";
import Empty from "../../ui/Empty";
import OrderRow from "./OrderRow";

function OrdersTable({ isLoading, orders }) {
  if (isLoading) return <Loader size="lg" />;

  if (!orders?.length) return <Empty resourceName="orders" />;

  return (
    <div className="rounded-md border-[0.1rem] border-gray-200 dark:border-gray-700">
      <OrdersTableHeader />
      {orders.map((order) => (
        <OrderRow key={order.id} order={order} />
      ))}
    </div>
  );
}

export default OrdersTable;
