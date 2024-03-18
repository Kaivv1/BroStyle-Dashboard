import OrdersTableOperations from "../features/orders/OrdersTableOperations";
import Heading from "../ui/Heading";

function Orders() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading as="h1">Orders</Heading>
        <OrdersTableOperations />
      </div>
    </div>
  );
}

export default Orders;
