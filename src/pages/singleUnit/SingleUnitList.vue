<template>
  <div class="pt-3 pl-80 pr-80">
    <div class="pb-2 flex justify-between">
      <div class="flex">
        <BaseSearch :field="search" @get-value="getBaseSearchVal" />
      </div>
      <div class="flex">
        <el-button
          type="danger"
          class="bg-red-600"
          v-show="singleUnitSelected.length > 0"
          @click="handleDeleteSingleUnit"
          >Delete</el-button
        >
        <el-button
          class="bg-blue-400"
          icon="el-icon-plus"
          type="primary"
          @click="createUnit"
          >Create</el-button
        >
      </div>
    </div>
    <LoadingPage v-show="loadingTable"></LoadingPage>
    <el-table
      :data="singleUnits"
      style="width: 100%"
      v-show="!loadingTable"
      @row-dblclick="updateUnit"
      @selection-change="handleSelectionChange"
    >
      height="800" >
      <div slot="append" v-if="singleUnits.length == '0'">
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
      :field="unitField"
      v-show="dialogVisible"
      :dialogVisible.sync="dialogVisible"
      v-model="unitField.value"
      @handle-dataAddr="handleDataAddEdit"
    />
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import BaseSearch from "../../components/Inputs/BaseSearch.vue";
import BasePagination from "../../components/Pagination/BasePagination.vue";
import DialogCreate from "../address/DialogCreate.vue";
import LoadingPage from "@/components/Cards/LoadingPage";
import axios from "axios";
export default {
  computed: {
    ...mapGetters(["user", "warehouse", "warehouseChain"]),
  },
  components: { BaseSearch, BasePagination, DialogCreate, LoadingPage },
  data() {
    return {
      singleUnitSelected: [],
      unitField: {
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
      singleUnits: [],
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
      this.singleUnitSelected = [];
      val.forEach((item) => {
        this.singleUnitSelected.push(item.id);
      });
    },
    handleDataAddEdit(field) {
      this.dialogVisible = false;
      if (field.actionType == "CREATED") {
        this.handleCreateSingleUint(field);
      } else if (field.actionType == "UPDATED") {
        this.handleUpdateSingleUint(field);
      }
    },

    createUnit() {
      this.dialogVisible = true;
      this.unitField = {
        title: "Create Single Unit",
        id: "singleUnit",
        refId: "",
        baseId: "",
        classes: "!w-full",
        type: "text",
        label: "Single Unit",
        rules: "required",
        isRequired: "true",
        value: "",
        placeholder: "Typing Single Unit name...",
        maxlength: 50,
        error: "",
        actionType: "CREATED",
      };
    },
    updateUnit(row, col, event) {
      this.dialogVisible = true;
      this.unitField = {
        title: "Update Single Unit",
        id: "singleUnit",
        refId: "",
        baseId: row.id,
        classes: "!w-full",
        type: "text",
        label: "Single Unit",
        rules: "required",
        isRequired: "true",
        value: row.name,
        placeholder: "Typing Single Unit name...",
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
          this.getSingleUnit();
        }.bind(this),
        300
      );
    },

    handleSizeChange(param) {
      this.paginationPage.pageNo = 1;
      this.paginationPage.pageSize = param;
      this.getSingleUnit();
    },
    handleCurrentChange(param) {
      this.paginationPage.pageNo = param;
      this.getSingleUnit();
    },
    getSingleUnit() {
      var me = this;
      me.loadingTable = true;
      axios
        .get("http://localhost:9090/api/v1/single-unit/list", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: {
            searchText: me.search.value,
            pageNo: me.paginationPage.pageNo,
            pageSize: me.paginationPage.pageSize,
            sorting: me.paginationPage.sorting,
            orderBy: me.paginationPage.orderBy,
            warehouseChainId: me.warehouseChain.warehouseChainId,
          },
        })
        .then(function (response) {
          me.singleUnits = response.data.items.content;
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
          me.$message({
            showClose: true,
            message: error.response.data.items,
            type: "error",
          });
        });
    },
    async handleCreateSingleUint(field) {
      const singleUnit = {
        name: field.value,
        warehouseChainId: this.warehouseChain.warehouseChainId,
      };
      await axios({
        method: "post",
        url: "http://localhost:9090/api/v1/single-unit",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        data: singleUnit,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: "Created successfully",
              type: "success",
            });
            this.getSingleUnit();
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
    handleUpdateSingleUint(field) {
      const singleUnit = {
        id: field.baseId,
        name: field.value,
        warehouseChainId: this.warehouseChain.warehouseChainId,
      };
      axios({
        method: "put",
        url: "http://localhost:9090/api/v1/single-unit",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        data: singleUnit,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: "Updated successfully",
              type: "success",
            });
            this.getSingleUnit();
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
    handleDeleteSingleUnit() {
      axios
        .delete("http://localhost:9090/api/v1/single-unit", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { id: this.singleUnitSelected.toString() },
        })
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              showClose: true,
              message: "Deleted successfully",
              type: "success",
            });
            this.getSingleUnit();
            this.singleUnitSelected = [];
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
  mounted() {
    this.getSingleUnit();
  },
};
</script>
<style></style>
