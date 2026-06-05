<template>
  <div
    style="
      width: 1200px;
      height: 630px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #0f172b;
      color: #e8e4dc;
      padding: 64px;
    "
  >
    <!-- URL -->
    <div style="display: flex; flex-direction: row; align-items: center; gap: 12px">
      <div style="width: 7px; height: 7px; border-radius: 50%; background: #06ad5e; flex-shrink: 0" />
      <div style="font-size: 15px; font-weight: 700; color: rgba(232,228,220,.45); display: flex">
        techpeople-larisantos.vercel.app
      </div>
    </div>

    <!-- Nome + Profissão -->
    <div style="display: flex; flex-direction: column; gap: 12px">
      <div
        style="
          font-size: 80px;
          font-weight: 950;
          letter-spacing: -4px;
          line-height: 1;
          color: #e8e4dc;
          display: flex;
        "
      >
        {{ props.name }}
      </div>
      <div
        style="
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: #06ad5e;
          display: flex;
        "
      >
        {{ props.profession }}
      </div>
    </div>

    <!-- Tags + bio -->
    <div style="display: flex; flex-direction: column; gap: 16px">
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 8px">
        <div
          v-for="tag in props.tags"
          :key="tag"
          style="
            padding: 4px 14px;
            border-radius: 9999px;
            font-size: 13px;
            font-weight: 700;
            border: 1px solid rgba(6,173,94,.35);
            background: rgba(6,173,94,.1);
            color: #06ad5e;
            display: flex;
            align-items: center;
          "
        >
          {{ tag }}
        </div>
      </div>
      <div
        style="
          font-size: 17px;
          font-weight: 400;
          color: rgba(232,228,220,.45);
          display: flex;
          overflow: hidden;
        "
      >
        {{ props.description }}
      </div>
    </div>

    <!-- Rodapé -->
    <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between">
      <div style="font-size: 14px; font-weight: 600; color: rgba(232,228,220,.35); display: flex">
        Catálogo de Profissionais de Tecnologia
      </div>
      <div style="display: flex; flex-direction: row; align-items: flex-end; gap: 6px">
        <div style="font-size: 14px; font-weight: 950; color: #e8e4dc; display: flex">Tech</div>
        <div style="font-size: 14px; font-weight: 950; color: #06ad5e; display: flex">People</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string;
    profession: string;
    description?: string;
    tags?: string[];
  }>(),
  {
    description: "",
    tags: () => [],
  },
);
</script>
