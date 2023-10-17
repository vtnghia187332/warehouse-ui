<template>
  <div>
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
                <el-table-column align="right" width="50">
                  <template slot-scope="scope">
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      class="bg-red-400"
                      @click="handleDeleteMaterial(scope)"
                      circle
                    ></el-button>
                  </template>
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
                <div class="!w-full !mb-1">
                  <BaseInput
                    :field="order.shippingFee"
                    v-model="order.shippingFee.value"
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
                  <div class="">{{ this.order.discount.value }} %</div>
                </div>
                <div>___________________________________________</div>
                <div class="flex justify-between font-bold text-3xl">
                  <div>Total:</div>
                  <div class="">
                    ${{
                      Number(order.shippingFee.value) +
                      subTotal -
                      (order.discount.value / 100) * subTotal
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
                    subTotal +
                      Number(order.shippingFee.value) -
                      (order.discount.value / 100) * subTotal -
                      order.moneyPaid.value >=
                    0
                  "
                  :field="order.unpaidAmount"
                  v-model="order.unpaidAmount.value"
                />
                <BaseInput
                  v-if="
                    subTotal +
                      Number(order.shippingFee.value) -
                      (order.discount.value / 100) * subTotal -
                      order.moneyPaid.value <
                    0
                  "
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
</template>
<script>
import FormCard from "./../../components/Cards/FormCard.vue";
import BaseInput from "./../../components/Inputs/BaseInput.vue";
import BaseSelection from "../../components/Inputs/BaseSelection.vue";
import axios from "axios";
import BaseTextArea from "./../../components/Inputs/BaseTextArea.vue";
export default {
  components: { FormCard, BaseInput, BaseTextArea, BaseSelection },
  watch: {
    "order.discount.value": function (newVal, oldVal) {
      if (!newVal && newVal == 0) {
        this.order.discount.value = 0;
        this.order.unpaidAmount.value =
          this.subTotal +
          Number(this.order.shippingFee.value) -
          (this.order.discount.value / 100) * this.subTotal -
          this.order.moneyPaid.value;
      } else if (newVal <= 100) {
        this.order.discount.value = newVal;
        let afterChangeMoney =
          this.subTotal +
          Number(this.order.shippingFee.value) -
          (this.order.discount.value / 100) * this.subTotal -
          this.order.moneyPaid.value;
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
      if (!newVal && newVal == 0) {
        this.order.shippingFee.value = 0;
        this.order.unpaidAmount.value =
          this.subTotal +
          Number(this.order.shippingFee.value) -
          (this.order.discount.value / 100) * this.subTotal -
          this.order.moneyPaid.value;
      } else if (newVal <= 100) {
        this.order.shippingFee.value = newVal;
        let afterChangeMoney =
          this.subTotal +
          Number(this.order.shippingFee.value) -
          (this.order.discount.value / 100) * this.subTotal -
          this.order.moneyPaid.value;
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
        this.order.unpaidAmount.value =
          this.subTotal +
          Number(this.order.shippingFee.value) -
          (this.order.discount.value / 100) * this.subTotal -
          this.order.moneyPaid.value;
      } else {
        this.order.moneyPaid.value = newVal;
        let afterChangeMoney =
          this.subTotal +
          Number(this.order.shippingFee.value) -
          (this.order.discount.value / 100) * this.subTotal -
          this.order.moneyPaid.value;
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
  },
  data() {
    return {
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
          type: "text",
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
          type: "text",
          disabled: false,
          label: "Shipping Fee ($)",
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
          type: "text",
          disabled: false,
          label: "Amount Paid ($)",
          isRequired: "",
          value: "",
          placeholder: "",
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
          value: "",
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
          value: "",
          placeholder: "",
          error: "",
        },
      },
    };
  },
  methods: {
    handleSubmit() {
      const order = {
        warehouseId: "WH-1",
        id: this.id,
        invoiceId: this.invoiceId,
        productInvoices: this.materials,
        moneyPaid: this.order.moneyPaid.value,
        shippingFee: this.order.shippingFee.value,
        discount: this.order.discount.value,
        deliveryAddress: this.order.deliveryAddress.value,
        consignee: this.order.consignee.value,
        phoneNumberReceipt: this.order.phoneNumberReceipt.value,
        typeInvoice: this.typeInvoice,
      };
      console.log(order, "order");
      if (this.$route.params.data.type === "EDIT") {
      }
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
    handleGetDetailInvoice() {
      let subTotalVal = 0;
      if (this.$route.params.data.id != null) {
        axios
          .get(
            `http://localhost:9090/api/v1/invoice/detail/${this.$route.params.data.id}`,
            { headers: { "Access-Control-Allow-Origin": "*" } }
          )
          .then((res) => {
            if (res.status === 200) {
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
              this.order.consignee.value = res.data.items["customer"].fullName;
              this.order.phoneNumberReceipt.value =
                res.data.items["customer"].mobilePhone;

              this.materials = res.data.items["productInvoices"];
              this.materials.forEach((item) => {
                subTotalVal = item.quantity * item.exportPrice;
                this.subTotal = this.subTotal + subTotalVal;
                this.singleUnit = item.singleUnit;
              });
              this.id = res.data.items.id;
              this.invoiceId = res.data.items.invoiceId;
              this.typeInvoice = res.data.items.typeInvoice;
              if (!res.discount) {
                this.order.discount.value = 0;
              } else {
                this.order.discount.value = res.discount;
              }
              if (!res.moneyPaid) {
                this.order.moneyPaid.value = 0;
              } else {
                this.order.moneyPaid.value = res.moneyPaid;
              }
            }
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error,
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
  mounted() {
    if (!this.$route.params.data) {
      this.$router.push({ path: "/export-receipt" });
      return;
    }
    this.handleGetDetailInvoice();
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
