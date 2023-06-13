<template>
    <div>
        <label v-if="field.label" :for="field.id" class="!font-bold block">
            <span v-if="field.isRequired == true" class='text-danger'>*</span>{{ field.label }}
        </label>
        <el-select v-model="field.value" filterable placeholder="Select">
            <el-option v-for="item in field.options" :key="item.value" :label="item.label" :value="item.value"
                @click="updateInput">
            </el-option>
        </el-select>
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

<style></style>
