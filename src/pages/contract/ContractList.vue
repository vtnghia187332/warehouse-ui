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
      <div class="flex">
        <el-select
          class="w-[180px]"
          v-model="typeInvoice.value"
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
        @row-dblclick=""
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
          prop="totalPaid"
          label="Total Payment"
          width="200"
        >
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
                    @click="handeCancel(scope.row)"
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
  </div>
</template>
<script>
import axios from "axios";
import BaseSearch from "../../components/Inputs/BaseSearch.vue";
import BasePagination from "../../components/Pagination/BasePagination.vue";
import BaseSelection from "../../components/Inputs/BaseSelection.vue";
import LoadingPage from "@/components/Cards/LoadingPage";
export default {
  components: {
    BaseSearch,
    BasePagination,
    BaseSelection,
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
      typeInvoice: {
        value: "",
        options: [
          { label: "All", value: 0 },
          { label: "Receipt", value: 1 },
          { label: "Export", value: 2 },
        ],
      },
      loadingTable: false,
      paginationPage: {
        pageNo: 1,
        pageSize: 30,
        sorting: "createdAt",
        orderBy: "DESC",
        invoiceType: 0,
      },
      paginationVal: {},
      invoices: [],
    };
  },
  methods: {
    updateInputType(item) {
      if (!item) {
        this.paginationPage.invoiceType = 0;
      } else {
        this.paginationPage.invoiceType = item;
      }
      this.handleGetInvoicesEx();
    },
    async exportInvoiceExport() {
      let me = this;

      const tempDateTime = new Date();
      const fileName = `Invoice${tempDateTime.getTime()}.xlsx`;
      await axios
        .get("http://localhost:9090/api/v1/invoice/export", {
          responseType: "blob",
          contentType: "application/json-patch+json",
          params: {
            searchText: me.search.value,
            pageNo: me.paginationPage.pageNo,
            pageSize: me.paginationPage.pageSize,
            sorting: me.paginationPage.sorting,
            orderBy: me.paginationPage.orderBy,
            invoiceType: me.paginationPage.invoiceType,
          },
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
    handeCancel(row) {
    },
    handleGetInvoicesEx() {
      var me = this;
      me.loadingTable = true;
      axios
        .get("http://localhost:9090/api/v1/invoice/list", {
          headers: { "Access-Control-Allow-Origin": "*" },
          params: {
            searchText: me.search.value,
            pageNo: me.paginationPage.pageNo,
            pageSize: me.paginationPage.pageSize,
            sorting: me.paginationPage.sorting,
            orderBy: me.paginationPage.orderBy,
            invoiceType: me.paginationPage.invoiceType,
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
            message: error,
            type: "error",
          });
        });
    },
  },
  mounted() {
    this.handleGetInvoicesEx();
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
