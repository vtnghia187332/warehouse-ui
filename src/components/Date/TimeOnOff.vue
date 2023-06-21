<template>
    <div class="mb-4 items-center grid grid-cols-4 gap-4">
        <el-checkbox class="" v-model="field.checked">{{ field.day }}</el-checkbox>
        <el-time-picker ref="timePicker" is-range format="HH:mm" v-model="field.time" range-separator="To"
            start-placeholder="Start time" end-placeholder="End time" :disabled="field.checked == false">
        </el-time-picker>
    </div>
</template>
  
<script>
export default {
    name: "TimeOnOff",
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
        initData(dataStart, dataEnd) {
            console.log(dataStart, dataEnd, "data");
            this.$refs.timePicker.userInput = [dataStart, dataEnd];
        }
    },
};
</script>
  