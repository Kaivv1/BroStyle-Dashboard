/* eslint-disable */
import { useQuery } from "@tanstack/react-query";
import { getOrdersToday } from "../../services/ordersApi";

export function useOrdersToday() {
  const { isLoading, data: orders } = useQuery({
    queryKey: ["orders", "today"],
    queryFn: getOrdersToday,
  });

  return { isLoading, orders };
}
