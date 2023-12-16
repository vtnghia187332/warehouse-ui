<template>
  <ValidationObserver v-slot="{ invalid }" ref="observerAdd">
    <div class="mb-16">
      <el-row class="pt-4 pl-3 pr-3" :gutter="20">
        <el-col :span="24" class="forms grow">
          <FormCard title="Information" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-6">
                  <BaseInput :field="order.name" v-model="order.name.value" />
                </div>
                <div class="col-span-6">
                  <BaseInput :field="order.code" v-model="order.code.value" />
                </div>
                <div class="col-span-12 grid grid-cols-12 gap-x-6">
                  <div class="col-span-6">
                    <BaseSelection
                      @getValue=""
                      v-model="order.typeInvoice.value"
                      :field="order.typeInvoice"
                    />
                  </div>
                  <div class="col-span-6">
                    <BaseSelection
                      @getValue="getWarehouseDataSel"
                      v-model="order.warehouseId.value"
                      :field="order.warehouseId"
                    />
                  </div>
                </div>
              </div>
            </template>
          </FormCard>

          <FormCard
            @handleClickBtn="handleClickBtn"
            title="Materials/Products"
            isShowButton="true"
            class="mb-3"
          >
            <template v-slot:content>
              <div
                v-for="(item, index) in materials"
                :key="index"
                class="grid grid-cols-12 gap-x-3"
              >
                <div class="col-span-5">
                  <BaseSelection
                    @getValuePrd="handlePrdUnit"
                    v-model="item.product.value"
                    :field="item.product"
                  />
                </div>
                <div class="col-span-2">
                  <DatePicker :field="item.warrantyDate" />
                </div>
                <div class="col-span-2">
                  <BaseSelection
                    @getValue=""
                    v-model="item.singleUnit.value"
                    :field="item.singleUnit"
                  />
                </div>
                <div class="col-span-2">
                  <BaseInput
                    :field="item.quantity"
                    v-model="item.quantity.value"
                  />
                </div>
                <div class="col-span-1 m-auto">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    class="bg-red-400"
                    @click="handleDeleteMaterial(item, index)"
                    :disabled="materials.length == 1"
                    circle
                  ></el-button>
                </div>
              </div>
            </template>
          </FormCard>

          <FormCard
            title="Customer"
            class="mb-3"
            @handleClickBtn="handleAddCustomer"
            isShowButton="true"
          >
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12">
                  <BaseSelection
                    @getValue=""
                    v-model="order.customer.value"
                    :field="order.customer"
                  />
                </div>
              </div>
            </template>
          </FormCard>
          <FormCard title="Take Notes" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12">
                  <BaseTextArea
                    :field="order.note"
                    v-model="order.note.value"
                  />
                </div>
              </div>
            </template>
          </FormCard>
        </el-col>
        <el-col :span="6">
          <div class="footer-btn-fixed flex justify-end p-2">
            <el-button @click="handleCancelSubmit">Cancel</el-button>
            <el-button
              class="bg-blue-400"
              type="primary"
              @click="handleSubmit('CREATED')"
              >Create</el-button
            >
            <el-button
              class="bg-green-400"
              type="success"
              @click="handlePayment"
              >Payment</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <AddCustomerVue
      v-show="dialogVisible"
      :dialogVisible.sync="dialogVisible"
      @addCus="AddCus"
    />
  </ValidationObserver>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import AddCustomerVue from "./AddCustomer.vue";
import BaseInput from "./../../components/Inputs/BaseInput.vue";
import axios from "axios";
import _ from "lodash";
import BaseTextArea from "./../../components/Inputs/BaseTextArea.vue";
import FormCard from "./../../components/Cards/FormCard.vue";
import BaseSelection from "../../components/Inputs/BaseSelection.vue";
import { ValidationObserver } from "vee-validate";
import DatePicker from "../../components/Date/DatePicker.vue";
import moment from "moment";

export default {
  components: {
    BaseInput,
    FormCard,
    BaseTextArea,
    BaseSelection,
    ValidationObserver,
    AddCustomerVue,
    DatePicker,
  },
  computed: {
    ...mapGetters(["user", "warehouse", "warehouseChain"]),
  },
  data() {
    return {
      dialogVisible: false,
      id: null,
      invoiceId: null,
      defaultMaterial: {
        product: {
          id: "product",
          baseId: 0,
          name: "product",
          rules: "required",
          classes: "w-full",
          isRequired: "true",
          placeholder: "Select Product",
          error: "",
          value: "",
          disabled: "notDisabled",
          label: "Material/Product",
          options: [],
        },
        warrantyDate: {
          id: "warrantyDate",
          baseId: 0,
          name: "warrantyDate",
          rules: "",
          classes: "w-full",
          isRequired: "",
          placeholder: "Select warrantyDate",
          error: "",
          value: "",
          disabled: "notDisabled",
          label: "Warranty Date",
          pickerOptions: {
            disabledDate(time) {
              return time.getTime() < Date.now();
            },
          },
        },
        singleUnit: {
          id: "singleUnit",
          baseId: 0,
          name: "singleUnit",
          rules: "required",
          classes: "w-full",
          isRequired: "true",
          placeholder: "Select Single Unit",
          error: "",
          value: "",
          disabled: "disabled",
          label: "Single Unit",
          options: [],
        },
        quantity: {
          id: "quantity",
          name: "Quantity",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Quantity",
          isRequired: "true",
          value: "",
          placeholder: "Enter Quantity...",
          error: "",
        },
      },
      materials: [
        {
          product: {
            id: "product",
            baseId: 0,
            name: "product",
            rules: "required",
            classes: "w-full",
            isRequired: "true",
            placeholder: "Select Product",
            error: "",
            value: "",
            unitVal: "",
            disabled: "notDisabled",
            label: "Material/Product",
            options: [],
          },
          warrantyDate: {
            id: "warrantyDate",
            baseId: 0,
            name: "warrantyDate",
            rules: "",
            classes: "w-full",
            isRequired: "",
            placeholder: "Select warrantyDate",
            error: "",
            value: "",
            disabled: "notDisabled",
            label: "Warranty Date",
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() < Date.now();
              },
            },
          },
          singleUnit: {
            id: "singleUnit",
            baseId: 0,
            name: "singleUnit",
            rules: "required",
            classes: "w-full",
            isRequired: "true",
            placeholder: "Select Single Unit",
            error: "",
            value: "",
            disabled: "disabled",
            label: "Single Unit",
            options: [],
          },
          quantity: {
            id: "quantity",
            name: "Quantity",
            rules: "required",
            classes: "w-full",
            type: "text",
            label: "Quantity",
            isRequired: "true",
            value: "",
            placeholder: "Enter Quantity...",
            error: "",
          },
        },
      ],
      order: {
        name: {
          id: "name",
          name: "Name",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Name",
          isRequired: "true",
          value: "",
          placeholder: "Enter Name...",
          maxlength: 150,
          error: "",
        },
        code: {
          id: "code",
          name: "Code",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Code",
          isRequired: "true",
          value: "",
          placeholder: "Enter Code...",
          maxlength: 150,
          error: "",
        },
        typeInvoice: {
          id: "typeInvoice",
          baseId: 0,
          name: "typeInvoice",
          rules: "required",
          classes: "w-full",
          isRequired: "true",
          placeholder: "Select Type of Invoice",
          error: "",
          value: "",
          disabled: "notDisabled",
          label: "Type of Invoice",
          options: [
            {
              value: 1,
              label: "Receipt",
            },
            {
              value: 2,
              label: "Export",
            },
          ],
        },
        warehouseId: {
          id: "warehouseId",
          baseId: 0,
          name: "warehouseId",
          rules: "",
          classes: "w-full",
          isRequired: "",
          placeholder: "Select Warehouse",
          error: "",
          value: "",
          disabled: "notDisabled",
          label: "Warehouse",
          options: [],
        },
        customer: {
          id: "customer",
          baseId: 0,
          name: "customer",
          rules: "required",
          classes: "w-full",
          isRequired: "true",
          placeholder: "Select Customer / Phone Number",
          error: "",
          value: "",
          disabled: "notDisabled",
          label: "Customer",
          options: [],
        },
        note: {
          id: "note",
          name: "note",
          rules: "",
          classes: "w-full col-span-6 !h-[64px]",
          type: "text",
          label: "Note",
          isRequired: "false",
          value: "",
          placeholder: "Enter Note...",
          maxlength: 250,
          error: "",
        },
      },
    };
  },
  methods: {
    getWarehouseDataSel() {
      this.handleGetProducts();
    },
    AddCus() {
      this.handleGetCustomers();
    },
    handleAddCustomer(data) {
      this.dialogVisible = true;
    },
    handlePrdUnit(data) {
      const unitVal =
        data.options.find((opt) => opt.value == data.value).singleUnitId || "";
      this.materials.forEach((item) => {
        if (item.product.value === data.value) {
          item.singleUnit.value =
            this.defaultMaterial.singleUnit.options.find(
              (opt) => opt.value == unitVal
            ).label || "";
        }
      });
    },
    async handlePayment() {
      if (this.$route.params.data.id == null) {
        await this.handleSubmit("PAYMENT");
      } else {
        let data = {
          id: this.$route.params.data.id,
          type: "EDIT",
        };
        this.$router.push({
          name: "payment",
          params: { data },
        });
      }
    },
    getMaterials() {
      return this.materials.map((item) => {
        const materialItem = {};
        Object.keys(this.defaultMaterial).map((key) => {
          materialItem[key] = item[key].value;
          if (item["warrantyDate"].value) {
            materialItem.warrantyDate = moment(
              item["warrantyDate"].value
            ).format("YYYY-MM-DD HH:mm:ss");
          }
          materialItem.productId = item["product"].value;

          this.defaultMaterial.product.options.forEach((option) => {
            if (
              option.value === item["product"].value ||
              option.label === item["product"].value
            ) {
              materialItem.productId = option.value;
            }
          });
          this.defaultMaterial.singleUnit.options.forEach((option) => {
            if (
              option.value === item["singleUnit"].value ||
              option.label === item["singleUnit"].value
            ) {
              materialItem.singleUnit = option.value;
            }
          });

          delete materialItem["product"];
        });
        return materialItem;
      });
    },
    async handleSubmit(type) {
      let warehouseIdLocal = null;
      if (this.warehouse?.warehouseId) {
        warehouseIdLocal = this.warehouse.warehouseId;
      } else {
        warehouseIdLocal =
          this.order.warehouseId.options.find(
            (opt) =>
              opt.label == this.order.warehouseId.value ||
              opt.value == this.order.warehouseId.value
          ).value || 0;
      }
      const order = {
        warehouseId: warehouseIdLocal,
        id: this.id,
        invoiceId: this.invoiceId,
        customer: {
          id: this.order.customer.value,
        },
        productInvoices: this.getMaterials(),
        code: this.order.code.value,
        name: this.order.name.value,
        typeInvoice: this.order.typeInvoice.value,
        note: this.order.note.value,
      };
      if (this.$route.params.data.type === "EDIT") {
        await axios({
          method: "put",
          url: "http://localhost:9090/api/v1/export-receipt",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          data: order,
        })
          .then((response) => {
            if (response.status === 200) {
              this.invoiceId = response.data.items;
              if (type === "CREATED") {
                this.$router.push({ path: "/export-receipt" });
              } else {
                let data = {
                  id: this.invoiceId,
                  type: "EDIT",
                };
                this.$router.push({
                  name: "payment",
                  params: { data },
                });
              }
              this.$message({
                showClose: true,
                message: "Updated successfully",
                type: "success",
              });
            }
          })
          .catch((error) => {
            if (error.response.data.message) {
              this.$message({
                showClose: true,
                message: error.response.data.message,
                type: "error",
              });
            } else if (error.response.data.items) {
              this.$message({
                showClose: true,
                message: error.response.data.items,
                type: "error",
              });
              this.$refs.observerAdd.setErrors(error.response.data.items);
            }
          });
      } else {
        await axios({
          method: "post",
          url: "http://localhost:9090/api/v1/export-receipt",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          data: order,
        })
          .then((response) => {
            if (response.status === 200) {
              this.invoiceId = response.data.items;
              if (type === "CREATED") {
                this.$router.push({ path: "/export-receipt" });
              }
              this.$message({
                showClose: true,
                message: "Created successfully",
                type: "success",
              });
            }
          })
          .catch((error) => {
            if (error.response.data.message) {
              this.$message({
                showClose: true,
                message: error.response.data.message,
                type: "error",
              });
            } else if (error.response.data.items) {
              this.$message({
                showClose: true,
                message: error.response.data.items,
                type: "error",
              });
              this.$refs.observerAdd.setErrors(error.response.data.items);
            }
          });
      }
    },
    async getWarehouseSel() {
      await axios
        .get("http://localhost:9090/api/v1/warehouse/data-list", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { warehouseChainId: this.warehouseChain.warehouseChainId },
        })
        .then((res) => {
          if (res.status === 200) {
            this.order.warehouseId.options = res.data.items;
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
    handleCancelSubmit() {
      this.$confirm("Are you sure to cancel")
        .then((_) => {
          this.$router.push({ path: "/export-receipt" });
        })
        .catch((_) => {});
    },
    handleDeleteMaterial(item, index) {
      if (this.materials.length > 1) {
        if (index > -1) {
          this.materials.splice(index, 1);
        }
      }
    },
    handleClickBtn(flag) {
      if (flag) {
        this.materials.push(_.cloneDeep(this.defaultMaterial));
      }
    },
    async handleGetSingleUnit() {
      await axios
        .get("http://localhost:9090/api/v1/single-unit/all", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { warehouseChainId: this.warehouseChain.warehouseChainId },
        })
        .then((res) => {
          if (res.status === 200) {
            this.defaultMaterial.singleUnit.options = res.data.items;
            this.materials.forEach((item) => {
              item.singleUnit.options = res.data.items;
            });
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
    async handleGetProducts() {
      let warehouseIdLocal = null;
      if (this.warehouse?.warehouseId) {
        warehouseIdLocal = this.warehouse.warehouseId;
      } else {
        warehouseIdLocal =
          this.order.warehouseId.options.find(
            (opt) =>
              opt.label == this.order.warehouseId.value ||
              opt.value == this.order.warehouseId.value
          ).value || 0;
      }
      let params = {
        warehouseId: warehouseIdLocal,
      };
      await axios
        .get("http://localhost:9090/api/v1/product/data-list", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params,
        })
        .then((res) => {
          if (res.status === 200) {
            this.defaultMaterial.product.options = res.data.items;
            this.materials.forEach((item) => {
              item.product.options = res.data.items;
            });
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
    async handleGetCustomers() {
      await axios
        .get("http://localhost:9090/api/v1/customer/data-list", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { warehouseChainId: this.warehouseChain.warehouseChainId },
        })
        .then((res) => {
          if (res.status === 200) {
            this.order.customer.options = res.data.items;
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
    initMaterialsList(data) {
      const materialAfterBinding = [];
      data.forEach((x, index) => {
        let materialTemp = _.cloneDeep(this.defaultMaterial);
        Object.keys(materialTemp).forEach((key) => {
          if (materialTemp[key]) {
            materialTemp[key].value = x[key];
          }
        });
        materialAfterBinding.push(materialTemp);
      });
      this.materials = materialAfterBinding.map((x) => x);
    },
    async getDetailOrder() {
      // this.loadingPageDetail = true;
      if (this.$route.params.data.id != null) {
        await axios
          .get(
            `http://localhost:9090/api/v1/invoice/detail/${this.$route.params.data.id}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              Object.keys(this.order).forEach((key) => {
                this.order[key].value = res.data.items[key];
                this.order["customer"].value = res.data.items["customer"].id;
              });
              this.initMaterialsList(res.data.items["productInvoices"]);
              this.id = res.data.items.id;
              this.invoiceId = res.data.items.invoiceId;
              if (
                this.order.warehouseId?.options.length > 0 &&
                res.data.items?.warehouseDetailRes !== null
              ) {
                this.order.warehouseId.value =
                  this.order.warehouseId.options?.find(
                    (opt) =>
                      opt.label ==
                        res.data.items.warehouseDetailRes?.warehouseId ||
                      opt.value ==
                        res.data.items.warehouseDetailRes?.warehouseId
                  ).value || "";
              }
            }
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error.response.data.items,
              type: "error",
            });
          })
          .finally();
        if (this.$route.params.data.type === "DUPLICATED") {
        }
      } else {
      }
    },
  },
  async mounted() {
    if (!this.$route.params.data) {
      this.$router.push({ path: "/export-receipt" });
      return;
    }
    if (!this.user?.roles.includes("ADMIN")) {
      this.order.warehouseId.value = this.warehouse.name;
      this.order.warehouseId.disabled = "disabled";
      await this.handleGetProducts();
    }
    await this.handleGetSingleUnit();
    await this.getWarehouseSel();
    await this.handleGetCustomers();
    await this.getDetailOrder();
  },
};
</script>

<style scoped>
.footer-btn-fixed {
  z-index: 99 !important;
  position: fixed;

  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
  background-color: white !important;
  margin-top: 12px;
}

.no-display {
  display: none;
}
.radius-shadow_add {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}

.detail .el-col.el-col-5 {
  padding: 0 !important;
}
</style>
