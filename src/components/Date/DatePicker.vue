
<template>
    <div class="mb-2">
        <label v-if="field.label" :for="field.id" class="!font-bold block">
            <span v-if="field.isRequired == true" class='text-danger'>*</span>{{ field.label }}
        </label>
        <el-date-picker class="!w-full mb-2"  format="dd/MM/yyyy" v-model="field.value" type="date" placeholder="Pick a day"
            :picker-options="field.pickerOptions">
        </el-date-picker>
    </div>
</template>
  
<script>
export default {
    name: "DatePicker",
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
  