<template>
  <div class="bg-white radius-shadow_add">
    <div class="p-3 text-primary-85 !font-bold text-base">{{ title }}</div>
    <div class="p-3 border-t border-gray-200">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style lang="scss" scoped>
.radius-shadow_add {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}
</style>
