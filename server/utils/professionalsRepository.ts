import professionalsData from "../data/professionals.json";
import type { Professional, ProfessionalsFacets } from "~/types";
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

export function getProfessionalById(id: string): Professional | undefined {
  return byId.get(id);
}
