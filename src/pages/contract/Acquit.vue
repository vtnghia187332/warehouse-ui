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
      <label class="!font-bold block"> Số tiền cần trả thêm </label>
      <input
        class="p-2 pl-3 relative border rounded-sm w-full focus:!border-gray-700 focus:!ring-gray-700"
        :value="addCommas(field.needToPay)"
        disabled="true"
      />
      <BaseInput :field="field.moneyPaid" v-model="field.moneyPaid.value" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button
          :disabled="invalid"
          class="bg-blue-700"
          type="primary"
          @click="handleData"
          >{{ field.actionType == "CREATED" ? "Create" : "Update" }}</el-button
        >
      </span>
    </el-dialog>
  </ValidationObserver>
</template>
<script>
import BaseInput from "@/components/Inputs/BaseInput.vue";
import { ValidationObserver } from "vee-validate";
export default {
  components: { BaseInput, ValidationObserver },
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
    addCommas(nStr) {
      nStr += "";
      const x = nStr.split(".");
      let x1 = x[0];
      const x2 = x.length > 1 ? "." + x[1] : "";
      const rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
      }
      return x1 + x2;
    },
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
