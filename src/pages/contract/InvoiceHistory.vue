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
          v-model="warehouseData.value"
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
      </div>
    </div>
    <LoadingPage v-show="loadingTable"></LoadingPage>
    <div class="table_style px-2" v-show="!loadingTable">
      <el-table
        :data="invoices"
        style="width: 100%"
        @sort-change=""
        height="785"
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
        <el-table-column sortable prop="createdAt" label="Ngày tạo" width="170">
        </el-table-column>
        <el-table-column sortable prop="editedAt" label="Ngày sửa" width="170">
        </el-table-column>

        <el-table-column
          sortable
          prop="createdBy"
          label="Người tạo"
          width="170"
        >
        </el-table-column>
        <el-table-column sortable prop="editedBy" label="Người sửa" width="170">
        </el-table-column>

        <el-table-column sortable prop="name" label="Tên hóa đơn" width="250">
        </el-table-column>
        <el-table-column sortable prop="code" label="Mã hóa đơn" width="250">
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
          prop="typeInvoice"
          label="Loại hóa đơn"
          width="150"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.typeInvoice == 1 ? 'success' : 'primary'"
              disable-transitions
              >{{
                scope.row.typeInvoice == 1 ? "Nhập hàng" : "bán hàng"
              }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="invoiceStage"
          label="Trạng thái"
          width="200"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="totalPaid"
          label="Tổng tiền hóa đơn"
          width="200"
        >
        </el-table-column>
        <el-table-column prop="moneyPaid" label="Số tiền đã trả" width="200">
        </el-table-column>
        <el-table-column prop="consignee" label="Người nhận hàng" width="200">
        </el-table-column>
        <el-table-column
          prop="phoneNumberReceipt"
          label="SĐT Người nhận"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="deliveryAddress"
          label="Địa chỉ giao hàng"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="moneyRefund"
          label="Số tiền hoàn trả"
          width="200"
        >
        </el-table-column>
        <el-table-column prop="reason" label="Lý do hoàn trả" width="300">
        </el-table-column>
        <el-table-column prop="reasonCancel" label="Lý do hủy" width="300">
        </el-table-column>
      </el-table>
    </div>
    <BasePagination
      v-show="!loadingTable"
      :field="paginationVal"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";
import moment from "moment";
import BaseSearch from "../../components/Inputs/BaseSearch.vue";
import BasePagination from "../../components/Pagination/BasePagination.vue";
import LoadingPage from "@/components/Cards/LoadingPage";
export default {
  components: {
    BaseSearch,
    BasePagination,
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
      warehouseData: {
        id: "warehouse",
        baseId: 0,
        name: "warehouse",
        rules: "required",
        classes: "w-full",
        isRequired: "true",
        placeholder: "Chọn cửa hàng",
        disabled: "non-disabled",
        error: "",
        value: "",
        options: [],
      },
      activeName: "first",
      search: {
        value: "",
        class: "w-96",
        placeholder: "Tìm kiếm theo tên, mã, ...",
      },
      loadingTable: false,
      paginationPage: {
        pageNo: 1,
        pageSize: 30,
        sorting: "editedAt",
        orderBy: "DESC",
      },
      paginationVal: {},
      invoices: [],
    };
  },
  methods: {
    filterByWarehouse(item) {
      if (!item) {
        this.warehouseData.value = null;
        this.handleGetInvoices();
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
        this.handleGetInvoices();
      }
    },
    async handleGetInvoices() {
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
        .get("http://localhost:9090/api/v1/invoice/history/list", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params,
        })
        .then(function (response) {
          me.invoices = response.data.items.content;
          me.loadingTable = false;
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: error.response.data.items,
            type: "error",
          });
        });
    },
    handleSizeChange(param) {
      this.paginationPage.pageNo = 1;
      this.paginationPage.pageSize = param;
      this.handleGetInvoices();
    },
    handleCurrentChange(param) {
      this.paginationPage.pageNo = param;
      this.handleGetInvoices();
    },
    getBaseSearchVal(param) {
      // clears the timer on a call so there is always x seconds in between calls
      clearTimeout(this.timer);
      // if the timer resets before it hits 150ms it will not run
      this.timer = setTimeout(
        function () {
          this.search.value = param;
          this.handleGetInvoices();
        }.bind(this),
        300
      );
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
            me.paginationVal.currentPage = res.data.items.pageNum;
            me.paginationVal.pageSizeList = [10, 20, 30, 50, 100];
            me.paginationVal.currentPage = res.data.items.number + 1;
            me.paginationVal.pageSizeval = res.data.items.size;
            me.paginationVal.total = res.data.items.totalElements;
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
    if (!this.user.roles.includes("ADMIN")) {
      this.warehouseData.value = this.warehouse.warehouseId;
      this.warehouseData.disabled = "disabled";
    }
    await this.handleGetInvoices();
    await this.getWarehouseSel();
  },
};
</script>
<style></style>
