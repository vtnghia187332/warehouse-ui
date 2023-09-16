<template>
  <div>
    <el-row class="pt-4 pl-3 pr-3" :gutter="20">
      <el-col :span="18" class="forms grow">
        <FormCard title="Information" class="mb-3">
          <template v-slot:content>
            <div class="grid grid-cols-12 gap-x-6">
              <div class="col-span-12">
                <BaseInput
                  :field="customer.fullname"
                  v-model="customer.fullname.value"
                />
              </div>

              <div class="col-span-12 grid grid-cols-12 gap-x-6">
                <div class="col-span-6">
                  <BaseInput
                    :field="customer.mobilePhone"
                    v-model="customer.mobilePhone.value"
                  />
                </div>
                <div class="col-span-6">
                  <BaseInput
                    :field="customer.email"
                    v-model="customer.email.value"
                  />
                </div>
              </div>

              <div class="col-span-12 grid grid-cols-12 gap-x-6">
                <div class="col-span-6">
                  <BaseInput
                    :field="customer.birthDay"
                    v-model="customer.birthDay.value"
                  />
                </div>
                <div class="col-span-6">
                  <BaseInput
                    :field="customer.gender"
                    v-model="customer.gender.value"
                  />
                </div>
              </div>

              <div class="col-span-12 grid grid-cols-12 gap-x-6">
                <div class="col-span-6">
                  <BaseInput
                    :field="customer.gender"
                    v-model="customer.gender.value"
                  />
                </div>
                <div class="col-span-6">
                  <BaseInput
                    :field="customer.fullname"
                    v-model="customer.fullname.value"
                  />
                </div>
              </div>
              <div class="col-span-12 grid grid-cols-12 gap-x-6">
                <div class="col-span-6">
                  <BaseSelection :field="customer.country" />
                </div>
                <div class="col-span-6">
                  <BaseSelection :field="customer.city" />
                </div>
                <div class="col-span-6">
                  <BaseSelection :field="customer.district" />
                </div>
                <div class="col-span-6">
                  <BaseSelection :field="customer.subdistrict" />
                </div>
              </div>
              <div class="col-span-12">
                <BaseTextArea
                  :field="customer.detailAddress"
                  v-model="customer.detailAddress.value"
                />
              </div>
            </div>
          </template>
        </FormCard>
      </el-col>
      <el-col :span="6">
        <FormCard title="More Information" class="mb-3">
          <template v-slot:content>
            <div class="grid grid-cols-12 gap-x-6">
              <div class="col-span-12">
                <BaseTextArea
                  :field="customer.note"
                  v-model="customer.note.value"
                />
              </div>
            </div>
          </template>
        </FormCard>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import BaseInput from "./../../components/Inputs/BaseInput.vue";
import BaseTextArea from "./../../components/Inputs/BaseTextArea.vue";
import FormCard from "./../../components/Cards/FormCard.vue";
import BaseSelection from "../../components/Inputs/BaseSelection.vue";
export default {
  components: { BaseInput, FormCard, BaseTextArea, BaseSelection },
  data() {
    return {
      customer: {
        fullname: {
          id: "fullname",
          name: "Full Name",
          rules: "required",
          classes: "w-full col-span-6",
          type: "text",
          label: "Full Name",
          isRequired: "true",
          value: "",
          placeholder: "Enter Full Name...",
          maxlength: 50,
          error: "",
        },
        mobilePhone: {
          id: "mobilePhone",
          name: "Mobile Phone",
          rules: "required",
          classes: "w-full col-span-6",
          type: "text",
          label: "Mobile Phone",
          isRequired: "true",
          value: "",
          placeholder: "Enter Mobile Phone...",
          maxlength: 20,
          error: "",
        },
        email: {
          id: "email",
          name: "Email",
          rules: "required|email",
          classes: "w-full col-span-6",
          type: "text",
          label: "Email",
          isRequired: "true",
          value: "",
          placeholder: "Enter Email...",
          maxlength: 50,
          error: "",
        },
        birthDay: {
          id: "birthDay",
          name: "BirthDay",
          rules: "required",
          classes: "w-full col-span-6",
          type: "text",
          label: "BirthDay",
          isRequired: "true",
          value: "",
          placeholder: "Enter BirthDay...",
          maxlength: 50,
          error: "",
        },
        gender: {
          id: "gender",
          name: "Gender",
          rules: "required",
          classes: "w-full col-span-6",
          type: "text",
          label: "Gender",
          isRequired: "true",
          value: "",
          placeholder: "Enter Gender...",
          maxlength: 50,
          error: "",
        },
        detailAddress: {
          id: "detailAddress",
          name: "Detail Address",
          rules: "required",
          classes: "w-full col-span-6 !h-[64px]",
          type: "text",
          label: "Detail Address",
          isRequired: "true",
          value: "",
          placeholder: "Enter Detail Address...",
          maxlength: 50,
          error: "",
        },
        note: {
          id: "note",
          name: "Note",
          rules: "required",
          classes: "w-full col-span-6 !h-[135px]",
          type: "text",
          label: "Note",
          isRequired: "true",
          value: "",
          placeholder: "Enter Detail Address...",
          maxlength: 50,
          error: "",
        },
        country: {
          id: "country",
          name: "country",
          rules: "required",
          classes: "w-full",
          isRequired: "true",
          placeholder: "Select Country",
          error: "",
          value: "",
          disabled: "notDisabled",
          label: "Country",
          options: [],
        },
        city: {
          id: "city",
          name: "city",
          rules: "required",
          classes: "w-full",
          isRequired: "true",
          placeholder: "Select City",
          error: "",
          value: "",
          label: "City",
          disabled: "disabled",
          options: [],
        },
        district: {
          id: "district",
          name: "district",
          rules: "required",
          classes: "w-full",
          isRequired: "true",
          placeholder: "Select District",
          error: "",
          value: "",
          disabled: "disabled",
          label: "District",
          options: [],
        },
        subdistrict: {
          id: "subdistrict",
          name: "subdistrict",
          rules: "required",
          classes: "w-full",
          isRequired: "true",
          placeholder: "Select Sub District",
          error: "",
          value: "",
          disabled: "disabled",
          label: "Sub District",
          options: [],
        },
      },
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style></style>
