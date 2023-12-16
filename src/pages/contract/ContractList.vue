<template>
  <div class="">
    <div class="flex justify-between px-4 py-2">
      <div class="flex">
        <BaseSearch :field="search" @get-value="getBaseSearchVal" />
        <button
          class="ml-1 !bg-[#f4f3ef] border !border-gray-300 text-black font-medium py-2 px-4 rounded-sm"
        >
          <span class="ti-filter"></span> Filter
        </button>
      </div>
      <div class="flex space-x-1">
        <el-select
          class="w-[180px]"
          v-model="typeInvoice.value"
          :disabled="warehouseData.disabled === 'disabled'"
          placeholder="Select Type Invoice"
          @change="updateInputType($event)"
          clearable
        >
          <el-option
            v-for="item in typeInvoice.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          class="w-[180px]"
          v-model="statusInvoice.value"
          placeholder="Select Invoice Status"
          @change="getInvoiceByStatus($event)"
          clearable
        >
          <el-option
            v-for="item in statusInvoice.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-select
          class="w-[180px]"
          v-model="warehouseData.value"
          placeholder="Select Warehouse"
          @change="filterByWarehouse($event)"
          clearable
        >
          <el-option
            v-for="item in warehouseData.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <button
          class="ml-1 !bg-blue-400 text-white font-bold py-2 px-4 rounded-sm"
          @click="getInvoiceHistory"
        >
          <i class="el-icon-plus ml font-bold"></i> History
        </button>
        <button
          class="ml-1 !bg-blue-400 text-white font-bold py-2 px-4 rounded-sm"
          @click="exportInvoiceExport"
        >
          <i class="el-icon-plus ml font-bold"></i> Export
        </button>
      </div>
    </div>
    <LoadingPage v-show="loadingTable"></LoadingPage>
    <div class="table_style px-2" v-show="!loadingTable">
      <el-table
        :data="invoices"
        style="width: 100%"
        @row-dblclick="goToDetail"
        @sort-change=""
        height="780"
      >
        <div slot="append" v-if="invoices.length == '0'">
          <el-empty :image-size="300"></el-empty>
        </div>
        <el-table-column
          sortable
          fixed
          prop="invoiceId"
          label="Invoice ID"
          width="150"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="createdAt"
          label="Created At"
          width="200"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="editedAt"
          label="Updated At"
          width="200"
        >
        </el-table-column>
        <el-table-column sortable prop="name" label="Invoice Name" width="250">
        </el-table-column>
        <el-table-column sortable prop="code" label="Invoice Code" width="250">
        </el-table-column>
        <el-table-column
          sortable
          prop="typeInvoice"
          label="Type Invoice"
          width="150"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.typeInvoice == 1 ? 'success' : 'primary'"
              disable-transitions
              >{{ scope.row.typeInvoice == 1 ? "RECEIPT" : "EXPORT" }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column sortable prop="" label="Customer Name" width="250">
          <template slot-scope="scope">
            {{ scope.row.customer.fullName }}
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="invoiceStage"
          label="Invoice's Status"
          width="200"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="totalPaid"
          label="Total Payment"
          width="200"
        >
        </el-table-column>
        <el-table-column prop="moneyPaid" label="Money Paid" width="200">
        </el-table-column>
        <el-table-column prop="consignee" label="Consignee" width="200">
        </el-table-column>
        <el-table-column
          prop="phoneNumberReceipt"
          label="Phone Number Receipt"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="deliveryAddress"
          label="Delivery Address"
          width="300"
        >
        </el-table-column>
        <el-table-column prop="moneyRefund" label="Money Refund" width="200">
        </el-table-column>
        <el-table-column prop="reason" label="Reason Refund" width="300">
        </el-table-column>
        <el-table-column prop="reasonCancel" label="Reason Cancel" width="300">
        </el-table-column>
        <el-table-column fixed="right" label="Action" width="80">
          <template slot-scope="scope">
            <el-dropdown>
              <el-button @click="" type="text" size="small"
                ><i class="ti-more !ml-3"></i
              ></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <button
                    class="!bg-[#fdfdfd] text-black"
                    @click="handeExportPDF(scope.row)"
                  >
                    <i class=""></i>Export PDF
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button
                    class="!bg-[#fdfdfd] text-black"
                    @click="handleAcquit(scope.row)"
                    :disabled="scope.row.invoiceStage == 'CANCELED'"
                  >
                    <i class=""></i>Acquit
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button
                    class="!bg-[#fdfdfd] text-black"
                    @click="handeRefund(scope.row)"
                    :disabled="scope.row.invoiceStage == 'CANCELED'"
                  >
                    <i class=""></i>Refund
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button
                    class="!bg-[#fdfdfd] text-black"
                    @click="handeCancel(scope.row)"
                    :disabled="scope.row.invoiceStage == 'CANCELED'"
                  >
                    <i class=""></i> Cancel
                  </button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <BasePagination
      v-show="!loadingTable"
      :field="paginationVal"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />
    <RefundVue
      :field="refund"
      v-show="dialogVisible"
      :dialogVisible.sync="dialogVisible"
      @handle-dataAddr="handleDataRefund"
    />
    <Cancel
      :field="canceled"
      v-show="dialogVisibleCancel"
      :dialogVisible.sync="dialogVisibleCancel"
      @handle-dataAddr="handleDataCancel"
    />
    <Acquit
      :field="acquited"
      v-show="dialogVisibleAcquited"
      :dialogVisible.sync="dialogVisibleAcquited"
      @handle-dataAddr="handleDataAcquit"
    />
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters, mapMutations, mapActions } from "vuex";
import BaseSearch from "../../components/Inputs/BaseSearch.vue";
import BasePagination from "../../components/Pagination/BasePagination.vue";
import BaseSelection from "../../components/Inputs/BaseSelection.vue";
import LoadingPage from "@/components/Cards/LoadingPage";
import RefundVue from "./Refund.vue";
import Cancel from "./Cancel.vue";
import Acquit from "./Acquit.vue";
export default {
  computed: {
    ...mapGetters(["user", "warehouse", "warehouseChain"]),
  },
  components: {
    BaseSearch,
    BasePagination,
    BaseSelection,
    LoadingPage,
    RefundVue,
    Cancel,
    Acquit,
  },
  data() {
    return {
      warehouseData: {
        id: "warehouseData",
        baseId: 0,
        name: "warehouseData",
        rules: "required",
        classes: "w-full",
        isRequired: "true",
        placeholder: "Select Warehouse",
        disabled: "not-disabled",
        error: "",
        value: "",
        options: [],
      },
      dialogVisibleAcquited: false,
      dialogVisible: false,
      dialogVisibleCancel: false,
      activeName: "first",
      search: {
        value: "",
        class: "w-96",
        placeholder: "Search by Name, Code,..",
      },
      typeInvoice: {
        value: "",
        options: [
          { label: "All", value: 0 },
          { label: "Receipt", value: 1 },
          { label: "Export", value: 2 },
        ],
      },
      acquited: {
        title: "Acquit Money",
        invoiceId: null,
        needToPay: 0,
        moneyPaid: {
          id: "moneyPaid",
          name: "Acquit Money",
          rules: "required",
          classes: "w-full col-span-6",
          type: "text",
          label: "Acquit Money",
          isRequired: "true",
          value: "",
          placeholder: "Enter Acquit Money...",
          maxlength: 100,
          error: "",
        },
      },
      canceled: {
        title: "Cancel",
        invoiceId: null,
        reasonCancel: {
          id: "reasonCancel",
          name: "Reason",
          rules: "required",
          classes: "w-full col-span-6 !h-[64px]",
          type: "text",
          label: "Reason",
          isRequired: "true",
          value: "",
          placeholder: "Enter Reason...",
          maxlength: 250,
          error: "",
        },
      },
      refund: {
        title: "Refund",
        invoiceId: null,
        totalInvoicePaid: 0,
        moneyRefund: {
          id: "moneyRefund",
          name: "Money Refund",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Money Refund",
          isRequired: "true",
          value: "",
          placeholder: "Enter Money Refund...",
          maxlength: 50,
          error: "",
        },
        reason: {
          id: "reason",
          name: "Reason",
          rules: "required",
          classes: "w-full col-span-6 !h-[64px]",
          type: "text",
          label: "Reason",
          isRequired: "true",
          value: "",
          placeholder: "Enter Reason...",
          maxlength: 250,
          error: "",
        },
      },
      statusInvoice: {
        value: "",
        options: [
          { label: "UNPAID", value: 1 },
          { label: "PAID", value: 2 },
          { label: "CANCELED", value: 3 },
          { label: "REFUND_ALL", value: 4 },
          { label: "REFUND_LITTLE", value: 5 },
          { label: "IN_DEBT", value: 6 },
        ],
      },
      loadingTable: false,
      paginationPage: {
        pageNo: 1,
        pageSize: 30,
        sorting: "createdAt",
        orderBy: "DESC",
        invoiceType: null,
        invoiceStatus: null,
      },
      paginationVal: {},
      invoices: [],
    };
  },
  methods: {
    goToDetail(row) {
      let data = {
        id: row.invoiceId,
        type: "VIEW",
      };
      this.$router.push({
        name: "payment", //use name for router push
        params: { data },
      });
    },
    getInvoiceHistory() {
      this.$router.push({ name: "invoice-history" });
    },
    filterByWarehouse(item) {
      if (!item) {
        this.warehouseData.value = null;
        this.handleGetInvoicesEx();
      } else {
        const itemStr =
          this.warehouseData.options.find(
            (opt) => opt.value == item || opt.label == item
          ).value || "";
        if (!itemStr) {
          this.warehouseData.value = null;
        } else {
          this.warehouseData.value = itemStr;
        }
        this.handleGetInvoicesEx();
      }
    },
    getInvoiceByStatus(item) {
      if (!item) {
        this.paginationPage.invoiceStatus = null;
        this.handleGetInvoicesEx();
      } else {
        const itemStr =
          this.statusInvoice.options.find(
            (opt) => opt.value == item || opt.label == item
          ).label || "";
        if (!itemStr) {
          this.paginationPage.invoiceStatus = null;
        } else {
          this.paginationPage.invoiceStatus = itemStr;
        }
        this.handleGetInvoicesEx();
      }
    },
    async handeExportPDF(item) {
      let me = this;
      // time biến thành tên của file
      const tempDateTime = new Date();
      const fileName = `Invoice${tempDateTime.getTime()}.pdf`;
      //  Khai báo mảng để hứng dữ liệu nguyên vật liệu trả về
      await axios
        .get("http://localhost:9090/api/v1/invoice/generate/pdf", {
          responseType: "blob",
          params: {
            invoiceId: item.invoiceId,
          },
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          contentType: "application/json-patch+json",
        })
        .then(function (res) {
          if (res) {
            var url = window.URL.createObjectURL(new Blob([res.data]));
            var a = document.createElement("a");
            a.href = url;
            //Lấy file name mà server trả về -> save file
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
          }
        })
        .catch(function (res) {});
    },
    updateInputType(item) {
      if (!item) {
        this.paginationPage.invoiceType = null;
      } else {
        this.paginationPage.invoiceType = item;
      }
      this.handleGetInvoicesEx();
    },
    async exportInvoiceExport() {
      let me = this;
      let params = {
        searchText: me.search.value,
        pageNo: me.paginationPage.pageNo,
        pageSize: me.paginationPage.pageSize,
        sorting: me.paginationPage.sorting,
        orderBy: me.paginationPage.orderBy,
        warehouse: me.warehouseData.value,
      };
      if (!me.warehouseData?.value) {
        params = {
          ...params,
          warehouseChainId: me.warehouseChain.warehouseChainId,
          roleOfUser: me.user.roles.join(),
        };
      }
      const tempDateTime = new Date();
      const fileName = `Export_Invoice_${tempDateTime.getTime()}.xlsx`;
      await axios
        .get("http://localhost:9090/api/v1/invoice/export", {
          responseType: "blob",
          contentType: "application/json-patch+json",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params,
        })
        .then(function (res) {
          if (res) {
            var url = window.URL.createObjectURL(new Blob([res.data]));
            var a = document.createElement("a");
            a.href = url;
            //Lấy file name mà server trả về -> save file
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
          }
        })
        .catch(function (error) {
          this.$message({
            showClose: true,
            message: error.response.data.items,
            type: "error",
          });
        });
    },
    getBaseSearchVal(param) {
      // clears the timer on a call so there is always x seconds in between calls
      clearTimeout(this.timer);
      // if the timer resets before it hits 150ms it will not run
      this.timer = setTimeout(
        function () {
          this.search.value = param;
          this.handleGetInvoicesEx();
        }.bind(this),
        300
      );
    },
    handleSizeChange(param) {
      this.paginationPage.pageNo = 1;
      this.paginationPage.pageSize = param;
      this.handleGetInvoicesEx();
    },
    handleCurrentChange(param) {
      this.paginationPage.pageNo = param;
      this.handleGetInvoicesEx();
    },
    handleDataAcquit(field) {
      const data = {
        invoiceId: field.invoiceId,
        moneyPaid: field.moneyPaid.value,
        typeAction: "ACQUITED",
      };
      this.handleUpdateContract(data);
      this.dialogVisibleAcquited = false;
    },
    handleAcquit(row) {
      this.acquited.needToPay = Number(row.totalPaid) - Number(row.moneyPaid);
      this.acquited.invoiceId = row.invoiceId;
      this.acquited.moneyPaid.value = 0;
      this.dialogVisibleAcquited = true;
    },
    handleDataCancel(field) {
      const data = {
        invoiceId: field.invoiceId,
        typeAction: "CANCEL",
        reasonCancel: field.reasonCancel.value,
      };
      this.handleUpdateContract(data);
      this.dialogVisibleCancel = false;
    },
    handeCancel(row) {
      this.canceled.invoiceId = row.invoiceId;
      this.canceled.reasonCancel.value = "";
      this.dialogVisibleCancel = true;
    },
    handleDataRefund(field) {
      const data = {
        invoiceId: field.invoiceId,
        typeAction: "REFUND",
        moneyRefund: field.moneyRefund.value,
        reason: field.reason.value,
      };
      this.handleUpdateContract(data);
      this.dialogVisible = false;
    },
    handeRefund(row) {
      this.refund.invoiceId = row.invoiceId;
      this.refund.totalInvoicePaid = row.totalPaid;
      this.refund.moneyRefund.value = 0;
      this.dialogVisible = true;
    },
    handleUpdateContract(row) {
      const order = {
        invoiceId: row.invoiceId,
        typeAction: row.typeAction,
        moneyRefund: row.moneyRefund,
        moneyPaid: row.moneyPaid,
        reason: row.reason,
        reasonCancel: row.reasonCancel,
      };
      axios({
        method: "put",
        url: "http://localhost:9090/api/v1/export-receipt/action",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        data: order,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: "Updated successfully",
              type: "success",
            });
            this.handleGetInvoicesEx();
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
    },
    async getWarehouseSel() {
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

    async handleGetInvoicesEx() {
      var me = this;
      me.loadingTable = true;
      let params = {
        searchText: me.search.value,
        pageNo: me.paginationPage.pageNo,
        pageSize: me.paginationPage.pageSize,
        sorting: me.paginationPage.sorting,
        orderBy: me.paginationPage.orderBy,
        warehouse: me.warehouseData.value,
      };
      if (!me.warehouseData?.value) {
        params = {
          ...params,
          warehouseChainId: me.warehouseChain.warehouseChainId,
          roleOfUser: me.user.roles.join(),
        };
      }
      await axios
        .get("http://localhost:9090/api/v1/invoice/list", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params,
        })
        .then(function (response) {
          me.invoices = response.data.items.content;
          me.loadingTable = false;
          me.paginationVal.currentPage = response.data.items.pageNum;
          me.paginationVal.pageSizeList = [10, 20, 30, 50, 100];
          me.paginationVal.currentPage = response.data.items.number + 1;
          me.paginationVal.pageSizeval = response.data.items.size;
          me.paginationVal.total = response.data.items.totalElements;
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
    if (!this.user.roles.includes("ADMIN")) {
      this.warehouseData.value = this.warehouse.warehouseId;
      this.warehouseData.disabled = "disabled";
    }
    await this.getWarehouseSel();
    await this.handleGetInvoicesEx();
  },
};
</script>
<style>
.tab-invoice .el-tabs__header .el-tabs__nav-wrap {
  padding-left: 15px !important;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
