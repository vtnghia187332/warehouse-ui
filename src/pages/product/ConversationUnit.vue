<template>
  <ValidationObserver v-slot="{ invalid }" ref="observer">
    <el-dialog
      title="Quy đổi đơn vị"
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
          <label class="!font-bold block"> Description </label>
          <input
            :value="description"
            class="p-2 pl-3 relative border rounded-sm w-full focus:!border-gray-700 focus:!ring-gray-700"
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
import { mapGetters, mapMutations, mapActions } from "vuex";
import { ValidationObserver } from "vee-validate";
import BaseInput from "../../components/Inputs/BaseInput.vue";
import BaseSelection from "../../components/Inputs/BaseSelection.vue";
import axios from "axios";
export default {
  props: {
    dialogVisibleUnit: {
      type: Boolean,
    },
  },
  components: {
    ValidationObserver,
    BaseInput,
    BaseSelection,
  },
  data() {
    return {
      unitsServer: [],
      conversationUnit: {
        id: { value: null },
        unitOriginId: {
          id: "Single Unit",
          name: "Single Unit",
          rules: "",
          classes: "w-full col-span-6",
          type: "text",
          label: "Đơn vị",
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
          placeholder: "Chọn đơn vị quy đổi",
          error: "",
          value: "",
          valueTxt: "",
          disabled: "notDisabled",
          label: "Đơn vị quy đổi",
          options: [],
        },
        unitStockDestination: {
          id: "Conservation Rate",
          name: "Conservation Rate",
          rules: "",
          classes: "w-full col-span-6",
          type: "text",
          label: "Tỉ số",
          isRequired: "false",
          value: "",
          placeholder: "Nhập vào tỉ số...",
          error: "",
        },
        calUnit: {
          id: "Calculation",
          name: "Calculation",
          rules: "required",
          classes: "w-full",
          isRequired: "true",
          placeholder: "Chọn phép tính",
          error: "",
          value: "",
          valueTxt: "",
          disabled: "notDisabled",
          label: "Phép tính",
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
          label: "Mô tả",
          isRequired: "false",
          value: this.description,
          placeholder: "",
          error: "",
          disabled: true,
        },
      },
    };
  },
  computed: {
    ...mapGetters(["user", "warehouse", "warehouseChain"]),
    description: function () {
      if (
        !this.conversationUnit.unitDestinationId.value ||
        !this.conversationUnit.unitStockDestination.value ||
        !this.conversationUnit.calUnit.value ||
        !this.conversationUnit.unitOriginId.value
      ) {
        return "";
      } else {
        let unitCal =
          this.conversationUnit.calUnit.options.find(
            (opt) =>
              opt.value == this.conversationUnit.calUnit.value ||
              opt.label == this.conversationUnit.calUnit.value
          ).label || "";

        let unitDes =
          this.unitsServer.find(
            (opt) =>
              opt.value == this.conversationUnit.unitDestinationId.value ||
              opt.label == this.conversationUnit.unitDestinationId.value
          ).label || "";
        let unitOri =
          this.unitsServer.find(
            (opt) =>
              opt.value == this.conversationUnit.unitOriginId.value ||
              opt.label == this.conversationUnit.unitOriginId.value
          ).label || "";
        return (
          "1 " +
          unitDes +
          " = " +
          this.conversationUnit.unitStockDestination.value +
          " " +
          unitCal +
          " " +
          unitOri
        );
      }
    },
  },
  methods: {
    handleData() {
      const dataReturn = {};
      dataReturn.unitOriginId = this.conversationUnit.unitOriginId.value;
      dataReturn.unitDestinationId =
        this.conversationUnit.unitDestinationId.value;
      dataReturn.unitStockDestination =
        this.conversationUnit.unitStockDestination.value;
      dataReturn.calUnit = this.conversationUnit.calUnit.value;
      dataReturn.id = this.conversationUnit.id.value;
      this.$emit("handle-data", dataReturn);
      this.handleCloseDialog();
    },
    getCalUnit(item) {},
    getConversationDes(item) {},
    handleCloseDialog() {
      this.conversationUnit.unitDestinationId.value = "";
      this.conversationUnit.unitStockDestination.value = "";
      this.conversationUnit.calUnit.value = "";
      this.$emit("update:dialogVisibleUnit", false);
    },
    initData(data) {
      this.conversationUnit.id.value = data.id.value;
    },
    getValueSingleUnit() {
      axios
        .get("http://localhost:9090/api/v1/single-unit/all", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { warehouseChainId: this.warehouseChain.warehouseChainId },
        })
        .then((res) => {
          if (res.status === 200) {
            this.unitsServer = res.data.items;
          }
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: error.response.data.items,
            type: "error",
          });
        });
    },
  },
  created() {},
  mounted() {
    this.getValueSingleUnit();
  },
};
</script>
<style></style>
