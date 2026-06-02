import { createError, getRouterParam } from "h3";
import type { Professional } from "~/types";
import { getProfessionalById } from "../../utils/professionalsRepository";

export default defineEventHandler((event): Professional => {
  const id = getRouterParam(event, "id");
  const professional = id ? getProfessionalById(id) : undefined;

  if (!professional) {
    throw createError({
      statusCode: 404,
      statusMessage: "Profissional não encontrado.",
    });
  }

  return professional;
});
