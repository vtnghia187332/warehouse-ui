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
        :data="products"
        style="width: 100%"
        @row-dblclick=""
        @sort-change=""
        height="765"
      >
        <div slot="append" v-if="products.length == '0'">
          <el-empty :image-size="300"></el-empty>
        </div>
        <el-table-column
          fixed
          prop="productId"
          label="ID Nguyên vật liệu"
          width="150"
        >
        </el-table-column>
        <el-table-column sortable prop="createdAt" label="Ngày tạo" width="250">
        </el-table-column>
        <el-table-column sortable prop="editedAt" label="Ngày sửa" width="250">
        </el-table-column>
        <el-table-column
          sortable
          prop="createdBy"
          label="Người tạo"
          width="250"
        >
        </el-table-column>
        <el-table-column sortable prop="editedBy" label="Người sửa" width="250">
        </el-table-column>
        <el-table-column prop="actionType" label="Hành động" width="150">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.actionType == 0 ? 'success' : 'primary'"
              disable-transitions
              >{{ scope.row.actionType == 0 ? "Thêm mới" : "Sửa đổi" }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="code"
          label="Mã Nguyên vật liệu"
          width="250"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="name"
          label="Nguyên vật liệu"
          width="250"
        >
        </el-table-column>
        <el-table-column sortable prop="description" label="Mô tả" width="150">
        </el-table-column>
        <el-table-column prop="quantity" label="Số lượng" width="150">
        </el-table-column>
        <el-table-column prop="importPrice" label="Giá nhập" width="150">
        </el-table-column>
        <el-table-column prop="exportPrice" label="Giá bán" width="150">
        </el-table-column>
        <el-table-column prop="expiredDate" label="Ngày hết hạn" width="250">
        </el-table-column>
        <el-table-column prop="color" label="Màu sắc" width="150">
        </el-table-column>
        <el-table-column prop="height" label="chiều cao" width="150">
        </el-table-column>
        <el-table-column prop="width" label="Chiều rộng" width="150">
        </el-table-column>
        <el-table-column prop="length" label="Chiều dài" width="150">
        </el-table-column>
        <el-table-column prop="singleUnit" label="Đơn vị" width="150">
          <template slot-scope="scope">
            {{ scope.row.singleUnit.name }}
          </template>
        </el-table-column>
        <el-table-column prop="invoiceRes" label="Hóa đơn ID" width="100">
          <template slot-scope="scope">
            <el-link
              @click="handleInvoiceDetail(scope.row?.invoiceRes?.invoiceId)"
            >
              {{ scope.row?.invoiceRes?.invoiceId }}</el-link
            >
          </template>
        </el-table-column>
        <el-table-column prop="categoryProductRes" label="Danh mục" width="150">
          <template slot-scope="scope">
            {{ scope.row.categoryProductRes.name }}
          </template>
        </el-table-column>
        <el-table-column prop="isActive" label="Trạng thái" width="150">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.isActive === 1 ? 'success' : 'danger'"
              disable-transitions
              >{{
                scope.row.isActive == 1 ? "Hoạt động" : "Không hoạt động"
              }}</el-tag
            >
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
import { mapGetters, mapMutations, mapActions } from "vuex";
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
        disabled: "non-disabled",
        placeholder: "Select Warehouse",
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
        sorting: "editedAt",
        orderBy: "DESC",
      },
      paginationVal: {},
    };
  },
  methods: {
    handleInvoiceDetail(item) {
      let data = {
        id: item,
        type: "EDIT",
      };
      this.$router.push({
        name: "Hoá đơn chi tiết",
        params: { data },
      });
    },
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
        .get("http://localhost:9090/api/v1/product/history", {
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
  },
  async mounted() {
    this.warehouseData.value = this.warehouse.warehouseId;
    if (!this.user.roles.includes("ADMIN")) {
      this.warehouseData.value = this.warehouse.warehouseId;
      this.warehouseData.disabled = "disabled";
    }
    await this.getWarehouseSel();
    await this.handleGetProducts();
  },
};
</script>
<style></style>
