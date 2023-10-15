<template>
  <div>
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
                <el-table-column prop="name" label="Product" width="440">
                </el-table-column>
                <el-table-column prop="quantity" label="Quantity" width="80">
                </el-table-column>
                <el-table-column prop="exportPrice" label="Price" width="150">
                </el-table-column>
                <el-table-column align="right" width="50">
                  <template slot-scope="scope">
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      class="bg-red-400"
                      circle
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </FormCard>
        <div class="bg-white radius-shadow_add p-3 flex justify-end">
          <div class="!w-72 !mb-1">
            <div class="flex justify-between font-bold text-base">
              <div>Subtotal:</div>
              <div class="">${{ subTotal }}</div>
            </div>
            <div class="flex justify-between font-bold text-base">
              <div>Shipping:</div>
              <div class="">${{this.shippingFee}}</div>
            </div>
            <div class="flex justify-between font-bold text-base">
              <div>Discount:</div>
              <div class="">${{this.discountNumber}}</div>
            </div>
            <div>_____________________________________</div>
            <div class="flex justify-between font-bold text-3xl">
              <div>Total:</div>
              <div class="">
                ${{
                  this.subTotal +
                  this.shippingFee -
                  this.subTotal * this.discountNumber
                }}
              </div>
            </div>
          </div>
        </div>
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
                  :field="order.amountPaid"
                  v-model="order.amountPaid.value"
                />
              </div>
              <div class="col-span-6">
                <BaseInput
                  :field="order.unpaidAmount"
                  v-model="order.unpaidAmount.value"
                />
              </div>
            </div>
          </template>
        </FormCard>
        <div class="footer-btn-fixed flex justify-end p-4">
          <el-button @click="">Cancel</el-button>
          <el-button @click="" class="bg-blue-400" type="primary"
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
  data() {
    return {
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
      subTotal: 0,
      shippingFee: 0,
      discountNumber: 0,
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
        amountPaid: {
          id: "amountPaid",
          name: "Amount Paid",
          rules: "",
          classes: "w-full col-span-6",
          type: "text",
          disabled: false,
          label: "Amount Paid",
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
          label: "Unpaid Amount",
          isRequired: "",
          value: "",
          placeholder: "",
          error: "",
        },
      },
    };
  },
  methods: {
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
              });
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
