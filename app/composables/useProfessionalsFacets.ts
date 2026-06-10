import { PROFESSIONALS_FACETS_URL } from "~/services/filters.service";
import type { ProfessionalsFacets } from "~/types";

export function useProfessionalsFacets() {
  const { data, status, error } = useFetch<ProfessionalsFacets>(PROFESSIONALS_FACETS_URL);
  return {
    facets: computed<ProfessionalsFacets | null>(() => data.value ?? null),
    loading: computed(() => status.value === "pending"),
    error,
  };
}
