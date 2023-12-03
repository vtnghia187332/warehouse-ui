<template>
  <div>
    <loading-page v-show="loadingPageDetail"></loading-page>
    <ValidationObserver v-slot="{ invalid }" ref="observerAdd">
      <div v-show="!loadingPageDetail" class="flex h-screen">
        <div class="m-auto">
          <el-row class="pt-4 pl-3 pr-3 !w-[800px]">
            <el-col class="forms grow">
              <FormCard title="Sign up" class="mb-3">
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
                  <div class="mt-3">
                    <el-button
                      :disabled="invalid"
                      @click="handleSubmit"
                      class="bg-blue-400 w-full"
                      type="primary"
                      >Submit</el-button
                    >
                  </div>
                </template>
              </FormCard>
            </el-col>
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
import LoadingPage from "../../components/Cards/LoadingPage.vue";
import axios from "axios";
export default {
  components: {
    BaseInput,
    FormCard,
    BaseSelection,
    ValidationObserver,
    LoadingPage,
  },
  data() {
    return {
      loadingPageDetail: false,
      userInfor: {
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
          options: [
            {
              value: 1,
              label: "Mr",
            },
            {
              value: 2,
              label: "Mrs",
            },
            {
              value: 3,
              label: "Other",
            },
          ],
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
          placeholder: "Enter Email...",
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
          label: "Password",
          placeholder: "Enter Password...",
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
          label: "Confirm Password",
          placeholder: "Enter Confirm Password...",
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
