<template>
  <ValidationObserver v-slot="{ invalid }" ref="observer">
    <el-dialog
      :title="field.title"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
      :append-to-body="true"
      destroy-on-close
    >
      <BaseTextArea
        :field="field.reasonCancel"
        v-model="field.reasonCancel.value"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">Huỷ</el-button>
        <el-button
          :disabled="invalid"
          class="bg-blue-700"
          type="primary"
          @click="handleData"
          >{{
            field.actionType == "CREATED" ? "Thêm mới" : "Cập nhật"
          }}</el-button
        >
      </span>
    </el-dialog>
  </ValidationObserver>
</template>
<script>
import BaseTextArea from "@/components/Inputs/BaseTextArea.vue";
import { ValidationObserver } from "vee-validate";
export default {
  components: { BaseTextArea, ValidationObserver },
  props: {
    field: {
      type: Object,
      default: {},
    },
    dialogVisible: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  watch: {},
  methods: {
    handleClose() {
      if (this.field.value != "") {
        this.$confirm("Bạn có muốn tắt cửa sổ không?")
          .then((_) => {
            this.$emit("update:dialogVisible", false);
          })
          .catch((_) => {});
      } else {
        this.$emit("update:dialogVisible", false);
      }
    },
    handleData() {
      this.$emit("handle-dataAddr", this.field);
      if (this.field.value != "") {
        return;
      }
    },
  },
};
</script>

<style></style>
