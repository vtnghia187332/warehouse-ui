<template>
  <div class="import-dlg">
    <el-dialog
      v-show="this.step === 'IMPORTED'"
      :append-to-body="true"
      title="Nhập khẩu cửa hàng"
      :before-close="handleCloseDialog"
      :visible="isOpenDialogImport"
    >
      <div class="flex">
        <el-button class="mb-2 ml-auto" @click="downloadFileTemplate"
          >Tải file mẫu</el-button
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
          <b>Chọn hoặc kéo thả file tại đây</b>
        </div>
        <div class="el-upload__text">
          chỉ file có đuôi .xls or .xlsx được hỗ trợ.
        </div>
        <div class="el-upload__text">Kích thước lớn nhất của file 5MB</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <div class="flex justify-end border-spacing-1">
          <el-button @click="handleCloseDialog">Thoát</el-button>
          <el-button
            :disabled="!this.dataImporting"
            @click="handleImportFunc"
            class="bg-blue-400 text-white"
            >Nhập khẩu</el-button
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
          Chọn
          <span>
            Cửa hàng mà bạn muốn <span class="underline">ghi đè</span></span
          >
        </div>
      </div>
      <div class="flex justify-center mt-4 mb-4">
        <div class="text-center w-[403px]">
          Tìm thấy 1 sản phẩm được nhập khẩu có thông tin giống với cửa hàng
          hiện tại. Chọn cửa hàng mà bạn muốn ghi đè.
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
              prop="warehouseId"
              label="Cửa hàng ID"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="warehouseChainInfo"
              label="Chuỗi cửa hàng"
              width="300"
            >
              <template slot-scope="scope">
                {{ scope.row.warehouseChainInfo.name }}
              </template>
            </el-table-column>
            <el-table-column prop="code" label="Mã cửa hàng" width="300">
            </el-table-column>
            <el-table-column prop="name" label="Tên cửa hàng" width="300">
            </el-table-column>
            <el-table-column prop="shortName" label="Tên viết tắt" width="300">
            </el-table-column>
            <el-table-column prop="createdAt" label="Ngày tạo" width="250">
            </el-table-column>
            <el-table-column prop="editedAt" label="Ngày sửa" width="250">
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
          <el-button @click="handleCancelConfirmDlg">Thoát</el-button>
          <el-button
            @click="handleContinueImport"
            class="bg-blue-400 text-white"
            >Tiếp tục</el-button
          >
        </div>
      </span>
    </el-dialog>

    <el-dialog
      v-show="this.step === 'ERROR'"
      :append-to-body="true"
      title="Import Warehouse"
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
          Nhập khẩu thành công
        </h2>
        <h2 v-else class="text-2xl">Nhập khẩu không thành công</h2>
      </div>
      <div class="flex justify-center mb-4">
        <h2>
          <span class="font-bold">{{ importError.fileName.join() }}</span> đã
          được nhập khẩu và thông tin đang được hệ thống xử lý
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
            }}</span>
            <span>cửa hàng đã được cập nhật</span>
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
                <span>thông tin cửa hàng có lỗi</span>
              </div>
              <div class="text-red-300 font-medium text-xs">
                Thông tin cửa hàng gặp lỗi sẽ không được xử lý. Hãy sửa lại
                thông tin và nhập khẩu lại
              </div>
            </div>
            <div class="">
              <el-button plain @click="downloadErrorFile">Tải về</el-button>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="flex justify-end border-spacing-1">
          <el-button @click="handleCloseDialog">Huỷ</el-button>
          <el-button @click="reUploadFile" class="bg-blue-400 text-white"
            >Nhập khẩu</el-button
          >
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import BasePagination from "./../Pagination/BasePagination.vue";
import BaseSearch from "@/components/Inputs/BaseSearch";
import LoadingPage from "@/components/Cards/LoadingPage";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    BasePagination,
    BaseSearch,
    LoadingPage,
  },
  computed: {
    ...mapGetters(["user", "warehouse", "warehouseChain"]),
  },
  data() {
    return {
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
      multipleSelection: [],
      isOpenDialogErr: false,
      importOverride: {},
      isOpenDialogConfirmed: false,
      dataImporting: null,
      step: "IMPORTED",
      loadingTable: false,
      paginationVal: {},
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
  props: {
    isOpenDialogImport: {
      type: Boolean,
    },
  },
  methods: {
    async downloadErrorFile() {
      let me = this;
      // time biến thành tên của file
      const tempDateTime = new Date();
      const fileName = `WarehouseError${tempDateTime.getTime()}.xlsx`;
      //  Khai báo mảng để hứng dữ liệu nguyên vật liệu trả về
      await axios
        .get("http://localhost:9090/api/v1/warehouse/export-error", {
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
            //Lấy file name mà server trả về -> save file
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
          }
        })
        .catch(function (res) {});
    },
    handleSelectedItemChange(val) {
      this.multipleSelection = [];
      val.map((item) => {
        this.multipleSelection.push(item.id);
      });
    },
    replaceFromEnd(string1, string2) {
      if (string2 != null) {
        return (
          string1.substr(0, string1.length - string2.toString().length) +
          string2.toString()
        );
      } else {
        return null;
      }
    },
    reUploadFile() {
      (this.step = "IMPORTED"), this.clearStateFile();
    },
    handleCancelConfirmDlg() {
      this.$confirm("Bạn có chắc muốn thoát khỏi cửa sổ?")
        .then((_) => {
          this.step = "IMPORTED";
        })
        .catch((_) => {});
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
    async downloadFileTemplate() {
      let me = this;
      // time biến thành tên của file
      const tempDateTime = new Date();
      const fileName = `WarehouseTemplate${tempDateTime.getTime()}.xlsx`;
      //  Khai báo mảng để hứng dữ liệu nguyên vật liệu trả về
      await axios
        .get("http://localhost:9090/api/v1/warehouse/template", {
          responseType: "blob",
          contentType: "application/json-patch+json",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
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
        .catch(function (res) {});
    },
    handleChange(file) {
      this.dataImporting = file.raw;
    },
    handleCloseDialog() {
      if (this.dataImporting !== null) {
        this.$confirm("Bạn có chắc muốn thoát khỏi cửa sổ?")
          .then((_) => {
            this.clearStateFile();
            this.step = "";
            this.$emit("update:isOpenDialogImport", false);
            this.$router.push({ name: "Danh sách Cửa hàng" });
          })
          .catch((_) => {});
      } else {
        this.clearStateFile();
        this.step = "";
        this.$emit("update:isOpenDialogImport", false);
        this.$router.push({ name: "Danh sách Cửa hàng" });
      }
    },
    clearStateFile() {
      this.$refs["upload"].clearFiles();
      this.dataImporting = null;
    },
    async handleImportFunc() {
      var me = this;
      var bodyFormData = new FormData();
      bodyFormData.append("uploadFiles", me.dataImporting);
      bodyFormData.append(
        "warehouseChainId",
        me.warehouseChain.warehouseChainId
      );
      await axios({
        method: "post",
        url: "http://localhost:9090/api/v1/warehouse/import",
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
    async callApiToGetDataConfirm() {
      var me = this;
      me.loadingTable = true;
      await axios
        .get("http://localhost:9090/api/v1/warehouse/confirm", {
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
    async handleContinueImport() {
      var me = this;
      me.clearStateFile();
      const bodyImport = {
        successId: me.importError.numberSuccessItem.errorId,
        errorId: me.importError.numberSuccessItem.errorId,
        confirmId: me.importError.numberOverrideItem.errorId,
        ids: me.multipleSelection,
        fileNames: [],
        warehouseChainId: me.warehouseChain.warehouseChainId,
      };
      await axios({
        method: "post",
        url: "http://localhost:9090/api/v1/warehouse/continue",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        data: bodyImport,
      })
        .then(function (response) {
          if (response.status === 200) {
            me.importError.numberSuccessItem.numItems =
              response.data.items.numOfSuccess;
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
  },
  beforeCreate() {
    this.$nextTick().then(() => document.body.classList.add("import-dlg"));
  },
  mounted() {},
};
</script>
<style>
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
