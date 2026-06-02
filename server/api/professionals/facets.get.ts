import type { ProfessionalsFacets } from "~/types";
import { facets } from "../../utils/professionalsRepository";

export default defineEventHandler((): ProfessionalsFacets => facets);
