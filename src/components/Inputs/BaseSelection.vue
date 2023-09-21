<template>
  <ValidationProvider
    :name="field.name"
    :rules="field.rules"
    v-slot="{ errors }"
  >
    <label class="!font-bold block" :for="field.id">
      <span v-if="field.isRequired == 'true'" class="text-danger">*</span
      >{{ field.label }}
    </label>
    <el-select
      v-model="field.value"
      :disabled="field.disabled === 'disabled'"
      filterable
      :placeholder="field.placeholder"
      :id="field.id"
      @change="updateInput($event)"
      :class="
        errors[0] || field.error
          ? `${field.classes} border-error rounded`
          : field.classes
      "
      clearable
    >
      <el-option
        v-for="item in field.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <div v-if="errors[0] || field.error" class="flex justify-between mt-1">
      <div class="text-red-500">{{ errors[0] || field.error }}</div>
    </div>
    <div v-else class="mb-[25px]"></div>
  </ValidationProvider>
</template>
<script>
import { ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationProvider,
  },
  name: "BaseSelection",
  data() {
    return {};
  },
  props: {
    field: {
      type: Object,
      default: {},
    },
  },
  methods: {
    updateInput(event) {
      this.$emit("getValue", event);
    },
  },
};
</script>

<style></style>
