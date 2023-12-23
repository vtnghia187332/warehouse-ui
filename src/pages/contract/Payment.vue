<template>
  <div>
    <loading-page v-show="loadingPageDetail"></loading-page>
    <div v-show="!loadingPageDetail">
      <div class="font-semibold text-2xl pl-3">
        {{ typeInvoice == 1 ? "Hoá đơn nhập hàng" : "Hoá đơn bán hàng" }}
      </div>
      <el-row class="pt-4 pl-3 pr-3 !ml-1 !mr-1" :gutter="24">
        <el-col :span="12">
          <FormCard title="Thông tin nguyên vật liệu" class="mb-3">
            <template v-slot:content>
              <div class="custom-css">
                <el-table
                  :data="materials"
                  style="width: 100%"
                  @row-dblclick=""
                  @selection-change=""
                  height="497"
                >
                  <el-table-column
                    prop="name"
                    label="Nguyên vật liệu"
                    width="350"
                  >
                  </el-table-column>
                  <el-table-column prop="name" label="Đơn giá(VNĐ)" width="130">
                    <template slot-scope="scope">
                      {{
                        typeInvoice == 1
                          ? scope.row.importPrice
                          : scope.row.exportPrice
                      }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="quantity" label="Số lượng" width="100">
                  </el-table-column>
                  <el-table-column prop="singleUnit" label="ĐVT" width="100">
                  </el-table-column>
                  <el-table-column
                    prop="exportPrice"
                    label="Thành tiền(VNĐ)"
                    width="150"
                  >
                    <template slot-scope="scope">
                      {{
                        typeInvoice == 1
                          ? scope.row.importPrice * scope.row.quantity
                          : scope.row.exportPrice * scope.row.quantity
                      }}
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
                    <div>Tổng tiền hàng:</div>
                    <div class="">{{ subTotal }} VNĐ</div>
                  </div>
                  <div class="flex justify-between font-bold text-base">
                    <div>Vận chuyển:</div>
                    <div class="">{{ this.order.shippingFee.value }} VNĐ</div>
                  </div>
                  <div class="flex justify-between font-bold text-base">
                    <div>Giảm giá:</div>
                    <div class="">{{ this.order.discount.value }}%</div>
                  </div>
                  <div class="flex justify-between font-bold text-base">
                    <div>Thuế:</div>
                    <div class="">{{ this.order.taxPercentage.value }}%</div>
                  </div>

                  <div class="flex justify-between font-bold text-2xl">
                    <div>Tổng thanh toán:</div>
                    <div class="">
                      {{
                        calMoneyPaid(
                          subTotal,
                          order.discount.value,
                          order.shippingFee.value,
                          order.taxPercentage.value
                        )
                      }}
                      VNĐ
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <FormCard title="Thông tin khách hàng" class="mb-3">
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
          <FormCard title="Địa chỉ giao hàng" class="mb-3">
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
          <FormCard title="Thanh toán" class="mb-3">
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
          <div class="footer-btn-fixed flex justify-end p-2">
            <el-button
              :disabled="this.$route.params.data.type === 'VIEW'"
              @click="handleCancelSubmit"
              >Cancel</el-button
            >
            <el-button
              :disabled="this.$route.params.data.type === 'VIEW'"
              @click="handleSubmit"
              class="bg-blue-400"
              type="primary"
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
          label: "Họ và tên",
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
          label: "Phương thức thanh toán",
          isRequired: "",
          value: 2,
          placeholder: "",
          error: "",
          options: [
            {
              value: 1,
              label: "Chuyển khoản",
            },
            {
              value: 2,
              label: "Tiền mặt",
            },
            {
              value: 3,
              label: "Thẻ tín dụng",
            },
            {
              value: 4,
              label: "Séc",
            },
            {
              value: 5,
              label: "Ví điện tử",
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
          label: "Địa chỉ giao hàng",
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
          label: "Người nhận",
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
          label: "Giảm giá (%)",
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
          label: "Phí vận chuyển (VNĐ)",
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
          label: "Thuế (%)",
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
          label: "SĐT người nhận",
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
          label: "Số tiền trả (VNĐ)",
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
          label: "Số tiền còn phải trả (VNĐ)",
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
          label: "Tiền thừa (VNĐ)",
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
              message: "Thanh toán thành công",
              type: "success",
            });
            me.$router.push({ name: "Hóa Đơn" });
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
      var me = this;
      let subTotalVal = 0;
      if (this.$route.params.data.id != null) {
        await axios
          .get(
            `http://localhost:9090/api/v1/invoice/detail/${me.$route.params.data.id}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              me.materials = res.data.items["productInvoices"];
              if (res.data.items["typeInvoice"] == 2) {
                if (res.data.items["customer"].fullName) {
                  me.customer.fullName.value =
                    res.data.items["customer"].fullName;
                  me.order.consignee.value =
                    res.data.items["customer"].fullName;
                } else {
                  me.customer.fullName.value =
                    res.data.items["customer"].companyName;
                  me.order.consignee.value =
                    res.data.items["customer"].companyName;
                }

                me.order.deliveryAddress.value =
                  res.data.items["customer"].detailAddress +
                  ", " +
                  res.data.items["customer"].country +
                  ", " +
                  res.data.items["customer"].city +
                  ", " +
                  res.data.items["customer"].district +
                  ", " +
                  res.data.items["customer"].subDistrict;
                me.order.phoneNumberReceipt.value =
                  res.data.items["customer"].mobilePhone;
                me.materials.forEach((item) => {
                  subTotalVal = item.quantity * item.exportPrice;
                  me.subTotal = me.subTotal + subTotalVal;
                  me.singleUnit = item.singleUnit;
                });
              } else if (res.data.items["typeInvoice"] == 1) {
                me.customer.fullName.value =
                  res.data.items["customer"].fullName;
                if (res.data.items["deliveryAddress"]) {
                  me.order.deliveryAddress.value =
                    res.data.items["deliveryAddress"];
                } else {
                  me.order.deliveryAddress.value =
                    res.data.items["warehouseDetailRes"].addressDes +
                    ", " +
                    res.data.items["warehouseDetailRes"].countryName +
                    ", " +
                    res.data.items["warehouseDetailRes"].cityName +
                    ", " +
                    res.data.items["warehouseDetailRes"].districtName +
                    ", " +
                    res.data.items["warehouseDetailRes"].subdistrictName;
                }

                me.order.phoneNumberReceipt.value = "";
                me.materials.forEach((item) => {
                  subTotalVal = item.quantity * item.importPrice;
                  me.subTotal = me.subTotal + subTotalVal;
                  me.singleUnit = item.singleUnit;
                });
                me.order.consignee.value =
                  res.data.items["warehouseDetailRes"].name;
              }

              me.id = res.data.items.id;
              me.invoiceId = res.data.items.invoiceId;
              me.typeInvoice = res.data.items.typeInvoice;
              if (!res.data.items.discount) {
                me.order.discount.value = 0;
              } else {
                me.order.discount.value = res.data.items.discount;
              }
              if (!res.data.items.moneyPaid) {
                me.order.moneyPaid.value = 0;
              } else {
                me.order.moneyPaid.value = res.data.items.moneyPaid;
              }
            }
          })
          .catch((error) => {
            me.$message({
              showClose: true,
              message: error.response.data.items,
              type: "error",
            });
          })
          .finally();
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
          params: { warehouseChainId: this.warehouseChain.warehouseChainId },
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
      this.$router.push({ name: "Thanh toán" });
      return;
    }
    await this.handleGetSingleUnit();
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
