<template>
  <ValidationObserver v-slot="{ invalid }" ref="observer">
    <el-dialog
      title="Special Day"
      :visible="dialogVisible"
      :before-close="handleCloseDialog"
      width="30%"
      :append-to-body="true"
      destroy-on-close
    >
      <DatePicker :field="dataSpecialDay.specialDay" />
      <TimePicker :field="dataSpecialDay.time" />
      <BaseTextArea
        :field="dataSpecialDay.remark"
        v-model="dataSpecialDay.remark.value"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseDialog">Thoát</el-button>
        <el-button
          :disabled="invalid"
          type="primary"
          class="bg-blue-300"
          @click="handleData"
          >Xác nhận</el-button
        >
      </span>
    </el-dialog>
  </ValidationObserver>
</template>

<script>
import BaseTextArea from "@/components/Inputs/BaseTextArea";
import DatePicker from "../Date/DatePicker.vue";
import { ValidationObserver } from "vee-validate";

import TimePicker from "../Date/TimePicker.vue";
import moment from "moment";
import _ from "lodash";
export default {
  components: { BaseTextArea, DatePicker, TimePicker, ValidationObserver },
  props: {
    dialogVisible: {
      type: Boolean,
    },

    rowDataSpecialDay: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      type: "",
      typeSpecialTime: "",
      defaultSpecialDay: {
        id: { value: null },
        specialDay: {
          id: "SpecialDay",
          name: "Date",
          classes: "!w-full",
          label: "Ngày",
          isRequired: "true",
          rules: "required",
          value: "",
          error: "",
          pickerOptions: {
            disabledDate(time) {
              return time.getTime() < Date.now();
            },
          },
        },
        time: {
          id: "Time",
          classes: "!w-full",
          label: "Thời gian",
          isRequired: "true",
          rules: "required",
          value: [new Date(0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59)],
          error: "",
        },
        remark: {
          id: "Remark",
          classes: "!w-full",
          type: "text",
          label: "Ghi chú",
          rules: "required",
          isRequired: "true",
          value: "",
          placeholder: "Nhập ghi chú...",
          maxlength: 150,
          error: "",
        },
        dayType: {
          id: "type",
          value: null,
        },
      },
      dataSpecialDay: {
        id: { value: null },
        specialDay: {
          id: "specialDay",
          name: "Date",
          classes: "!w-full",
          label: "Ngày",
          isRequired: "true",
          rules: "required",
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
          label: "Thời gian",
          isRequired: "true",
          rules: "required",
          value: [new Date(0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59)],
          error: "",
        },
        remark: {
          id: "remark",
          classes: "!w-full",
          type: "text",
          label: "Ghi chú",
          isRequired: "true",
          value: "",
          rules: "required",
          placeholder: "Nhập vào ghi chú",
          maxlength: 150,
          error: "",
        },
        dayType: {
          id: "type",
          value: null,
        },
      },
    };
  },
  mounted() {
    this.initData(this.rowDataSpecialDay);
    this.typeSpecialTime = this.typeSpecialTime;
  },
  methods: {
    closeForm() {
      this.$emit("handleAddSpecialDay", false);
    },
    handleData() {
      if (!this.dataSpecialDay.specialDay.value) return;
      const dataReturn = {};
      dataReturn.specialDay = this.dataSpecialDay.specialDay.value;
      dataReturn.time = this.dataSpecialDay.time.value;
      dataReturn.remark = this.dataSpecialDay.remark.value;
      dataReturn.id = this.dataSpecialDay.id.value;
      dataReturn.dayType = this.typeSpecialTime;
      this.$emit("handle-data", dataReturn);
      this.handleCloseDialog();
    },
    handleCloseDialog() {
      this.dataSpecialDay = {
        id: { value: null },
        specialDay: {
          id: "specialDay",
          classes: "!w-full",
          label: "Ngày",
          isRequired: "true",
          rules: "required",
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
          label: "Thời gian",
          isRequired: "true",
          rules: "required",
          value: [new Date(0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59)],
          error: "",
        },
        remark: {
          id: "remark",
          classes: "!w-full",
          type: "text",
          label: "Ghi chú",
          isRequired: "true",
          rules: "required",
          value: "",
          placeholder: "Nhập ghi chú...",
          maxlength: 150,
          error: "",
        },
        dayType: {
          id: "type",
          value: null,
        },
      };
      this.$emit("update:dialogVisible", false);
    },
    initData(data) {
      delete data["specialStartDay"];
      delete data["specialCloseDay"];
      delete data["weekDay"];
      delete data["index"];
      Object.keys(data).map((key) => {
        this.dataSpecialDay[key].value = data[key];
      });
    },
  },
};
</script>
<style></style>
