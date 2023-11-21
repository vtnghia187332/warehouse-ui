<template>
  <div>
    <loading-page v-show="loadingPageDetail"></loading-page>
    <div v-show="!loadingPageDetail">
      <div class="font-semibold text-2xl pl-3">
        {{ typeInvoice == 1 ? "Receipt Order" : "Export Order" }}
      </div>
      <el-row class="pt-4 pl-3 pr-3 !ml-1 !mr-1" :gutter="24">
        <el-col :span="12">
          <FormCard title="Order's Information" class="mb-3">
            <template v-slot:content>
              <div class="custom-css">
                <el-table
                  :data="materials"
                  style="width: 100%"
                  @row-dblclick=""
                  @selection-change=""
                  height="497"
                >
                  <el-table-column prop="name" label="Product" width="350">
                  </el-table-column>
                  <el-table-column prop="quantity" label="Quantity" width="80">
                  </el-table-column>
                  <el-table-column prop="singleUnit" label="Unit" width="100">
                  </el-table-column>
                  <el-table-column
                    prop="exportPrice"
                    label="Price($)"
                    width="150"
                  >
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </FormCard>
          <el-row :gutter="20">
            <el-col :span="12"
              ><div class="">
                <div class="bg-white radius-shadow_add p-3 !h-[165px]">
                  <div class="!w-full !mb-1">
                    <BaseInput
                      :field="order.discount"
                      v-model="order.discount.value"
                    />
                  </div>
                  <div class="!w-full !mb-1 gap-x-2 flex">
                    <BaseInput
                      :field="order.shippingFee"
                      v-model="order.shippingFee.value"
                    />
                    <BaseInput
                      :field="order.taxPercentage"
                      v-model="order.taxPercentage.value"
                    />
                  </div>
                </div></div
            ></el-col>
            <el-col :span="12">
              <div class="bg-white radius-shadow_add p-3 flex justify-end">
                <div class="!w-96 !mb-1">
                  <div class="flex justify-between font-bold text-base">
                    <div>Subtotal:</div>
                    <div class="">${{ subTotal }}</div>
                  </div>
                  <div class="flex justify-between font-bold text-base">
                    <div>Shipping:</div>
                    <div class="">${{ this.order.shippingFee.value }}</div>
                  </div>
                  <div class="flex justify-between font-bold text-base">
                    <div>Discount:</div>
                    <div class="">{{ this.order.discount.value }}%</div>
                  </div>
                  <div class="flex justify-between font-bold text-base">
                    <div>Tax:</div>
                    <div class="">{{ this.order.taxPercentage.value }}%</div>
                  </div>

                  <div class="flex justify-between font-bold text-2xl">
                    <div>Total:</div>
                    <div class="">
                      ${{
                        calMoneyPaid(
                          subTotal,
                          order.discount.value,
                          order.shippingFee.value,
                          order.taxPercentage.value
                        )
                      }}
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <FormCard title="Customer's Information" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12">
                  <BaseInput
                    :field="customer.fullName"
                    v-model="customer.fullName.value"
                  />
                </div>
              </div>
              <div class="col-span-12">
                <BaseSelection
                  :field="order.modePayment"
                  v-model="order.modePayment.value"
                />
              </div>
            </template>
          </FormCard>
          <FormCard title="Delivery" class="mb-3">
            <template v-slot:content>
              <div class="col-span-12 grid grid-cols-12 gap-x-6">
                <div class="col-span-6">
                  <BaseInput
                    :field="order.consignee"
                    v-model="order.consignee.value"
                  />
                </div>
                <div class="col-span-6">
                  <BaseInput
                    :field="order.phoneNumberReceipt"
                    v-model="order.phoneNumberReceipt.value"
                  />
                </div>
              </div>
              <div class="col-span-12 grid grid-cols-12 gap-x-6">
                <div class="col-span-12">
                  <BaseTextArea
                    :field="order.deliveryAddress"
                    v-model="order.deliveryAddress.value"
                  />
                </div>
              </div>
            </template>
          </FormCard>
          <FormCard title="Payment money" class="mb-3">
            <template v-slot:content>
              <div class="col-span-12 grid grid-cols-12 gap-x-6">
                <div class="col-span-6">
                  <BaseInput
                    :field="order.moneyPaid"
                    v-model="order.moneyPaid.value"
                  />
                </div>
                <div class="col-span-6">
                  <BaseInput
                    v-if="
                      order.unpaidAmount.value >= 0 && order.inChange.value == 0
                    "
                    :field="order.unpaidAmount"
                    v-model="order.unpaidAmount.value"
                  />
                  <BaseInput
                    v-if="order.inChange.value > 0"
                    :field="order.inChange"
                    v-model="order.inChange.value"
                  />
                </div>
              </div>
            </template>
          </FormCard>
          <div class="footer-btn-fixed flex justify-end p-4">
            <el-button @click="handleCancelSubmit">Cancel</el-button>
            <el-button @click="handleSubmit" class="bg-blue-400" type="primary"
              >Submit</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import FormCard from "./../../components/Cards/FormCard.vue";
import BaseInput from "./../../components/Inputs/BaseInput.vue";
import BaseSelection from "../../components/Inputs/BaseSelection.vue";
import axios from "axios";
import BaseTextArea from "./../../components/Inputs/BaseTextArea.vue";
import LoadingPage from "../../components/Cards/LoadingPage.vue";
import { ValidationObserver } from "vee-validate";
export default {
  computed: {
    ...mapGetters(["user", "warehouse", "warehouseChain"]),
  },
  components: {
    FormCard,
    BaseInput,
    BaseTextArea,
    BaseSelection,
    LoadingPage,
    ValidationObserver,
  },
  watch: {
    "order.taxPercentage.value": function (newVal, oldVal) {
      this.order.moneyPaid.value = 0;
      if (!newVal && newVal == 0) {
        this.order.taxPercentage.value = 0;
        this.order.unpaidAmount.value = this.calMoneyPaid(
          this.subTotal,
          this.order.discount.value,
          this.order.shippingFee.value,
          newVal
        );
      } else if (newVal <= 100) {
        this.order.taxPercentage.value = newVal;
        let afterChangeMoney = this.calMoneyPaid(
          this.subTotal,
          this.order.discount.value,
          this.order.shippingFee.value,
          newVal
        );
        if (afterChangeMoney < 0) {
          this.order.unpaidAmount.value = 0;
          this.order.inChange.value = Math.abs(afterChangeMoney);
        }
        if (afterChangeMoney >= 0) {
          this.order.inChange.value = 0;
          this.order.unpaidAmount.value = afterChangeMoney;
        }
      }
    },
    "order.discount.value": function (newVal, oldVal) {
      this.order.moneyPaid.value = 0;
      if (!newVal && newVal == 0) {
        this.order.discount.value = 0;
        this.order.unpaidAmount.value = this.calMoneyPaid(
          this.subTotal,
          newVal,
          this.order.shippingFee.value,
          this.order.taxPercentage.value
        );
      } else if (newVal <= 100) {
        this.order.discount.value = newVal;
        let afterChangeMoney = this.calMoneyPaid(
          this.subTotal,
          newVal,
          this.order.shippingFee.value,
          this.order.taxPercentage.value
        );
        if (afterChangeMoney < 0) {
          this.order.unpaidAmount.value = 0;
          this.order.inChange.value = Math.abs(afterChangeMoney);
        }
        if (afterChangeMoney >= 0) {
          this.order.inChange.value = 0;
          this.order.unpaidAmount.value = afterChangeMoney;
        }
      }
    },
    "order.shippingFee.value": function (newVal, oldVal) {
      this.order.moneyPaid.value = 0;
      if (!newVal && newVal == 0) {
        this.order.shippingFee.value = 0;
        this.order.unpaidAmount.value = this.calMoneyPaid(
          this.subTotal,
          this.order.discount.value,
          newVal,
          this.order.taxPercentage.value
        );
      } else {
        this.order.shippingFee.value = newVal;
        let afterChangeMoney = this.calMoneyPaid(
          this.subTotal,
          this.order.discount.value,
          newVal,
          this.order.taxPercentage.value
        );
        if (afterChangeMoney < 0) {
          this.order.unpaidAmount.value = 0;
          this.order.inChange.value = Math.abs(afterChangeMoney);
        }
        if (afterChangeMoney >= 0) {
          this.order.inChange.value = 0;
          this.order.unpaidAmount.value = afterChangeMoney;
        }
      }
    },
    "order.moneyPaid.value": function (newVal, oldVal) {
      if (newVal == null || newVal == undefined || newVal == 0) {
        this.order.moneyPaid.value = 0;
        this.order.unpaidAmount.value = this.calMoneyPaid(
          this.subTotal,
          this.order.discount.value,
          this.order.shippingFee.value,
          this.order.taxPercentage.value
        );
      } else {
        this.order.moneyPaid.value = newVal;
        let afterChangeMoney =
          this.calMoneyPaid(
            this.subTotal,
            this.order.discount.value,
            this.order.shippingFee.value,
            this.order.taxPercentage.value
          ) - Number(newVal);
        if (Number(afterChangeMoney) < 0) {
          this.order.unpaidAmount.value = 0;
          this.order.inChange.value = Math.abs(Number(afterChangeMoney));
        } else if (Number(afterChangeMoney) >= 0) {
          this.order.inChange.value = 0;
          this.order.unpaidAmount.value = Number(afterChangeMoney);
        }
      }
    },
  },

  data() {
    return {
      warehouseData: {},
      amount: 0,
      currency: "USD",
      loadingPageDetail: false,
      id: null,
      invoiceId: null,
      customer: {
        fullName: {
          id: "fullname",
          name: "Full Name",
          rules: "",
          classes: "w-full col-span-6",
          disabled: true,
          type: "text",
          label: "Full Name",
          isRequired: "",
          value: "",
          placeholder: "",
          error: "",
        },
      },
      materials: [],
      singleUnits: [],
      typeInvoice: 0,
      subTotal: 0,
      totalInvoice: 0,
      order: {
        modePayment: {
          id: "modePayment",
          name: "Payment Method",
          rules: "",
          classes: "w-full col-span-6",
          disabled: false,
          type: "text",
          label: "Payment Method",
          isRequired: "",
          value: 2,
          placeholder: "",
          error: "",
          options: [
            {
              value: 1,
              label: "Bank Transfer",
            },
            {
              value: 2,
              label: "Cash",
            },
            {
              value: 3,
              label: "Card",
            },
            {
              value: 4,
              label: "Cheque",
            },
            {
              value: 5,
              label: "E-Wallet",
            },
          ],
        },
        deliveryAddress: {
          id: "deliveryAddress",
          name: "Delivery Address",
          rules: "",
          classes: "w-full col-span-6 !h-[64px]",
          type: "text",
          disabled: false,
          label: "Delivery Address",
          isRequired: "",
          value: "",
          maxlength: 250,
          placeholder: "",
          error: "",
        },
        consignee: {
          id: "consignee",
          name: "Consignee",
          rules: "",
          classes: "w-full col-span-6",
          type: "text",
          disabled: false,
          label: "Consignee",
          isRequired: "",
          maxlength: 150,
          value: "",
          placeholder: "",
          error: "",
        },
        discount: {
          id: "discount",
          name: "Discount",
          rules: "",
          classes: "w-full col-span-6 !h-[35px]",
          type: "number, currency",
          disabled: false,
          label: "Discount (%)",
          isRequired: "",
          value: 0,
          placeholder: "",
          error: "",
        },
        shippingFee: {
          id: "shippingFee",
          name: "Shipping Fee",
          rules: "",
          classes: "w-full col-span-6 !h-[35px]",
          type: "number, currency",
          disabled: false,
          label: "Shipping Fee ($)",
          isRequired: "",
          value: 0,
          placeholder: "",
          error: "",
        },
        taxPercentage: {
          id: "taxPercentage",
          name: "VAT Fee",
          rules: "",
          classes: "w-full col-span-6 !h-[35px]",
          type: "number, currency",
          disabled: false,
          label: "VAT Fee (%)",
          isRequired: "",
          value: 0,
          placeholder: "",
          error: "",
        },
        phoneNumberReceipt: {
          id: "phoneNumberReceipt",
          name: "Phone Number",
          rules: "",
          classes: "w-full col-span-6",
          type: "text",
          disabled: false,
          label: "Phone Number",
          isRequired: "",
          maxlength: 20,
          value: "",
          placeholder: "",
          error: "",
        },
        moneyPaid: {
          id: "moneyPaid",
          name: "Amount Paid",
          rules: "",
          classes: "w-full col-span-6",
          type: "number, currency",
          disabled: false,
          label: "Amount Paid ($)",
          isRequired: "",
          value: 0,
          placeholder: "",
          error: "",
        },
        totalNeedPaid: {
          id: "totalNeedPaid",
          value: 0,
          error: "",
        },
        unpaidAmount: {
          id: "unpaidAmount",
          name: "Unpaid Amount",
          rules: "",
          classes: "w-full col-span-6",
          type: "text",
          disabled: true,
          label: "Unpaid Amount ($)",
          isRequired: "",
          value: 0,
          placeholder: "",
          error: "",
        },
        inChange: {
          id: "inChange",
          name: "In Change",
          rules: "",
          classes: "w-full col-span-6",
          type: "text",
          disabled: true,
          label: "In Change ($)",
          isRequired: "",
          value: 0,
          placeholder: "",
          error: "",
        },
      },
    };
  },
  methods: {
    calMoneyPaid(subtotal, discount, shipFee, taxFee) {
      return (
        Number(subtotal) +
        Number(shipFee) +
        (Number(subtotal) * Number(taxFee)) / 100 -
        (Number(subtotal) * Number(discount)) / 100
      );
    },
    formatCurrency(value) {
      if (!isNaN(parseFloat(value))) {
        value = parseFloat(value);
        return value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      }
    },
    handleSubmit() {
      let order = {
        warehouseId: this.warehouse.warehouseId,
        id: this.id,
        invoiceId: this.invoiceId,
        productInvoices: this.materials,
        moneyPaid: this.order.moneyPaid.value,
        shippingFee: this.order.shippingFee.value,
        discount: this.order.discount.value,
        taxPercentage: this.order.taxPercentage.value,
        deliveryAddress: this.order.deliveryAddress.value,
        consignee: this.order.consignee.value,
        phoneNumberReceipt: this.order.phoneNumberReceipt.value,
        typeInvoice: this.typeInvoice,
        modePayment: this.order.modePayment.value,
        totalPaid: this.calMoneyPaid(
          this.subTotal,
          this.order.discount.value,
          this.order.shippingFee.value,
          this.order.taxPercentage.value
        ),
        totalNeedPaid: Number(this.subTotal),
      };
      if (Number(order.moneyPaid) > Number(order.totalPaid)) {
        order.moneyPaid = order.totalPaid;
      }

      order.modePayment =
        this.order.modePayment.options.find(
          (opt) =>
            opt.value == this.order.modePayment.value ||
            opt.label == this.order.modePayment.value
        ).value || "";

      order.productInvoices.forEach((item) => {
        item.productId = item.id;
        item.singleUnit =
          this.singleUnits.find(
            (opt) =>
              opt.label == item.singleUnit || opt.value == item.singleUnit
          ).value || "";
      });
      if (this.$route.params.data.type === "EDIT") {
        this.handleCheckOutOder(order);
      }
    },
    async handleCheckOutOder(order) {
      var me = this;
      me.loadingPageDetail = true;
      await axios({
        method: "put",
        url: "http://localhost:9090/api/v1/invoice/check-out",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        data: order,
      })
        .then((response) => {
          if (response.status === 200) {
            me.$message({
              showClose: true,
              message: "Purchase was successful",
              type: "success",
            });
            me.$router.push({ name: "invoice" });
            me.loadingPageDetail = false;
          }
        })
        .catch((error) => {
          me.$message({
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
    handleDeleteMaterial(item) {
      const index = item.$index;
      if (index > -1) {
        this.materials.splice(index, 1);
      }
    },
    async handleGetDetailInvoice() {
      let subTotalVal = 0;
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
              this.materials = res.data.items["productInvoices"];
              if (res.data.items["typeInvoice"] == 2) {
                this.customer.fullName.value =
                  res.data.items["customer"].fullName;
                this.order.deliveryAddress.value =
                  res.data.items["customer"].detailAddress +
                  ", " +
                  res.data.items["customer"].country +
                  ", " +
                  res.data.items["customer"].city +
                  ", " +
                  res.data.items["customer"].district +
                  ", " +
                  res.data.items["customer"].subDistrict;
                this.order.consignee.value =
                  res.data.items["customer"].fullName;
                this.order.phoneNumberReceipt.value =
                  res.data.items["customer"].mobilePhone;
                this.materials.forEach((item) => {
                  subTotalVal = item.quantity * item.exportPrice;
                  this.subTotal = this.subTotal + subTotalVal;
                  this.singleUnit = item.singleUnit;
                });
              } else if (res.data.items["typeInvoice"] == 1) {
                this.customer.fullName.value = "";
                this.order.deliveryAddress.value = "";
                this.order.consignee.value = "";
                this.order.phoneNumberReceipt.value = "";
                this.materials.forEach((item) => {
                  subTotalVal = item.quantity * item.importPrice;
                  this.subTotal = this.subTotal + subTotalVal;
                  this.singleUnit = item.singleUnit;
                });
              }

              this.id = res.data.items.id;
              this.invoiceId = res.data.items.invoiceId;
              this.typeInvoice = res.data.items.typeInvoice;
              if (!res.discount) {
                this.order.discount.value = "";
              } else {
                this.order.discount.value = res.discount;
              }
              if (!res.moneyPaid) {
                this.order.moneyPaid.value = "";
              } else {
                this.order.moneyPaid.value = res.moneyPaid;
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
    async handleGetDetailWarehouse() {
      await axios
        .get(
          `http://localhost:9090/api/v1/warehouse/detail/${this.warehouse.warehouseId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            Object.keys(this.warehouseData).forEach((key) => {
              this.warehouseData[key].value = res.data.items[key];
            });
          }
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: error.response.data.items,
            type: "error",
          });
        })
        .finally(() => (this.loadingPageDetail = false));
    },
    async handleGetSingleUnit() {
      await axios
        .get("http://localhost:9090/api/v1/single-unit/all", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if (res.status === 200) {
            this.singleUnits = res.data.items;
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
  async mounted() {
    if (!this.$route.params.data) {
      this.$router.push({ name: "payment" });
      return;
    }
    await this.handleGetSingleUnit();
    await this.handleGetDetailWarehouse();
    await this.handleGetDetailInvoice();
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
.custom-css {
  margin: -12px !important;
  margin-bottom: 12px !important;
}

.detail .el-col.el-col-5 {
  padding: 0 !important;
}
</style>
