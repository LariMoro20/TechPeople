import { computed, reactive, ref, watch } from "vue";
import { createError, defineEventHandler } from "h3";

Object.assign(globalThis, {
  ref,
  computed,
  reactive,
  watch,
  createError,
  defineEventHandler,
});
