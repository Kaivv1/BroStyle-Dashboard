import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/settingsApi";

export function useSettings() {
  const {
    data: settings,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settings, error, isLoading };
}
