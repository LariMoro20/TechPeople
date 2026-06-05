import type { ProfessionalsStats } from "~/types";
import { professionalStats } from "../../utils/professionalsRepository";

export default defineEventHandler((): ProfessionalsStats => professionalStats);
