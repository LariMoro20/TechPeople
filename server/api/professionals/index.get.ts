import { getQuery } from "h3";
import type {
  Professional,
  ProfessionalsResponse,
  SortField,
  SortDirection,
} from "~/types";
import {
  professionals,
  searchIndex,
} from "../../utils/professionalsRepository";
import { professionalsQuerySchema } from "../../utils/professionals.schema";
import { normalize } from "../../utils/text";

function sortProfessionals(
  list: Professional[],
  field: SortField,
  direction: SortDirection,
): Professional[] {
  const sorted = [...list].sort((a, b) => {
    let comparison = 0;

    switch (field) {
      case "name":
        comparison = a.name.localeCompare(b.name, "pt-BR", {
          sensitivity: "base",
        });
        break;
      case "servicePrice":
        comparison = a.servicePrice - b.servicePrice;
        break;
      case "rating":
        comparison = a.rating - b.rating;
        break;
      case "distance":
        comparison = (a.distance ?? Infinity) - (b.distance ?? Infinity);
        break;
    }

    return direction === "asc" ? comparison : -comparison;
  });

  return sorted;
}

export default defineEventHandler((event): ProfessionalsResponse => {
  const params = professionalsQuerySchema.parse(getQuery(event));

  let result = professionals;

  if (params.search) {
    const term = normalize(params.search);
    result = result.filter((p) => searchIndex.get(p.id)!.includes(term));
  }

  if (params.professions.length) {
    result = result.filter((p) => params.professions.includes(p.profession));
  }

  if (params.city) {
    const city = normalize(params.city);
    result = result.filter((p) => normalize(p.city) === city);
  }

  if (params.minPrice !== undefined) {
    result = result.filter((p) => p.servicePrice >= params.minPrice!);
  }

  if (params.maxPrice !== undefined) {
    result = result.filter((p) => p.servicePrice <= params.maxPrice!);
  }

  if (params.minRating !== undefined) {
    result = result.filter((p) => p.rating >= params.minRating!);
  }

  if (params.available !== undefined) {
    result = result.filter((p) => p.available === params.available);
  }

  result = sortProfessionals(result, params.sortField, params.sortDirection);

  const total = result.length;
  const totalPages = Math.ceil(total / params.perPage);
  const start = (params.page - 1) * params.perPage;
  const data = result.slice(start, start + params.perPage);

  return {
    data,
    meta: {
      page: params.page,
      perPage: params.perPage,
      total,
      totalPages,
      hasMore: params.page < totalPages,
    },
  };
});
