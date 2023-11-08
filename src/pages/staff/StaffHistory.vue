<template>
  <div class="fix_highted">
    <div class="flex justify-between px-4 py-2">
      <div class="flex">
        <BaseSearch :field="search" @get-value="getBaseSearchVal" />
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
        <el-table-column fixed prop="userId" label="User ID" width="150">
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
        <el-table-column prop="actionType" label="Action" width="150">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.actionType == 0 ? 'success' : 'primary'"
              disable-transitions
              >{{ scope.row.actionType == 0 ? "INSERTED" : "UPDATED" }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="isActive" label="Status" width="100">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.isActive === 1 ? 'success' : 'danger'"
              disable-transitions
              >{{ scope.row.isActive == 1 ? "ACTIVE" : "INACTIVE" }}</el-tag
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
  data() {
    return {
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
    handleGetUsersHis() {
      var me = this;
      axios
        .get("http://localhost:9090/api/v1/user/history", {
          headers: { "Access-Control-Allow-Origin": "*" },
          params: {
            searchText: me.search.value,
            pageNo: me.paginationPage.pageNo,
            pageSize: me.paginationPage.pageSize,
            sorting: me.paginationPage.sorting,
            orderBy: me.paginationPage.orderBy,
          },
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then(function (response) {
          me.staffs = response.data.items.content;
          (me.paginationVal = {
            currentPage: response.data.items.pageNum,
            pageSizeList: [10, 20, 30, 50, 100],
            currentPage: response.data.items.number + 1,
            pageSizeval: response.data.items.size,
            total: response.data.items.totalElements,
          }),
            console.log(me.staffs);
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
    this.handleGetUsersHis();
  },
};
</script>
<style></style>
