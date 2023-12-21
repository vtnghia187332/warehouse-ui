<template>
  <div>
    <loading-page v-show="loadingPageDetail"></loading-page>
    <ValidationObserver v-slot="{ invalid }" ref="observerAdd">
      <div v-show="!loadingPageDetail" class="flex h-screen">
        <div class="m-auto">
          <el-row class="pt-4 pl-3 pr-3 !w-[500px]">
            <el-col class="forms grow">
              <FormCard title="Quên mật khẩu" class="mb-3">
                <template v-slot:content>
                  <div class="grid grid-cols-12 gap-x-6">
                    <div class="col-span-12">
                      <BaseInput
                        :field="userInfor.email"
                        v-model="userInfor.email.value"
                      />
                    </div>
                    <div class="col-span-12 mt-2">
                      <BaseInput
                        :field="userInfor.mobilePhone"
                        v-model="userInfor.mobilePhone.value"
                      />
                    </div>
                    <div class="col-span-12 mt-2">
                      <BaseInput
                        :field="userInfor.nationalNumber"
                        v-model="userInfor.nationalNumber.value"
                      />
                    </div>
                  </div>
                  <div class="mt-3">
                    <el-button
                      :disabled="invalid"
                      @click="handleSubmit"
                      class="bg-blue-400 w-full"
                      type="primary"
                      >Gửi</el-button
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
import FormCard from "./../../components/Cards/FormCard.vue";
import { ValidationObserver } from "vee-validate";
import LoadingPage from "../../components/Cards/LoadingPage.vue";
import axios from "axios";
export default {
  components: { BaseInput, FormCard, ValidationObserver, LoadingPage },
  computed: {
    ...mapGetters(["user", "warehouse"]),
  },
  data() {
    return {
      loadingPageDetail: false,
      userInfor: {
        email: {
          id: "email",
          name: "email",
          rules: "required",
          classes: "w-full",
          type: "text",
          isRequired: "true",
          value: "",
          label: "Email",
          placeholder: "Nhập vào email...",
          error: "",
        },
        mobilePhone: {
          id: "mobilePhone",
          name: "mobilePhone",
          rules: "required",
          classes: "w-full",
          type: "text",
          isRequired: "true",
          value: "",
          label: "Số điện thoại",
          placeholder: "Nhập vào số điện thoại...",
          error: "",
        },
        nationalNumber: {
          id: "nationalNumber",
          name: "nationalNumber",
          rules: "required",
          classes: "w-full",
          type: "text",
          isRequired: "true",
          value: "",
          label: "CCCD/CMT",
          placeholder: "Nhập vào CCCD/CMT...",
          error: "",
        },
      },
    };
  },
  methods: {
    handleSubmit() {
      const data = {
        email: this.userInfor.email.value,
        mobilePhone: this.userInfor.mobilePhone.value,
        nationalNumber: this.userInfor.nationalNumber.value,
      };
      this.handleApiToForgotPwd(data);
    },
    async handleApiToForgotPwd(data) {
      var me = this;
      me.loadingPageDetail = true;
      await axios
        .post(`http://localhost:9090/api/v1/user/forgot-pwd`, data, {
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then(function (res) {
          if (res) {
            me.$router.push({ path: "/login" });
            me.$message({
              showClose: true,
              message: "Updated Successfully",
              type: "success",
            });
            me.loadingPageDetail = false;
          }
        })
        .catch(function (error) {
          me.loadingPageDetail = false;
          me.$refs.observerAdd.setErrors(error.response.data.items);
        });
    },
  },
  mounted() {},
};
</script>
<style></style>
