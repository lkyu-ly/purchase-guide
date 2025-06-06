<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
const { page } = useData()

const date = computed(
  () => new Date(page.value.lastUpdated!)
)
</script>

<!-- 在 JavaScript Date 对象中，可以根据自己需求选择显示的时间
toLocaleString()：显示日期和时间 默认
toLocaleDateString()：仅显示日期
toLocaleTimeString()：仅显示时间 -->

<template>
  <div class="LastUpdated">
    <p>更新时间: {{ date.toLocaleDateString() }}</p>
  </div>
</template>

<style>
.LastUpdated {
  color: var(--vp-c-text-2);
}
</style>