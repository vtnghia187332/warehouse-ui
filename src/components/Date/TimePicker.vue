
<template>
    <div class="mb-2">
        <label v-if="field.label" :for="field.id" class="!font-bold block">
            <span v-if="field.isRequired == true" class='text-danger'>*</span>{{ field.label }}
        </label>
        <el-time-picker class="!w-full" is-range format="HH:mm" v-model="field.value" range-separator="To"
            start-placeholder="Start time" end-placeholder="End time">
        </el-time-picker>
    </div>
</template>
  
<script>
export default {
    name: "TimePicker",
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
    },
};
</script>
  