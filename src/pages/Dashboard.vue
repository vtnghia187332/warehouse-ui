<template>
  <div>
    <loading-page v-show="loadingPageDetail"></loading-page>
    <div v-show="!loadingPageDetail">
      <div class="ml-4 font-semibold text-2xl">Filter by</div>
      <div class="ml-4 grid gap-x-2 grid-cols-6">
        <BaseSelection
          @getValue=""
          v-model="warehouseData.value"
          :field="warehouseData"
        />
        <!-- <DatePicker :field="dateTo" v-model="dateTo.value" />
        <DatePicker :field="dateFrom" v-model="dateFrom.value" /> -->
        <div class="mb-2">
          <label class="!font-bold block"> Date </label>
          <el-date-picker
            v-model="dateFromToSearch"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="To"
            start-placeholder="Start Date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            end-placeholder="End Date"
            @change="checkDateSearch($event)"
          >
          </el-date-picker>
        </div>
      </div>
      <div
        class="bg-white rounded-lg shadow-md p-4 m-3 grid grid-cols-5 gap-x-2"
      >
        <div class="grid grid-cols-5 gap-x-2">
          <div class="col-span-1 m-auto">
            <i class="el-icon-money"></i>
          </div>
          <div class="col-span-4">
            <div class="font-bold text-blue-600/100">
              Imported Price Product
            </div>
            <div>$ {{ addCommas(detail.totalImportPrice) }}</div>
          </div>
        </div>

        <div class="grid grid-cols-5 gap-x-2">
          <div class="col-span-1 m-auto">
            <i class="el-icon-delete-location"></i>
          </div>
          <div class="col-span-4">
            <div class="font-bold text-blue-600/100">Money Refund</div>
            <div>$ {{ addCommas(detail.totalRefundPrice) }}</div>
          </div>
        </div>

        <div class="grid grid-cols-5 gap-x-2">
          <div class="col-span-1 m-auto">
            <i class="el-icon-discount"></i>
          </div>
          <div class="col-span-4">
            <div class="font-bold text-blue-600/100">Discount</div>
            <div>$ {{ addCommas(detail.totalDiscountPrice) }}</div>
          </div>
        </div>

        <div class="grid grid-cols-5 gap-x-2">
          <div class="col-span-1 m-auto">
            <i class="el-icon-document"></i>
          </div>
          <div class="col-span-4">
            <div class="font-bold text-blue-600/100">Tax Price</div>
            <div>$ {{ addCommas(detail.totalTaxPrice) }}</div>
          </div>
        </div>

        <div class="grid grid-cols-5 gap-x-2">
          <div class="col-span-1 m-auto">
            <i class="el-icon-wallet"></i>
          </div>
          <div class="col-span-4">
            <div class="font-bold text-blue-600/100">Revenue with tax</div>
            <div>$ {{ addCommas(detail.totalRevenueWithTax) }}</div>
          </div>
        </div>
      </div>

      <div class="m-3 grid grid-cols-4 gap-x-4">
        <div class="">
          <el-col :span="8" class="w-full">
            <el-card shadow="always">
              <div class="font-semibold">Number of Customer</div>
              <div>{{ detail.numberOfCustomer }}</div>
            </el-card>
          </el-col>
        </div>
        <div class="">
          <el-col :span="8" class="w-full">
            <el-card shadow="always">
              <div class="font-semibold">Number of Invoice</div>
              <div>{{ detail.numberOfInvoicePayment }}</div>
            </el-card>
          </el-col>
        </div>

        <div class="">
          <el-col :span="8" class="w-full">
            <el-card shadow="always">
              <div class="font-semibold">Number of Product</div>
              <div>{{ detail.numberOfProduct }}</div>
            </el-card>
          </el-col>
        </div>

        <div class="">
          <el-col :span="8" class="w-full">
            <el-card shadow="always">
              <div class="font-semibold">Number of Canceled Invoice</div>
              <div>{{ detail.numberOfCancelInvoice }}</div>
            </el-card>
          </el-col>
        </div>
      </div>
      <div class="ml-4 font-semibold text-2xl">Total Receipt</div>

      <div style="height: 300px" class="m-auto">
        <v-chart :option="MoneyPaidByDate"></v-chart>
      </div>
      <div class="m-3 grid grid-cols-2 gap-x-4">
        <div>
          <div class="font-semibold">Payment Methods</div>
          <el-card shadow="always">
            <div style="height: 250px">
              <v-chart
                :option="paymentMethodsStas"
                autoresize
                :key="1"
              ></v-chart>
            </div>
          </el-card>
        </div>

        <div>
          <div class="font-semibold">In Debt</div>
          <el-card shadow="always">
            <div class="grid grid-cols-5 gap-4 border-b-2 border-black-900">
              <el-col class="col-span-3 font-semibold">Type of Invoice</el-col>
              <el-col class="font-semibold">No. of Invoice</el-col>
              <el-col class="font-semibold">Total money</el-col>
            </div>
            <div class="grid grid-cols-6 gap-4 mt-2">
              <el-col class="col-span-4">Export Invoice</el-col>
              <el-col class="">{{ detail.numberInvoiceInDebtExport }}</el-col>
              <el-col class="">{{ detail.totalInDebtExport }}</el-col>
            </div>
            <div class="grid grid-cols-6 gap-4 mt-2">
              <el-col class="col-span-4">Receipt Invoice</el-col>
              <el-col class="">{{ detail.numberInvoiceInDebtReceipt }}</el-col>
              <el-col class="">{{ detail.totalInDebtReceipt }}</el-col>
            </div>
          </el-card>

          <div class="font-semibold">Top Product Sold</div>
          <el-card shadow="always">
            <div class="grid grid-cols-5 gap-4 border-b-2 border-black-900">
              <el-col class="col-span-4 font-semibold">Product's name</el-col>
              <el-col class="font-semibold">Quantity</el-col>
            </div>
            <div
              class="grid grid-cols-5 gap-4 mt-2"
              v-for="(item, index) in highestProductSells"
              :key="index"
            >
              <el-col class="col-span-4 text-ellipsis">{{ item.name }}</el-col>
              <el-col class="">{{ item.quantity }}</el-col>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { StatsCard, ChartCard } from "@/components/index";
import BaseSelection from "../components/Inputs/BaseSelection.vue";
import moment from "moment";
import LoadingPage from "../components/Cards/LoadingPage.vue";
import DatePicker from "../components/Date/DatePicker.vue";
import axios from "axios";
export default {
  components: {
    StatsCard,
    ChartCard,
    BaseSelection,
    DatePicker,
    LoadingPage,
  },
  computed: {
    moment() {
      return moment;
    },
    ...mapGetters(["user", "warehouse", "warehouseChain"]),
  },
  data() {
    return {
      dateFromToSearch: [
        moment(moment().subtract(30, "days")).format("YYYY-MM-DD"),
        moment(moment()).format("YYYY-MM-DD"),
      ],
      loadingPageDetail: false,
      highestProductSells: [],
      warehouseData: {
        id: "warehouseData",
        baseId: 0,
        name: "warehouseData",
        rules: "",
        classes: "w-full",
        isRequired: "",
        label: "Warehouse",
        placeholder: "Select Warehouse",
        error: "",
        value: "",
        options: [],
      },
      dateTo: {
        id: "dateTo",
        name: "dateTo",
        classes: "!w-full",
        isRequired: "false",
        rules: "",
        label: "From Date",
        value: "",
        error: "",
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
      },
      dateFrom: {
        id: "dateFrom",
        name: "dateFrom",
        classes: "!w-full",
        isRequired: "false",
        label: "To Date",
        rules: "",
        value: "",
        error: "",
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
      },
      detail: {
        totalPaidAndDates: [],
        totalPaidByMethodsPays: [],
        totalImportPrice: 0,
        totalRefundPrice: 0,
        totalDiscountPrice: 0,
        totalTaxPrice: 0,
        totalPriceWithTax: 0,
        numberInvoiceInDebtReceipt: 0,
        totalInDebtReceipt: 0,
        totalInDebtExport: 0,
        numberInvoiceInDebtExport: 0,
        numberOfCustomer: 0,
        numberOfInvoicePayment: 0,
        numberOfProduct: 0,
        numberOfCancelInvoice: 0,
      },
      MoneyPaidByDate: {
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: (params) => {
            return `Receipt Total <span />${params[0].value}<br />
                Export Total <span />${params[1].value}<span />`;
          },
        },
        series: [],
      },

      paymentMethodsStas: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
          {
            name: "Payment Methods",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },

      option1: {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            z: -1, // optional, makes the yAxis' splitLines appear on top
            data: [170, 182, 161, 184, 160, 180, 165],
            smooth: true,
            type: "line",
            areaStyle: {},
          },
        ],
      },
    };
  },
  watch: {
    "dateTo.value": function (newVal, oldVal) {
      if (newVal) {
        this.dateTo.value = moment(newVal).format("YYYY-MM-DD");
      } else {
        this.dateTo.value = "";
      }
      this.handleGetApiDashboard();
    },
    "dateFrom.value": function (newVal, oldVal) {
      if (newVal) {
        this.dateFrom.value = moment(newVal).format("YYYY-MM-DD");
      } else {
        this.dateFrom.value = "";
      }
      this.handleGetApiDashboard();
    },
    "warehouseData.value": function (newVal, oldVal) {
      this.handleGetApiDashboard();
    },
  },
  methods: {
    checkDateSearch(data) {
      this.handleGetApiDashboard();
    },
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
    async handleGetApiWarehouse() {
      await axios
        .get("http://localhost:9090/api/v1/warehouse/data-list", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { warehouseChainId: this.warehouseChain.warehouseChainId },
        })
        .then((res) => {
          if (res.status === 200) {
            this.warehouseData.options = res.data.items;
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
    async handleGetApiDashboard() {
      var me = this;
      me.loadingPageDetail = true;
      let params = {
        warehouse: me.warehouseData.value,
        fromDate: me.dateFromToSearch[0],
        toDate: me.dateFromToSearch[1],
      };
      if (!me.warehouseData?.value) {
        params = {
          ...params,
          warehouseChainId: me.warehouseChain.warehouseChainId,
          roleOfUser: me.user.roles.join(),
        };
      }
      try {
        const { data } = await axios.get(
          "http://localhost:9090/api/v1/dashboard",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            params,
          }
        );
        me.detail = data.items;
        me.highestProductSells = data.items.highestProductSells;
        me.paymentMethodsStas.series.data = [];
        if (data.items?.totalPaidByMethodsPays) {
          const tempArr = [];
          let arrayObj = data.items.totalPaidByMethodsPays;
          for (const obj of arrayObj) {
            tempArr.push({ value: obj.totalPaid, name: obj.methods });
          }
          me.paymentMethodsStas.series.forEach((item) => {
            item.data = tempArr;
          });
        }
        me.MoneyPaidByDate.series = [];
        if (data.items?.totalPaidByDates) {
          let arrayObj = data.items.totalPaidByDates;
          const names = [];
          const valuesRec = [];
          const valuesEx = [];
          for (const obj of arrayObj) {
            names.push(obj.date);
            valuesRec.push(obj.totalPaidRec);
            valuesEx.push(obj.totalPaidEx);
          }
          me.MoneyPaidByDate.xAxis.data = names;
          const dataRec = {
            type: "bar",
            data: valuesRec,
          };
          const dataEx = {
            type: "bar",
            data: valuesEx,
          };
          me.MoneyPaidByDate.series.push(dataRec);
          me.MoneyPaidByDate.series.push(dataEx);
        }
        me.loadingPageDetail = false;
      } catch (error) {
        me.$message({
          showClose: true,
          message: error.response.data.items,
          type: "error",
        });
        me.loadingPageDetail = false;
      }
    },
  },
  async mounted() {
    if (!this.user.roles.includes("ADMIN")) {
      this.warehouseData.value = this.warehouse.warehouseId;
    }
    await this.handleGetApiWarehouse();
    await this.handleGetApiDashboard();
  },
  async updated() {},
};
</script>
<style>
.el-icon-money:before {
  font-size: xx-large;
}
.el-icon-delete-location {
  font-size: xx-large;
}
.el-icon-discount {
  font-size: xx-large;
}
.el-icon-document {
  font-size: xx-large;
}
.el-icon-wallet {
  font-size: xx-large;
}
</style>
