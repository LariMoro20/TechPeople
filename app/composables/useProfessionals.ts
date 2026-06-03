import { buildProfessionalsUrl } from "~/services/professionals.service";
import type {
  ProfessionalsSort,
  ProfessionalsFilters,
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

function numberFromQuery(value: string | string[] | undefined) {
  if (!value) return null;
  const number = Number(String(value));
  return Number.isFinite(number) ? number : null;
}

function priceRangeFromQuery(query: Record<string, string | string[]>) {
  const min = numberFromQuery(query.minPrice);
  const max = numberFromQuery(query.maxPrice);
  if (min !== null && max !== null && max < min) {
    return {
      min,
      max: null,
    };
  }
  return {
    min,
    max,
  };
}
function ratingFromQuery(value: string | string[] | undefined) {
  const rating = numberFromQuery(value);
  if (rating === null) return null;
  return rating >= 0 && rating <= 5 ? rating : null;
}

function filtersFromQuery(
  query: Record<string, string | string[]>,
): Partial<ProfessionalsFilters> {
  return {
    search: query.search ? String(query.search) : "",
    professions: query.professions
      ? String(query.professions)
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean)
      : [],
    priceRange: priceRangeFromQuery(query),
    minRating: ratingFromQuery(query.minRating),
    city: query.city ? String(query.city) : null,
    available: query.available === "true" ? true : null,
  };
}

function sortFromQuery(
  query: Record<string, string | string[]>,
): ProfessionalsSort {
  if (!query.sort) return { ...DEFAULT_SORT };
  const [field, direction] = String(query.sort).split(":") as [
    SortField,
    SortDirection,
  ];
  return {
    field: VALID_FIELDS.includes(field) ? field : DEFAULT_SORT.field,
    direction: VALID_DIRECTIONS.includes(direction)
      ? direction
      : DEFAULT_SORT.direction,
  };
}

export function useProfessionals() {
  const route = useRoute();
  const router = useRouter();

  const filters = reactive<ProfessionalsFilters>({
    ...DEFAULT_FILTERS,
    ...filtersFromQuery(route.query),
  });

  const debouncedSearch = ref(filters.search);
  let searchDebounce: ReturnType<typeof setTimeout> | null = null;
  const sort = reactive<ProfessionalsSort>(sortFromQuery(route.query));

  const pagination = reactive({
    page: Number(route.query.page) || 1,
    perPage: 12,
  });

  const apiQuery = computed<ProfessionalsQuery>(() => ({
    filters: {
      search: debouncedSearch.value,
      professions: [...filters.professions],
      priceRange: { min: filters.priceRange.min, max: filters.priceRange.max },
      minRating: filters.minRating,
      city: filters.city,
      available: filters.available,
    },
    sort: { field: sort.field, direction: sort.direction },
    pagination: { page: pagination.page, perPage: pagination.perPage },
  }));

  const { data, status, error, execute } = useFetch<ProfessionalsResponse>(() =>
    buildProfessionalsUrl(apiQuery.value),
  );

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

  function updateFilters(partial: Partial<ProfessionalsFilters>) {
    if (partial.search !== undefined) filters.search = partial.search;
    if (partial.professions !== undefined)
      filters.professions = [...partial.professions];
    if (partial.priceRange !== undefined)
      filters.priceRange = { ...partial.priceRange };
    if (partial.minRating !== undefined) filters.minRating = partial.minRating;
    if (partial.city !== undefined) filters.city = partial.city;
    if (partial.available !== undefined) filters.available = partial.available;
    pagination.page = 1;
  }

  function updateSort(partial: Partial<ProfessionalsSort>) {
    if (partial.field && VALID_FIELDS.includes(partial.field))
      sort.field = partial.field;
    if (partial.direction && VALID_DIRECTIONS.includes(partial.direction))
      sort.direction = partial.direction;
    pagination.page = 1;
  }

  function goToPage(page: number) {
    pagination.page = Math.max(1, page);
  }

  function clearFilters() {
    filters.search = "";
    filters.professions = [];
    filters.priceRange = { min: null, max: null };
    filters.minRating = null;
    filters.city = null;
    filters.available = null;
    sort.field = DEFAULT_SORT.field;
    sort.direction = DEFAULT_SORT.direction;
    pagination.page = 1;
  }

  onMounted(() => execute());

  watch(
    apiQuery,
    () => {
      syncUrl();
      execute();
    },
    { flush: "post" },
  );

  watch(
    () => filters.search,
    (value) => {
      if (searchDebounce) {
        clearTimeout(searchDebounce);
      }
      searchDebounce = setTimeout(() => {
        debouncedSearch.value = value;
        searchDebounce = null;
      }, 1000);
    },
  );

  return {
    professionals: computed(() => data.value?.data ?? []),
    meta: computed(() => data.value?.meta ?? null),
    loading: computed(() => status.value === "pending"),
    error,
    filters,
    sort,
    updateFilters,
    updateSort,
    goToPage,
    clearFilters,
  };
}
