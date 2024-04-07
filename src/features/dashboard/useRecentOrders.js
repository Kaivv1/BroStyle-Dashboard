import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getOrdersAfterDate } from "../../services/ordersApi";

export function useRecentOrders() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last") ? 7 : +searchParams.get("last");

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: orders } = useQuery({
    queryKey: ["orders", `last ${numDays} days`],
    queryFn: () => getOrdersAfterDate(queryDate),
  });

  return { isLoading, orders, numDays };
}
