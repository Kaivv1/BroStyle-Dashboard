import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders } from "../../services/ordersApi";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useOrders() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : searchParams.get("page");

  const { isLoading, data: { orders, count } = {} } = useQuery({
    queryKey: ["orders", page],
    queryFn: () => getOrders(page),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["orders", page + 1],
      queryFn: () => getOrders(page + 1),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["orders", page - 1],
      queryFn: () => getOrders(page - 1),
    });
  }

  return { isLoading, orders, count };
}
