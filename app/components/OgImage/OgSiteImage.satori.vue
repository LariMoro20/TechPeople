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

    <!-- Tech People -->
    <div style="display: flex; flex-direction: row; align-items: flex-end; gap: 32px">
      <div
        style="
          font-size: 155px;
          font-weight: 950;
          letter-spacing: -8px;
          line-height: 1;
          color: #e8e4dc;
          display: flex;
        "
      >
        Tech
      </div>
      <div
        style="
          font-size: 155px;
          font-weight: 950;
          letter-spacing: -8px;
          line-height: 1;
          color: #06ad5e;
          display: flex;
        "
      >
        People
      </div>
      <div
        style="font-size: 100px; font-weight: 950; letter-spacing: -3px; line-height: 1; color: rgba(232,228,220,.2); display: flex; align-self: flex-end; margin-bottom: 6px;"
      >
        &lt;/&gt;
      </div>
    </div>

    <!-- Tags + título -->
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
          font-size: 18px;
          font-weight: 600;
          color: rgba(232,228,220,.7);
          display: flex;
          overflow: hidden;
        "
      >
        {{ props.title }}
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
      <div style="font-size: 14px; font-weight: 700; color: #06ad5e; display: flex">
        Larissa Santos
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    description: string;
    tags?: string[];
  }>(),
  {
    tags: () => ["Frontend", "Backend", "Fullstack", "UI/UX", "DevOps"],
  }
);
</script>
