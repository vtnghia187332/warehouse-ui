<template>
  <ValidationObserver v-slot="{ invalid }" ref="observerAdd">
    <div class="flex h-screen">
      <div class="m-auto">
        <el-row class="pt-4 pl-3 pr-3 !w-[500px]">
          <el-col class="forms grow">
            <FormCard title="Change Password" class="mb-3">
              <template v-slot:content>
                <div class="grid grid-cols-12 gap-x-6">
                  <div class="col-span-12">
                    <BaseInput
                      :field="userInfor.oldPwd"
                      v-model="userInfor.oldPwd.value"
                    />
                  </div>
                  <div class="col-span-12 mt-2">
                    <BaseInput
                      :field="userInfor.newPwd"
                      v-model="userInfor.newPwd.value"
                    />
                  </div>
                  <div class="col-span-12 mt-2">
                    <BaseInput
                      :field="userInfor.conNewPwd"
                      v-model="userInfor.conNewPwd.value"
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
                </div>
              </template>
            </FormCard>
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
      userInfor: {
        oldPwd: {
          id: "oldPwd",
          name: "oldPwd",
          rules: "required",
          classes: "w-full",
          type: "password",
          isRequired: "true",
          value: "",
          label: "Old Password",
          placeholder: "Enter Old Password...",
          error: "",
        },
        newPwd: {
          id: "newPwd",
          name: "newPwd",
          rules: "required",
          classes: "w-full",
          type: "password",
          isRequired: "true",
          value: "",
          label: "New Password",
          placeholder: "Enter New Password...",
          error: "",
        },
        conNewPwd: {
          id: "conNewPwd",
          name: "conNewPwd",
          rules: "required",
          classes: "w-full",
          type: "password",
          isRequired: "true",
          value: "",
          label: "Confirm New Password",
          placeholder: "Enter Confirm New Password...",
          error: "",
        },
      },
    };
  },
  methods: {
    ...mapMutations(["setUserDetail"]),
    ...mapActions(["updateUserDetail"]),
    handleSubmit() {
      if (this.userInfor.newPwd.value !== this.userInfor.conNewPwd.value) {
        this.$refs.observerAdd.setErrors({
          password: "Password and Confirm Password do not match",
          confPassword: "Password and Confirm Password do not match",
        });
      } else {
        this.userInfor.newPwd.error = null;
        this.userInfor.conNewPwd.error = null;
        const data = {
          oldPwd: this.userInfor.oldPwd.value,
          newPwd: this.userInfor.newPwd.value,
          conNewPwd: this.userInfor.conNewPwd.value,
          userId: this.user.userId,
        };
        this.handleApiToChangePwd(data);
      }
    },
    async handleApiToChangePwd(data) {
      var me = this;
      await axios
        .post(`http://localhost:9090/api/v1/user/change-pwd`, data, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          contentType: "multipart/form-data",
        })
        .then(function (res) {
          if (res) {
            me.$router.push({ path: "/dashboard" });
            me.$message({
              showClose: true,
              message: "Updated Successfully",
              type: "success",
            });
          }
        })
        .catch(function (error) {
          me.$refs.observerAdd.setErrors(error.response.data.items);
        });
    },
  },
  mounted() {},
};
</script>
<style></style>
