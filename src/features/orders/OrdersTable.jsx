/*eslint-disable */
import OrdersTableHeader from "./OrdersTableHeader";
import Loader from "../../ui/Loader";
import Empty from "../../ui/Empty";
import OrderRow from "./OrderRow";
import { useSettings } from "../settings/useSettings";
import { calcOrderTotalPrice } from "../../utils/helpers";
import { useSearchParams } from "react-router-dom";

function OrdersTable({ isLoading, orders }) {
  const [searchParams] = useSearchParams();
  const { settings } = useSettings();

  let filteredOrders;
  const filterValue = searchParams.get("status") || "all";

  if (filterValue === "all") filteredOrders = orders;
  if (filterValue === "pending")
    filteredOrders = orders?.filter((order) => order.status === "pending");
  if (filterValue === "processing")
    filteredOrders = orders?.filter((order) => order.status === "processing");
  if (filterValue === "completed")
    filteredOrders = orders?.filter((order) => order.status === "completed");

  const sortBy = searchParams.get("sortBy") || "date-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedOrders = filteredOrders?.sort((a, b) => {
    if (field === "date") {
      return (new Date(a["created_at"]) - new Date(b["created_at"])) * modifier;
    } else if (field === "price") {
      const { totalPrice: totalPriceA } = calcOrderTotalPrice(
        a.order_items,
        a.priority && settings?.priority_price,
      );
      const { totalPrice: totalPriceB } = calcOrderTotalPrice(
        b.order_items,
        b.priority && settings?.priority_price,
      );
      return (totalPriceB - totalPriceA) * modifier;
    } else {
      return 0;
    }
  });

  if (isLoading) return <Loader size="lg" />;

  if (!orders?.length) return <Empty resourceName="orders" />;

  return (
    <div className="rounded-md border-[0.1rem] border-gray-200 dark:border-gray-700">
      <OrdersTableHeader />
      {sortedOrders.map((order) => (
        <OrderRow key={order.id} order={order} />
      ))}
    </div>
  );
}

export default OrdersTable;
