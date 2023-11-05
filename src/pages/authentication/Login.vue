<template>
  <div class="flex h-screen bg-green-300">
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
                <el-button @click="" class="bg-blue-400 w-full" type="primary"
                  >Submit</el-button
                >
              </div>
              <div class="mt-3 flex justify-end">
                <el-link type="primary">Forgot your password?</el-link>
              </div>
            </template>
          </FormCard>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import BaseInput from "./../../components/Inputs/BaseInput.vue";
import FormCard from "./../../components/Cards/FormCard.vue";
export default {
  components: { BaseInput, FormCard },
  data() {
    return {
      loginInfor: {
        email: {
          id: "email",
          name: "Email",
          rules: "required",
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
  methods: {},
  mounted() {},
};
</script>
<style scoped></style>
