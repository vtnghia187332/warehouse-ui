
<template>
    <div class="mb-2">
        <label v-if="field.label" :for="field.id" class="!font-bold block">
            {{ field.label }}
        </label>
        <input :id="field.id" :type="field.type" :value="value" @input="updateInput"
            class="relative border rounded-sm w-full p-1 focus:outline-none focus:ring-2 focus:[007bff] focus:border-transparent"
            :class="field.error ? `${field.classes} !border-red-500` : field.classes" />
        <div class="absolute mb-1 text-red-500">{{ field.error }}</div>
    </div>
</template>
  
<script>
export default {
    name: "BaseInput",
    props: {
        id: {
            type: String,
            default: "",
        },
        label: {
            type: String,
            default: "",
        },
        value: {
            type: [String, Number],
            default: "",
        },
        type: {
            type: String,
            default: "text",
        },
        classes: String,
        error: {
            type: String,
        },
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
  