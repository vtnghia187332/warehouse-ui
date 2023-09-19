<template>
  <ValidationObserver v-slot="{ invalid }" ref="observerAdd">
    <div class="mb-16">
      <el-row class="pt-4 pl-3 pr-3" :gutter="20">
        <el-col :span="18" class="forms grow">
          <FormCard title="Information" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12">
                  <BaseInput
                    :field="product.name"
                    v-model="product.name.value"
                  />
                </div>
                <div class="col-span-12 grid grid-cols-12 gap-x-6">
                  <div class="col-span-6">
                    <BaseInput
                      :field="product.importPrice"
                      v-model="product.importPrice.value"
                    />
                  </div>
                  <div class="col-span-6">
                    <BaseInput
                      :field="product.exportPrice"
                      v-model="product.exportPrice.value"
                    />
                  </div>
                </div>
                <div class="col-span-12 grid grid-cols-12 gap-x-6">
                  <div class="col-span-6">
                    <BaseInput
                      :field="product.quantity"
                      v-model="product.quantity.value"
                    />
                  </div>
                  <div class="col-span-6">
                    <BaseInput
                      :field="product.minQuantity"
                      v-model="product.minQuantity.value"
                    />
                  </div>
                </div>

                <div class="col-span-12 grid grid-cols-12 gap-x-6">
                  <div class="col-span-6">
                    <BaseInput
                      :field="product.singleUnit"
                      v-model="product.singleUnit.value"
                    />
                  </div>
                </div>
                <div class="col-span-12">
                  <BaseTextArea
                    :field="product.description"
                    v-model="product.description.value"
                  />
                </div>

                <div class="col-span-12 grid grid-cols-12 gap-x-6"></div>
              </div>
            </template>
          </FormCard>

          <FormCard title="Conversation Unit" class="mb-3">
            <template v-slot:content>
              <el-table
                height="448"
                :data="units"
                style="width: 100%"
                @row-dblclick=""
              >
                <div slot="append" v-if="units.length == '0'">
                  <el-empty :image-size="200"></el-empty>
                </div>

                <el-table-column label="STT" type="index" :index="indexMethod">
                </el-table-column>
                <el-table-column label="Date" prop="date">
                  <template slot-scope="scope">
                    <!-- {{ moment(scope.row.date).format("DD/MM/YYYY") }} -->
                  </template>
                </el-table-column>
                <el-table-column label="Time" prop="time">
                  <template slot-scope="scope">
                    <!-- {{
                      moment(scope.row.time[0]).format("HH:mm") +
                      " - " +
                      moment(scope.row.time[1]).format("HH:mm")
                    }} -->
                  </template>
                </el-table-column>
                <el-table-column label="Remark" prop="remark">
                  <template slot-scope="scope">
                    <!-- {{ scope.row.remark }} -->
                  </template>
                </el-table-column>
                <el-table-column align="right">
                  <template slot="header" slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      class="bg-blue-300"
                      @click=""
                      >Add</el-button
                    >
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      class="bg-red-300"
                      @click=""
                      >Delete</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </FormCard>
          <FormCard title="Barcode" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12">
                  <BaseInput
                    :field="product.code"
                    v-model="product.code.value"
                  />
                </div>
              </div>
            </template>
          </FormCard>
        </el-col>
        <el-col :span="6">
          <FormCard title="Product ID" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12"></div>
              </div>
            </template>
          </FormCard>
          <FormCard title="More Information" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12"></div>
              </div>
            </template>
          </FormCard>
          <FormCard title="Category" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12"></div>
              </div>
            </template>
          </FormCard>
          <div class="footer-btn-fixed flex justify-end p-4">
            <el-button @click="handleCancelSubmit">Cancel</el-button>
            <el-button
              @click="handleSubmit"
              class="bg-blue-400"
              :disabled="invalid"
              type="primary"
              >{{ productPId != 0 ? "Update" : "Create" }}</el-button
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
export default {
  components: {
    BaseInput,
    FormCard,
    BaseTextArea,
    BaseSelection,
    ValidationObserver,
  },
  data() {
    return {
      productPId: 0,
      units: [],
      product: {
        name: {
          id: "name",
          name: "Product Name",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Product Name",
          isRequired: "true",
          value: "",
          placeholder: "Enter Product Name...",
          maxlength: 50,
          error: "",
        },
        singleUnit: {
          id: "singleUnit",
          name: "Single Unit",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Single Unit",
          isRequired: "true",
          value: "",
          placeholder: "Enter Single Unit...",
          maxlength: 50,
          error: "",
        },
        importPrice: {
          id: "importPrice",
          name: "Import Price",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Import Price",
          isRequired: "true",
          value: "",
          placeholder: "Enter Import Price...",
          maxlength: 50,
          error: "",
        },
        exportPrice: {
          id: "exportPrice",
          name: "Export Price",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Export Price",
          isRequired: "true",
          value: "",
          placeholder: "Enter Export Price...",
          maxlength: 50,
          error: "",
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
          maxlength: 50,
          error: "",
        },
        minQuantity: {
          id: "minQuantity",
          name: "Min Quantitty",
          rules: "",
          classes: "w-full",
          type: "text",
          label: "Min Quantitty",
          isRequired: "false",
          value: "",
          placeholder: "Enter Min Quantitty...",
          maxlength: 50,
          error: "",
        },

        code: {
          id: "code",
          name: "Code",
          rules: "",
          classes: "w-full",
          type: "text",
          label: "Code",
          isRequired: "false",
          value: "",
          placeholder: "Enter Code...",
          maxlength: 50,
          error: "",
        },
        description: {
          id: "description",
          name: "Description",
          rules: "",
          classes: "w-full col-span-6 !h-[64px]",
          type: "text",
          label: "Description",
          isRequired: "false",
          value: "",
          placeholder: "Enter Description...",
          maxlength: 150,
          error: "",
        },
      },
    };
  },
  methods: {
    handleSubmit() {},
    handleCancelSubmit() {},
    getProductDetail() {},
  },
  mounted() {
    this.getProductDetail();
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
