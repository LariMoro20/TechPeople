import { getProfessionalsFilters } from "~/services/filters.service";
import type { ProfessionalsFacets } from "~/types";

export function useProfessionalsFilters() {
  const facets = ref<ProfessionalsFacets | null>(null);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  async function fetchFacets() {
    loading.value = true;
    error.value = null;
    try {
      facets.value = await getProfessionalsFilters();
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  }

  onMounted(fetchFacets);

  return { facets, loading, error };
}
