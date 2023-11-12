<template>
  <ValidationProvider
    :name="field.name"
    :rules="field.rules"
    v-slot="{ errors }"
    class="mb-2"
  >
    <label v-if="field.label" :for="field.id" class="!font-bold block">
      <span v-if="field.isRequired == 'true'" class="text-danger">*</span
      >{{ field.label }}
    </label>
    <textarea
      :id="field.id"
      :placeholder="field.placeholder"
      :type="field.type"
      :value="field.value"
      @input="updateInput"
      :disabled="field.disabled === true"
      class="p-2 pl-3 relative border rounded-sm w-full focus:!border-gray-700 focus:!ring-gray-700"
      :class="
        errors[0] || field.error
          ? `${field.classes} !border-red-500`
          : field.classes
      "
    />
    <div class="flex justify-between mt-1">
      <div class="mb-1 text-red-500">{{ errors[0] || field.error }}</div>
      <div v-if="field.maxlength > 0" class="mb-1 text-black-500">
        {{ field.value.length }}/{{ field.maxlength }}
      </div>
    </div>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
  components: {
    ValidationProvider,
  },
  name: "BaseTextArea",
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
      this.$emit("input", event.target.value);
    },
  },
};
</script>
