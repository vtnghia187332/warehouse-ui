<template>
  <ValidationObserver v-slot="{ invalid }" ref="observer">
    <el-dialog
      title="Conversation Unit"
      :visible="dialogVisibleUnit"
      :before-close="handleCloseDialog"
      width="80%"
      :append-to-body="true"
      destroy-on-close
    >
      <div class="grid grid-cols-10 gap-x-6">
        <div class="col-span-2">
          <BaseInput
            :field="conversationUnit.unitOriginId"
            v-model="conversationUnit.unitOriginId.value"
          />
        </div>
        <div class="col-span-2">
          <BaseSelection
            @getValue="getConversationDes"
            v-model="conversationUnit.unitDestinationId.value"
            :field="conversationUnit.unitDestinationId"
          />
        </div>
        <div class="col-span-2">
          <BaseInput
            :field="conversationUnit.unitStockDestination"
            v-model="conversationUnit.unitStockDestination.value"
          />
        </div>
        <div class="col-span-2">
          <BaseSelection
            @getValue="getCalUnit"
            v-model="conversationUnit.calUnit.value"
            :field="conversationUnit.calUnit"
          />
        </div>
        <div class="col-span-2">
          <BaseInput
            :field="conversationUnit.description"
            v-model="conversationUnit.description.value"
          />
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseDialog">Cancel</el-button>
        <el-button
          :disabled="invalid"
          type="primary"
          class="bg-blue-300"
          @click="handleData"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import BaseInput from "../../components/Inputs/BaseInput.vue";
import axios from "axios";
import BaseSelection from "../../components/Inputs/BaseSelection.vue";
export default {
  props: {
    dialogVisibleUnit: {
      type: Boolean,
    },
    // field: {
    //   type: Object,
    //   default: {},
    // },
  },
  components: {
    ValidationObserver,
    BaseInput,
    BaseSelection,
  },
  data() {
    return {
      conversationUnit: {
        unitOriginId: {
          id: "Single Unit",
          name: "Single Unit",
          rules: "",
          classes: "w-full col-span-6",
          type: "text",
          label: "Single Unit",
          isRequired: "false",
          value: "",
          valueTxt: "",
          placeholder: "",
          error: "",
          disabled: true,
        },
        unitDestinationId: {
          id: "Conservation Unit",
          name: "Conservation Unit",
          rules: "required",
          classes: "w-full",
          isRequired: "true",
          placeholder: "Select Single Unit",
          error: "",
          value: "",
          valueTxt: "",
          disabled: "notDisabled",
          label: "Conservation Unit",
          options: [],
        },
        unitStockDestination: {
          id: "Conservation Rate",
          name: "Conservation Rate",
          rules: "",
          classes: "w-full col-span-6",
          type: "text",
          label: "Conservation Rate",
          isRequired: "false",
          value: "",
          placeholder: "Enter Conservation Rate...",
          error: "",
        },
        calUnit: {
          id: "Calculation",
          name: "Calculation",
          rules: "required",
          classes: "w-full",
          isRequired: "true",
          placeholder: "Select Calculation",
          error: "",
          value: "",
          valueTxt: "",
          disabled: "notDisabled",
          label: "Calculation",
          options: [
            {
              label: "+",
              value: 0,
            },
            {
              label: "-",
              value: 1,
            },
            {
              label: "*",
              value: 2,
            },
            {
              label: "/",
              value: 3,
            },
          ],
        },
        description: {
          id: "Description",
          name: "Description",
          rules: "",
          classes: "w-full col-span-6",
          type: "text",
          label: "Description",
          isRequired: "false",
          value: "",
          placeholder: "",
          error: "",
          disabled: true,
        },
      },
    };
  },
  methods: {
    handleData() {
      const dataReturn = {};
      console.log(
        this.conversationUnit.unitDestinationId,
        "this.conversationUnit.unitDestinationId"
      );
      dataReturn.unitOriginId = this.conversationUnit.unitOriginId.value;
      dataReturn.unitDestinationId =
        this.conversationUnit.unitDestinationId.value;
      dataReturn.unitStockDestination =
        this.conversationUnit.unitStockDestination.value;
      dataReturn.calUnit = this.conversationUnit.calUnit.value;
      this.$emit("handle-data", dataReturn);
      this.handleCloseDialog();
    },
    getCalUnit(item) {},
    getConversationDes(item) {
      // console.log(item);
    },
    handleCloseDialog() {
      this.$emit("update:dialogVisibleUnit", false);
    },
    getValueSingleUnit() {
      axios
        .get("http://localhost:9090/api/v1/single-unit/all", {
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then((res) => {
          if (res.status === 200) {
            this.conversationUnit.unitDestinationId.options = res.data.items;
          }
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: error,
            type: "error",
          });
        });
    },
    initData(data) {
      console.log(data);
    },
  },
  mounted() {
    this.getValueSingleUnit();
  },
};
</script>
<style></style>
