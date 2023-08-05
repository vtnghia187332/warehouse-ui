<template>
  <ValidationProvider
    :name="field.name"
    :rules="field.rules"
    v-slot="{ errors }"
    class="mb-2"
  >
    <div class="mb-2">
      <label v-if="field.label" :for="field.id" class="!font-bold block">
        <span v-if="field.isRequired == true" class="text-danger">*</span
        >{{ field.label }}
      </label>
      <el-date-picker
        class="!w-full mb-2"
        :class="
          errors[0] || field.error
            ? `${field.classes} !border-red-500`
            : field.classes
        "
        format="dd/MM/yyyy"
        v-model="field.value"
        type="date"
        placeholder="Pick a day"
        :picker-options="field.pickerOptions"
      >
      </el-date-picker>
      <div class="mb-1 text-red-500">{{ errors[0] || field.error }}</div>
    </div>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
  components: {
    ValidationProvider,
  },
  name: "DatePicker",
  data() {
    return {};
  },
  props: {
    field: {
      type: Object,
      default: {},
    },
  },
  methods: {},
};
</script>
