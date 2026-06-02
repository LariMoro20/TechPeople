export type SortField = "name" | "servicePrice" | "rating" | "distance";
export type SortDirection = "asc" | "desc";

export interface Professional {
  id: string;
  name: string;
  profession: string;
  avatar: string;
  servicePrice: number;
  rating: number;
  reviewCount: number;
  city: string;
  distance?: number;
  bio: string;
  tags: string[];
  available: boolean;
}

export interface PriceRange {
  min: number | null;
  max: number | null;
}

export interface ProfessionalsFilters {
  search: string;
  professions: string[];
  priceRange: PriceRange;
  minRating: number | null;
  city: string | null;
  available: boolean | null;
}

export interface ProfessionalsSort {
  field: SortField;
  direction: SortDirection;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface ProfessionalsQuery {
  filters: ProfessionalsFilters;
  sort: ProfessionalsSort;
  pagination: Pick<PaginationMeta, "page" | "perPage">;
}

export interface ProfessionalsResponse {
  data: Professional[];
  meta: PaginationMeta;
}

export interface ProfessionalsFacets {
  professions: string[];
  cities: string[];
  priceRange: { min: number; max: number };
}
