<template>
  <div class="import-dlg">
    <el-dialog
      v-show="this.step === 'IMPORTED'"
      :append-to-body="true"
      title="Import Product"
      :before-close="handleCloseDialog"
      :visible="isOpenDialogImport"
    >
      <div class="flex">
        <el-button class="mb-2 ml-auto" @click="downloadFileTemplate"
          >Download Template</el-button
        >
      </div>
      <el-upload
        ref="upload"
        :action-upload="false"
        class="upload-demo"
        :on-remove="clearStateFile"
        :auto-upload="false"
        :on-change="handleChange"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          <b>Click or drag file to this area</b>
        </div>
        <div class="el-upload__text">
          Only .xls or .xlsx file format is supported.
        </div>
        <div class="el-upload__text">The maximum allow file size is 5MB</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <div class="flex justify-end border-spacing-1">
          <el-button @click="handleCloseDialog">Cancel</el-button>
          <el-button
            :disabled="!this.dataImporting"
            @click="handleImportFunc"
            class="bg-blue-400 text-white"
            >Import</el-button
          >
        </div>
      </span>
    </el-dialog>

    <el-dialog
      v-show="this.step === 'CONFIRMED'"
      :append-to-body="true"
      title="Import Warehouse"
      :visible="this.step === 'CONFIRMED'"
    >
      <div class="flex justify-center mt-4 mb-4">
        <div class="text-2xl">
          Select
          <span>
            Product you want to <span class="underline">override</span></span
          >
        </div>
      </div>
      <div class="flex justify-center mt-4 mb-4">
        <div class="text-center w-[403px]">
          Found 1 item imported Product with the same Code, Name as the current
          Product. Select new imported Product you want to override
        </div>
      </div>
      <div class="mt-4 mb-4">
        <BaseSearch :field="search" @get-value="getBaseSearchVal" />
        <LoadingPage v-show="loadingTable"></LoadingPage>
        <div class="table_style px-2" v-show="!loadingTable">
          <el-table
            :data="datasOverrided"
            style="width: 100%"
            @selection-change="handleSelectedItemChange"
            height="400"
          >
            <div slot="append" v-if="datasOverrided.length == '0'">
              <el-empty :image-size="250"></el-empty>
            </div>
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              fixed
              prop="productId"
              label="Product ID"
              width="150"
            >
            </el-table-column>
            <el-table-column prop="code" label="Product Code" width="250">
            </el-table-column>
            <el-table-column prop="name" label="Product Name" width="250">
            </el-table-column>
            <el-table-column
              prop="description"
              label="Product Description"
              width="250"
            >
            </el-table-column>
            <el-table-column prop="createdAt" label="Create Date" width="250">
            </el-table-column>
            <el-table-column prop="editedAt" label="Updated Date" width="250">
            </el-table-column>
          </el-table>
        </div>
        <BasePagination
          :field="paginationVal"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="flex justify-end border-spacing-1">
          <el-button @click="handleCancelConfirmDlg">Cancel</el-button>
          <el-button
            @click="handleContinueImport"
            class="bg-blue-400 text-white"
            >Continue</el-button
          >
        </div>
      </span>
    </el-dialog>

    <el-dialog
      v-show="this.step === 'ERROR'"
      :append-to-body="true"
      title="Import Product"
      :visible="this.step === 'ERROR'"
    >
      <div class="flex justify-center">
        <i
          v-if="this.importError.numberSuccessItem.numItems > 0"
          class="el-icon-success text-7xl text-green-600"
        ></i>
        <i v-else class="el-icon-error text-7xl text-red-600"></i>
      </div>
      <div class="flex justify-center mt-4 mb-4">
        <h2
          v-if="this.importError.numberSuccessItem.numItems > 0"
          class="text-2xl"
        >
          Import successfully
        </h2>
        <h2 v-else class="text-2xl">Import unsuccessfully</h2>
      </div>
      <div class="flex justify-center mb-4">
        <h2>
          <span class="font-bold">{{ importError.fileName.join() }}</span> have
          been uploaded and information has been update
        </h2>
      </div>
      <div
        v-show="this.importError.numberSuccessItem.numItems > 0"
        class="h-16 bg-gray-100 flex flex-col flex-grow place-content-center pl-3 rounded-sm"
      >
        <div class="mx-auto w-full">
          <div class="flex items-center">
            <i class="el-icon-edit-outline text-lg"></i>
            <span class="ml-1 mr-1">{{
              this.importError.numberSuccessItem.numItems
                ? this.importError.numberSuccessItem.numItems
                : 0
            }}</span>
            <span>item have been updated</span>
          </div>
        </div>
      </div>
      <div
        v-show="this.importError.numberErrItem.numItems > 0"
        class="h-16 bg-gray-100 flex flex-col flex-grow place-content-center pl-3 rounded-sm mt-2"
      >
        <div class="mx-auto w-full">
          <div class="flex justify-between">
            <div>
              <div class="flex items-center">
                <i class="el-icon-edit-outline text-lg"></i>
                <span class="ml-1 mr-1 text-red-400">{{
                  this.importError.numberErrItem.numItems
                }}</span>
                <span>item with an issue</span>
              </div>
              <div class="text-red-300 font-medium text-xs">
                Item with an issue will not be uploaded and save to servier.
                Please solve these issues, and reupload file
              </div>
            </div>
            <div class="">
              <el-button plain @click="downloadErrorFile">Download</el-button>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="flex justify-end border-spacing-1">
          <el-button @click="handleCloseDialog">Cancel</el-button>
          <el-button @click="reUploadFile" class="bg-blue-400 text-white"
            >Reupload File</el-button
          >
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters, mapMutations, mapActions } from "vuex";
import BasePagination from "./../../components/Pagination/BasePagination.vue";
import BaseSearch from "@/components/Inputs/BaseSearch";
import LoadingPage from "@/components/Cards/LoadingPage";
export default {
  components: {
    BasePagination,
    BaseSearch,
    LoadingPage,
  },
  computed: {
    ...mapGetters(["user", "warehouse", "warehouseChain"]),
  },
  props: {
    isOpenDialogImport: {
      type: Boolean,
    },
  },
  data() {
    return {
      loadingTable: false,
      importError: {
        fileName: [],
        numberErrItem: {
          numItems: 0,
          errorId: 0,
        },
        numberSuccessItem: {
          numItems: 0,
          errorId: 0,
        },
        numberOverrideItem: {
          numItems: 0,
          errorId: 0,
        },
      },
      search: {
        value: "",
        class: "w-full",
      },
      paginationPage: {
        pageNo: 1,
        pageSize: 30,
        sorting: "createdAt",
        orderBy: "DESC",
      },
      paginationVal: {},
      multipleSelection: [],
      dataImporting: null,
      step: "IMPORTED",
      isOpenDialogErr: false,
      importOverride: {},
      isOpenDialogConfirmed: false,
      datasOverrided: [],
      continuedImportItems: {
        successId: null,
        errorId: null,
        confirmId: null,
        ids: [],
        fileNames: [],
      },
    };
  },
  methods: {
    async handleImportFunc() {
      var me = this;
      var bodyFormData = new FormData();
      bodyFormData.append("uploadFiles", me.dataImporting);
      bodyFormData.append("warehouseId", me.warehouse.warehouseId);
      bodyFormData.append(
        "warehouseChainId",
        me.warehouseChain.warehouseChainId
      );
      await axios({
        method: "post",
        url: "http://localhost:9090/api/v1/product/import",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
        .then(function (response) {
          if (response.status === 200) {
            me.clearStateFile();
            me.handleAfterImporting(response);
          }
        })
        .catch(function (response) {
          me.$message({
            showClose: true,
            message: response.response.data.items,
            type: "error",
          });
        });
    },
    handleAfterImporting(response) {
      var me = this;
      me.importError = {
        fileName: [],
        numberErrItem: {
          numItems: 0,
          errorId: 0,
        },
        numberSuccessItem: {
          numItems: 0,
          errorId: 0,
        },
        numberOverrideItem: {
          numItems: 0,
          errorId: 0,
        },
      };
      if (response.data.items.errorId) {
        me.importError.numberErrItem.errorId = response.data.items.errorId;
        me.importError.numberErrItem.numItems =
          response.data.items.numOfFailure;
      }
      if (response.data.items.successId) {
        me.importError.numberSuccessItem.errorId =
          response.data.items.successId;
        me.importError.numberSuccessItem.numItems =
          response.data.items.numOfSuccess;
      }
      if (response.data.items.confirmId) {
        me.importError.numberOverrideItem.errorId =
          response.data.items.confirmId;
        me.importError.numberOverrideItem.numItems =
          response.data.items.numOfConfirms;
      }
      if (response.data.items.confirmId) {
        me.step = "CONFIRMED";
        me.callApiToGetDataConfirm();
      } else {
        me.step = "ERROR";
        this.handleContinueImport();
      }
    },
    async downloadErrorFile() {
      let me = this;
      const tempDateTime = new Date();
      const fileName = `Product_Error${tempDateTime.getTime()}.xlsx`;
      await axios
        .get("http://localhost:9090/api/v1/product/export-error", {
          params: {
            errorId: me.importError.numberErrItem.errorId,
          },
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          responseType: "blob",
          contentType: "application/json-patch+json",
        })
        .then(function (res) {
          if (res) {
            var url = window.URL.createObjectURL(new Blob([res.data]));
            var a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
          }
        })
        .catch(function (res) {});
    },
    async downloadFileTemplate() {
      let me = this;
      const tempDateTime = new Date();
      const fileName = `Product_Template${tempDateTime.getTime()}.xlsx`;
      await axios
        .get("http://localhost:9090/api/v1/product/template", {
          responseType: "blob",
          contentType: "application/json-patch+json",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then(function (res) {
          if (res) {
            var url = window.URL.createObjectURL(new Blob([res.data]));
            var a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
          }
        })
        .catch(function (res) {});
    },
    async handleContinueImport() {
      var me = this;
      me.clearStateFile();
      const bodyImport = {
        successId: me.importError.numberSuccessItem.errorId,
        errorId: me.importError.numberSuccessItem.errorId,
        confirmId: me.importError.numberOverrideItem.errorId,
        ids: me.multipleSelection,
        warehouseChainId: me.warehouseChain.warehouseChainId,
        fileNames: [],
      };
      await axios({
        method: "post",
        url: "http://localhost:9090/api/v1/product/continue",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        data: bodyImport,
      })
        .then(function (response) {
          if (response.status === 200) {
            me.step = "ERROR";
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
          this.callApiToGetDataConfirm();
        }.bind(this),
        300
      );
    },
    handleSizeChange(param) {
      this.paginationPage.pageNo = 1;
      this.paginationPage.pageSize = param;
      this.callApiToGetDataConfirm();
    },
    handleCurrentChange(param) {
      this.paginationPage.pageNo = param;
      this.callApiToGetDataConfirm();
    },
    async callApiToGetDataConfirm() {
      var me = this;
      me.loadingTable = true;
      await axios
        .get("http://localhost:9090/api/v1/product/confirm", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: {
            searchText: me.search.value,
            pageNo: me.paginationPage.pageNo,
            pageSize: me.paginationPage.pageSize,
            sorting: me.paginationPage.sorting,
            orderBy: me.paginationPage.orderBy,
            errorId: me.importError.numberOverrideItem.errorId,
          },
        })
        .then(function (response) {
          if (response.status === 200) {
            me.datasOverrided = response.data.items.content;
            (me.paginationVal = {
              currentPage: response.data.items.pageNum,
              pageSizeList: [10, 20, 30, 50, 100],
              currentPage: response.data.items.number + 1,
              pageSizeval: response.data.items.size,
              total: response.data.items.totalElements,
            }),
              (me.loadingTable = false);
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
    handleCancelConfirmDlg() {
      this.$confirm("Are you sure to close Confirm dialog?")
        .then((_) => {
          this.step = "IMPORTED";
        })
        .catch((_) => {});
    },
    handleSelectedItemChange(val) {
      this.multipleSelection = [];
      val.map((item) => {
        this.multipleSelection.push(item.id);
      });
    },
    reUploadFile() {
      (this.step = "IMPORTED"), this.clearStateFile();
    },
    handleChange(file) {
      this.dataImporting = file.raw;
    },
    handleCloseDialog() {
      if (this.dataImporting !== null) {
        this.$confirm("Are you sure to close import dialog?")
          .then((_) => {
            this.clearStateFile();
            this.step = "";
            this.$emit("update:isOpenDialogImport", false);
            this.$router.push({ path: "/product" });
          })
          .catch((_) => {});
      } else {
        this.clearStateFile();
        this.step = "";
        this.$emit("update:isOpenDialogImport", false);
        this.$router.push({ path: "/product" });
      }
    },
    clearStateFile() {
      this.$refs["upload"].clearFiles();
      this.dataImporting = null;
    },
  },
  mounted() {},
};
</script>
<style scoped>
.el-dialog .el-dialog__header {
  border-bottom: 1px solid rgba(128, 128, 128, 0.322) !important;
}

.el-dialog .el-dialog__footer {
  border-top: 1px solid rgba(128, 128, 128, 0.322) !important;
}

.upload-demo .el-upload.el-upload--text {
  margin: auto !important;
}

.import-dlg .el-dialog {
  width: 934px !important;
  margin-top: 15vh !important;
}

.import-dlg .el-dialog__body {
  margin-top: -20px;
}

.el-upload-dragger {
  width: 895px !important;
  height: 220px !important;
  background: rgba(128, 128, 128, 0.089) !important;
}

.el-button.is-disabled,
.el-button.is-disabled:focus,
.el-button.is-disabled {
  background: rgba(128, 128, 128, 0.274) !important;
  color: white !important;
  font: bold !important;
}
</style>
