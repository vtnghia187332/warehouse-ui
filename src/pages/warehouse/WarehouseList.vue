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
          class="ml-1 !bg-[#f4f3ef] border !border-gray-300 text-black font-medium py-2 px-4 rounded-sm"
          @click="goWarehouseHistoryPage"
        >
          <i class="el-icon-files font-bold"></i> History
        </button>
        <button
          class="ml-1 !bg-blue-400 text-white font-bold py-2 px-4 rounded-sm"
          @click="HandleImportWarehouse"
        >
          <i class="el-icon-plus ml font-bold"></i> Import
        </button>
        <button
          class="ml-1 !bg-blue-400 text-white font-bold py-2 px-4 rounded-sm"
          @click="testFunc"
        >
          <i class="el-icon-plus ml font-bold"></i> Export
        </button>
        <button
          class="ml-1 !bg-blue-400 text-white font-bold py-2 px-4 rounded-sm"
          @click="HandleAddWarehouse"
        >
          <i class="el-icon-plus ml font-bold"></i> Create
        </button>
      </div>
    </div>
    <LoadingPage v-show="loadingTable"></LoadingPage>
    <div class="table_style px-2" v-show="!loadingTable">
      <el-table
        :data="warehouses"
        style="width: 100%"
        @row-dblclick="goToDetailWarehouse"
        @sort-change="sortChange"
        height="800"
      >
        <div slot="append" v-if="warehouses.length == '0'">
          <el-empty :image-size="300"></el-empty>
        </div>
        <el-table-column
          fixed
          prop="warehouseId"
          label="Warehouse ID"
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
        <el-table-column
          prop="warehouseChainInfo"
          label="Warehouse Chain"
          width="300"
        >
          <template slot-scope="scope">
            {{ scope.row.warehouseChainInfo.name }}
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="code"
          label="Warehouse Code"
          width="300"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="name"
          label="Warehouse Name"
          width="300"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="shortName"
          label="Warehouse Short Name"
          width="300"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="addressDes"
          label="Warehouse Address"
          width="300"
        >
        </el-table-column>
        <el-table-column prop="keyContactVos" label="Contact Title" width="300">
          <template slot-scope="scope">
            {{ scope.row.keyContactVos[0].title }}
          </template>
        </el-table-column>
        <el-table-column
          prop="keyContactVos"
          label="Contact First Name"
          width="300"
        >
          <template slot-scope="scope">
            {{ scope.row.keyContactVos[0].firstName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="keyContactVos"
          label="Contact Last Name"
          width="300"
        >
          <template slot-scope="scope">
            {{ scope.row.keyContactVos[0].lastName }}
          </template>
        </el-table-column>
        <el-table-column prop="keyContactVos" label="Contact Email" width="300">
          <template slot-scope="scope">
            {{ scope.row.keyContactVos[0].email }}
          </template>
        </el-table-column>
        <el-table-column
          prop="keyContactVos"
          label="Contact Mobile Phone"
          width="300"
        >
          <template slot-scope="scope">
            {{ scope.row.keyContactVos[0].mobilePhone }}
          </template>
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
    <ImportDialog
      v-show="isOpenDialogImport"
      :isOpenDialogImport.sync="isOpenDialogImport"
    >
    </ImportDialog>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import axios from "axios";
import ImportDialog from "../../components/OverrideDialog/ImportDialog.vue";
import BaseSearch from "../../components/Inputs/BaseSearch.vue";
import BasePagination from "../../components/Pagination/BasePagination.vue";
import LoadingPage from "@/components/Cards/LoadingPage";

export default {
  components: {
    BaseSearch,
    BasePagination,
    LoadingPage,
    ImportDialog,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      isOpenDialogTest: false,
      isOpenDialogImport: false,
      templateUrl: "",
      timer: 0,
      search: {
        value: "",
        class: "w-96",
      },
      loadingTable: false,
      warehouses: [],
      warehouseDetail: {},
      paginationPage: {
        pageNo: 1,
        pageSize: 30,
        sorting: "createdAt",
        orderBy: "DESC",
      },
      paginationVal: {},
    };
  },
  computed: {},
  methods: {
    sortChange(column, prop, order) {
      if (column.prop.order == null) {
        this.paginationPage = {
          pageNo: 1,
          pageSize: 30,
          sorting: "createdAt",
          orderBy: "DESC",
        };
      } else {
        this.paginationPage.sorting = null;
        this.paginationPage.orderby = null;
        this.paginationPage.sorting = column.prop;
        if (column.prop.order == "ascending") {
          this.paginationPage.orderby = "ASC";
        } else {
          this.paginationPage.orderby = "DESC";
        }
      }
      this.getWarehouses();
    },
    async testFunc() {
      let me = this;
      // time biến thành tên của file
      const tempDateTime = new Date();
      const fileName = `WarehouseTemplate${tempDateTime.getTime()}.xlsx`;
      //  Khai báo mảng để hứng dữ liệu nguyên vật liệu trả về
      await axios
        .get("http://localhost:9090/api/v1/warehouse/template", {
          responseType: "blob",
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
        .catch(function (res) {
        });
    },
    goWarehouseHistoryPage() {
      this.$router.push({ name: "warehouse-history" });
    },
    HandleImportWarehouse() {
      this.isOpenDialogImport = true;
    },
    getBaseSearchVal(param) {
      // clears the timer on a call so there is always x seconds in between calls
      clearTimeout(this.timer);
      // if the timer resets before it hits 150ms it will not run
      this.timer = setTimeout(
        function () {
          this.search.value = param;
          this.getWarehouses();
        }.bind(this),
        300
      );
    },
    HandleAddWarehouse() {
      let data = {
        id: null,
        type: "ADD",
      };
      this.$router.push({
        name: "warehouse-detail", //use name for router push
        params: { data },
      });
    },
    goToDetailWarehouse(row) {
      let data = {
        id: row.warehouseId,
        type: "EDIT",
      };
      this.$router.push({
        name: "warehouse-detail", //use name for router push
        params: { data },
      });
    },
    callApiToDelete(ids) {
      axios({
        method: "put",
        url: "http://localhost:9090/api/v1/warehouse/delete",
        headers: { "Access-Control-Allow-Origin": "*" },
        params: { ids },
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
            message: error,
            type: "error",
          });
        })
        .finally(() => this.getWarehouses());
    },
    handeDeleteDetail(row) {
      this.$confirm(`Are you want to delete ${row.warehouseId}?`)
        .then((_) => {
          const ids = row.id;
          this.callApiToDelete(ids);
        })
        .catch((_) => {});
    },
    handeDuplicateDetail(row) {
      let data = {
        id: row.warehouseId,
        type: "DUPLICATED",
      };
      this.$router.push({
        name: "warehouse-detail", //use name for router push
        params: { data },
      });
    },
    handleSizeChange(param) {
      this.paginationPage.pageNo = 1;
      this.paginationPage.pageSize = param;
      this.getWarehouses();
    },
    handleCurrentChange(param) {
      this.paginationPage.pageNo = param;
      this.getWarehouses();
    },
    getWarehouses() {
      var me = this;
      me.loadingTable = true;
      axios
        .get("http://localhost:9090/api/v1/warehouse/list", {
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
          me.warehouses = response.data.items.content;
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
    (this.paginationPage = {
      pageNo: 1,
      pageSize: 30,
      sorting: "createdAt",
      orderBy: "DESC",
    }),
      (this.search.value = "");
    this.getWarehouses();
  },
};
</script>

<style lang="scss" scoped>
.el-table__empty-text {
  display: none !important;
}

.end-right {
  display: flex;
  justify-content: end;
}

.table_style {
  height: calc(100vh - 185px);
  overflow: auto;
}
</style>
