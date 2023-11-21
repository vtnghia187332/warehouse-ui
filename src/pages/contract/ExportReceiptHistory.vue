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
    </div>
    <LoadingPage v-show="loadingTable"></LoadingPage>
    <div class="table_style px-2" v-show="!loadingTable">
      <el-table
        :data="invoices"
        style="width: 100%"
        @sort-change=""
        height="800"
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
          width="170"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="editedAt"
          label="Updated At"
          width="170"
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
              :type="scope.row.actionType == 1 ? 'success' : 'primary'"
              disable-transitions
              >{{ scope.row.actionType == 1 ? "RECEIPT" : "EXPORT" }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column sortable prop="code" label="Customer Name" width="250">
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
          prop="totalNeedPaid"
          label="Total Payment"
          width="200"
        >
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
import axios from "axios";
import BaseSearch from "../../components/Inputs/BaseSearch.vue";
import BasePagination from "../../components/Pagination/BasePagination.vue";
import LoadingPage from "@/components/Cards/LoadingPage";
export default {
  components: {
    BaseSearch,
    BasePagination,
    LoadingPage,
  },
  data() {
    return {
      activeName: "first",
      search: {
        value: "",
        class: "w-96",
        placeholder: "Search by Name, Code,..",
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
    handleGetInvoices() {
      var me = this;
      me.loadingTable = true;
      axios
        .get("http://localhost:9090/api/v1/export-receipt/history/list", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: {
            searchText: me.search.value,
            pageNo: me.paginationPage.pageNo,
            pageSize: me.paginationPage.pageSize,
            sorting: me.paginationPage.sorting,
            orderBy: me.paginationPage.orderBy,
          },
        })
        .then(function (response) {
          me.invoices = response.data.items.content;
          (me.paginationVal = {
            currentPage: response.data.items.pageNum,
            pageSizeList: [10, 20, 30, 50, 100],
            currentPage: response.data.items.number + 1,
            pageSizeval: response.data.items.size,
            total: response.data.items.totalElements,
          }),
            (me.loadingTable = false);
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
  },
  mounted() {
    this.handleGetInvoices();
  },
};
</script>
<style></style>
