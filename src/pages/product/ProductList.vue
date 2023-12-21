<template>
  <div class="fix_highted">
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
          @click="handleGetHistory"
        >
          <i class="el-icon-plus ml font-bold"></i> Lịch sử
        </button>
        <button
          class="ml-1 !bg-blue-400 text-white font-bold py-2 px-4 rounded-sm"
          @click="handExportProducts"
        >
          <i class="el-icon-plus ml font-bold"></i> Xuất khẩu
        </button>
        <button
          class="ml-1 !bg-blue-400 text-white font-bold py-2 px-4 rounded-sm"
          @click="HandleImportProduct"
        >
          <i class="el-icon-plus ml font-bold"></i> Nhập khẩu
        </button>
        <button
          class="ml-1 !bg-blue-400 text-white font-bold py-2 px-4 rounded-sm"
          @click="addProduct"
        >
          <i class="el-icon-plus ml font-bold"></i>
          Thêm
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
        height="780"
      >
        <div slot="append" v-if="products.length == '0'">
          <el-empty :image-size="300"></el-empty>
        </div>
        <el-table-column fixed prop="productId" label="ID Sản phẩm" width="150">
        </el-table-column>
        <el-table-column sortable prop="createdAt" label="Ngày tạo" width="250">
        </el-table-column>
        <el-table-column sortable prop="editedAt" label="Ngày sửa" width="250">
        </el-table-column>
        <el-table-column
          sortable
          prop="code"
          label="Mã nguyên vật liệu"
          width="250"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="name"
          label="Tên nguyên vật liệu"
          width="250"
        >
        </el-table-column>
        <el-table-column sortable prop="description" label="Mô tả" width="300">
        </el-table-column>
        <el-table-column
          sortable
          prop="importPrice"
          label="Giá nhập"
          width="200"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="exportPrice"
          label="Giá bán"
          width="200"
        >
        </el-table-column>
        <el-table-column prop="color" label="Màu sắc" width="150">
        </el-table-column>
        <el-table-column prop="singleUnit" label="Đơn vị" width="150">
          <template slot-scope="scope">
            {{ scope.row.singleUnit.name }}
          </template>
        </el-table-column>

        <el-table-column sortable prop="height" label="Chiều cao" width="150">
        </el-table-column>

        <el-table-column sortable prop="width" label="Chiều rộng" width="150">
        </el-table-column>

        <el-table-column sortable prop="length" label="Chiều dài" width="150">
        </el-table-column>
        <el-table-column sortable prop="volume" label="Thể tích" width="150">
        </el-table-column>

        <el-table-column prop="categoryProductRes" label="Danh mục" width="150">
          <template slot-scope="scope">
            {{ scope.row.categoryProductRes.name }}
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="expiredDate"
          label="Ngày hết hạn"
          width="250"
        >
        </el-table-column>
        <el-table-column fixed="right" label="Hành động" width="100">
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
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";
import moment from "moment";
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
        disabled: "not-disabled",
        placeholder: "Chọn cửa hàng",
        error: "",
        value: "",
        options: [],
      },
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
    filterByWarehouse(item) {
      if (!item) {
        this.warehouseData.value = null;
        this.handleGetProducts();
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
        this.handleGetProducts();
      }
    },
    handleGetHistory() {
      this.$router.push({ name: "Lịch sử thay đổi Nguyên Vật Liệu" });
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
        name: "Chi tiết Nguyên Vật Liệu", //use name for router push
        params: { data },
      });
    },

    addProduct() {
      let data = {
        id: null,
        type: "ADD",
      };
      this.$router.push({
        name: "Chi tiết Nguyên Vật Liệu",
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
        name: "Chi tiết Nguyên Vật Liệu", //use name for router push
        params: { data },
      });
    },
    handeDeleteDetail(row) {
      this.$confirm(`Bạn có muốn xóa ${row.productId}?`)
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
              message: "Xóa thành công",
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
      clearTimeout(this.timer);
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
      const fileName = `Export_Product_${tempDateTime.getTime()}.xlsx`;
      await axios
        .get("http://localhost:9090/api/v1/product/export", {
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
    async handleGetProducts() {
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
        .get("http://localhost:9090/api/v1/product/list", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params,
        })
        .then(function (response) {
          me.products = response.data.items.content;
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
  },
  async mounted() {
    if (!this.user.roles.includes("ADMIN")) {
      this.warehouseData.value = this.warehouse.warehouseId;
      this.warehouseData.disabled = "disabled";
    }
    await this.handleGetProducts();
    await this.getWarehouseSel();
  },
};
</script>
<style></style>
