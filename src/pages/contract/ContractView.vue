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
                    <div class="">{{ subTotalView }} VNĐ</div>
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
                    <div>Tổng:</div>
                    <div class="">{{ totalPayment }} VNĐ</div>
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
              </div>
            </template>
          </FormCard>
          <div class="footer-btn-fixed flex justify-end p-2">
            <el-button @click="handleCancelSubmit">Huỷ</el-button>
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
  data() {
    return {
      subTotalView: 0,
      totalPayment: 0,
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
    handleCancelSubmit() {
      this.$confirm("Bạn có muốn thoát khỏi màn hình này?")
        .then((_) => {
          this.$router.push({ name: "Hóa Đơn" });
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
              if (res.data.items["customer"].fullName) {
                me.customer.fullName.value =
                  res.data.items["customer"].fullName;
                me.order.consignee.value = res.data.items["customer"].fullName;
              } else {
                me.customer.fullName.value =
                  res.data.items["customer"].companyName;
                me.order.consignee.value =
                  res.data.items["customer"].companyName;
              }
              me.subTotalView = res.data.items["totalNeedPaid"];
              me.totalPayment = res.data.items["totalPaid"];
              me.order.discount.value = res.data.items.discount;
              me.order.moneyPaid.value = res.data.items.moneyPaid;
              me.order.shippingFee.value = res.data.items.shippingFee;
              me.order.taxPercentage.value = res.data.items.taxPercentage;
              me.order.deliveryAddress.value = res.data.items.deliveryAddress;
              me.order.phoneNumberReceipt.value =
                res.data.items.phoneNumberReceipt;
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
