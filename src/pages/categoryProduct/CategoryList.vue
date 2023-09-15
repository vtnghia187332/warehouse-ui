<template>
  <div class="pt-3 pl-80 pr-80">
    <div class="pb-2 flex justify-between">
      <div class="flex">
        <BaseSearch :field="search" @get-value="getBaseSearchVal" />
      </div>
      <div class="flex">
        <el-button type="danger" class="bg-red-600" @click="">Delete</el-button>
        <el-button class="bg-blue-400" icon="el-icon-plus" type="primary"
          >Create</el-button
        >
      </div>
    </div>
    <LoadingPage v-show="loadingTable"></LoadingPage>
    <el-table
      :data="categories"
      style="width: 100%"
      v-show="!loadingTable"
      height="800"
    >
      <div slot="append" v-if="categories.length == '0'">
        <el-empty :image-size="200"></el-empty>
      </div>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="createdAt" label="Created Date" width="250">
      </el-table-column>
      <el-table-column prop="editedAt" label="Updated Date" width="250">
      </el-table-column>
      <el-table-column prop="name" label="Name" width="400"> </el-table-column>
    </el-table>
    <BasePagination
      :field="paginationVal"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />
  </div>
</template>
<script>
import BaseSearch from "../../components/Inputs/BaseSearch.vue";
import BasePagination from "../../components/Pagination/BasePagination.vue";
import axios from "axios";
export default {
  components: { BaseSearch, BasePagination },
  data() {
    return {
      categories: [],
      loadingTable: false,

      search: {
        value: "",
        class: "w-96",
      },
      paginationVal: {},
      paginationPage: {
        pageNo: 1,
        pageSize: 30,
        sorting: "createdAt",
        orderBy: "DESC",
      },
    };
  },
  methods: {
    getBaseSearchVal(param) {
      clearTimeout(this.timer);
      this.timer = setTimeout(
        function () {
          this.search.value = param;
          this.getCategories();
        }.bind(this),
        300
      );
    },
    handleSizeChange(param) {
      this.paginationPage.pageNo = 1;
      this.paginationPage.pageSize = param;
      this.getCategories();
    },
    handleCurrentChange(param) {
      this.paginationPage.pageNo = param;
      this.getCategories();
    },
    getCategories() {
      var me = this;
      me.loadingTable = true;
      axios
        .get("http://localhost:9090/api/v1/category-product/list", {
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
          me.categories = response.data.items.content;
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
    this.getCategories();
  },
};
</script>
<style></style>
