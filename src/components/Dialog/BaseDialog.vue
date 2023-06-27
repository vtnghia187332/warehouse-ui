<template>
    <el-dialog title="Tips" :visible="dialogVisible" :before-close="() => $emit('update:dialogVisible', false)" width="30%"
        :append-to-body="true" destroy-on-close>
        <DatePicker :field="dataSpecialDay.date" />
        <TimePicker :field="dataSpecialDay.time" />
        <BaseTextArea :field="dataSpecialDay.remark" v-model="dataSpecialDay.remark.value" />
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
        editMode: {
            type: Boolean,
        },
    },
    data() {
        return {
            type: '',
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

    methods: {
        closeForm() {
            this.$emit("handleAddSpecialDay", false);
        },
        handleData() {
            if (!this.dataSpecialDay.date.value) return;

            const dataReturn = {}
            dataReturn.date = moment(this.dataSpecialDay.date.value, 'DD/MM/YYYY').format('DD/MM/YYYY');
            dataReturn.time = moment(this.dataSpecialDay.time.value[0], 'HH:mm').format('HH:mm') + ' - ' + moment(this.dataSpecialDay.time.value[1], 'HH:mm').format('HH:mm');
            dataReturn.remark = this.dataSpecialDay.remark.value;
            dataReturn.id = this.dataSpecialDay.id.value

            this.$emit("handle-data", dataReturn);
            this.$emit('update:dialogVisible', false);
        },
        initData(data) {
            Object.keys(data).map((key) => {
                this.dataSpecialDay[key].value = data[key]
            })
            this.dataSpecialDay.date.value = moment(data.date, "DD/MM/YYYY");
        }
    },
};
</script>