<template>
  <div class="bg-white radius-shadow_add">
    <div class="p-3 flex items-center justify-between">
      <div class="text-primary-85 !font-bold text-base">{{ title }}</div>
      <el-button
        class="bg-slate-500"
        type="primary"
        :disabled="disabled"
        v-show="isShowButton"
        @click="visible = true"
        >{{ buttonLabel }}</el-button
      >
    </div>
    <div
      v-if="item"
      class="p-3 flex items-center justify-between border-t border-neutral-1"
    >
      <div>
        <div class="text-base font-bold">{{ item[nameKey] }}</div>
        <div
          class="text-sm text-secondary-45"
          v-for="field in fields"
          :key="field.value"
        >
          {{ field.text }}: {{ item[field.value] }}
        </div>
      </div>
      <el-button
        class="bg-slate-500"
        type="primary"
        :disabled="disabled"
        v-show="isShowButton"
        @click="visible = true"
        >delete</el-button
      >
    </div>
    <component
      v-if="visible"
      :is="dialog"
      :visible.sync="visible"
      @change="handleChange"
    />
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    nameKey: {
      type: String,
    },
    title: {
      type: String,
    },
    fields: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Array,
      default: () => [],
    },
    item: {
      type: Object,
    },
    dialog: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
    isShowButton: {
      type: Boolean,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    buttonLabel() {
      return this.item ? "Reassign" : "Assign";
    },
  },
  methods: {
    handleChange(value) {
      this.$emit("change", value);
    },
    handleDelete() {
      this.$emit("delete");
    },
  },
};
</script>

<style></style>
