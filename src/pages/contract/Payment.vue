<template>
  <div>
    <el-row class="pt-4 pl-3 pr-3" :gutter="24">
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          <FormCard title="Order's Information" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12">order information</div>
              </div>
            </template>
          </FormCard>
        </div></el-col
      >
      <el-col :span="12"
        ><div class="grid-content bg-purple-light">
          <FormCard title="Customer's Information" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12">
                  <BaseInput
                    :field="customer.fullName"
                    v-model="customer.fullName.value"
                  />
                </div>
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
                <div class="col-span-12">
                  <BaseTextArea
                    :field="customer.detailAddress"
                    v-model="customer.detailAddress.value"
                  />
                </div>
              </div>
              <div class="col-span-12">
                <BaseSelection
                  :field="order.modePayment"
                  v-model="order.modePayment.value"
                />
              </div>
            </template>
          </FormCard>
          <FormCard title="Delivery" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12"></div>
              </div>
            </template>
          </FormCard>
          <FormCard title="Payment money" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12">
                  số tiền đã trả => tiền thừa || tiền còn nợ
                </div>
              </div>
            </template>
          </FormCard>
        </div></el-col
      >
    </el-row>
  </div>
</template>
<script>
import FormCard from "./../../components/Cards/FormCard.vue";
import BaseInput from "./../../components/Inputs/BaseInput.vue";
import BaseSelection from "../../components/Inputs/BaseSelection.vue";
import BaseTextArea from "./../../components/Inputs/BaseTextArea.vue";
export default {
  components: { FormCard, BaseInput, BaseTextArea, BaseSelection },
  data() {
    return {
      customer: {
        fullName: {
          id: "fullname",
          name: "Full Name",
          rules: "",
          classes: "w-full col-span-6",
          disabled: true,
          type: "text",
          label: "Full Name",
          isRequired: "",
          value: "",
          placeholder: "",
          error: "",
        },
        mobilePhone: {
          id: "mobilePhone",
          name: "Mobile Phone",
          rules: "",
          classes: "w-full col-span-6",
          type: "text",
          label: "Mobile Phone",
          disabled: true,
          isRequired: "",
          value: "",
          placeholder: "",
          error: "",
        },
        email: {
          id: "email",
          name: "Email",
          rules: "",
          classes: "w-full col-span-6",
          type: "text",
          label: "Email",
          disabled: true,
          isRequired: "",
          value: "",
          placeholder: "",
          error: "",
        },
        detailAddress: {
          id: "detailAddress",
          name: "Detail Address",
          rules: "",
          classes: "w-full col-span-6 !h-[64px]",
          type: "text",
          disabled: true,
          label: "Detail Address",
          isRequired: "",
          value: "",
          placeholder: "",
          error: "",
        },
      },
      order: {
        modePayment: {
          id: "modePayment",
          name: "Payment Method",
          rules: "",
          classes: "w-full col-span-6",
          disabled: false,
          type: "text",
          label: "Payment Method",
          isRequired: "",
          value: "",
          placeholder: "",
          error: "",
        },
      },
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style></style>
