import { getProfessionals } from "~/services/professionals.service";
import type {
  ProfessionalsFilters,
  ProfessionalsResponse,
  ProfessionalsSort,
  ProfessionalsQuery,
  SortField,
  SortDirection,
} from "~/types";

const DEFAULT_FILTERS: ProfessionalsFilters = {
  search: "",
  professions: [],
  priceRange: { min: null, max: null },
  minRating: null,
  city: null,
  available: null,
};

const DEFAULT_SORT: ProfessionalsSort = {
  field: "rating",
  direction: "desc",
};

const VALID_FIELDS: SortField[] = [
  "name",
  "servicePrice",
  "rating",
  "distance",
];
const VALID_DIRECTIONS: SortDirection[] = ["asc", "desc"];

function filtersFromQuery(
  q: Record<string, string | string[]>,
): ProfessionalsFilters {
  return {
    search: String(q.search ?? ""),
    professions: q.professions ? String(q.professions).split(",") : [],
    priceRange: {
      min: q.minPrice ? Number(q.minPrice) : null,
      max: q.maxPrice ? Number(q.maxPrice) : null,
    },
    minRating: q.minRating ? Number(q.minRating) : null,
    city: q.city ? String(q.city) : null,
    available: q.available === "true" ? true : null,
  };
}

function sortFromQuery(
  q: Record<string, string | string[]>,
): ProfessionalsSort {
  if (!q.sort) return { field: "rating", direction: "desc" };
  const [field, direction] = String(q.sort).split(":") as [
    SortField,
    SortDirection,
  ];
  return {
    field: VALID_FIELDS.includes(field) ? field : "rating",
    direction: VALID_DIRECTIONS.includes(direction) ? direction : "desc",
  };
}
export function useProfessionals() {
  const route = useRoute();
  const router = useRouter();
  const result = ref<ProfessionalsResponse | null>(null);
  const loading = ref(false);
  const error = ref<Error | null>(null);
  const filters = reactive<ProfessionalsFilters>(filtersFromQuery(route.query));
  const sort = reactive<ProfessionalsSort>(sortFromQuery(route.query));
  const pagination = reactive({
    page: Number(route.query.page) || 1,
    perPage: 12,
  });
  const query = computed<ProfessionalsQuery>(() => ({
    filters: { ...filters, priceRange: { ...filters.priceRange } },
    sort: { ...sort },
    pagination: { page: pagination.page, perPage: pagination.perPage },
  }));

  let abortController: AbortController | null = null;

  async function fetchProfessionals() {
    abortController?.abort();
    abortController = new AbortController();

    loading.value = true;
    error.value = null;
    try {
      result.value = await getProfessionals(
        query.value,
        abortController.signal,
      );
    } catch (e: any) {
      if (e?.name === "AbortError" || e?.cause?.name === "AbortError") return;
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  }
  let initialized = false;

  watch(
    () => ({
      ...query.value,
      filters: { ...query.value.filters, search: undefined },
    }),
    () => {
      if (!initialized) {
        initialized = true;
        fetchProfessionals();
        return;
      }
      fetchProfessionals();
      syncUrl();
    },
    { deep: true, immediate: true },
  );
  let debounceTimer: ReturnType<typeof setTimeout>;
  watch(
    () => query.value.filters.search,
    () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        fetchProfessionals();
        syncUrl();
      }, 400);
    },
  );

  function updateFilters(partial: Partial<ProfessionalsFilters>) {
    Object.assign(filters, partial);
    pagination.page = 1;
  }

  function updateSort(partial: Partial<ProfessionalsSort>) {
    Object.assign(sort, partial);
    pagination.page = 1;
  }

  function goToPage(page: number) {
    pagination.page = page;
  }

  function clearFilters() {
    Object.assign(filters, DEFAULT_FILTERS);
    filters.professions = [];
    filters.priceRange = { min: null, max: null };
    Object.assign(sort, DEFAULT_SORT);
    pagination.page = 1;
  }

  function syncUrl() {
    const q: Record<string, string> = {};

    if (filters.search) q.search = filters.search;
    if (filters.professions.length)
      q.professions = filters.professions.join(",");
    if (filters.city) q.city = filters.city;
    if (filters.minRating != null) q.minRating = String(filters.minRating);
    if (filters.available) q.available = "true";
    if (filters.priceRange.min != null)
      q.minPrice = String(filters.priceRange.min);
    if (filters.priceRange.max != null)
      q.maxPrice = String(filters.priceRange.max);
    if (
      sort.field !== DEFAULT_SORT.field ||
      sort.direction !== DEFAULT_SORT.direction
    ) {
      q.sort = `${sort.field}:${sort.direction}`;
    }
    if (pagination.page > 1) q.page = String(pagination.page);

    router.replace({ query: q });
  }
  onMounted(() => {
    nextTick(() => {
      Object.assign(filters, filtersFromQuery(route.query));
      Object.assign(sort, sortFromQuery(route.query));
      pagination.page = Number(route.query.page) || 1;
    });
  });
  return {
    professionals: computed(() => result.value?.data ?? []),
    meta: computed(() => result.value?.meta ?? null),
    loading,
    error,
    filters,
    sort,
    updateFilters,
    updateSort,
    goToPage,
    clearFilters,
  };
}
