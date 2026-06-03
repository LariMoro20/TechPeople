export default defineNuxtPlugin(() => {
  const store = useFavoriteProfessionalsStore();
  store.hydrate();
});
