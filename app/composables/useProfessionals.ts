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
  if (min !== null && max !== null && max < min) return { min, max: null };
  return { min, max };
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

function buildRouteQuery(
  f: ProfessionalsFilters,
  s: ProfessionalsSort,
  page: number,
): Record<string, string> {
  const q: Record<string, string> = {};
  if (f.search) q.search = f.search;
  if (f.professions.length) q.professions = f.professions.join(",");
  if (f.city) q.city = f.city;
  if (f.minRating != null) q.minRating = String(f.minRating);
  if (f.available) q.available = "true";
  if (f.priceRange.min != null) q.minPrice = String(f.priceRange.min);
  if (f.priceRange.max != null) q.maxPrice = String(f.priceRange.max);
  if (
    s.field !== DEFAULT_SORT.field ||
    s.direction !== DEFAULT_SORT.direction
  ) {
    q.sort = `${s.field}:${s.direction}`;
  }
  if (page > 1) q.page = String(page);
  return q;
}

export function useProfessionals() {
  const route = useRoute();
  const router = useRouter();

  const filters = computed<ProfessionalsFilters>(() => ({
    ...DEFAULT_FILTERS,
    ...filtersFromQuery(route.query),
  }));

  const sort = computed<ProfessionalsSort>(() => sortFromQuery(route.query));

  const currentPage = computed(() => Number(route.query.page) || 1);

  const apiQuery = computed<ProfessionalsQuery>(() => ({
    filters: filters.value,
    sort: sort.value,
    pagination: { page: currentPage.value, perPage: 12 },
  }));

  const { data, status, error } = useFetch<ProfessionalsResponse>(() =>
    buildProfessionalsUrl(apiQuery.value),
  );

  function updateFilters(partial: Partial<ProfessionalsFilters>) {
    router.replace({
      query: buildRouteQuery({ ...filters.value, ...partial }, sort.value, 1),
    });
  }

  function updateSort(partial: Partial<ProfessionalsSort>) {
    const next = { ...sort.value };
    if (partial.field && VALID_FIELDS.includes(partial.field))
      next.field = partial.field;
    if (partial.direction && VALID_DIRECTIONS.includes(partial.direction))
      next.direction = partial.direction;
    router.replace({ query: buildRouteQuery(filters.value, next, 1) });
  }

  function goToPage(page: number) {
    router.replace({
      query: buildRouteQuery(filters.value, sort.value, Math.max(1, page)),
    });
  }

  function clearFilters() {
    router.replace({ query: {} });
  }

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
