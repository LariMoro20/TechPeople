import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { useFavoriteProfessionalsStore } from "../../app/stores/useFavoriteProfessionalsStore";

const STORAGE_KEY = "TECHPEOPLE-FAVORITE-PROFESSIONALS";

describe("useFavoriteProfessionalsStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it("começa sem favoritos", () => {
    const store = useFavoriteProfessionalsStore();

    expect(store.totalFavorites).toBe(0);
    expect(store.isFavorite("1")).toBe(false);
  });

  it("adiciona um favorito e persiste no localStorage", () => {
    const store = useFavoriteProfessionalsStore();

    store.addFavorite("1");

    expect(store.isFavorite("1")).toBe(true);
    expect(store.totalFavorites).toBe(1);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY))).toEqual(["1"]);
  });

  it("não duplica o mesmo favorito", () => {
    const store = useFavoriteProfessionalsStore();

    store.addFavorite("1");
    store.addFavorite("1");

    expect(store.totalFavorites).toBe(1);
  });

  it("remove um favorito existente", () => {
    const store = useFavoriteProfessionalsStore();

    store.addFavorite("1");
    store.removeFavorite("1");

    expect(store.isFavorite("1")).toBe(false);
    expect(store.totalFavorites).toBe(0);
  });

  it("toggleFavorite alterna entre adicionar e remover", () => {
    const store = useFavoriteProfessionalsStore();

    store.toggleFavorite("1");
    expect(store.isFavorite("1")).toBe(true);

    store.toggleFavorite("1");
    expect(store.isFavorite("1")).toBe(false);
  });

  it("normaliza ids numéricos para string", () => {
    const store = useFavoriteProfessionalsStore();

    store.addFavorite(42 as unknown as string);

    expect(store.isFavorite("42")).toBe(true);
  });

  it("clearFavorites remove todos os favoritos", () => {
    const store = useFavoriteProfessionalsStore();

    store.addFavorite("1");
    store.addFavorite("2");
    store.clearFavorites();

    expect(store.totalFavorites).toBe(0);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual([]);
  });

  it("hydrate carrega favoritos previamente salvos no localStorage", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(["7", "8"]));
    const store = useFavoriteProfessionalsStore();

    store.hydrate();

    expect(store.isFavorite("7")).toBe(true);
    expect(store.isFavorite("8")).toBe(true);
    expect(store.totalFavorites).toBe(2);
  });

  it("hydrate ignora JSON inválido e limpa a chave corrompida", () => {
    localStorage.setItem(STORAGE_KEY, "{invalido");
    const store = useFavoriteProfessionalsStore();

    store.hydrate();

    expect(store.totalFavorites).toBe(0);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
