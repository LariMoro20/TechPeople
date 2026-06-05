import { PROFESSIONALS_STATS_URL } from "~/services/filters.service";
import type { ProfessionalsStats } from "~/types";

export function useProfessionCounts() {
  const { data, status, error } = useFetch<ProfessionalsStats>(
    PROFESSIONALS_STATS_URL,
  );

  return {
    stats: computed<ProfessionalsStats | null>(() => data.value ?? null),
    loading: computed(() => status.value === "pending"),
    error,
  };
}
