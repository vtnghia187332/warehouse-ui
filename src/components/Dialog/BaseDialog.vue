<template>
    <el-dialog title="Tips" :visible="dialogVisible" :before-close="() => $emit('update:dialogVisible', false)" width="30%"
        :append-to-body="true">
        <DatePicker :field="date" />
        <TimePicker :field="time" />
        <BaseTextArea :field="remark" v-model="remark.value" />
        <span slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:dialogVisible', false)">Cancel</el-button>
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
    },
    data() {
        return {

            date: {
                id: "date",
                classes: "!w-[534px]",
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
                classes: "!w-[534px]",
                label: "Time",
                isRequired: 'true',
                value: [new Date(0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59)],
                error: "",
            },
            remark: {
                id: "remark",
                classes: "!w-[534px]",
                type: "text",
                label: "Remark",
                isRequired: 'false',
                value: "",
                placeholder: "Enter Remark",
                maxlength: 150,
                error: "",
            },
            dataSpecialDay: {
                date: '',
                time: '',
                remark: '',
            }
        }
    },

    methods: {
        closeForm() {
            this.$emit("handleAddSpecialDay", false);
        },
        handleData() {
            this.dataSpecialDay.date = moment(this.date.value, 'DD/MM/YYYY').format('DD/MM/YYYY');
            this.dataSpecialDay.time = moment(this.time.value[0], 'HH:mm').format('HH:mm') + ' - ' + moment(this.time.value[1], 'HH:mm').format('HH:mm');
            this.dataSpecialDay.remark = this.remark.value;
            this.$emit("handle-data", this.dataSpecialDay);
            this.$emit('update:dialogVisible', false);
            this.dataSpecialDay = {};
            this.date = {
                id: "date",
                classes: "!w-[534px]",
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
                this.time = {
                    id: "time",
                    classes: "!w-[534px]",
                    label: "Time",
                    isRequired: 'true',
                    value: [new Date(0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59)],
                    error: "",
                };
            this.remark = {
                id: "remark",
                classes: "!w-[534px]",
                type: "text",
                label: "Remark",
                isRequired: 'false',
                value: "",
                placeholder: "Enter Remark",
                maxlength: 150,
                error: "",
            };

        }
    },
};
</script>