<script setup lang="ts">
import { request } from '@/utils/request'
const getHome = async () => {
  const result = await request.get('patient/myUser')
  console.log(result)
}
onMounted(() => {
  getHome()
})
</script>

<template></template>

<style scoped></style>
