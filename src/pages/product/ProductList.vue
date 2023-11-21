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
          @click="handleGetHistory"
        >
          <i class="el-icon-plus ml font-bold"></i> History
        </button>
        <button
          class="ml-1 !bg-blue-400 text-white font-bold py-2 px-4 rounded-sm"
          @click="handExportProducts"
        >
          <i class="el-icon-plus ml font-bold"></i> Export
        </button>
        <button
          class="ml-1 !bg-blue-400 text-white font-bold py-2 px-4 rounded-sm"
          @click="HandleImportProduct"
        >
          <i class="el-icon-plus ml font-bold"></i> Import
        </button>
        <button
          class="ml-1 !bg-blue-400 text-white font-bold py-2 px-4 rounded-sm"
          @click="addProduct"
        >
          <i class="el-icon-plus ml font-bold"></i>
          Create
        </button>
      </div>
    </div>
    <LoadingPage v-show="loadingTable"></LoadingPage>
    <div class="table_style px-2" v-show="!loadingTable">
      <el-table
        :data="products"
        style="width: 100%"
        @row-dblclick="updateProduct"
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
          width="300"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="importPrice"
          label="Import Price"
          width="200"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="exportPrice"
          label="Export Price"
          width="200"
        >
        </el-table-column>
        <el-table-column prop="color" label="Color" width="150">
        </el-table-column>
        <el-table-column prop="singleUnit" label="Single Unit" width="150">
          <template slot-scope="scope">
            {{ scope.row.singleUnit.name }}
          </template>
        </el-table-column>

        <el-table-column sortable prop="height" label="Height" width="200">
        </el-table-column>

        <el-table-column sortable prop="width" label="Width" width="200">
        </el-table-column>

        <el-table-column sortable prop="length" label="Length" width="200">
        </el-table-column>

        <el-table-column prop="categoryProductRes" label="Category" width="150">
          <template slot-scope="scope">
            {{ scope.row.categoryProductRes.name }}
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="expiredDate"
          label="Expired Date"
          width="250"
        >
        </el-table-column>

        <el-table-column fixed="right" label="Operations" width="100">
          <template slot-scope="scope">
            <el-button
              @click="handeDuplicateDetail(scope.row)"
              type="text"
              size="small"
              ><i class="el-icon-document-copy text-2xl"></i
            ></el-button>
            <el-button
              @click="handeDeleteDetail(scope.row)"
              type="text"
              size="small"
              ><i class="el-icon-delete text-2xl"></i
            ></el-button>
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
import { ValidationObserver, ValidationProvider } from "vee-validate";
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
    ValidationObserver,
    ValidationProvider,
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
    handleGetHistory() {
      this.$router.push({ name: "product history" });
    },
    HandleImportProduct() {
      this.isOpenDialogImport = true;
    },
    updateProduct(row) {
      let data = {
        id: row.productId,
        type: "EDIT",
      };
      this.$router.push({
        name: "product-detail", //use name for router push
        params: { data },
      });
    },

    addProduct() {
      let data = {
        id: null,
        type: "ADD",
      };
      this.$router.push({
        name: "product-detail",
        params: { data },
      });
    },
    handleSizeChange(param) {
      this.paginationPage.pageNo = 1;
      this.paginationPage.pageSize = param;
      this.handleGetProducts();
    },
    handleCurrentChange(param) {
      this.paginationPage.pageNo = param;
      this.handleGetProducts();
    },
    handeDuplicateDetail(row) {
      let data = {
        id: row.productId,
        type: "DUPLICATED",
      };
      this.$router.push({
        name: "product-detail", //use name for router push
        params: { data },
      });
    },
    handeDeleteDetail(row) {
      this.$confirm(`Are you want to delete ${row.productId}?`)
        .then((_) => {
          this.handleDeleteProduct(row.productId);
        })
        .catch((_) => {});
    },
    handleDeleteProduct(productId) {
      axios({
        method: "delete",
        url: "http://localhost:9090/api/v1/product",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        params: { productId },
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: "Deleted successfully",
              type: "success",
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
        .finally(() => this.handleGetProducts());
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
    async handExportProducts() {
      let me = this;
      const tempDateTime = new Date();
      const fileName = `Product${tempDateTime.getTime()}.xlsx`;
      await axios
        .get("http://localhost:9090/api/v1/product/export", {
          responseType: "blob",
          contentType: "application/json-patch+json",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: {
            searchText: me.search.value,
            pageNo: me.paginationPage.pageNo,
            pageSize: me.paginationPage.pageSize,
            sorting: me.paginationPage.sorting,
            orderBy: me.paginationPage.orderBy,
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
    handleGetProducts() {
      var me = this;
      me.loadingTable = true;
      axios
        .get("http://localhost:9090/api/v1/product/list", {
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
            message: error.response.data.items,
            type: "error",
          });
        });
    },
  },
  mounted() {
    (this.paginationPage = {
      pageNo: 1,
      pageSize: 30,
      sorting: "createdAt",
      orderBy: "DESC",
    }),
      (this.search.value = "");
    this.handleGetProducts();
  },
};
</script>
<style></style>
