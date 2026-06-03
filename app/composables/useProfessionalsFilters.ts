import { PROFESSIONALS_FACETS_URL } from "~/services/filters.service";
import type { ProfessionalsFacets, ProfessionalsFilters } from "~/types";

type UseProfessionalsFiltersOptions = {
  filters: ProfessionalsFilters;
  onUpdate: (partial: Partial<ProfessionalsFilters>) => void;
};

const DEFAULT_FACETS: ProfessionalsFacets = {
  professions: [],
  cities: [],
  priceRange: {
    min: 0,
    max: 0,
  },
};

export function useProfessionalsFilters({
  filters,
  onUpdate,
}: UseProfessionalsFiltersOptions) {
  const { data, status, error } = useFetch<ProfessionalsFacets>(
    PROFESSIONALS_FACETS_URL,
  );

  const facets = computed(() => data.value ?? DEFAULT_FACETS);
  const loading = computed(() => status.value === "pending");
  const priceRangeMin = computed(() => facets.value.priceRange.min);
  const priceRangeMax = computed(() => facets.value.priceRange.max);

  const ratingOptions = [
    { label: "Qualquer", value: null },
    { label: "4+", value: 4 },
    { label: "4.5+", value: 4.5 },
  ];

  const cityOptions = computed(() => [
    { label: "Todas", value: null },
    ...facets.value.cities.map((city) => ({
      label: city,
      value: city,
    })),
  ]);

  const professionOptions = computed(() =>
    facets.value.professions.map((profession) => ({
      label: profession,
      value: profession,
    })),
  );

  const hasPriceRange = computed(
    () => facets.value.priceRange.max > facets.value.priceRange.min,
  );

  const priceRangeModel = ref<number[]>([
    filters.priceRange.min ?? priceRangeMin.value,
    filters.priceRange.max ?? priceRangeMax.value,
  ]);

  watch([priceRangeMin, priceRangeMax], ([min, max]) => {
    priceRangeModel.value = [
      filters.priceRange.min ?? min,
      filters.priceRange.max ?? max,
    ];
  });

  let priceDebounce: ReturnType<typeof setTimeout> | null = null;

  watch(priceRangeModel, (value) => {
    if (priceDebounce) clearTimeout(priceDebounce);
    priceDebounce = setTimeout(() => {
      updatePriceRange(value);
      priceDebounce = null;
    }, 400);
  });

  onUnmounted(() => {
    if (priceDebounce) clearTimeout(priceDebounce);
  });

  const hasActiveFilters = computed(() =>
    Boolean(
      filters.search ||
        filters.professions.length ||
        filters.city ||
        filters.minRating ||
        filters.available ||
        filters.priceRange.min !== null ||
        filters.priceRange.max !== null,
    ),
  );

  function updateSearch(value: string | number) {
    onUpdate({ search: String(value ?? "") });
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

  function updatePriceRange(value: unknown) {
    if (!Array.isArray(value)) return;
    const min = Number(value[0] ?? priceRangeMin.value);
    const max = Number(value[1] ?? priceRangeMax.value);
    onUpdate({ priceRange: { min, max } });
  }

  function updateAvailable(value: boolean) {
    onUpdate({ available: value ? true : null });
  }

  return {
    loading,
    error,
    ratingOptions,
    cityOptions,
    professionOptions,
    hasPriceRange,
    priceRangeMin,
    priceRangeMax,
    priceRangeModel,
    hasActiveFilters,
    updateSearch,
    updateProfessions,
    updateCity,
    updateRating,
    updateAvailable,
  };
}
