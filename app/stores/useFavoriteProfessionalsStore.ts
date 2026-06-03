import { defineStore } from "pinia";
import type { Professional } from "~/types";

const STORAGE_KEY = "TECHPEOPLE-FAVORITE-PROFESSIONALS";

export const useFavoriteProfessionalsStore = defineStore(
  "favorite-professionals",
  () => {
    const favoriteIds = ref<string[]>([]);
    const hydrated = ref(false);
    const totalFavorites = computed(() => favoriteIds.value.length);

    function normalizeId(id: Professional["id"]) {
      return String(id);
    }

    function isFavorite(id: Professional["id"]) {
      return favoriteIds.value.includes(normalizeId(id));
    }

    function addFavorite(id: Professional["id"]) {
      const normalizedId = normalizeId(id);
      if (favoriteIds.value.includes(normalizedId)) return;

      favoriteIds.value.push(normalizedId);
      persist();
    }

    function removeFavorite(id: Professional["id"]) {
      const normalizedId = normalizeId(id);
      favoriteIds.value = favoriteIds.value.filter(
        (favoriteId) => favoriteId !== normalizedId,
      );

      persist();
    }

    function toggleFavorite(id: Professional["id"]) {
      if (isFavorite(id)) {
        removeFavorite(id);
        return;
      }
      addFavorite(id);
    }

    function clearFavorites() {
      favoriteIds.value = [];
      persist();
    }

    function persist() {
      if (!import.meta.client) return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds.value));
    }

    function hydrate() {
      if (!import.meta.client || hydrated.value) return;
      const savedFavorites = localStorage.getItem(STORAGE_KEY);

      if (savedFavorites) {
        try {
          const parsedFavorites = JSON.parse(savedFavorites);
          if (Array.isArray(parsedFavorites)) {
            favoriteIds.value = parsedFavorites.map(String);
          }
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }

      hydrated.value = true;
    }

    return {
      favoriteIds,
      totalFavorites,
      isFavorite,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      clearFavorites,
      hydrate,
    };
  },
);
