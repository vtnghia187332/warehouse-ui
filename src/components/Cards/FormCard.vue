<template>
  <div class="bg-white radius-shadow_add">
    <div class="flex justify-between content-center">
      <div class="p-3 text-primary-85 !font-bold text-base">{{ title }}</div>
      <el-button
        v-show="isShowButton"
        class="bg-blue-400 !h-10 mt-auto mb-auto mr-3"
        type="primary"
        @click="handleClickBtn"
        >Add</el-button
      >
    </div>
    <div class="p-3 border-t border-gray-200">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "isShowButton"],
  methods: {
    handleClickBtn() {
      this.$emit("handleClickBtn", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.radius-shadow_add {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}
</style>
