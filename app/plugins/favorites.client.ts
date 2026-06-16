export default defineNuxtPlugin(() => {
  onNuxtReady(() => {
    useFavoriteProfessionalsStore().hydrate();
  });
});
