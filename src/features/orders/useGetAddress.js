import { useQuery } from "@tanstack/react-query";
import { fetchAddress } from "../../services/geoApi";

export function useGetAddress() {
  const { data: { address, countryFlag } = {}, isLoading } = useQuery({
    queryKey: ["address"],
    queryFn: fetchAddress,
  });
  return { isLoading, address, countryFlag };
}
