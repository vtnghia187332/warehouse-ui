<template>
    <div>
        <label class="!font-bold block" :for="field.id">
            <span class='text-danger'>*</span>{{ field.label }}
        </label>
        <el-select v-model="field.value" filterable :placeholder=field.placeholder :id="field.id"
            :class="field.error ? `${field.classes} border-error rounded` : field.classes" clearable>
            <el-option v-for="item in field.options" :key="item.value" :label="item.label" :value="item.value"
                @click="updateInput">
            </el-option>
        </el-select>
        <div class="mt-1 mb-1 text-red-500">{{ field.error }}</div>
    </div>
</template>
<script>
export default {
    name: "BaseSelection",
    data() {
        return {
        }
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
}
</script>

<style>

</style>
