<template>
  <el-tabs class="tab-invoice" v-model="activeName">
    <el-tab-pane label="Nhân viên" name="first">
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
              @click="handleGetHistoryUser"
            >
              <i class="el-icon-plus ml font-bold"></i> Lịch sử
            </button>
            <button
              class="ml-1 !bg-blue-400 text-white font-bold py-2 px-4 rounded-sm"
              @click="addUser"
            >
              <i class="el-icon-plus ml font-bold"></i>
              Thêm mới
            </button>
          </div>
        </div>
        <LoadingPage v-show="loadingTable"></LoadingPage>
        <div class="table_style px-2" v-show="!loadingTable">
          <el-table
            :data="staffs"
            style="width: 100%"
            @row-dblclick="getUserDetail"
            @sort-change=""
            height="725"
          >
            <div slot="append" v-if="staffs.length == '0'">
              <el-empty :image-size="300"></el-empty>
            </div>
            <el-table-column
              sortable
              prop="userId"
              label="ID nhân viên"
              width="150"
            >
            </el-table-column>
            <el-table-column
              sortable
              prop="createdAt"
              label="Ngày tạo"
              width="200"
            >
            </el-table-column>
            <el-table-column
              sortable
              prop="editedAt"
              label="Ngày sửa"
              width="200"
            >
            </el-table-column>
            <el-table-column sortable prop="firstname" label="Tên" width="200">
            </el-table-column>
            <el-table-column sortable prop="lastname" label="Họ" width="200">
            </el-table-column>
            <el-table-column
              sortable
              prop="mobilePhone"
              label="Số điện thoại"
              width="150"
            >
            </el-table-column>
            <el-table-column sortable prop="email" label="Email" width="200">
            </el-table-column>
            <el-table-column
              sortable
              prop="nationalNumber"
              label="CMT/CCCD"
              width="180"
            >
            </el-table-column>
            <el-table-column sortable prop="role" label="Chức vụ" width="200">
              <template slot-scope="scope">
                {{ scope.row.roles[0].roleName }}
              </template>
            </el-table-column>

            <el-table-column fixed="right" label="Operations" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="handeRenewPwd(scope.row)"
                  type="text"
                  size="small"
                  ><i class="el-icon-refresh-right text-2xl"></i
                ></el-button>
                <el-button
                  @click="handeDeleteUser(scope.row)"
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
      </div>
    </el-tab-pane>
    <el-tab-pane label="Chức vụ" name="second">
      <div class="">
        <div class="flex justify-between px-4 py-2">
          <div class="flex">
            <BaseSearch :field="searchRole" @get-value="getBaseSearchRole" />
            <button
              class="ml-1 !bg-[#f4f3ef] border !border-gray-300 text-black font-medium py-2 px-4 rounded-sm"
            >
              <span class="ti-filter"></span> Tìm kiếm
            </button>
          </div>
          <div>
            <button
              class="ml-1 !bg-blue-400 text-white font-bold py-2 px-4 rounded-sm"
              @click="createRole"
            >
              <i class="el-icon-plus ml font-bold"></i> Thêm
            </button>
          </div>
        </div>
        <LoadingPage v-show="loadingTable"></LoadingPage>
        <div class="table_style px-2" v-show="!loadingTable">
          <el-table
            :data="roles"
            style="width: 100%"
            @row-dblclick="updateRole"
            @sort-change=""
            height="735"
          >
            <div slot="append" v-if="roles.length == '0'">
              <el-empty :image-size="300"></el-empty>
            </div>
            <el-table-column sortable prop="id" label="Chức vụ ID" width="200">
            </el-table-column>
            <el-table-column
              sortable
              prop="createdAt"
              label="Ngày tạo"
              width="200"
            >
            </el-table-column>
            <el-table-column
              sortable
              prop="editedAt"
              label="Ngày sửa"
              width="200"
            >
            </el-table-column>
            <el-table-column
              sortable
              prop="roleName"
              label="Chức vụ"
              width="350"
            >
            </el-table-column>
            <el-table-column
              sortable
              prop="roleDes"
              label="Mô tả chức vụ"
              width="500"
            >
            </el-table-column>
            <el-table-column fixed="right" label="Hành động" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="handeDeleteRole(scope.row)"
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
          :field="paginationValRole"
          @handleSizeChange="handleSizeChangeRole"
          @handleCurrentChange="handleCurrentChangeRole"
        />
        <RoleDetailVue
          :field="roleField"
          v-show="dialogVisibleRole"
          :dialogVisible.sync="dialogVisibleRole"
          @handle-dataRole="handleDataAddEditRole"
        />
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import axios from "axios";
import { mapGetters, mapMutations, mapActions } from "vuex";
import BaseSearch from "../../components/Inputs/BaseSearch.vue";
import BasePagination from "../../components/Pagination/BasePagination.vue";
import LoadingPage from "@/components/Cards/LoadingPage";
import RoleDetailVue from "./RoleDetail.vue";
export default {
  components: { BaseSearch, BasePagination, LoadingPage, RoleDetailVue },
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
        disabled: "not-disabled",
        placeholder: "Chọn cửa hàng",
        error: "",
        value: "",
        options: [],
      },
      activeName: "first",
      staffs: [],
      roles: [],
      loadingTable: false,
      search: {
        value: "",
        class: "w-96",
        placeholder: "Tìm kiếm bởi tên, mã, ...",
      },
      searchRole: {
        value: "",
        class: "w-96",
        placeholder: "Tìm kiếm bởi tên,..",
      },

      paginationPage: {
        pageNo: 1,
        pageSize: 30,
        sorting: "createdAt",
        orderBy: "DESC",
      },
      paginationVal: {},

      paginationPageRole: {
        pageNo: 1,
        pageSize: 30,
        sorting: "createdAt",
        orderBy: "DESC",
      },
      paginationValRole: {},
      roleField: {
        id: null,
        title: "User's Role",
        actionType: "",
        roleName: {
          id: "roleName",
          name: "roleName",
          rules: "required",
          classes: "col-span-12",
          type: "text",
          label: "Name",
          isRequired: "true",
          value: "",
          placeholder: "Enter Role's Name",
          maxlength: 50,
          error: "",
        },
        roleDes: {
          id: "roleDes",
          name: "roleDes",
          rules: "",
          classes: "col-span-12 !h-[64px]",
          type: "text",
          label: "Description",
          isRequired: "false",
          value: "",
          placeholder: "Enter Role's Description",
          maxlength: 150,
          error: "",
        },
      },
      dialogVisibleRole: false,
    };
  },
  methods: {
    filterByWarehouse(item) {
      if (!item) {
        this.warehouseData.value = null;
        this.handleGetUsers();
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
        this.handleGetUsers();
      }
    },
    handeRenewPwd(data) {
      const emailReq = data.email;
      axios({
        method: "post",
        url: "http://localhost:9090/api/v1/user/renew-pwd",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        params: { emailReq: emailReq },
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: "Reseted successfully",
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
        .finally(() => this.handleGetUsers());
    },
    getUserDetail(row) {
      let data = {
        id: row.userId,
        type: "EDIT",
      };
      this.$router.push({
        name: "Chi tiết Nhân Viên", //use name for router push
        params: { data },
      });
    },
    addUser() {
      let data = {
        id: null,
        type: "ADD",
      };
      this.$router.push({
        name: "Chi tiết Nhân Viên",
        params: { data },
      });
    },
    handleGetHistoryUser() {
      this.$router.push({ name: "Lịch sử thay đổi Nhân Viên" });
    },
    updateRole(row, col, event) {
      this.dialogVisibleRole = true;
      this.roleField = {
        id: row.id,
        title: "Chức vụ",
        actionType: "UPDATED",
        roleName: {
          id: "roleName",
          name: "roleName",
          rules: "required",
          classes: "col-span-12",
          type: "text",
          label: "Chức vụ",
          isRequired: "true",
          value: row.roleName,
          placeholder: "Nhập chức vụ",
          maxlength: 50,
          error: "",
        },
        roleDes: {
          id: "roleDes",
          name: "roleDes",
          rules: "",
          classes: "col-span-12 !h-[64px]",
          type: "text",
          label: "Mô tả",
          isRequired: "false",
          value: row.roleDes,
          placeholder: "Nhập mô tả chức vụ",
          maxlength: 150,
          error: "",
        },
      };
    },
    createRole() {
      this.dialogVisibleRole = true;
      this.roleField = {
        id: null,
        title: "Thêm mới chức vụ",
        actionType: "CREATED",
        roleName: {
          id: "roleName",
          name: "roleName",
          rules: "required",
          classes: "col-span-12",
          type: "text",
          label: "Chức vụ",
          isRequired: "true",
          value: "",
          placeholder: "Nhập chức vụ",
          maxlength: 50,
          error: "",
        },
        roleDes: {
          id: "roleDes",
          name: "roleDes",
          rules: "",
          classes: "col-span-12 !h-[64px]",
          type: "text",
          label: "Mô tả",
          isRequired: "false",
          value: "",
          placeholder: "Nhập mô tả chức vụ",
          maxlength: 150,
          error: "",
        },
      };
    },
    handleDataAddEditRole(field) {
      this.dialogVisibleRole = false;
      if (field.actionType == "CREATED") {
        this.handleCreateRole(field);
      } else if (field.actionType == "UPDATED") {
        this.handleUpdateRole(field);
      }
    },
    handleCreateRole(field) {
      const role = {
        roleName: field.roleName.value,
        roleDes: field.roleDes.value,
      };
      axios({
        method: "post",
        url: "http://localhost:9090/api/v1/role",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        data: role,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: "Thêm mới thành công",
              type: "success",
            });
            this.handleGetRoles();
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
    handleUpdateRole(field) {
      const role = {
        id: field.id,
        roleName: field.roleName.value,
        roleDes: field.roleDes.value,
      };
      axios({
        method: "put",
        url: "http://localhost:9090/api/v1/role",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        data: role,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: "Sửa thành công",
              type: "success",
            });
            this.handleGetRoles();
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
    getBaseSearchVal(param) {
      // clears the timer on a call so there is always x seconds in between calls
      clearTimeout(this.timer);
      // if the timer resets before it hits 150ms it will not run
      this.timer = setTimeout(
        function () {
          this.search.value = param;
          this.handleGetUsers();
        }.bind(this),
        300
      );
    },
    handleSizeChange(param) {
      this.paginationPage.pageNo = 1;
      this.paginationPage.pageSize = param;
      this.handleGetUsers();
    },
    handleCurrentChange(param) {
      this.paginationPage.pageNo = param;
      this.handleGetUsers();
    },

    handleSizeChangeRole(param) {
      this.paginationPageRole.pageNo = 1;
      this.paginationPageRole.pageSize = param;
      this.handleGetRoles();
    },
    handleCurrentChangeRole(param) {
      this.paginationPageRole.pageNo = param;
      this.handleGetRoles();
    },
    async handleGetUsers() {
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
        .get("http://localhost:9090/api/v1/user/list", {
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
    handeDeleteUser(row) {
      this.$confirm(`Bạn có muốn xóa ${row.userId}?`)
        .then((_) => {
          this.handleDeleteStaff(row.userId);
        })
        .catch((_) => {});
    },
    handleDeleteStaff(userId) {
      axios({
        method: "delete",
        url: "http://localhost:9090/api/v1/user",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        params: { userId },
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
        .finally(() => this.handleGetUsers());
    },
    handeDeleteRole(data) {},
    handleGetRoles() {
      var me = this;
      me.loadingTable = true;
      axios
        .get("http://localhost:9090/api/v1/role/list", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: {
            searchText: me.searchRole.value,
            pageNo: me.paginationPageRole.pageNo,
            pageSize: me.paginationPageRole.pageSize,
            sorting: me.paginationPageRole.sorting,
            orderBy: me.paginationPageRole.orderBy,
          },
        })
        .then(function (response) {
          me.roles = response.data.items.content;
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
    getBaseSearchRole(param) {
      clearTimeout(this.timer);
      this.timer = setTimeout(
        function () {
          this.searchRole.value = param;
          this.handleGetRoles();
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
  },
  async mounted() {
    await this.getWarehouseSel();
    await this.handleGetRoles();
    if (!this.user?.roles.includes("ADMIN")) {
      this.warehouseData.value = this.warehouse.warehouseId;
      this.warehouseData.disabled = "disabled";
    }
    await this.handleGetUsers();
  },
};
</script>
<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
