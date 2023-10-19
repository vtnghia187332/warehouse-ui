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
      <BaseInput :field="field.roleName" v-model="field.roleName.value" />
      <BaseTextArea :field="field.roleDes" v-model="field.roleDes.value" />
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
import BaseTextArea from "@/components/Inputs/BaseTextArea.vue";
import { ValidationObserver } from "vee-validate";
export default {
  components: { BaseInput, ValidationObserver, BaseTextArea },
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
  methods: {
    handleClose() {
      if (this.field.value != "") {
        this.$confirm("Are you sure to close this dialog?")
          .then((_) => {
            this.$emit("update:dialogVisible", false);
          })
          .catch((_) => {});
      } else {
        this.$emit("update:dialogVisible", false);
      }
    },
    handleData() {
      this.$emit("handle-dataRole", this.field);
      if (this.field.value != "") {
        return;
      }
    },
  },
  mounted() {},
};
</script>
<style></style>
