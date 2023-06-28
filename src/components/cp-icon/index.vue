<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>
<template>
  <svg aria-hidden="true" class="icon">
    <use :href="`#icon-${name}`"></use>
  </svg>
</template>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
}
</style>
