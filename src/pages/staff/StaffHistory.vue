<template>
  <div class="fix_highted">
    <div class="flex justify-between px-4 py-2">
      <div class="flex">
        <BaseSearch :field="search" @get-value="getBaseSearchVal" />
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
        :data="staffs"
        style="width: 100%"
        @row-dblclick=""
        @sort-change=""
        height="800"
      >
        <div slot="append" v-if="staffs.length == '0'">
          <el-empty :image-size="300"></el-empty>
        </div>
        <el-table-column fixed prop="userId" label="ID nhân viên" width="150">
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

        <el-table-column sortable prop="code" label="Mã nhân viên" width="250">
        </el-table-column>
        <el-table-column sortable prop="firstname" label="Tên" width="200">
        </el-table-column>
        <el-table-column sortable prop="lastname" label="Họ" width="200">
        </el-table-column>
        <el-table-column sortable prop="email" label="Email" width="250">
        </el-table-column>
        <el-table-column
          sortable
          prop="nationalNumber"
          label="CMT / CCCD"
          width="180"
        >
        </el-table-column>
        <el-table-column sortable prop="role" label="Chức vụ" width="200">
          <template slot-scope="scope">
            {{ scope.row.roles[0].roleName }}
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="mobilePhone"
          label="Số điện thoại"
          width="150"
        >
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
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
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
  computed: {
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
        placeholder: "Select Warehouse",
        error: "",
        value: "",
        options: [],
      },
      loadingTable: false,
      search: {
        value: "",
        class: "w-96",
        placeholder: "Search by Name, Code,..",
      },
      paginationPage: {
        pageNo: 1,
        pageSize: 30,
        sorting: "editedAt",
        orderBy: "DESC",
      },
      paginationVal: {},
      staffs: [],
    };
  },
  methods: {
    filterByWarehouse(item) {
      if (!item) {
        this.warehouseData.value = null;
        this.handleGetUsersHis();
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
        this.handleGetUsersHis();
      }
    },
    handleSizeChange(param) {
      this.paginationPage.pageNo = 1;
      this.paginationPage.pageSize = param;
      this.handleGetUsersHis();
    },
    handleCurrentChange(param) {
      this.paginationPage.pageNo = param;
      this.handleGetUsersHis();
    },
    getBaseSearchVal(param) {
      // clears the timer on a call so there is always x seconds in between calls
      clearTimeout(this.timer);
      // if the timer resets before it hits 150ms it will not run
      this.timer = setTimeout(
        function () {
          this.search.value = param;
          this.handleGetUsersHis();
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
    async handleGetUsersHis() {
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
        .get("http://localhost:9090/api/v1/user/history", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params,
        })
        .then(function (response) {
          me.staffs = response.data.items.content;
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
    if (!this.user.roles.includes("ADMIN")) {
      this.warehouseData.value = this.warehouse.warehouseId;
    }
    await this.getWarehouseSel();
    await this.handleGetUsersHis();
  },
};
</script>
<style></style>
