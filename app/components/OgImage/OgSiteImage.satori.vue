<template>
  <div
    class="w-[1200px] h-[630px] flex flex-row"
    :style="{
      background: '#0f172b',
      color: '#e8e4dc',
    }"
  >
    <div
      class="flex-1 p-[64px] flex flex-col justify-between"
      :style="{
        background: `
          radial-gradient(600px 400px at 0% 0%, rgba(6,173,94,.15), transparent 70%),
          radial-gradient(400px 400px at 0% 100%, rgba(0,202,241,.08), transparent 70%)
        `,
      }"
    >
      <div class="flex flex-row items-center gap-3">
        <div
          class="w-[8px] h-[8px] rounded-full"
          :style="{ background: '#06ad5e' }"
        />
        <div
          class="text-[16px] font-[700]"
          :style="{ color: 'rgba(232,228,220,.5)' }"
        >
          techpeople-larisantos.vercel.app
        </div>
      </div>

      <div class="flex flex-col gap-5">
        <div class="flex flex-row flex-wrap gap-2">
          <div
            v-for="tag in props.tags"
            :key="tag"
            class="px-3 py-1 rounded-full text-[13px] font-[700]"
            :style="{
              border: '1px solid rgba(6,173,94,.35)',
              background: 'rgba(6,173,94,.1)',
              color: '#06ad5e',
            }"
          >
            {{ tag }}
          </div>
        </div>

        <div
          class="text-[52px] leading-[1.1] font-[950] tracking-[-1.5px]"
          style="
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          "
        >
          {{ props.title }}
        </div>

        <div
          class="text-[20px] leading-[1.5]"
          :style="{ opacity: '.65' }"
          style="
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          "
        >
          {{ props.description }}
        </div>
      </div>

      <div class="flex flex-row items-center justify-between">
        <div
          class="text-[15px] font-[600]"
          :style="{ color: 'rgba(232,228,220,.4)' }"
        >
          Catálogo de Profissionais de Tecnologia
        </div>
        <div class="text-[15px] font-[700]" :style="{ color: '#00caf1' }">
          Larissa Santos
        </div>
      </div>
    </div>

    <div
      class="w-[420px] shrink-0 flex flex-col items-center justify-center gap-6"
      :style="{
        borderLeft: '1px solid rgba(6,173,94,.15)',
        background: 'rgba(6,173,94,.04)',
      }"
    >
      <template v-if="props.image">
        <img
          :src="props.image"
          alt=""
          class="w-full h-full object-cover"
          :style="{ opacity: '0.85' }"
        />
      </template>
      <template v-else>
        <div
          class="text-[96px] font-[950] tracking-[-4px]"
          :style="{ color: '#06ad5e' }"
        >
          Tech
        </div>
        <div
          class="text-[96px] font-[950] tracking-[-4px] mt-[-32px]"
          :style="{ color: '#00caf1' }"
        >
          People
        </div>
        <div
          class="text-[15px] font-[500] text-center px-8"
          :style="{ color: 'rgba(232,228,220,.3)' }"
        >
          500+ profissionais cadastrados
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    description: string;
    image?: string;
    tags?: string[];
  }>(),
  {
    tags: () => ["Frontend", "Backend", "Fullstack", "UI/UX", "DevOps"],
  }
);
</script>
