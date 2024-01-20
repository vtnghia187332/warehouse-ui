<template>
  <ValidationObserver v-slot="{ invalid }" ref="observerAdd">
    <loading-page v-show="loadingPageDetail"></loading-page>
    <div v-show="!loadingPageDetail" class="mb-16">
      <el-row class="pt-4 pl-3 pr-3" :gutter="20">
        <el-col :span="18" class="forms grow">
          <FormCard title="Thông tin Nhân viên" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12 grid grid-cols-12 gap-x-6">
                  <div class="col-span-6">
                    <BaseInput :field="user.code" v-model="user.code.value" />
                  </div>
                </div>
                <div class="col-span-12 grid grid-cols-12 gap-x-6">
                  <div class="col-span-6">
                    <BaseInput
                      :field="user.firstname"
                      v-model="user.firstname.value"
                    />
                  </div>
                  <div class="col-span-6">
                    <BaseInput
                      :field="user.lastname"
                      v-model="user.lastname.value"
                    />
                  </div>
                </div>
                <div class="col-span-12 grid grid-cols-12 gap-x-6">
                  <div class="col-span-6">
                    <BaseSelection
                      :field="user.title"
                      v-model="user.title.value"
                    />
                  </div>
                  <div class="col-span-6">
                    <BaseInput
                      :field="user.mobilePhone"
                      v-model="user.mobilePhone.value"
                    />
                  </div>
                </div>
                <div class="col-span-12 grid grid-cols-12 gap-x-6">
                  <div class="col-span-6">
                    <BaseInput :field="user.email" v-model="user.email.value" />
                  </div>
                  <div class="col-span-6">
                    <BaseSelection
                      @getValue=""
                      v-model="user.warehouseId.value"
                      :field="user.warehouseId"
                    />
                  </div>
                </div>
                <div class="col-span-12 grid grid-cols-12 gap-x-6">
                  <div class="col-span-6">
                    <BaseInput
                      :field="user.nationalNumber"
                      v-model="user.nationalNumber.value"
                    />
                  </div>
                  <div class="col-span-6">
                    <DatePicker
                      :field="user.expiredNationalNumber"
                      v-model="user.expiredNationalNumber.value"
                    />
                  </div>
                </div>
                <div class="col-span-12 grid grid-cols-12 gap-x-6">
                  <div class="col-span-6">
                    <BaseInput
                      :field="user.salary"
                      v-model="user.salary.value"
                    />
                  </div>
                  <div class="col-span-6">
                    <DatePicker
                      :field="user.birthDay"
                      v-model="user.birthDay.value"
                    />
                  </div>
                </div>
              </div>
            </template>
          </FormCard>
          <FormCard title="Roles" class="mb-3">
            <template v-slot:content>
              <BaseSelectMul v-model="user.roles.value" :field="user.roles" />
            </template>
            <el-select
              v-model="user.roles.value"
              multiple
              filterable
              allow-create
              default-first-option
              :placeholder="user.roles.placeholder"
            >
              <el-option
                v-for="item in user.roles.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </FormCard>
        </el-col>
        <el-col :span="6">
          <FormCard title="ID Nhân viên" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12">
                  <b>
                    {{
                      $route.params.data.id !== null
                        ? $route.params.data.id
                        : "US-xxx"
                    }}
                  </b>
                </div>
              </div>
            </template>
          </FormCard>
          <FormCard title="Ảnh" class="mb-3">
            <template v-slot:content>
              <div class="">
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false"
                  :on-change="handleAddPhotos"
                  :file-list="staffPhotos"
                  :limit="1"
                  :disabled="staffPhotos.length === 1"
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
                <el-dialog :append-to-body="true" :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
              </div>
            </template>
          </FormCard>
          <FormCard title="Thông tin chi tiết" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12">
                  <div class="col-span-12">
                    <BaseTextArea
                      :field="user.inforDetail"
                      v-model="user.inforDetail.value"
                    />
                  </div>
                </div>
              </div>
            </template>
          </FormCard>
          <div class="footer-btn-fixed flex justify-end p-2">
            <el-button @click="">Huỷ</el-button>
            <el-button
              @click="handleSubmitDataUser"
              class="bg-blue-400"
              :disabled="invalid"
              type="primary"
              >{{
                userPrimaryKey.userId != 0 ? "Sửa đổi" : "Thêm mới"
              }}</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
  </ValidationObserver>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import BaseInput from "./../../components/Inputs/BaseInput.vue";
import axios from "axios";
import BaseTextArea from "./../../components/Inputs/BaseTextArea.vue";
import FormCard from "./../../components/Cards/FormCard.vue";
import BaseSelection from "../../components/Inputs/BaseSelection.vue";
import BaseSelectMul from "../../components/Inputs/BaseSelectMul.vue";
import { ValidationObserver } from "vee-validate";
import DatePicker from "../../components/Date/DatePicker.vue";
import moment from "moment";
import LoadingPage from "../../components/Cards/LoadingPage.vue";
export default {
  components: {
    BaseInput,
    FormCard,
    BaseTextArea,
    BaseSelection,
    BaseSelectMul,
    ValidationObserver,
    DatePicker,
    LoadingPage,
  },
  data() {
    return {
      loadingPageDetail: false,
      disabled: false,
      dialogVisible: false,
      dialogImageUrl: "",
      staffPhotos: [],
      userPrimaryKey: {
        id: 0,
        userId: 0,
      },
      user: {
        code: {
          id: "code",
          name: "Code",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Mã nhân viên",
          isRequired: "true",
          value: "",
          placeholder: "Nhập mã...",
          maxlength: 50,
          error: "",
        },
        firstname: {
          id: "firstname",
          name: "firstname",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Tên",
          isRequired: "true",
          value: "",
          placeholder: "Nhập tên...",
          maxlength: 50,
          error: "",
        },
        lastname: {
          id: "lastname",
          name: "lastname",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Họ",
          isRequired: "true",
          value: "",
          placeholder: "Nhập họ...",
          maxlength: 50,
          error: "",
        },
        email: {
          id: "email",
          name: "email",
          rules: "required|email",
          classes: "w-full",
          type: "text",
          label: "Email",
          isRequired: "true",
          value: "",
          placeholder: "Nhập email...",
          maxlength: 50,
          error: "",
        },

        title: {
          id: "title",
          name: "title",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Giới tính",
          isRequired: "true",
          value: "",
          placeholder: "Nhập giới tính...",
          maxlength: 50,
          error: "",
          options: [
            {
              value: 1,
              label: "Nam",
            },
            {
              value: 2,
              label: "Nữ",
            },
            {
              value: 3,
              label: "Khác",
            },
          ],
        },
        mobilePhone: {
          id: "mobilePhone",
          name: "mobilePhone",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Số điện thoại",
          isRequired: "true",
          value: "",
          placeholder: "Nhập số điện thoại...",
          maxlength: 50,
          error: "",
        },
        nationalNumber: {
          id: "nationalNumber",
          name: "nationalNumber",
          rules: "",
          classes: "w-full",
          type: "text",
          label: "CMT/CCCD",
          isRequired: "",
          value: "",
          placeholder: "Nhập vào CMT / CCCD...",
          maxlength: 50,
          error: "",
        },
        expiredNationalNumber: {
          id: "expiredNationalNumber",
          name: "Expired National Number",
          classes: "!w-full",
          label: "Ngày hết hạn CMT / CCCD",
          isRequired: "false",
          rules: "",
          value: "",
          error: "",
          pickerOptions: {},
        },
        birthDay: {
          id: "birthDay",
          name: "Birthday",
          classes: "!w-full",
          label: "Ngày sinh",
          isRequired: "false",
          rules: "",
          value: "",
          error: "",
          pickerOptions: {
            disabledDate(time) {
              return time.getTime() > Date.now();
            },
          },
        },
        salary: {
          id: "salary",
          name: "salary",
          rules: "",
          classes: "w-full",
          type: "text|currency",
          label: "Lương",
          isRequired: "",
          value: "",
          placeholder: "Nhập lương...",
          maxlength: 50,
          error: "",
        },
        inforDetail: {
          id: "inforDetail",
          name: "inforDetail",
          rules: "",
          classes: "w-full col-span-6 !h-[100px]",
          type: "text",
          label: "Ghi chú",
          isRequired: "",
          value: "",
          placeholder: "Nhập ghi chú...",
          maxlength: 50,
          error: "",
        },
        roles: {
          id: "roles",
          baseId: 0,
          name: "roles",
          rules: "required",
          classes: "w-full",
          isRequired: "true",
          placeholder: "Chọn chức vụ",
          error: "",
          value: [],
          disabled: "notDisabled",
          label: "Chức vụ",
          options: [],
        },
        warehouseId: {
          id: "warehouseId",
          baseId: 0,
          name: "warehouseId",
          rules: "",
          classes: "w-full",
          isRequired: "",
          placeholder: "Chọn cửa hàng",
          error: "",
          value: "",
          disabled: "notDisabled",
          label: "Cửa hàng",
          options: [],
        },
      },
    };
  },
  methods: {
    formatCurrencyCus(e) {
      let value = e.target.value;
      value = Number(value.replaceAll(",", ""));
      if (isNaN(value)) {
        input.value = 0;
      } else {
        const formatValue = value.toLocaleString("ko-KR");
        input.value = formatValue;
      }
    },
    handleAddPhotos(file, fileList) {
      this.staffPhotos = fileList;
    },
    handleRemove(file) {
      this.$confirm("Are you sure to remove this photo?")
        .then((_) => {
          const index = this.staffPhotos.indexOf(file);
          if (index > -1) {
            this.staffPhotos.splice(index, 1);
          }
        })
        .catch((_) => {});
    },
    handleSubmitDataUser() {
      let userDetail = {
        id: this.userPrimaryKey.id,
        userId: this.userPrimaryKey.userId,
      };
      Object.keys(this.user).map((key) => {
        userDetail[key] = this.user[key].value;
      });
      if (userDetail.salary) {
        userDetail.salary = Number(
          userDetail.salary.replace(/[^0-9\.-]+/g, "")
        );
      }
      if (userDetail.birthDay) {
        userDetail.birthDay = moment(this.user.birthDay.value).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      if (userDetail.expiredNationalNumber) {
        userDetail.expiredNationalNumber = moment(
          this.user.expiredNationalNumber.value
        ).format("YYYY-MM-DD HH:mm:ss");
      }

      delete userDetail["roles"];

      const userDetailForm = this.transformInToFormObject(userDetail);
      if (this.staffPhotos[0]) {
        userDetailForm.append("image", this.staffPhotos[0].raw);
      } else {
        userDetailForm.append("image", "");
      }
      userDetailForm.append("numberOfImg", this.staffPhotos.length);
      userDetailForm.append(
        "warehouseChainId",
        this.warehouseChain.warehouseChainId
      );
      for (var i = 0; i < this.user.roles.value.length; i++) {
        userDetailForm.append(
          "roles[]",
          this.user.roles.options.find(
            (opt) =>
              opt.value == this.user.roles.value[i] ||
              opt.label == this.user.roles.value[i]
          ).value || 0
        );
      }
      if (this.$route.params.data.type === "EDIT") {
        this.loadingPageDetail = true;
        axios
          .put(`http://localhost:9090/api/v1/user`, userDetailForm, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            contentType: "multipart/form-data",
          })
          .then((response) => {
            if (response.status === 200) {
              this.$router.push({ path: "/staff" });
              this.$message({
                showClose: true,
                message: "Updated successfully",
                type: "success",
              });
              this.loadingPageDetail = false;
            }
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error.response.data.items,
              type: "error",
            });
            this.loadingPageDetail = false;
          });
      } else {
        this.loadingPageDetail = true;
        userDetailForm.delete("id");
        userDetailForm.delete("userId");
        axios
          .post(`http://localhost:9090/api/v1/user`, userDetailForm, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            contentType: "multipart/form-data",
          })
          .then((response) => {
            if (response.status === 200) {
              this.$router.push({ path: "/staff" });
              this.$message({
                showClose: true,
                message: "Thêm mới thành công",
                type: "success",
              });
              this.loadingPageDetail = false;
            }
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error.response.data.items,
              type: "error",
            });
            this.loadingPageDetail = false;
          });
      }
    },
    addCommas(nStr) {
      nStr += "";
      const x = nStr.split(".");
      let x1 = x[0];
      const x2 = x.length > 1 ? "." + x[1] : "";
      const rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
      }
      return x1 + x2;
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
    async getRolesSel() {
      await axios
        .get("http://localhost:9090/api/v1/role/all", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if (res.status === 200) {
            this.user.roles.value = [];
            this.user.roles.options = res.data.items;
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

    async getWarehouseSel() {
      await axios
        .get("http://localhost:9090/api/v1/warehouse/data-list", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { warehouseChainId: this.warehouseChain.warehouseChainId },
        })
        .then((res) => {
          if (res.status === 200) {
            this.user.warehouseId.options = res.data.items;
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

    async getUserDetail() {
      if (this.$route.params.data.id != null) {
        this.loadingPageDetail = true;
        await axios
          .get(
            `http://localhost:9090/api/v1/user/detail/${this.$route.params.data.id}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              Object.keys(this.user).forEach((key) => {
                this.user[key].value = res.data.items[key];
                this.user.roles.value = [];
                res.data.items["roles"].forEach((item) => {
                  this.user.roles.value.push(item.roleName);
                });
              });
              if (res.data.items?.imageDetailRes) {
                this.staffPhotos = res.data.items.imageDetailRes;
              } else {
                this.staffPhotos = [];
              }
              this.userPrimaryKey.id = res.data.items.id;
              this.userPrimaryKey.userId = res.data.items.userId;
              this.loadingPageDetail = false;
              if (
                this.user.warehouseId?.options.length > 0 &&
                res.data.items?.warehouseDetailRes !== null
              ) {
                this.user.warehouseId.value =
                  this.user.warehouseId.options?.find(
                    (opt) =>
                      opt.label ==
                        res.data.items.warehouseDetailRes?.warehouseId ||
                      opt.value ==
                        res.data.items.warehouseDetailRes?.warehouseId
                  ).value || "";
              }
            }
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error.response.data?.items,
              type: "error",
            });
          })
          .finally(() => (this.loadingPageDetail = false));
        if (this.$route.params.data.type === "DUPLICATED") {
          this.warehouseId = null;
          this.warehouseIdTxt = null;
        }
      } else {
      }
    },
  },
  computed: {
    moment() {
      return moment;
    },
    ...mapGetters(["warehouseChain"]),
  },
  watch: {
    "user.salary.value": function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.$nextTick(() => (this.user.salary.value = result));
      }
    },
  },
  async mounted() {
    if (!this.$route.params.data) {
      this.$router.push({ path: "/staff" });
      return;
    }
    await this.getRolesSel();
    await this.getWarehouseSel();
    await this.getUserDetail();
  },
};
</script>
<style scoped>
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

.no-display {
  display: none;
}
.radius-shadow_add {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}

.detail .el-col.el-col-5 {
  padding: 0 !important;
}
</style>
