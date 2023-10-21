<template>
  <ValidationObserver v-slot="{ invalid }" ref="observerAdd">
    <div class="mb-16">
      <el-row class="pt-4 pl-3 pr-3" :gutter="20">
        <el-col :span="18" class="forms grow">
          <FormCard title="Information" class="mb-3">
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
                    <BaseInput :field="user.title" v-model="user.title.value" />
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
                    <BaseInput
                      :field="user.password"
                      v-model="user.password.value"
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
                    <BaseInput
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
          <FormCard title="User ID" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12"></div>
              </div>
            </template>
          </FormCard>
          <FormCard title="More Information" class="mb-3">
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
          <div class="footer-btn-fixed flex justify-end p-4">
            <el-button @click="">Cancel</el-button>
            <el-button
              @click="handleSubmitDataUser"
              class="bg-blue-400"
              type="primary"
              >{{ userPrimaryKey.userId != 0 ? "Update" : "Create" }}</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
  </ValidationObserver>
</template>
<script>
import BaseInput from "./../../components/Inputs/BaseInput.vue";
import axios from "axios";
import BaseTextArea from "./../../components/Inputs/BaseTextArea.vue";
import FormCard from "./../../components/Cards/FormCard.vue";
import BaseSelection from "../../components/Inputs/BaseSelection.vue";
import BaseSelectMul from "../../components/Inputs/BaseSelectMul.vue";
import { ValidationObserver } from "vee-validate";
import DatePicker from "../../components/Date/DatePicker.vue";
export default {
  components: {
    BaseInput,
    FormCard,
    BaseTextArea,
    BaseSelection,
    BaseSelectMul,
    ValidationObserver,
    DatePicker,
  },
  data() {
    return {
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
          label: "Code",
          isRequired: "true",
          value: "",
          placeholder: "Enter Code...",
          maxlength: 50,
          error: "",
        },
        firstname: {
          id: "firstname",
          name: "firstname",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "First Name",
          isRequired: "true",
          value: "",
          placeholder: "Enter First Name...",
          maxlength: 50,
          error: "",
        },
        lastname: {
          id: "lastname",
          name: "lastname",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Last Name",
          isRequired: "true",
          value: "",
          placeholder: "Enter Last Name...",
          maxlength: 50,
          error: "",
        },
        email: {
          id: "email",
          name: "email",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Email",
          isRequired: "true",
          value: "",
          placeholder: "Enter Email...",
          maxlength: 50,
          error: "",
        },
        password: {
          id: "password",
          name: "password",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Password",
          isRequired: "true",
          value: "",
          placeholder: "Enter Password...",
          maxlength: 50,
          error: "",
        },
        title: {
          id: "title",
          name: "title",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Title",
          isRequired: "true",
          value: "",
          placeholder: "Enter Title...",
          maxlength: 50,
          error: "",
        },
        mobilePhone: {
          id: "mobilePhone",
          name: "mobilePhone",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Mobile Phone",
          isRequired: "true",
          value: "",
          placeholder: "Enter Mobile Phone...",
          maxlength: 50,
          error: "",
        },
        nationalNumber: {
          id: "nationalNumber",
          name: "nationalNumber",
          rules: "",
          classes: "w-full",
          type: "text",
          label: "National Number",
          isRequired: "",
          value: "",
          placeholder: "Enter National Number...",
          maxlength: 50,
          error: "",
        },
        expiredNationalNumber: {
          id: "expiredNationalNumber",
          name: "expiredNationalNumber",
          rules: "",
          classes: "w-full",
          type: "text",
          label: "Expired National Number",
          isRequired: "",
          value: "",
          placeholder: "Enter Expired National Number...",
          maxlength: 50,
          error: "",
        },
        birthDay: {
          id: "birthDay",
          name: "birthDay",
          rules: "",
          classes: "w-full",
          type: "text",
          label: "Birthday",
          isRequired: "",
          value: "",
          placeholder: "Enter Birthday...",
          maxlength: 50,
          error: "",
        },
        salary: {
          id: "salary",
          name: "salary",
          rules: "",
          classes: "w-full",
          type: "text",
          label: "Salary",
          isRequired: "",
          value: "",
          placeholder: "Enter Salary...",
          maxlength: 50,
          error: "",
        },
        inforDetail: {
          id: "inforDetail",
          name: "inforDetail",
          rules: "",
          classes: "w-full col-span-6 !h-[100px]",
          type: "text",
          label: "Detail",
          isRequired: "",
          value: "",
          placeholder: "Enter Detail...",
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
          placeholder: "Select Roles",
          error: "",
          value: [],
          disabled: "notDisabled",
          label: "Role",
          options: [],
        },
      },
    };
  },
  methods: {
    handleSubmitDataUser() {
      const userDetail = {
        id: this.userPrimaryKey.id,
        userId: this.userPrimaryKey.userId,
        warehouseId: "WH-1",
      };
      Object.keys(this.user).map((key) => {
        userDetail[key] = this.user[key].value;
      });
      console.log(userDetail, "userDetailuserDetail");
    },
    getRolesSel() {
      axios
        .get("http://localhost:9090/api/v1/role/all", {
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then((res) => {
          if (res.status === 200) {
            this.user.roles.options = res.data.items;
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
    this.getRolesSel();
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
