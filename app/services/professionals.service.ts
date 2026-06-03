import type {
  Professional,
  ProfessionalsQuery,
  ProfessionalsResponse,
} from "~/types";

type ProfessionalsApiQuery = {
  search?: string;
  professions?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  city?: string;
  available?: boolean;
  sortField?: string;
  sortDirection?: string;
  page?: number;
  perPage?: number;
};

function buildProfessionalsApiQuery(
  query: ProfessionalsQuery,
): ProfessionalsApiQuery {
  const params: ProfessionalsApiQuery = {
    sortField: query.sort.field,
    sortDirection: query.sort.direction,
    page: query.pagination.page,
    perPage: query.pagination.perPage,
  };
  if (query.filters.search) params.search = query.filters.search;
  if (query.filters.professions.length)
    params.professions = query.filters.professions.join(",");
  if (query.filters.priceRange.min != null)
    params.minPrice = query.filters.priceRange.min;
  if (query.filters.priceRange.max != null)
    params.maxPrice = query.filters.priceRange.max;
  if (query.filters.minRating != null)
    params.minRating = query.filters.minRating;
  if (query.filters.city) params.city = query.filters.city;
  if (query.filters.available != null)
    params.available = query.filters.available;
  return params;
}
export async function getProfessionals(
  query: ProfessionalsQuery,
  signal?: AbortSignal,
): Promise<ProfessionalsResponse> {
  const built = buildProfessionalsApiQuery(query);
  return await $fetch<ProfessionalsResponse>("/api/professionals", {
    query: built,
    signal,
  });
}

export async function getProfessionalById(id: string): Promise<Professional> {
  return await $fetch<Professional>(`/api/professionals/${id}`);
}
