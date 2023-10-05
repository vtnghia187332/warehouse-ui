<template>
  <ValidationObserver v-slot="{ invalid }" ref="observerAdd">
    <div class="mb-16">
      <el-row class="pt-4 pl-3 pr-3" :gutter="20">
        <el-col :span="24" class="forms grow">
          <FormCard title="Information" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-6">
                  <BaseInput :field="order.name" v-model="order.name.value" />
                </div>
                <div class="col-span-6">
                  <BaseInput :field="order.code" v-model="order.code.value" />
                </div>
                <div class="col-span-12 grid grid-cols-12 gap-x-6">
                  <div class="col-span-6">
                    <BaseSelection
                      @getValue=""
                      v-model="order.typeInvoice.value"
                      :field="order.typeInvoice"
                    />
                  </div>
                </div>
              </div>
            </template>
          </FormCard>

          <FormCard title="Materials/Products" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-3">
                <div class="col-span-5">
                  <BaseSelection
                    @getValue=""
                    v-model="order.product.value"
                    :field="order.product"
                  />
                </div>
                <div class="col-span-2">
                  <BaseInput
                    :field="order.warrantyDate"
                    v-model="order.warrantyDate.value"
                  />
                </div>
                <div class="col-span-2">
                  <BaseSelection
                    @getValue=""
                    v-model="order.singleUnit.value"
                    :field="order.singleUnit"
                  />
                </div>
                <div class="col-span-2">
                  <BaseInput
                    :field="order.quantity"
                    v-model="order.quantity.value"
                  />
                </div>
                <div class="col-span-1 m-auto">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    class="bg-red-400"
                    circle
                  ></el-button>
                </div>
              </div>
            </template>
          </FormCard>

          <FormCard title="Customer" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12">
                  <BaseSelection
                    @getValue=""
                    v-model="order.customer.value"
                    :field="order.customer"
                  />
                </div>
              </div>
            </template>
          </FormCard>
          <FormCard title="Take Notes" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12">
                  <BaseTextArea
                    :field="order.note"
                    v-model="order.customer.note"
                  />
                </div>
              </div>
            </template>
          </FormCard>
        </el-col>
        <el-col :span="6">
          <div class="footer-btn-fixed flex justify-end p-4">
            <el-button @click="">Cancel</el-button>
            <el-button class="bg-blue-400" type="primary" @click=""
              >Create</el-button
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
import { ValidationObserver } from "vee-validate";
import DatePicker from "../../components/Date/DatePicker.vue";
export default {
  components: {
    BaseInput,
    FormCard,
    BaseTextArea,
    BaseSelection,
    ValidationObserver,
    DatePicker,
  },
  data() {
    return {
      order: {
        name: {
          id: "name",
          name: "Name",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Name",
          isRequired: "true",
          value: "",
          placeholder: "Enter Name...",
          maxlength: 150,
          error: "",
        },
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
          maxlength: 150,
          error: "",
        },
        typeInvoice: {
          id: "typeInvoice",
          baseId: 0,
          name: "typeInvoice",
          rules: "required",
          classes: "w-full",
          isRequired: "true",
          placeholder: "Select Single Unit",
          error: "",
          value: "",
          disabled: "notDisabled",
          label: "Type of Unit",
          options: [
            {
              value: 1,
              label: "Receipt",
            },
            {
              value: 2,
              label: "Export",
            },
          ],
        },
        customer: {
          id: "customer",
          baseId: 0,
          name: "customer",
          rules: "required",
          classes: "w-full",
          isRequired: "true",
          placeholder: "Select Customer",
          error: "",
          value: "",
          disabled: "notDisabled",
          label: "Customer",
          options: [],
        },
        note: {
          id: "note",
          name: "note",
          rules: "",
          classes: "w-full col-span-6 !h-[64px]",
          type: "text",
          label: "Note",
          isRequired: "false",
          value: "",
          placeholder: "Enter Note...",
          maxlength: 250,
          error: "",
        },
        product: {
          id: "product",
          baseId: 0,
          name: "product",
          rules: "required",
          classes: "w-full",
          isRequired: "true",
          placeholder: "Select Product",
          error: "",
          value: "",
          disabled: "notDisabled",
          label: "Material/Product",
          options: [],
        },
        warrantyDate: {
          id: "warrantyDate",
          baseId: 0,
          name: "warrantyDate",
          rules: "required",
          classes: "w-full",
          isRequired: "true",
          placeholder: "Select warrantyDate",
          error: "",
          value: "",
          disabled: "notDisabled",
          label: "Warranty Date",
          options: [],
        },
        singleUnit: {
          id: "singleUnit",
          baseId: 0,
          name: "singleUnit",
          rules: "required",
          classes: "w-full",
          isRequired: "true",
          placeholder: "Select Single Unit",
          error: "",
          value: "",
          disabled: "notDisabled",
          label: "Single Unit",
          options: [],
        },
        quantity: {
          id: "quantity",
          name: "Quantity",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Quantity",
          isRequired: "true",
          value: "",
          placeholder: "Enter Quantity...",
          error: "",
        },
      },
    };
  },
  methods: {},
  mounted() {},
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
