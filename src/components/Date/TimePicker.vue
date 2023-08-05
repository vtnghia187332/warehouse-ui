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
      <el-time-picker
        class="!w-full"
        is-range
        format="HH:mm"
        v-model="field.value"
        range-separator="To"
        start-placeholder="Start time"
        end-placeholder="End time"
        :class="
          errors[0] || field.error
            ? `${field.classes} !border-red-500`
            : field.classes
        "
      >
      </el-time-picker>
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
  name: "TimePicker",
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
