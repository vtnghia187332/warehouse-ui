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
      <div></div>
    </div>
    <LoadingPage v-show="loadingTable"></LoadingPage>
    <div class="table_style px-2" v-show="!loadingTable">
      <el-table
        :data="products"
        style="width: 100%"
        @row-dblclick=""
        @sort-change=""
        height="800"
      >
        <div slot="append" v-if="products.length == '0'">
          <el-empty :image-size="300"></el-empty>
        </div>
        <el-table-column fixed prop="productId" label="Product ID" width="150">
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
        <el-table-column sortable prop="code" label="Code" width="250">
        </el-table-column>
        <el-table-column sortable prop="name" label="Name" width="250">
        </el-table-column>
        <el-table-column
          sortable
          prop="description"
          label="Description"
          width="150"
        >
        </el-table-column>
        <el-table-column prop="color" label="Color" width="250">
        </el-table-column>
        <el-table-column prop="singleUnit" label="Single Unit" width="150">
          <template slot-scope="scope">
            {{ scope.row.singleUnit.name }}
          </template>
        </el-table-column>

        <el-table-column prop="categoryProductRes" label="Category" width="150">
          <template slot-scope="scope">
            {{ scope.row.categoryProductRes.name }}
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
    <ProductImportDialogVue
      v-show="isOpenDialogImport"
      :isOpenDialogImport.sync="isOpenDialogImport"
    />
  </div>
</template>
<script>
import axios from "axios";
import BaseSearch from "../../components/Inputs/BaseSearch.vue";
import BasePagination from "../../components/Pagination/BasePagination.vue";
import LoadingPage from "@/components/Cards/LoadingPage";
import ProductImportDialogVue from "./ProductImportDialog.vue";
export default {
  components: {
    BaseSearch,
    BasePagination,
    LoadingPage,
    ProductImportDialogVue,
  },
  data() {
    return {
      isOpenDialogImport: false,
      products: [],
      search: {
        value: "",
        class: "w-96",
      },
      loadingTable: false,
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
    handleSizeChange(param) {
      this.paginationPage.pageNo = 1;
      this.paginationPage.pageSize = param;
      this.handleGetProducts();
    },
    handleCurrentChange(param) {
      this.paginationPage.pageNo = param;
      this.handleGetProducts();
    },
    getBaseSearchVal(param) {
      // clears the timer on a call so there is always x seconds in between calls
      clearTimeout(this.timer);
      // if the timer resets before it hits 150ms it will not run
      this.timer = setTimeout(
        function () {
          this.search.value = param;
          this.handleGetProducts();
        }.bind(this),
        300
      );
    },
    handleGetProducts() {
      var me = this;
      me.loadingTable = true;
      axios
        .get("http://localhost:9090/api/v1/product/history", {
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
          me.products = response.data.items.content;
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
    this.handleGetProducts();
  },
};
</script>
<style></style>
