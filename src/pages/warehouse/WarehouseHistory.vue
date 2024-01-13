<template>
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
    </div>
    <LoadingPage v-show="loadingTable"></LoadingPage>
    <div class="table_style px-2" v-show="!loadingTable">
      <el-table :data="warehouses" style="width: 100%" height="776">
        <div slot="append" v-if="warehouses.length == '0'">
          <el-empty :image-size="300"></el-empty>
        </div>

        <el-table-column
          fixed
          prop="warehouseId"
          label="ID Cửa hàng"
          width="150"
        >
        </el-table-column>
        <el-table-column prop="createdAt" label="Ngày tạo" width="180">
        </el-table-column>
        <el-table-column prop="editedAt" label="Ngày sửa" width="180">
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
              >{{ scope.row.actionType == 0 ? "INSERTED" : "UPDATED" }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="code" label="Mã cửa hàng" width="300">
        </el-table-column>
        <el-table-column prop="name" label="Tên cửa hàng" width="300">
        </el-table-column>
        <el-table-column
          prop="shortName"
          label="Tên viết tắt cửa hàng"
          width="300"
        >
        </el-table-column>
        <el-table-column prop="addressDes" label="Địa chỉ" width="300">
        </el-table-column>

        <el-table-column prop="openWorkingHour" label="Thứ hai" width="300">
          <template slot-scope="scope">
            {{
              scope.row.openWorkingHour
                ? scope.row.openWorkingHour.mondayStart +
                  " - " +
                  scope.row.openWorkingHour.mondayEnd
                : ""
            }}
          </template>
        </el-table-column>
        <el-table-column prop="openWorkingHour" label="Thứ ba" width="300">
          <template slot-scope="scope">
            {{
              scope.row.openWorkingHour
                ? scope.row.openWorkingHour.tuesdayStart +
                  " - " +
                  scope.row.openWorkingHour.tuesdayEnd
                : ""
            }}
          </template>
        </el-table-column>
        <el-table-column prop="openWorkingHour" label="Thứ tư" width="300">
          <template slot-scope="scope">
            {{
              scope.row.openWorkingHour
                ? scope.row.openWorkingHour.wednesdayStart +
                  " - " +
                  scope.row.openWorkingHour.wednesdayEnd
                : ""
            }}
          </template>
        </el-table-column>
        <el-table-column prop="openWorkingHour" label="Thứ năm" width="300">
          <template slot-scope="scope">
            {{
              scope.row.openWorkingHour
                ? scope.row.openWorkingHour.thursdayStart +
                  " - " +
                  scope.row.openWorkingHour.thursdayEnd
                : ""
            }}
          </template>
        </el-table-column>
        <el-table-column prop="openWorkingHour" label="Thứ sáu" width="300">
          <template slot-scope="scope">
            {{
              scope.row.openWorkingHour
                ? scope.row.openWorkingHour.fridayStart +
                  " - " +
                  scope.row.openWorkingHour.fridayEnd
                : ""
            }}
          </template>
        </el-table-column>
        <el-table-column prop="openWorkingHour" label="Thứ bảy" width="300">
          <template slot-scope="scope">
            {{
              scope.row.openWorkingHour
                ? scope.row.openWorkingHour.saturdayStart +
                  " - " +
                  scope.row.openWorkingHour.saturdayEnd
                : ""
            }}
          </template>
        </el-table-column>
        <el-table-column prop="openWorkingHour" label="Chủ nhật" width="300">
          <template slot-scope="scope">
            {{
              scope.row.openWorkingHour
                ? scope.row.openWorkingHour.sundayStart +
                  " - " +
                  scope.row.openWorkingHour.sundayEnd
                : ""
            }}
          </template>
        </el-table-column>

        <el-table-column
          prop="keyContactVos"
          label="Giới tính người liên lạc"
          width="300"
        >
          <template slot-scope="scope">
            {{ scope.row.keyContactVos[0].title }}
          </template>
        </el-table-column>
        <el-table-column
          prop="keyContactVos"
          label="Tên người liên lạc"
          width="300"
        >
          <template slot-scope="scope">
            {{ scope.row.keyContactVos[0].firstName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="keyContactVos"
          label="Họ người liên lạc"
          width="300"
        >
          <template slot-scope="scope">
            {{ scope.row.keyContactVos[0].lastName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="keyContactVos"
          label="Email người liên lạc"
          width="300"
        >
          <template slot-scope="scope">
            {{ scope.row.keyContactVos[0].email }}
          </template>
        </el-table-column>
        <el-table-column
          prop="keyContactVos"
          label="SĐT người liên lạc"
          width="300"
        >
          <template slot-scope="scope">
            {{ scope.row.keyContactVos[0].mobilePhone }}
          </template>
        </el-table-column>

        <el-table-column
          prop="keyContactVos"
          label="Giới tính người liên lạc 1"
          width="300"
        >
          <template slot-scope="scope">
            {{
              scope.row.keyContactVos[1] ? scope.row.keyContactVos[1].title : ""
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="keyContactVos"
          label="Tên người liên lạc 1"
          width="300"
        >
          <template slot-scope="scope">
            {{
              scope.row.keyContactVos[1]
                ? scope.row.keyContactVos[1].firstName
                : ""
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="keyContactVos"
          label="Họ người liên lạc 1"
          width="300"
        >
          <template slot-scope="scope">
            {{
              scope.row.keyContactVos[1]
                ? scope.row.keyContactVos[1].lastName
                : ""
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="keyContactVos"
          label="Email người liên lạc 1"
          width="300"
        >
          <template slot-scope="scope">
            {{
              scope.row.keyContactVos[1] ? scope.row.keyContactVos[1].email : ""
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="keyContactVos"
          label="SĐT người liên lạc 1"
          width="300"
        >
          <template slot-scope="scope">
            {{
              scope.row.keyContactVos[1]
                ? scope.row.keyContactVos[1].mobilePhone
                : ""
            }}
          </template>
        </el-table-column>

        <el-table-column
          prop="keyContactVos"
          label="Giới tính người liên lạc 2"
          width="300"
        >
          <template slot-scope="scope">
            {{
              scope.row.keyContactVos[2] ? scope.row.keyContactVos[2].title : ""
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="keyContactVos"
          label="Tên người liên lạc 2"
          width="300"
        >
          <template slot-scope="scope">
            {{
              scope.row.keyContactVos[2]
                ? scope.row.keyContactVos[2].firstName
                : ""
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="keyContactVos"
          label="Họ người liên lạc 2"
          width="300"
        >
          <template slot-scope="scope">
            {{
              scope.row.keyContactVos[2]
                ? scope.row.keyContactVos[2].lastName
                : ""
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="keyContactVos"
          label="Email người liên lạc 2"
          width="300"
        >
          <template slot-scope="scope">
            {{
              scope.row.keyContactVos[2] ? scope.row.keyContactVos[2].email : ""
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="keyContactVos"
          label="SĐT người liên lạc 2"
          width="300"
        >
          <template slot-scope="scope">
            {{
              scope.row.keyContactVos[2]
                ? scope.row.keyContactVos[2].mobilePhone
                : ""
            }}
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

        <el-table-column fixed="right" label="Action" width="70">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="Khôi phục"
              placement="bottom"
            >
              <el-button
                @click="handleRestoreWarehouse(scope.row)"
                type="text"
                size="small"
                ><i class="el-icon-refresh text-2xl"></i
              ></el-button>
            </el-tooltip>
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
import BasePagination from "@/components/Pagination/BasePagination";
import BaseSearch from "../../components/Inputs/BaseSearch.vue";
import LoadingPage from "../../components/Cards/LoadingPage.vue";
import moment from "moment";

export default {
  components: { BaseSearch, BasePagination, LoadingPage },
  computed: {
    moment() {
      return moment;
    },
  },
  data() {
    return {
      loadingTable: false,
      warehouses: [],
      timer: 0,
      paginationPage: {
        pageNo: 1,
        pageSize: 30,
        sorting: "createdAt",
        orderBy: "DESC",
      },
      paginationVal: {},
      search: {
        value: "",
        class: "w-96",
      },
    };
  },
  methods: {
    getBaseSearchVal(param) {
      // clears the timer on a call so there is always x seconds in between calls
      clearTimeout(this.timer);
      // if the timer resets before it hits 150ms it will not run
      this.timer = setTimeout(
        function () {
          this.search.value = param;
          this.getHistoryWarehouses();
        }.bind(this),
        300
      );
    },
    handleSizeChange(param) {
      this.paginationPage.pageNo = 1;
      this.paginationPage.pageSize = param;
      this.getHistoryWarehouses();
    },
    handleCurrentChange(param) {
      this.paginationPage.pageNo = param;
      this.getHistoryWarehouses();
    },
    replaceFromEnd(string1, string2) {
      if (string2 !== null) {
        return string1.concat(string2);
      }
    },
    handleRestoreWarehouse(data) {
      this.loadingTable = true;
      axios({
        method: "post",
        url: "http://localhost:9090/api/v1/warehouse/restore",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        params: { warehouseId: data.id },
      })
        .then((res) => {
          this.$message({
            showClose: true,
            message: "Khôi phục thành công",
            type: "success",
          });
          this.getHistoryWarehouses();
          this.loadingTable = false;
        })
        .catch((error) => {
          this.loadingTable = false;
          this.$message({
            showClose: true,
            message: error.response.data.items,
            type: "error",
          });
        });
    },
    getHistoryWarehouses() {
      var me = this;
      me.loadingTable = true;
      axios
        .get("http://localhost:9090/api/v1/warehouse/history", {
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
          me.warehouses = response.data.items.content;
          me.paginationVal.currentPage = response.data.items.pageNum;
          me.paginationVal.pageSizeList = [10, 20, 30, 50, 100];
          me.paginationVal.currentPage = response.data.items.number + 1;
          me.paginationVal.pageSizeval = response.data.items.size;
          me.paginationVal.total = response.data.items.totalElements;
          me.loadingTable = false;
        });
    },
  },
  mounted() {
    (this.paginationPage = {
      pageNo: 1,
      pageSize: 50,
      sorting: "editedAt",
      orderBy: "DESC",
    }),
      (this.search.value = "");
    this.getHistoryWarehouses();
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
