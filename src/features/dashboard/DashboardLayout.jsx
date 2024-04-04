/* eslint-disable */
import { useRecentOrders } from "./useRecentOrders";
import Statistics from "./Statistics";
import TodaysActivity from "./TodaysActivity";
import CategorySalesChart from "./CategoryPieChart";
import SalesChart from "./SalesChart";

function DashboardLayout() {
  const { isLoading, orders, numDays } = useRecentOrders();
  return (
    <div className="flex flex-col gap-8">
      <Statistics orders={orders} isLoading={isLoading} />
      <div className="grid grid-cols-2 gap-8">
        <TodaysActivity />
        <CategorySalesChart orders={orders} />
      </div>
      <SalesChart numDays={numDays} orders={orders} />
    </div>
  );
}

export default DashboardLayout;
