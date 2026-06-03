import type { ProfessionalsFacets } from "~/types";

export async function getProfessionalsFilters(): Promise<ProfessionalsFacets> {
  return await $fetch<ProfessionalsFacets>("/api/professionals/facets");
}
