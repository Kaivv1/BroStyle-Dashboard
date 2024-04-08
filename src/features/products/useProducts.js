import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "../../services/productsApi";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useProducts() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : +searchParams.get("page");

  const {
    data: { products, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["products", page + 1],
      queryFn: () => getProducts(page + 1),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["products", page - 1],
      queryFn: () => getProducts(page - 1),
    });
  }

  return { products, error, isLoading, count };
}
