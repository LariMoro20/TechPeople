import { toValue, type MaybeRefOrGetter } from "vue";
import type { ProfessionalsFilters } from "~/types";

type UseProfessionalsFiltersOptions = {
  filters: MaybeRefOrGetter<ProfessionalsFilters>;
  onUpdate: (partial: Partial<ProfessionalsFilters>) => void;
};

export function useProfessionalsFilters({
  filters,
  onUpdate,
}: UseProfessionalsFiltersOptions) {
  const { facets, loading, error } = useProfessionalsFacets();

  const priceRangeMin = computed(() => facets.value?.priceRange.min ?? 0);
  const priceRangeMax = computed(() => facets.value?.priceRange.max ?? 0);

  const hasPriceRange = computed(() => priceRangeMax.value > priceRangeMin.value);

  const hasActiveFilters = computed(() => {
    const f = toValue(filters);
    return Boolean(
      f.search ||
        f.professions.length ||
        f.city ||
        f.minRating ||
        f.available ||
        f.priceRange.min !== null ||
        f.priceRange.max !== null,
    );
  });

  let searchDebounce: ReturnType<typeof setTimeout> | null = null;
  let priceDebounce: ReturnType<typeof setTimeout> | null = null;

  function updateSearch(value: string) {
    if (searchDebounce) clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      onUpdate({ search: value });
      searchDebounce = null;
    }, 1000);
  }

  function updateProfessions(value: unknown) {
    const professions = Array.isArray(value) ? value.map(String) : [];
    onUpdate({ professions });
  }

  function updateCity(value: unknown) {
    onUpdate({ city: typeof value === "string" && value ? value : null });
  }

  function updateRating(value: number | null) {
    onUpdate({ minRating: value });
  }

  function updatePriceRange(value: [number, number]) {
    if (priceDebounce) clearTimeout(priceDebounce);
    priceDebounce = setTimeout(() => {
      onUpdate({ priceRange: { min: value[0], max: value[1] } });
      priceDebounce = null;
    }, 400);
  }

  function updateAvailable(value: boolean) {
    onUpdate({ available: value ? true : null });
  }

  onUnmounted(() => {
    if (searchDebounce) clearTimeout(searchDebounce);
    if (priceDebounce) clearTimeout(priceDebounce);
  });

  return {
    facets,
    loading,
    error,
    priceRangeMin,
    priceRangeMax,
    hasPriceRange,
    hasActiveFilters,
    updateSearch,
    updateProfessions,
    updateCity,
    updateRating,
    updatePriceRange,
    updateAvailable,
  };
}
