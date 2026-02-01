import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useReasons() {
  return useQuery({
    queryKey: [api.reasons.list.path],
    queryFn: async () => {
      const res = await fetch(api.reasons.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch reasons");
      return api.reasons.list.responses[200].parse(await res.json());
    },
  });
}
