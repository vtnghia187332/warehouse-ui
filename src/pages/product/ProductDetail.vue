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
                    <BaseSelection
                      @getValue="handleChangeSingleUnit"
                      v-model="product.singleUnit.value"
                      :field="product.singleUnit"
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
                border
                style="width: 100%"
                @row-dblclick="handleCalUnitDetail"
              >
                <div slot="append" v-if="units.length == '0'">
                  <el-empty :image-size="200"></el-empty>
                </div>

                <el-table-column label="STT" type="index"> </el-table-column>
                <el-table-column label="Conversation Unit" prop="">
                  <template slot-scope="scope">
                    {{ scope.row.unitDestinationId }}
                  </template>
                </el-table-column>
                <el-table-column label="Conservation Rate" prop="time">
                  <template slot-scope="scope">
                    {{ scope.row.unitStockDestination }}
                  </template>
                </el-table-column>
                <el-table-column label="Caculation" prop="remark">
                  <template slot-scope="scope">
                    {{ scope.row.calUnit }}
                  </template>
                </el-table-column>
                <el-table-column label="Description" prop="remark">
                  <template slot-scope="scope">
                    {{ scope.row.description }}
                  </template>
                </el-table-column>
                <el-table-column align="right">
                  <template slot="header" slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      class="bg-blue-300"
                      @click="AddConversationUnit"
                      >Add</el-button
                    >
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      class="bg-red-300"
                      @click="handleDeleteUnit(scope)"
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
                <div class="col-span-12">
                  <BaseSelection
                    @getValue="handleChangeCategory"
                    v-model="category.value"
                    :field="category"
                  />
                </div>
              </div>
            </template>
          </FormCard>
          <div class="footer-btn-fixed flex justify-end p-4">
            <el-button @click="handleCancelSubmit">Cancel</el-button>
            <el-button
              @click="handleSubmit"
              class="bg-blue-400"
              type="primary"
              >{{ productPId != 0 ? "Update" : "Create" }}</el-button
            >
          </div>
        </el-col>
      </el-row>
      <ConversationUnitVue
        :dialogVisibleUnit.sync="dialogVisibleUnit"
        v-show="dialogVisibleUnit"
        ref="cal-unit"
        @handle-data="handleDataCalUnit"
      />
    </div>
  </ValidationObserver>
</template>
<script>
import BaseInput from "./../../components/Inputs/BaseInput.vue";
import axios from "axios";
import BaseTextArea from "./../../components/Inputs/BaseTextArea.vue";
import ConversationUnitVue from "./ConversationUnit.vue";
import FormCard from "./../../components/Cards/FormCard.vue";
import BaseSelection from "../../components/Inputs/BaseSelection.vue";
import { ValidationObserver } from "vee-validate";
export default {
  components: {
    BaseInput,
    FormCard,
    BaseTextArea,
    BaseSelection,
    ConversationUnitVue,
    ValidationObserver,
  },
  data() {
    return {
      calculations: [
        {
          label: "+",
          value: 0,
        },
        {
          label: "-",
          value: 1,
        },
        {
          label: "*",
          value: 2,
        },
        {
          label: "/",
          value: 3,
        },
      ],
      dialogVisibleUnit: false,
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
        photo: {
          id: "photo",
          name: "Photo",
          rules: "",
          classes: "w-full col-span-6 !h-[64px]",
          type: "text",
          label: "Photo",
          isRequired: "false",
          value: "",
          placeholder: "Enter Photo...",
          maxlength: 150,
          error: "",
        },
      },
      category: {
        id: "category",
        baseId: 0,
        name: "category",
        rules: "",
        classes: "w-full",
        isRequired: "false",
        placeholder: "Select Category",
        error: "",
        value: "",
        disabled: "notDisabled",
        label: "Category",
        options: [],
      },
    };
  },
  methods: {
    handleDeleteUnit(item) {
      const index = item.$index;
      this.units.splice(index, 1);
    },
    handleDataCalUnit(item) {
      item.unitDestinationId =
        this.product.singleUnit.options.find(
          (opt) => opt.value == item.unitDestinationId
        ).label || "";
      item.calUnit =
        this.calculations.find((opt) => opt.value == item.calUnit).label || "";

      this.units.push(item);
    },
    handleCalUnitDetail(row, col, event) {
      this.$refs["cal-unit"].initData({ ...row, id: { value: row.index } });
    },
    AddConversationUnit() {
      let valueSingleUnit = "";
      this.product.singleUnit.options.forEach((item) => {
        if (item.value === this.product.singleUnit.value) {
          valueSingleUnit = item.label;
        }
      });
      this.$refs["cal-unit"].conversationUnit.unitOriginId.value =
        valueSingleUnit;
      this.dialogVisibleUnit = true;
    },
    handleChangeCategory(val) {
      this.category.baseId = val;
    },
    handleChangeSingleUnit(val) {
      this.product.singleUnit.baseId = val;
    },
    getValueCategory() {
      axios
        .get("http://localhost:9090/api/v1/category/list", {
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then((res) => {
          if (res.status === 200) {
            this.category.options = res.data.items;
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
    getValueSingleUnit() {
      axios
        .get("http://localhost:9090/api/v1/single-unit/all", {
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then((res) => {
          if (res.status === 200) {
            this.product.singleUnit.options = res.data.items;
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
    handleSubmit() {
      if (this.units.length > 0) {
        this.units.forEach((item) => {
          item.unitOriginId =
            this.product.singleUnit.options.find(
              (opt) => opt.label == this.product.singleUnit.value
            ).value || "";
          item.unitDestinationId =
            this.product.singleUnit.options.find(
              (opt) => opt.label == item.unitDestinationId
            ).value || "";
        });
      }
      const productDetail = {
        warehouseId: 1,
        id: this.productPId,
        productId: this.$route.params.data.id,
        singleUnitId: this.product.singleUnit.baseId,
        categoryProductId: this.category.baseId,
        units: this.units,
      };
      Object.keys(this.product || {}).map((key) => {
        productDetail[key] = this.product[key].value;
      });
      if (this.$route.params.data.type === "EDIT") {
        this.handleEditProduct(productDetail);
      } else {
        this.handleCreateProduct(productDetail);
      }
    },
    handleEditProduct(productDetail) {
      axios({
        method: "put",
        url: "http://localhost:9090/api/v1/product",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: productDetail,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ path: "/product" });
            this.$message({
              showClose: true,
              message: "Updated successfully",
              type: "success",
            });
          }
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: error.response.data.items,
            type: "error",
          });
          this.$refs.observerAdd.setErrors(error.response.data.items);
        });
    },
    async handleCreateProduct(productDetail) {
      await axios({
        method: "post",
        url: "http://localhost:9090/api/v1/product",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: productDetail,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ path: "/product" });
            this.$message({
              showClose: true,
              message: "Created successfully",
              type: "success",
            });
          }
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: error.response.data.items,
            type: "error",
          });
          this.$refs.observerAdd.setErrors(error.response.data.items);
        });
    },
    handleCancelSubmit() {
      this.$confirm("Are you sure to canncel adding Product")
        .then((_) => {
          this.$router.push({ path: "/product" });
        })
        .catch((_) => {});
    },
    getProductDetail() {
      if (this.$route.params.data.id != null) {
        axios
          .get(
            `http://localhost:9090/api/v1/product/detail/${this.$route.params.data.id}`,
            { headers: { "Access-Control-Allow-Origin": "*" } }
          )
          .then((res) => {
            if (res.status === 200) {
              Object.keys(this.product).forEach((key) => {
                this.product[key].value = res.data.items[key];
                this.units = res.data.items.units;
                this.category.value = res.data.items.categoryProductRes.name;
                this.category.baseId = res.data.items.categoryProductRes.id;
                this.product.singleUnit.baseId = res.data.items.singleUnit.id;
                this.product.singleUnit.value = res.data.items.singleUnit.name;
              });
            }
            this.units.forEach((item) => {
              item.unitDestinationId =
                this.product.singleUnit.options.find(
                  (opt) => opt.value == item.unitDestinationId
                ).label || "";
            });
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error,
              type: "error",
            });
          });
        if (this.$route.params.data.type === "DUPLICATED") {
        }
      }
    },
  },
  computed: {},
  created() {
    if (!this.$route.params.data) {
      this.$router.push({ path: "/product" });
      return;
    }
    this.getValueCategory();
    this.getValueSingleUnit();
    this.getProductDetail();
  },
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
