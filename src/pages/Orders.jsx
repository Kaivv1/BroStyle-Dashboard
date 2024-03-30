import OrdersTable from "../features/orders/OrdersTable";
import OrdersTableOperations from "../features/orders/OrdersTableOperations";
import { useOrders } from "../features/orders/useOrders";
import Heading from "../ui/Heading";

function Orders() {
  const { isLoading, orders, count } = useOrders();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <Heading as="h1">Orders</Heading>
        <OrdersTableOperations />
      </div>
      <OrdersTable isLoading={isLoading} orders={orders} count={count} />
    </div>
  );
}

export default Orders;
