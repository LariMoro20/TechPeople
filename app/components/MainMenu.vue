<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const props = defineProps<{ orientation?: "horizontal" | "vertical" }>();

const route = useRoute();
const router = useRouter();
const { stats } = useProfessionCounts();
const { facets } = useProfessionalsFacets();

const areasChildren = computed(() => [
  ...(stats.value?.professions ?? []).map((p) => ({
    label: p.name,
    description: `${p.count} profissionais`,
    icon: "i-lucide-briefcase",
    to: { path: "/professionals", query: { professions: p.name } },
  })),
  ...(facets.value?.cities ?? []).map((city) => ({
    label: city,
    icon: "i-lucide-map-pin",
    to: { path: "/professionals", query: { city } },
  })),
]);

function navigate(query: Record<string, string>) {
  router.push({ path: "/professionals", query });
  document.dispatchEvent(
    new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true })
  );
}

const items = computed<NavigationMenuItem[]>(() => [
  { label: "Início", to: "/", active: route.path === "/" },
  {
    label: "Profissionais",
    to: "/professionals",
    active: route.path === "/professionals",
  },
  {
    label: "Nossas Áreas",
    active:
      route.path.startsWith("/professionals") &&
      (!!route.query.professions || !!route.query.city),
    ...(props.orientation === "vertical"
      ? { children: areasChildren.value }
      : { slot: "areas" }),
  },
]);
</script>

<template>
  <UNavigationMenu
    :items="items"
    :orientation="orientation"
    :ui="
      orientation !== 'vertical'
        ? {
            viewportWrapper:
              'fixed top-(--ui-header-height) inset-x-0 flex z-50 border-b border-default bg-default shadow-sm',
            content: 'w-full',
          }
        : undefined
    "
  >
    <template #areas-content>
      <UContainer>
        <div class="grid grid-cols-[3fr_2fr] divide-x divide-default py-2">
          <div class="pr-8 py-4">
            <p
              class="text-[11px] font-semibold uppercase tracking-widest text-muted px-3 pb-3"
            >
              Áreas de Atuação
            </p>
            <ul class="grid grid-cols-2 gap-x-2">
              <li v-for="p in stats?.professions" :key="p.name">
                <button
                  type="button"
                  class="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-default hover:bg-elevated transition-colors cursor-pointer"
                  @click="navigate({ professions: p.name })"
                >
                  <UIcon name="i-lucide-briefcase" class="size-3.5 text-muted flex-shrink-0" />
                  <span class="font-medium">{{ p.name }}</span>
                  <span class="ml-auto text-xs text-muted tabular-nums flex-shrink-0">{{ p.count }}</span>
                </button>
              </li>
            </ul>
          </div>
          <div class="pl-8 py-4">
            <p
              class="text-[11px] font-semibold uppercase tracking-widest text-muted px-3 pb-3"
            >
              Localidades
            </p>
            <ul class="space-y-0.5">
              <li v-for="city in facets?.cities" :key="city">
                <button
                  type="button"
                  class="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-default hover:bg-elevated transition-colors cursor-pointer"
                  @click="navigate({ city })"
                >
                  <UIcon name="i-lucide-map-pin" class="size-3.5 text-muted flex-shrink-0" />
                  <span class="font-medium">{{ city }}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </UContainer>
    </template>
  </UNavigationMenu>
</template>
