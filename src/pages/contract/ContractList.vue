<template>
  <div class="">
    <div class="flex justify-between px-4 py-2">
      <div class="flex">
        <BaseSearch :field="search" @get-value="getBaseSearchVal" />
        <button
          class="ml-1 !bg-[#f4f3ef] border !border-gray-300 text-black font-medium py-2 px-4 rounded-sm"
        >
          <span class="ti-filter"></span> Tìm kiếm
        </button>
      </div>
      <div class="flex space-x-1">
        <el-select
          class="w-[180px]"
          v-model="typeInvoice.value"
          placeholder="Chọn loại hóa đơn"
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
          placeholder="Chọn trạng thái"
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
          :disabled="warehouseData.disabled === 'disabled'"
          placeholder="Chọn cửa hàng"
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
          <i class="el-icon-plus ml font-bold"></i> Lịch sử
        </button>
        <button
          class="ml-1 !bg-blue-400 text-white font-bold py-2 px-4 rounded-sm"
          @click="exportInvoiceExport"
        >
          <i class="el-icon-plus ml font-bold"></i> Xuất khẩu
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
          label="Hóa đơn ID"
          width="150"
        >
        </el-table-column>
        <el-table-column sortable prop="createdAt" label="Ngày tạo" width="200">
        </el-table-column>
        <el-table-column sortable prop="editedAt" label="Ngày sửa" width="200">
        </el-table-column>
        <el-table-column sortable prop="name" label="Tên hóa đơn" width="250">
        </el-table-column>
        <el-table-column sortable prop="code" label="Mã hóa đơn" width="250">
        </el-table-column>
        <el-table-column
          sortable
          prop="typeInvoice"
          label="Loại hóa đơn"
          width="150"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.typeInvoice == 1 ? 'success' : 'primary'"
              disable-transitions
              >{{
                scope.row.typeInvoice == 1 ? "Nhập hàng" : "Bán hàng"
              }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column sortable prop="" label="Khách hàng" width="250">
          <template slot-scope="scope">
            {{ scope.row.customer.fullName }}
          </template>
        </el-table-column>
        <el-table-column sortable prop="" label="Doanh nghiệp" width="250">
          <template slot-scope="scope">
            {{ scope.row.customer.companyName }}
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="invoiceStage"
          label="Trạng thái"
          width="200"
        >
        </el-table-column>
        <el-table-column sortable label="Tổng tiền hóa đơn" width="200">
          <template slot-scope="scope">
            {{ !scope.row.totalPaid ? "" : addCommas(scope.row.totalPaid) }}
          </template>
        </el-table-column>
        <el-table-column label="Số tiền đã trả" width="200">
          <template slot-scope="scope">
            {{ !scope.row.moneyPaid ? "" : addCommas(scope.row.moneyPaid) }}
          </template>
        </el-table-column>
        <el-table-column prop="consignee" label="Người nhận hàng" width="200">
        </el-table-column>
        <el-table-column
          prop="phoneNumberReceipt"
          label="SĐT người nhận"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="deliveryAddress"
          label="Địa chỉ giao hàng"
          width="300"
        >
        </el-table-column>
        <el-table-column label="Số tiền hoàn trả" width="200">
          <template slot-scope="scope">
            {{ !scope.row.moneyRefund ? "" : addCommas(scope.row.moneyRefund) }}
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="Lý do hoàn tiền" width="300">
        </el-table-column>
        <el-table-column prop="reasonCancel" label="Lý do hủy" width="300">
        </el-table-column>
        <el-table-column fixed="right" label="Hành động" width="100">
          <template slot-scope="scope">
            <el-dropdown>
              <el-button @click="" type="text" size="small"
                ><i class="ti-more !ml-3"></i
              ></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <button
                    class="!bg-[#fdfdfd] text-black"
                    @click="handleAcquit(scope.row)"
                    :disabled="scope.row.invoiceStage == 'CANCELED'"
                  >
                    <i class=""></i>Trả nợ
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button
                    class="!bg-[#fdfdfd] text-black"
                    @click="handeRefund(scope.row)"
                    :disabled="scope.row.invoiceStage == 'CANCELED'"
                  >
                    <i class=""></i>Hoàn tiền
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button
                    class="!bg-[#fdfdfd] text-black"
                    @click="handeCancel(scope.row)"
                    :disabled="scope.row.invoiceStage == 'CANCELED'"
                  >
                    <i class=""></i> Hủy
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
        placeholder: "Tìm kiếm theo Tên, Mã, ...",
      },
      typeInvoice: {
        value: "",
        options: [
          { label: "Tất cả", value: 0 },
          { label: "Nhập hàng", value: 1 },
          { label: "Bán hàng", value: 2 },
        ],
      },
      acquited: {
        title: "Trả thêm tiền",
        invoiceId: null,
        needToPay: 0,
        moneyPaid: {
          id: "moneyPaid",
          name: "Acquit Money",
          rules: "required",
          classes: "w-full col-span-6",
          type: "text",
          label: "Tiền thanh toán",
          isRequired: "true",
          value: "",
          placeholder: "Nhập số tiền cần thanh toán...",
          maxlength: 100,
          error: "",
        },
      },
      canceled: {
        title: "Huỷ hoá đơn",
        invoiceId: null,
        reasonCancel: {
          id: "reasonCancel",
          name: "Reason",
          rules: "required",
          classes: "w-full col-span-6 !h-[64px]",
          type: "text",
          label: "Lý do",
          isRequired: "true",
          value: "",
          placeholder: "Nhập lý do hủy...",
          maxlength: 250,
          error: "",
        },
      },
      refund: {
        title: "Hoàn lại tiền",
        invoiceId: null,
        totalInvoicePaid: 0,
        moneyRefund: {
          id: "moneyRefund",
          name: "Money Refund",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Hoàn trả",
          isRequired: "true",
          value: "",
          placeholder: "Nhập số tiền hoàn trả...",
          maxlength: 50,
          error: "",
        },
        reason: {
          id: "reason",
          name: "Reason",
          rules: "required",
          classes: "w-full col-span-6 !h-[64px]",
          type: "text",
          label: "Lý do hoàn tiền",
          isRequired: "true",
          value: "",
          placeholder: "Nhập lý do hoàn trả...",
          maxlength: 250,
          error: "",
        },
      },
      statusInvoice: {
        value: "",
        options: [
          { label: "Chưa trả", value: 1 },
          { label: "Đã trả", value: 2 },
          { label: "Huỷ", value: 3 },
          { label: "Hoàn tiền toàn phần", value: 4 },
          { label: "Hoàn tiền một phần", value: 5 },
          { label: "Ghi nợ", value: 6 },
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
    goToDetail(row) {
      let data = {
        id: row.invoiceId,
        type: "VIEW",
      };
      this.$router.push({
        name: "Hoá đơn chi tiết", //use name for router push
        params: { data },
      });
    },
    getInvoiceHistory() {
      this.$router.push({ name: "Lịch sử thay đổi hóa đơn" });
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
          if ("Chưa trả" == itemStr) {
            this.paginationPage.invoiceStatus = "UNPAID";
          } else if ("Đã trả" == itemStr) {
            this.paginationPage.invoiceStatus = "PAID";
          } else if ("Huỷ" == itemStr) {
            this.paginationPage.invoiceStatus = "CANCELED";
          } else if ("Hoàn tiền toàn phần" == itemStr) {
            this.paginationPage.invoiceStatus = "REFUND_ALL";
          } else if ("Hoàn tiền một phần" == itemStr) {
            this.paginationPage.invoiceStatus = "REFUND_LITTLE";
          } else if ("Ghi nợ" == itemStr) {
            this.paginationPage.invoiceStatus = "IN_DEBT";
          }
        }
        this.handleGetInvoicesEx();
      }
    },
    async handeExportPDF(item) {
      let me = this;
      me.loadingTable = true;
      let params = {
        warehouse: me.warehouse.warehouseId,
        invoiceId: item.invoiceId,
      };
      if (!me.warehouse?.warehouseId && me.user.roles.includes("ADMIN")) {
        params = {
          ...params,
          warehouseChainId: me.warehouseChain.warehouseChainId,
        };
      }
      // time biến thành tên của file
      const tempDateTime = new Date();
      const fileName = `Hoa_Don_ ${tempDateTime.getTime()}.pdf`;
      //  Khai báo mảng để hứng dữ liệu nguyên vật liệu trả về
      await axios
        .get("http://localhost:9090/api/v1/invoice/generate/pdf", {
          responseType: "blob",
          params,
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
            me.loadingTable = false;
          }
        })
        .catch(function (response) {
          me.loadingTable = false;
          this.$message({
            showClose: true,
            message: error.response.data.items,
            type: "error",
          });
        });
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
      me.loadingTable = true;
      let params = {
        searchText: me.search.value,
        pageNo: me.paginationPage.pageNo,
        pageSize: me.paginationPage.pageSize,
        sorting: me.paginationPage.sorting,
        orderBy: me.paginationPage.orderBy,
        invoiceType: me.paginationPage.invoiceType,
        invoiceStatus: me.paginationPage.invoiceStatus,
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
            me.loadingTable = false;
          }
        })
        .catch(function (error) {
          this.$message({
            showClose: true,
            message: error.response.data.items,
            type: "error",
          });
          me.loadingTable = false;
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
      this.refund.reason.value = "";
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
              message: "Sửa thành công",
              type: "success",
            });
            this.handleGetInvoicesEx();
          }
        })
        .catch((error) => {
          if (error.response.data.items) {
            this.$message({
              showClose: true,
              message: error.response.data.items,
              type: "error",
            });
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
        invoiceType: me.paginationPage.invoiceType,
        invoiceStatus: me.paginationPage.invoiceStatus,
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
          me.loadingTable = false;
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
