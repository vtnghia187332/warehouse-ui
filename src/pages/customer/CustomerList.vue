<template>
  <div class="fix_highted">
    <div class="flex justify-between px-4 py-2">
      <div class="flex">
        <BaseSearch :field="search" @get-value="getBaseSearchVal" />
        <button
          class="ml-1 !bg-[#f4f3ef] border !border-gray-300 text-black font-medium py-2 px-4 rounded-sm"
        >
          <span class="ti-filter"></span> Filter
        </button>
      </div>
      <div>
        <button
          class="ml-1 !bg-blue-400 text-white font-bold py-2 px-4 rounded-sm"
          @click=""
        >
          <i class="el-icon-plus ml font-bold"></i> Export
        </button>
        <button
          class="ml-1 !bg-blue-400 text-white font-bold py-2 px-4 rounded-sm"
          @click="addCustomer"
        >
          <i class="el-icon-plus ml font-bold"></i>
          Create
        </button>
      </div>
    </div>
    <LoadingPage v-show="loadingTable"></LoadingPage>
    <div class="table_style px-2" v-show="!loadingTable">
      <el-table
        :data="customers"
        style="width: 100%"
        @row-dblclick=""
        @sort-change=""
        height="800"
      >
        <div slot="append" v-if="customers.length == '0'">
          <el-empty :image-size="300"></el-empty>
        </div>
        <el-table-column
          fixed
          prop="customerId"
          label="Customer ID"
          width="150"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="createdAt"
          label="Create Date"
          width="250"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="editedAt"
          label="Updated Date"
          width="250"
        >
        </el-table-column>
        <el-table-column sortable prop="fullName" label="Full Name" width="250">
        </el-table-column>
        <el-table-column sortable prop="gender" label="Gender" width="250">
        </el-table-column>
        <el-table-column sortable prop="birthDay" label="Birthday" width="250">
        </el-table-column>
        <el-table-column
          sortable
          prop="mobilePhone"
          label="Mobile Phone"
          width="250"
        >
        </el-table-column>
        <el-table-column sortable prop="email" label="Email" width="250">
        </el-table-column>
        <el-table-column
          sortable
          prop="detailAddress"
          label="Address"
          width="350"
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
import { ValidationObserver, ValidationProvider } from "vee-validate";
import axios from "axios";
import BaseSearch from "../../components/Inputs/BaseSearch.vue";
import BasePagination from "../../components/Pagination/BasePagination.vue";
import LoadingPage from "@/components/Cards/LoadingPage";
export default {
  components: {
    BaseSearch,
    BasePagination,
    LoadingPage,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      search: {
        value: "",
        class: "w-96",
      },
      loadingTable: false,
      customers: [],
      paginationPage: {
        pageNo: 1,
        pageSize: 30,
        sorting: "createdAt",
        orderBy: "DESC",
      },
      paginationVal: {},
    };
  },
  methods: {
    addCustomer() {
      let data = {
        id: null,
        type: "ADD",
      };
      this.$router.push({
        name: "customer-detail",
        params: { data },
      });
    },
    getBaseSearchVal(param) {
      // clears the timer on a call so there is always x seconds in between calls
      clearTimeout(this.timer);
      // if the timer resets before it hits 150ms it will not run
      this.timer = setTimeout(
        function () {
          this.search.value = param;
          this.handleGetCustomers();
        }.bind(this),
        300
      );
    },
    handleSizeChange(param) {
      this.paginationPage.pageNo = 1;
      this.paginationPage.pageSize = param;
      this.handleGetCustomers();
    },
    handleCurrentChange(param) {
      this.paginationPage.pageNo = param;
      this.handleGetCustomers();
    },
    handleGetCustomers() {
      var me = this;
      me.loadingTable = true;
      axios
        .get("http://localhost:9090/api/v1/customer/list", {
          headers: { "Access-Control-Allow-Origin": "*" },
          params: {
            searchText: me.search.value,
            pageNo: me.paginationPage.pageNo,
            pageSize: me.paginationPage.pageSize,
            sorting: me.paginationPage.sorting,
            orderBy: me.paginationPage.orderBy,
          },
        })
        .then(function (response) {
          me.customers = response.data.items.content;
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
    this.handleGetCustomers();
  },
};
</script>
<style></style>
