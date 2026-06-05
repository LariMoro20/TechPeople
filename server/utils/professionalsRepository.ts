import professionalsData from "../data/professionals.json";
import type { Professional, ProfessionalsFacets, ProfessionCount, ProfessionalsStats } from "~/types";
import { professionalSchema } from "./professionals.schema";
import { normalize } from "./text";

export const professionals: Professional[] = professionalSchema
  .array()
  .parse(professionalsData);

const byId = new Map(professionals.map((p) => [p.id, p]));

export const searchIndex = new Map(
  professionals.map((p) => [
    p.id,
    normalize(
      [p.name, p.profession, p.city, p.bio, p.tags.join(" ")].join(" "),
    ),
  ]),
);

export const facets: ProfessionalsFacets = {
  professions: [...new Set(professionals.map((p) => p.profession))].sort(
    (a, b) => a.localeCompare(b, "pt-BR"),
  ),
  cities: [...new Set(professionals.map((p) => p.city))].sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  ),
  priceRange: {
    min: Math.min(...professionals.map((p) => p.servicePrice)),
    max: Math.max(...professionals.map((p) => p.servicePrice)),
  },
};

export const professionCounts: ProfessionCount[] = Object.entries(
  professionals.reduce<Record<string, number>>((acc, p) => {
    acc[p.profession] = (acc[p.profession] ?? 0) + 1;
    return acc;
  }, {}),
)
  .map(([name, count]) => ({ name, count }))
  .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

export const professionalStats: ProfessionalsStats = {
  total: professionals.length,
  specialties: facets.professions.length,
  cities: facets.cities.length,
  available: professionals.filter((p) => p.available).length,
  professions: professionCounts,
};

export function getProfessionalById(id: string): Professional | undefined {
  return byId.get(id);
}
