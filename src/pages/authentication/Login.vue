<template>
  <ValidationObserver v-slot="{ invalid }" ref="observerAdd">
    <div class="flex h-screen">
      <div class="m-auto">
        <el-row class="pt-4 pl-3 pr-3 w-96">
          <el-col class="forms grow">
            <FormCard title="Sign In" class="mb-3">
              <template v-slot:content>
                <div class="grid grid-cols-12 gap-x-6">
                  <div class="col-span-12">
                    <BaseInput
                      :field="loginInfor.email"
                      v-model="loginInfor.email.value"
                    />
                  </div>
                  <div class="col-span-12 mt-2">
                    <BaseInput
                      :field="loginInfor.password"
                      v-model="loginInfor.password.value"
                    />
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
                  <el-button
                    :disabled="!user.token"
                    @click="handleLogout"
                    class="bg-blue-400 w-full"
                    >Logout</el-button
                  >
                </div>
                <div class="mt-3 flex justify-end">
                  <el-link @click="handleForgotPassword" type="primary"
                    >Forgot your password?</el-link
                  >
                </div>
              </template>
            </FormCard>
            <div>{{ user?.token }}</div>
            <div>{{ user?.userId }}</div>
            <div>{{ user?.name }}</div>
            <div>{{ warehouse?.warehouseId }}</div>
            <div>{{ warehouse?.name }}</div>
            <div>Local storage:{{ token }}</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </ValidationObserver>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import BaseInput from "./../../components/Inputs/BaseInput.vue";
import FormCard from "./../../components/Cards/FormCard.vue";
import { ValidationObserver } from "vee-validate";
import axios from "axios";
export default {
  components: { BaseInput, FormCard, ValidationObserver },
  computed: {
    ...mapGetters(["user", "warehouse"]),
  },
  data() {
    return {
      token: null,
      defaultUserDetail: {
        token: null,
        userId: null,
        firstname: null,
        lastname: null,
        warehouseDetailRes: {
          warehouseId: null,
          name: null,
        },
      },
      loginInfor: {
        email: {
          id: "email",
          name: "Email",
          rules: "required|email",
          classes: "w-full",
          type: "text",
          isRequired: "true",
          value: "",
          placeholder: "Enter Email...",
          error: "",
        },
        password: {
          id: "password",
          name: "Password",
          rules: "required",
          classes: "w-full",
          type: "text",
          isRequired: "true",
          value: "",
          placeholder: "Enter Password...",
          error: "",
        },
      },
    };
  },
  methods: {
    handleForgotPassword() {},
    ...mapMutations(["setUserDetail"]),
    ...mapActions(["updateUserDetail"]),
    handleSubmit() {
      const data = {};
      Object.keys(this.loginInfor).map((key) => {
        data[key] = this.loginInfor[key].value;
      });
      this.handleApiLogin(data);
    },
    async handleLogout() {
      const header = new Headers({ Authorization: `Bearer ${this.token}` });
      await axios
        .get(`http://localhost:9090/api/v1/auth/logout`, {
          headers: { header },
          contentType: "multipart/form-data",
        })
        .then((response) => {
          localStorage.removeItem("token");
          this.$message({
            showClose: true,
            message: "You have been successfully log out of the system",
            type: "success",
          });
          this.updateUserDetail(this.defaultUserDetail);
          this.$router.push({ path: "/product" });
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: error.response.data.items,
            type: "error",
          });
        });
    },
    async handleApiLogin(data) {
      await axios
        .post(`http://localhost:9090/api/v1/auth/authenticate`, data, {
          headers: { "Access-Control-Allow-Origin": "*" },
          contentType: "multipart/form-data",
        })
        .then((response) => {
          if (response.status === 200) {
            this.updateUserDetail(response.data.userRes);
            this.token = localStorage.getItem("token");
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
  mounted() {},
};
</script>
<style scoped></style>
