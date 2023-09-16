<template>
  <div class="pt-3 pl-80 pr-80">
    <div class="pb-2 flex justify-between">
      <div class="flex">
        <BaseSearch :field="search" @get-value="getBaseSearchVal" />
      </div>
      <div class="flex">
        <el-button
          type="danger"
          v-show="cateSelected.length > 0"
          class="bg-red-600"
          @click="handleDeleteCate"
          >Delete</el-button
        >
        <el-button
          class="bg-blue-400"
          icon="el-icon-plus"
          type="primary"
          @click="createCate"
          >Create</el-button
        >
      </div>
    </div>
    <LoadingPage v-show="loadingTable"></LoadingPage>
    <el-table
      :data="categories"
      style="width: 100%"
      @row-dblclick="updateCate"
      @selection-change="handleSelectionChange"
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
    <DialogCreate
      :field="categoryField"
      v-show="dialogVisible"
      :dialogVisible.sync="dialogVisible"
      v-model="categoryField.value"
      @handle-dataAddr="handleDataAddEdit"
    />
  </div>
</template>
<script>
import BaseSearch from "../../components/Inputs/BaseSearch.vue";
import BasePagination from "../../components/Pagination/BasePagination.vue";
import DialogCreate from "../address/DialogCreate.vue";
import LoadingPage from "@/components/Cards/LoadingPage";
import axios from "axios";
export default {
  components: { BaseSearch, BasePagination, DialogCreate, LoadingPage },
  data() {
    return {
      cateSelected: [],
      categoryField: {
        title: "",
        baseId: "",
        id: "",
        refId: "",
        classes: "!w-full",
        type: "text",
        label: "",
        rules: "required",
        isRequired: "true",
        value: "",
        placeholder: "",
        maxlength: 50,
        error: "",
        actionType: "",
      },
      dialogVisible: false,
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
    handleSelectionChange(val) {
      this.cateSelected = [];
      val.forEach((item) => {
        this.cateSelected.push(item.id);
      });
    },
    handleDataAddEdit(field) {
      this.dialogVisible = false;
      if (field.actionType == "CREATED") {
        this.handleCreateCate(field);
      } else if (field.actionType == "UPDATED") {
        this.handleUpdateCate(field);
      }
    },
    createCate() {
      this.dialogVisible = true;
      this.categoryField = {
        title: "Create Category Product",
        id: "categoryProduct",
        refId: "",
        classes: "!w-full",
        type: "text",
        label: "Category Product",
        rules: "required",
        isRequired: "true",
        value: "",
        placeholder: "Typing Category Product name...",
        maxlength: 50,
        error: "",
        actionType: "CREATED",
      };
    },
    updateCate(row, col, event) {
      this.dialogVisible = true;
      this.categoryField = {
        title: "Update Category Product",
        id: "categoryProduct",
        baseId: row.id,
        refId: "",
        classes: "!w-full",
        type: "text",
        label: "Category Product",
        rules: "required",
        isRequired: "true",
        value: row.name,
        placeholder: "Typing Category Product name...",
        maxlength: 50,
        error: "",
        actionType: "UPDATED",
      };
    },
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
    handleCreateCate(field) {
      const cate = {
        name: field.value,
      };
      axios({
        method: "post",
        url: "http://localhost:9090/api/v1/category-product",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: cate,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: "Created successfully",
              type: "success",
            });
            this.getCategories();
          }
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: error.response.data.message,
            type: "error",
          });
        });
    },
    handleUpdateCate(field) {
      const cate = {
        id: field.baseId,
        name: field.value,
      };
      axios({
        method: "put",
        url: "http://localhost:9090/api/v1/category-product",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: cate,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: "Updated successfully",
              type: "success",
            });
            this.getCategories();
          }
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: error.response.data.message,
            type: "error",
          });
        });
    },
    handleDeleteCate() {
      axios
        .delete("http://localhost:9090/api/v1/category-product", {
          headers: { "Access-Control-Allow-Origin": "*" },
          params: { id: this.cateSelected.toString() },
        })
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              showClose: true,
              message: "Deleted successfully",
              type: "success",
            });
            this.getCategories();
            this.cateSelected = [];
          }
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
