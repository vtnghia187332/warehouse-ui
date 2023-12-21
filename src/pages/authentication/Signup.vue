<template>
  <div>
    <loading-page v-show="loadingPageDetail"></loading-page>
    <ValidationObserver v-slot="{ invalid }" ref="observerAdd">
      <div v-show="!loadingPageDetail" class="flex h-screen">
        <div class="m-auto">
          <el-row class="pt-4 pl-3 pr-3">
            <div class="text-5xl mb-3">Đăng ký</div>
            <el-col class="forms grow flex gap-x-4">
              <FormCard title="Thông tin chuỗi cửa hàng" class="mb-3 w-full">
                <template v-slot:content>
                  <div class="grid grid-cols-12 gap-x-6">
                    <div class="col-span-6">
                      <BaseInput
                        :field="warehouseChainD.wcode"
                        v-model="warehouseChainD.wcode.value"
                      />
                    </div>
                    <div class="col-span-12">
                      <BaseInput
                        :field="warehouseChainD.wname"
                        v-model="warehouseChainD.wname.value"
                      />
                    </div>
                    <div class="col-span-12">
                      <BaseInput
                        :field="warehouseChainD.wshortName"
                        v-model="warehouseChainD.wshortName.value"
                      />
                    </div>
                    <div class="col-span-12 grid grid-cols-12 gap-x-6">
                      <div class="col-span-6">
                        <BaseInput
                          :field="warehouseChainD.wtaxNumber"
                          v-model="warehouseChainD.wtaxNumber.value"
                        />
                      </div>
                      <div class="col-span-6">
                        <DatePicker
                          :field="warehouseChainD.wtaxDeclarationDate"
                          v-model="warehouseChainD.wtaxDeclarationDate.value"
                        />
                      </div>
                    </div>
                    <div class="col-span-12">
                      <BaseTextArea
                        :field="warehouseChainD.wdescription"
                        v-model="warehouseChainD.wdescription.value"
                      />
                    </div>
                  </div>
                </template>
              </FormCard>
              <FormCard title="User Information" class="mb-3 w-full">
                <template v-slot:content>
                  <div class="grid grid-cols-12 gap-x-6">
                    <div class="col-span-12 grid grid-cols-12 gap-x-6">
                      <div class="col-span-6">
                        <BaseInput
                          :field="userInfor.code"
                          v-model="userInfor.code.value"
                        />
                      </div>
                    </div>
                    <div class="col-span-12 grid grid-cols-12 gap-x-6">
                      <div class="col-span-6">
                        <BaseInput
                          :field="userInfor.firstname"
                          v-model="userInfor.firstname.value"
                        />
                      </div>
                      <div class="col-span-6">
                        <BaseInput
                          :field="userInfor.lastname"
                          v-model="userInfor.lastname.value"
                        />
                      </div>
                    </div>
                    <div class="col-span-12 grid grid-cols-12 gap-x-6">
                      <div class="col-span-6">
                        <BaseSelection
                          :field="userInfor.title"
                          v-model="userInfor.title.value"
                        />
                      </div>
                      <div class="col-span-6">
                        <BaseInput
                          :field="userInfor.mobilePhone"
                          v-model="userInfor.mobilePhone.value"
                        />
                      </div>
                    </div>
                    <div class="col-span-12">
                      <BaseInput
                        :field="userInfor.email"
                        v-model="userInfor.email.value"
                      />
                    </div>
                    <div class="col-span-12 grid grid-cols-12 gap-x-6">
                      <div class="col-span-6">
                        <BaseInput
                          :field="userInfor.password"
                          v-model="userInfor.password.value"
                        />
                      </div>
                      <div class="col-span-6">
                        <BaseInput
                          :field="userInfor.confPassword"
                          v-model="userInfor.confPassword.value"
                        />
                      </div>
                    </div>
                  </div>
                </template>
              </FormCard>
            </el-col>
            <div class="flex justify-end p-2">
              <el-button @click="">Thoát</el-button>
              <el-button
                :disabled="invalid"
                @click="handleSubmit"
                class="bg-blue-400"
                type="primary"
              >
                Xác nhận
              </el-button>
            </div>
            <!-- <div class="mt-3">
              <el-button
                :disablemd="invalid"
                @click="handleSubmit"
                class="bg-blue-400 w-full"
                type="primary"
                >Submit</el-button
              >
            </div> -->
          </el-row>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import BaseInput from "./../../components/Inputs/BaseInput.vue";
import BaseSelection from "../../components/Inputs/BaseSelection.vue";
import FormCard from "./../../components/Cards/FormCard.vue";
import { ValidationObserver } from "vee-validate";
import DatePicker from "./../../components/Date/DatePicker.vue";
import BaseTextArea from "./../../components/Inputs/BaseTextArea.vue";
import LoadingPage from "@/components/Cards/LoadingPage";
import moment from "moment";

import axios from "axios";
export default {
  components: {
    BaseInput,
    FormCard,
    BaseSelection,
    ValidationObserver,
    LoadingPage,
    BaseTextArea,
    DatePicker,
  },
  computed: {
    moment() {
      return moment;
    },
  },
  data() {
    return {
      loadingPageDetail: false,
      warehouseChainD: {
        wcode: {
          id: "code",
          name: "code",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Mã chuỗi cửa hàng",
          isRequired: "true",
          value: "",
          placeholder: "Nhập Mã chuỗi cửa hàng...",
          maxlength: 50,
          error: "",
        },
        wname: {
          id: "name",
          name: "name",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Tên chuỗi",
          isRequired: "true",
          value: "",
          placeholder: "Nhập Tên chuỗi...",
          maxlength: 100,
          error: "",
        },
        wshortName: {
          id: "shortName",
          name: "shortName",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Tên viết tắt",
          isRequired: "true",
          value: "",
          placeholder: "Nhập Tên viết tắt...",
          maxlength: 100,
          error: "",
        },
        wdescription: {
          id: "description",
          name: "description",
          rules: "",
          classes: "w-full !h-[64px]",
          type: "text",
          label: "Mô tả",
          isRequired: "",
          value: "",
          placeholder: "Nhập mô tả...",
          maxlength: 100,
          error: "",
        },
        wtaxNumber: {
          id: "taxNumber",
          name: "taxNumber",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Mã số thuế",
          isRequired: "true",
          value: "",
          placeholder: "Nhập mã số thuế...",
          maxlength: 100,
          error: "",
        },
        wtaxDeclarationDate: {
          id: "taxDeclarationDate",
          name: "taxDeclarationDate",
          rules: "",
          classes: "w-full",
          type: "text",
          label: "Ngày đăng ký MST",
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
      userInfor: {
        code: {
          id: "code",
          name: "Code",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Mã nhân viên",
          isRequired: "true",
          value: "",
          placeholder: "Nhập Mã nhân viên...",
          maxlength: 50,
          error: "",
        },
        firstname: {
          id: "firstname",
          name: "firstname",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Tên nhân niên",
          isRequired: "true",
          value: "",
          placeholder: "Nhập vào Tên nhân niên...",
          maxlength: 50,
          error: "",
        },
        lastname: {
          id: "lastname",
          name: "lastname",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Họ nhân niên",
          isRequired: "true",
          value: "",
          placeholder: "Nhập vào Họ nhân niên...",
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
          placeholder: "Chọn giới tính...",
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
        email: {
          id: "email",
          name: "email",
          rules: "required|email",
          classes: "w-full",
          type: "text",
          isRequired: "true",
          value: "",
          label: "Email",
          maxlength: 50,
          placeholder: "Nhập Email...",
          error: "",
        },
        password: {
          id: "password",
          name: "password",
          rules: "required",
          classes: "w-full",
          type: "password",
          isRequired: "true",
          value: "",
          label: "Mật khẩu",
          placeholder: "Nhập mật khẩu...",
          error: "",
        },
        confPassword: {
          id: "confPassword",
          name: "confPassword",
          rules: "required",
          classes: "w-full",
          type: "password",
          isRequired: "true",
          value: "",
          label: "Xác nhận mật khẩu",
          placeholder: "Nhập xác nhận mật khẩu...",
          error: "",
        },
      },
    };
  },
  methods: {
    handleSubmit() {
      const data = {};
      Object.keys(this.userInfor).map((key) => {
        data[key] = this.userInfor[key].value;
        if (key === "title") {
          data["title"] =
            this.userInfor.title.options.find(
              (opt) =>
                opt.label == this.userInfor.title.value ||
                opt.value == this.userInfor.title.value
            ).value || 0;
        }
      });
      Object.keys(this.warehouseChainD || {}).map((key) => {
        data[key] = this.warehouseChainD[key].value;
        if (key == "wtaxDeclarationDate") {
          data["wtaxDeclarationDate"] = moment(
            data.wtaxDeclarationDatetaxDeclarationDate
          ).format("YYYY-MM-DD HH:mm:ss");
        }
      });
      console.log(data, "data");
      if (this.userInfor.password.value !== this.userInfor.confPassword.value) {
        this.$refs.observerAdd.setErrors({
          password: "Password and Confirm Password do not match",
          confPassword: "Password and Confirm Password do not match",
        });
      } else {
        this.handleApiSingUp(data);
      }
    },
    async handleApiSingUp(data) {
      var me = this;
      me.loadingPageDetail = true;
      await axios
        .post(`http://localhost:9090/api/v1/user/signup`, data, {
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then(function (res) {
          if (res) {
            me.$router.push({ path: "/login" });
            me.$message({
              showClose: true,
              message: "Created Successfully",
              type: "success",
            });
            me.loadingPageDetail = false;
            me.$router.push({ path: "/login" });
          }
        })
        .catch(function (error) {
          me.$refs.observerAdd.setErrors(error.response.data.items);
          const err = [];
          Object.keys(error.response.data.items).map((key) => {
            err.push(error.response.data.items[key] + ", ");
          });
          me.$message({
            showClose: true,
            message: err,
            type: "error",
          });
          me.loadingPageDetail = false;
        });
    },
  },
  mounted() {},
};
</script>
<style></style>
