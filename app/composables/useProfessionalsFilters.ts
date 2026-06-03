import { PROFESSIONALS_FACETS_URL } from "~/services/filters.service";

export function useProfessionalsFilters() {
  const { data, status, error } = useFetch<ProfessionalsFacets>(
    PROFESSIONALS_FACETS_URL,
    { lazy: true, server: false },
  );

  return {
    facets: data,
    loading: computed(() => status.value === "pending"),
    error,
  };
}
