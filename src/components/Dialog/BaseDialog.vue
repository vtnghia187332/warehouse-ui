<template>
    <el-dialog title="Tips" :visible="dialogVisible" :before-close="handleCloseDialog" width="30%" :append-to-body="true"
        destroy-on-close>
        <DatePicker :field="dataSpecialDay.date" />
        <TimePicker :field="dataSpecialDay.time" />
        <BaseTextArea :field="dataSpecialDay.remark" v-model="dataSpecialDay.remark.value" />
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleCloseDialog">Cancel</el-button>
            <el-button class="text-green-500" type="primary" @click="handleData">Confirm</el-button>
        </span>
    </el-dialog>
</template>

<script>
import BaseTextArea from '@/components/Inputs/BaseTextArea'
import DatePicker from '../Date/DatePicker.vue';
import TimePicker from '../Date/TimePicker.vue';
import moment from 'moment';

export default {
    components: { BaseTextArea, DatePicker, TimePicker },
    props: {
        dialogVisible: {
            type: Boolean,
        },
        rowDataSpecialDayOn: {
            type: Object,
            default: () => { }
        },
    },
    data() {
        return {
            type: '',
            defaultSpecialDay: _.cloneDeep(),
            dataSpecialDay: {
                id: { value: null },
                date: {
                    id: "date",
                    classes: "!w-full",
                    label: "Date",
                    isRequired: 'true',
                    value: "",
                    error: "",
                    pickerOptions: {
                        disabledDate(time) {
                            return time.getTime() < Date.now();
                        },
                    },
                },
                time: {
                    id: "time",
                    classes: "!w-full",
                    label: "Time",
                    isRequired: 'true',
                    value: [new Date(0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59)],
                    error: "",
                },
                remark: {
                    id: "remark",
                    classes: "!w-full",
                    type: "text",
                    label: "Remark",
                    isRequired: 'false',
                    value: "",
                    placeholder: "Enter Remark",
                    maxlength: 150,
                    error: "",
                },
            }
        }
    },
    mounted() {
        this.initData(this.rowDataSpecialDayOn)
    },
    methods: {
        closeForm() {
            this.$emit("handleAddSpecialDay", false);
        },
        handleData() {
            if (!this.dataSpecialDay.date.value) return;

            const dataReturn = {}
            dataReturn.date = this.dataSpecialDay.date.value
            dataReturn.time = this.dataSpecialDay.time.value;
            dataReturn.remark = this.dataSpecialDay.remark.value;
            dataReturn.id = this.dataSpecialDay.length;

            this.$emit("handle-data", dataReturn);
            this.handleCloseDialog();
        },
        handleCloseDialog() {
            this.dataSpecialDay = {
                id: { value: null },
                date: {
                    id: "date",
                    classes: "!w-full",
                    label: "Date",
                    isRequired: 'true',
                    value: "",
                    error: "",
                    pickerOptions: {
                        disabledDate(time) {
                            return time.getTime() < Date.now();
                        },
                    },
                },
                time: {
                    id: "time",
                    classes: "!w-full",
                    label: "Time",
                    isRequired: 'true',
                    value: [new Date(0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59)],
                    error: "",
                },
                remark: {
                    id: "remark",
                    classes: "!w-full",
                    type: "text",
                    label: "Remark",
                    isRequired: 'false',
                    value: "",
                    placeholder: "Enter Remark",
                    maxlength: 150,
                    error: "",
                },
            };
            this.$emit('update:dialogVisible', false);
        },
        initData(data) {
            Object.keys(data).map((key) => {
                this.dataSpecialDay[key].value = data[key]
            })
        }
    },
};
</script>
<style>

</style>