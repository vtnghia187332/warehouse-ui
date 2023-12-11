<template>
  <el-tabs class="tab-warehouse-chain" v-model="activeName">
    <el-tab-pane label="Warehouse Chain" name="first">
      <ValidationObserver v-slot="{ invalid }" ref="observerAdd">
        <el-row :gutter="20" class="pt-4 pl-3 pr-3">
          <el-col :span="18" class="forms grow">
            <FormCard title="Information" class="mb-3">
              <template v-slot:content>
                <div class="grid grid-cols-12 gap-x-6">
                  <div class="col-span-6">
                    <BaseInput
                      :field="warehouseChainD.code"
                      v-model="warehouseChainD.code.value"
                    />
                  </div>
                  <div class="col-span-12">
                    <BaseInput
                      :field="warehouseChainD.name"
                      v-model="warehouseChainD.name.value"
                    />
                  </div>
                  <div class="col-span-12">
                    <BaseInput
                      :field="warehouseChainD.shortName"
                      v-model="warehouseChainD.shortName.value"
                    />
                  </div>
                  <div class="col-span-12 grid grid-cols-12 gap-x-6">
                    <div class="col-span-6">
                      <BaseInput
                        :field="warehouseChainD.taxNumber"
                        v-model="warehouseChainD.taxNumber.value"
                      />
                    </div>
                    <div class="col-span-6">
                      <DatePicker
                        :field="warehouseChainD.taxDeclarationDate"
                        v-model="warehouseChainD.taxDeclarationDate.value"
                      />
                    </div>
                  </div>
                  <div class="col-span-12">
                    <BaseTextArea
                      :field="warehouseChainD.description"
                      v-model="warehouseChainD.description.value"
                    />
                  </div>
                </div>
              </template>
            </FormCard>
          </el-col>
          <el-col :span="6" class="">
            <FormCard title="Photo" class="mb-3">
              <template v-slot:content>
                <div class="">
                  <el-upload
                    action="#"
                    list-type="picture-card"
                    :auto-upload="false"
                    :on-change="handleAddPhotos"
                    :file-list="photos"
                    :limit="1"
                    :disabled="photos.length == 1"
                    :append-to-body="true"
                  >
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{ file }">
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url"
                        alt=""
                      />
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                  </el-upload>
                  <el-dialog
                    :append-to-body="true"
                    :visible.sync="dialogVisiblePhoto"
                  >
                    <img width="100%" :src="dialogImageUrl" alt="" />
                  </el-dialog>
                </div>
              </template>
            </FormCard>
            <div class="footer-btn-fixed flex justify-end p-2">
              <el-button
                @click="handleSubmitWHC"
                class="bg-blue-400"
                :disabled="invalid"
                type="primary"
                >Submit</el-button
              >
            </div>
          </el-col>
        </el-row>
      </ValidationObserver>
    </el-tab-pane>
    <el-tab-pane label="Warehouse" name="second">
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
            <el-button
              @click="HandleImportWarehouse"
              class="ml-1 !bg-blue-400"
              type="primary"
              :disabled="!this.user.roles.includes('ADMIN')"
              >Import</el-button
            >
            <el-button
              @click="testFunc"
              class="ml-1 !bg-blue-400"
              type="primary"
              >Export</el-button
            >
            <el-button
              @click="HandleAddWarehouse"
              class="ml-1 !bg-blue-400"
              type="primary"
              :disabled="!this.user.roles.includes('ADMIN')"
              >Create</el-button
            >
          </div>
        </div>
        <LoadingPage v-show="loadingTable"></LoadingPage>
        <div class="table_style px-2" v-show="!loadingTable">
          <el-table
            :data="warehouses"
            style="width: 100%"
            @row-dblclick="goToDetailWarehouse"
            @sort-change="sortChange"
            height="725"
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
            <el-table-column
              prop="keyContactVos"
              label="Contact Title"
              width="300"
            >
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
            <el-table-column
              prop="keyContactVos"
              label="Contact Email"
              width="300"
            >
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
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import axios from "axios";
import ImportDialog from "../../components/OverrideDialog/ImportDialog.vue";
import BaseTextArea from "./../../components/Inputs/BaseTextArea.vue";
import BaseSearch from "../../components/Inputs/BaseSearch.vue";
import BasePagination from "../../components/Pagination/BasePagination.vue";
import LoadingPage from "@/components/Cards/LoadingPage";
import FormCard from "./../../components/Cards/FormCard.vue";
import DatePicker from "../../components/Date/DatePicker.vue";
import BaseInput from "./../../components/Inputs/BaseInput.vue";
import moment from "moment";
export default {
  components: {
    BaseSearch,
    BaseTextArea,
    FormCard,
    BaseInput,
    BasePagination,
    LoadingPage,
    ImportDialog,
    ValidationObserver,
    ValidationProvider,
    DatePicker,
  },
  data() {
    return {
      disabled: false,
      dialogImageUrl: "",
      dialogVisiblePhoto: false,
      photos: [],
      warehouseChainPId: 0,
      warehouseChainD: {
        code: {
          id: "code",
          name: "code",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Code",
          isRequired: "true",
          value: "",
          placeholder: "Enter Code...",
          maxlength: 50,
          error: "",
        },
        name: {
          id: "name",
          name: "name",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Name",
          isRequired: "true",
          value: "",
          placeholder: "Enter Name...",
          maxlength: 100,
          error: "",
        },
        shortName: {
          id: "shortName",
          name: "shortName",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Short Name",
          isRequired: "true",
          value: "",
          placeholder: "Enter short Name...",
          maxlength: 100,
          error: "",
        },
        description: {
          id: "description",
          name: "description",
          rules: "required",
          classes: "w-full !h-[64px]",
          type: "text",
          label: "Description",
          isRequired: "true",
          value: "",
          placeholder: "Enter Description...",
          maxlength: 100,
          error: "",
        },
        taxNumber: {
          id: "taxNumber",
          name: "taxNumber",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Tax Number",
          isRequired: "true",
          value: "",
          placeholder: "Enter Tax Number...",
          maxlength: 100,
          error: "",
        },
        taxDeclarationDate: {
          id: "taxDeclarationDate",
          name: "taxDeclarationDate",
          rules: "",
          classes: "w-full",
          type: "text",
          label: "Tax Declaration Date",
          isRequired: "false",
          value: "",
          error: "",
          pickerOptions: {
            disabledDate(time) {
              return time.getTime() > Date.now();
            },
          },
        },
      },
      activeName: "first",
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
  computed: {
    ...mapGetters(["user", "warehouse", "warehouseChain"]),
    moment() {
      return moment;
    },
  },
  methods: {
    handleRemove(file) {
      this.$confirm("Are you sure to remove this photo?")
        .then((_) => {
          const index = this.photos.indexOf(file);
          if (index > -1) {
            this.photos.splice(index, 1);
          }
        })
        .catch((_) => {});
    },
    handleAddPhotos(file, fileList) {
      this.photos = fileList;
    },
    transformInToFormObject(data) {
      let formData = new FormData();
      for (let key in data) {
        if (Array.isArray(data[key])) {
          data[key].forEach((obj, index) => {
            let keyList = Object.keys(obj);
            keyList.forEach((keyItem) => {
              let keyName = [key, "[", index, "]", ".", keyItem].join("");
              formData.append(keyName, obj[keyItem]);
            });
          });
        } else if (typeof data[key] === "object") {
          for (let innerKey in data[key]) {
            formData.append(`${key}.${innerKey}`, data[key][innerKey]);
          }
        } else {
          formData.append(key, data[key]);
        }
      }
      return formData;
    },
    handleCancelSubmitWHC() {},
    handleSubmitWHC() {
      const warehouseChainDetail = {};
      Object.keys(this.warehouseChainD || {}).map((key) => {
        warehouseChainDetail[key] = this.warehouseChainD[key].value;
        if (key == "taxDeclarationDate") {
          warehouseChainDetail["taxDeclarationDate"] = moment(
            warehouseChainDetail.taxDeclarationDate
          ).format("YYYY-MM-DD HH:mm:ss");
        }
      });
      const form = this.transformInToFormObject(warehouseChainDetail);
      if (this.photos[0]) {
        form.append("image", this.photos[0].raw);
      } else {
        form.append("image", "");
      }
      form.append("numberOfImg", this.photos.length);
      form.append("warehouseChainId", this.warehouseChain.warehouseChainId);
      if (this.warehouseChain.warehouseChainId !== null) {
        this.handleCallApiEditWHC(form);
      } else {
        this.handleCallApiAddWHC(form);
      }
    },
    handleCallApiAddWHC(data) {
      axios({
        method: "post",
        url: "http://localhost:9090/api/v1/warehouseChain",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        contentType: "multipart/form-data",
        data: data,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: "Created successfully",
              type: "success",
            });
            this.$router.push({ path: "/dashboard" });
          }
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: error.response.data.items,
            type: "error",
          });
          this.$refs.observerAdd.setErrors(error.response.data.items);
        });
    },
    handleCallApiEditWHC(data) {
      axios({
        method: "put",
        url: "http://localhost:9090/api/v1/warehouseChain",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        contentType: "multipart/form-data",
        data: data,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: "Edited successfully",
              type: "success",
            });
            this.$router.push({ path: "/dashboard" });
          }
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: error.response.data.items,
            type: "error",
          });
          this.$refs.observerAdd.setErrors(error.response.data.items);
        });
    },
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
      const fileName = `Warehouse${tempDateTime.getTime()}.xlsx`;
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
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
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
            message: error.response.data.items,
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
    async getWarehouses() {
      var me = this;
      me.loadingTable = true;
      await axios
        .get("http://localhost:9090/api/v1/warehouse/list", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: {
            searchText: me.search.value,
            pageNo: me.paginationPage.pageNo,
            pageSize: me.paginationPage.pageSize,
            sorting: me.paginationPage.sorting,
            orderBy: me.paginationPage.orderBy,
            userId: me.user.userId,
            warehouseChainId: me.warehouseChain.warehouseChainId,
            roleOfUser: me.user.roles.join(),
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
            message: error.response.data.items,
            type: "error",
          });
        });
    },

    async getWarehouseChain() {
      await axios
        .get(
          `http://localhost:9090/api/v1/warehouseChain/detail/${this.warehouseChain.warehouseChainId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            Object.keys(this.warehouseChainD).forEach((key) => {
              this.warehouseChainD[key].value = res.data.items[key];
            });
            if (res.data.items?.imageDetailRes) {
              this.photos = res.data.items.imageDetailRes;
            } else {
              this.photos = [];
            }
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
    (this.paginationPage = {
      pageNo: 1,
      pageSize: 30,
      sorting: "createdAt",
      orderBy: "DESC",
    }),
      (this.search.value = "");
    await this.getWarehouses();
    if (this.warehouseChain?.warehouseChainId) {
      await this.getWarehouseChain();
    }
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
  overflow: auto;
}
.footer-btn-fixed {
  z-index: 99 !important;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
  background-color: white !important;
  margin-top: 12px;
}

.disable-btn {
}
</style>
