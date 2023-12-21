<template>
  <ValidationObserver v-slot="{ invalid }" ref="observerAdd">
    <div class="mb-16">
      <el-row class="pt-4 pl-3 pr-3" :gutter="20">
        <el-col :span="18" class="forms grow">
          <FormCard title="Thông tin Nguyên Vật Liệu" class="mb-3">
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
                  <div class="col-span-6">
                    <BaseInput
                      :field="product.color"
                      v-model="product.color.value"
                    />
                  </div>
                </div>
                <div class="col-span-12 grid grid-cols-12 gap-x-6">
                  <div class="col-span-6">
                    <DatePicker :field="product.expiredDate" />
                  </div>
                </div>
                <div class="col-span-12 grid grid-cols-12 gap-x-6">
                  <div class="col-span-3">
                    <BaseInput
                      :field="product.height"
                      v-model="product.height.value"
                    />
                  </div>
                  <div class="col-span-3">
                    <BaseInput
                      :field="product.width"
                      v-model="product.width.value"
                    />
                  </div>
                  <div class="col-span-3">
                    <BaseInput
                      :field="product.length"
                      v-model="product.length.value"
                    />
                  </div>
                  <div class="col-span-3">
                    <BaseInput
                      :field="product.volume"
                      v-model="product.volume.value"
                    />
                  </div>
                </div>
                <div class="col-span-12">
                  <BaseTextArea
                    :field="product.description"
                    v-model="product.description.value"
                  />
                </div>
              </div>
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

          <FormCard title="Quy đổi đơn vị" class="mb-3">
            <template v-slot:content>
              <el-table
                height="448"
                :data="units"
                border
                style="width: 100%"
                @row-dblclick="handleCalUnitDetail"
                :row-class-name="conversationUnits"
              >
                <div slot="append" v-if="!units">
                  <el-empty :image-size="200"></el-empty>
                </div>
                <el-table-column label="STT" type="index" :index="indexMethod">
                </el-table-column>
                <el-table-column label="Đơn vị chuyển đổi" prop="">
                  <template slot-scope="scope">
                    {{ scope.row.unitDestinationId }}
                  </template>
                </el-table-column>
                <el-table-column label="Tỉ lệ chuyển đổi" prop="time">
                  <template slot-scope="scope">
                    {{ scope.row.unitStockDestination }}
                  </template>
                </el-table-column>
                <el-table-column label="Phép tính" prop="remark">
                  <template slot-scope="scope">
                    {{ scope.row.calUnit }}
                  </template>
                </el-table-column>
                <el-table-column label="Mô tả">
                  <template slot-scope="scope">
                    {{
                      "1 " +
                      scope.row.unitDestinationId +
                      " = " +
                      scope.row.unitStockDestination +
                      " " +
                      scope.row.calUnit +
                      " " +
                      scope.row.unitOriginId
                    }}
                  </template>
                </el-table-column>
                <el-table-column align="right">
                  <template slot="header" slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      class="bg-blue-300"
                      @click="AddConversationUnit"
                      >Thêm</el-button
                    >
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      class="bg-red-300"
                      @click="handleDeleteUnit(scope)"
                      >Xóa</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </FormCard>
        </el-col>
        <el-col :span="6">
          <FormCard title="Nguyên vật liệu ID" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12">
                  <b>
                    {{
                      $route.params.data.id !== null
                        ? $route.params.data.id
                        : "PD-xxx"
                    }}
                  </b>
                </div>
              </div>
            </template>
          </FormCard>
          <FormCard title="Ảnh" class="mb-3">
            <template v-slot:content>
              <div class="">
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false"
                  :on-change="handleAddPhotos"
                  :file-list="productPhotos"
                  :limit="1"
                  :disabled="productPhotos?.length === 1"
                  :append-to-body="true"
                >
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{ file }">
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    />
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
                <el-dialog :append-to-body="true" :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
              </div>
            </template>
          </FormCard>
          <FormCard title="" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12">
                  <BaseSelection
                    @getValue=""
                    v-model="product.warehouseId.value"
                    :field="product.warehouseId"
                  />
                </div>
              </div>
            </template>
          </FormCard>
          <FormCard title="" class="mb-3">
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
          <div class="footer-btn-fixed flex justify-end p-2">
            <el-button @click="handleCancelSubmit">Thoát</el-button>
            <el-button
              @click="handleSubmit"
              class="bg-blue-400"
              type="primary"
              >{{ productPId != 0 ? "Sửa" : "Thêm" }}</el-button
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
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";
import BaseTextArea from "./../../components/Inputs/BaseTextArea.vue";
import ConversationUnitVue from "./ConversationUnit.vue";
import FormCard from "./../../components/Cards/FormCard.vue";
import BaseSelection from "../../components/Inputs/BaseSelection.vue";
import { ValidationObserver } from "vee-validate";
import DatePicker from "../../components/Date/DatePicker.vue";
import moment from "moment";

export default {
  components: {
    BaseInput,
    FormCard,
    BaseTextArea,
    BaseSelection,
    ConversationUnitVue,
    ValidationObserver,
    DatePicker,
  },

  data() {
    return {
      productPhotos: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
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
      productId: null,
      units: [],
      unitOptions: [],
      product: {
        name: {
          id: "name",
          name: "Product Name",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Nguyên Vật Liệu",
          isRequired: "true",
          value: "",
          placeholder: "Nhập nguyên vật liệu...",
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
          placeholder: "Chọn đơn vị",
          error: "",
          value: "",
          disabled: "notDisabled",
          label: "Đơn vị",
          options: [],
        },
        importPrice: {
          id: "importPrice",
          name: "Import Price",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Giá nhập",
          isRequired: "true",
          value: "",
          placeholder: "Nhập giá nhập...",
          maxlength: 50,
          error: "",
        },
        exportPrice: {
          id: "exportPrice",
          name: "exportPrice",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Giá bán",
          isRequired: "true",
          value: "",
          placeholder: "Nhập giá bán...",
          error: "",
        },
        quantity: {
          id: "quantity",
          name: "Quantity",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Số lượng",
          isRequired: "true",
          value: "",
          placeholder: "Nhập số lượng...",
          error: "",
        },
        minQuantity: {
          id: "minQuantity",
          name: "Min Quantitty",
          rules: "",
          classes: "w-full",
          type: "text",
          label: "Số lượng tối thiểu",
          isRequired: "false",
          value: "",
          placeholder: "Nhập số lượng tối thiểu...",
          maxlength: 50,
          error: "",
        },

        code: {
          id: "code",
          name: "Code",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Mã nguyên vật liệu",
          isRequired: "true",
          value: "",
          placeholder: "Nhập mã nguyên vật liệu...",
          maxlength: 50,
          error: "",
        },

        height: {
          id: "height",
          name: "Height",
          rules: "",
          classes: "w-full",
          type: "",
          label: "Chiều cao",
          isRequired: "",
          value: 0,
          placeholder: "Nhập chiều cao...",
          error: "",
        },
        width: {
          id: "width",
          name: "Width",
          rules: "",
          classes: "w-full",
          type: "",
          label: "Chiều rộng",
          isRequired: "",
          value: 0,
          placeholder: "Nhập chiều rộng...",
          error: "",
        },
        length: {
          id: "length",
          name: "Length",
          rules: "",
          classes: "w-full",
          type: "",
          label: "Chiều dài",
          isRequired: "",
          value: 0,
          placeholder: "Nhập chiều dài...",
          error: "",
        },
        warehouseId: {
          id: "warehouseId",
          baseId: 0,
          name: "warehouseId",
          rules: "",
          classes: "w-full",
          isRequired: "",
          placeholder: "Chọn cửa hàng",
          error: "",
          value: "",
          disabled: "notDisabled",
          label: "Cửa hàng",
          options: [],
        },
        volume: {
          id: "volume",
          name: "Volume",
          rules: "",
          classes: "w-full",
          type: "",
          label: "Thể tích",
          isRequired: "",
          value: 0,
          placeholder: "Nhập vào thể tích...",
          error: "",
        },

        color: {
          id: "color",
          name: "Color",
          rules: "",
          classes: "w-full",
          type: "text",
          label: "Màu sắc",
          isRequired: "false",
          value: "",
          placeholder: "Nhập màu sắc...",
          maxlength: 50,
          error: "",
        },
        description: {
          id: "description",
          name: "Description",
          rules: "",
          classes: "w-full col-span-6 !h-[64px]",
          type: "text",
          label: "Mô tả",
          isRequired: "false",
          value: "",
          placeholder: "Nhập mô tả...",
          maxlength: 150,
          error: "",
        },
        expiredDate: {
          id: "expiredDate",
          name: "Expired Date",
          rules: "",
          classes: "w-full",
          type: "text",
          label: "Ngày hết hạn",
          isRequired: "false",
          value: "",
          error: "",
          pickerOptions: {
            disabledDate(time) {
              return time.getTime() < Date.now();
            },
          },
        },
      },
      category: {
        id: "category",
        baseId: 0,
        name: "category",
        rules: "",
        classes: "w-full",
        isRequired: "false",
        placeholder: "Chọn danh mục",
        error: "",
        value: "",
        disabled: "notDisabled",
        label: "Danh mục",
        options: [],
      },
    };
  },
  computed: {
    moment() {
      return moment;
    },
    ...mapGetters(["user", "warehouse", "warehouseChain"]),
  },
  methods: {
    ...mapMutations(["setUserDetail"]),
    ...mapActions(["updateUserDetail"]),
    handleAddPhotos(file, fileList) {
      this.productPhotos = fileList;
    },
    handleRemove(file) {
      this.$confirm("Bạn có chắc muốn xóa?")
        .then((_) => {
          const index = this.productPhotos.indexOf(file);
          if (index > -1) {
            this.productPhotos.splice(index, 1);
          }
        })
        .catch((_) => {});
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    conversationUnits({ row, rowIndex }) {
      row.index = rowIndex;
    },
    indexMethod(index) {
      return index + 1;
    },
    handleDeleteUnit(item) {
      this.$confirm("Bạn có chắc muốn xóa?")
        .then((_) => {
          const index = item.$index;
          this.units.splice(index, 1);
        })
        .catch((_) => {});
    },
    handleDataCalUnit(item) {
      item.unitDestinationId =
        this.unitOptions.find(
          (opt) =>
            opt.value == item.unitDestinationId ||
            opt.label == item.unitDestinationId
        ).label || "";
      item.unitOriginId =
        this.unitOptions.find(
          (opt) =>
            opt.value == item.unitOriginId || opt.label == item.unitOriginId
        ).label || "";
      item.calUnit =
        this.calculations.find(
          (opt) => opt.value == item.calUnit || opt.label == item.calUnit
        ).label || "";
      if (item.id || item.id == 0) {
        this.units = this.units.map((el) => {
          return el.index == item.id ? { ...item } : el;
        });
      } else {
        this.units.push({ ...item, id: this.units?.length });
      }
    },
    handleCalUnitDetail(row, col, event) {
      this.AddConversationUnit();
      this.$refs["cal-unit"].initData({ ...row, id: { value: row.index } });
      this.$refs["cal-unit"].conversationUnit.unitDestinationId.value =
        row.unitDestinationId;
      this.$refs["cal-unit"].conversationUnit.unitStockDestination.value =
        row.unitStockDestination;
      this.$refs["cal-unit"].conversationUnit.calUnit.value = row.calUnit;
      this.dialogVisibleUnit = true;
    },
    AddConversationUnit() {
      let valueSingleUnit = "";
      let listSingleUnitSelection = [];
      this.unitOptions.forEach((item) => {
        if (
          item.value === this.product.singleUnit.value ||
          item.label === this.product.singleUnit.value
        ) {
          valueSingleUnit = item.label;
        }
      });
      this.$refs["cal-unit"].conversationUnit.unitOriginId.value =
        valueSingleUnit;
      listSingleUnitSelection = this.unitOptions.filter(
        (item) => item.value != valueSingleUnit && item.label != valueSingleUnit
      );
      this.$refs["cal-unit"].conversationUnit.unitDestinationId.options =
        listSingleUnitSelection;
      this.dialogVisibleUnit = true;
    },
    handleChangeCategory(val) {
      this.category.baseId = val;
    },
    handleChangeSingleUnit(val) {
      this.product.singleUnit.baseId = val;
      this.units = [];
    },
    async getValueCategory() {
      try {
        const { data } = await axios.get(
          "http://localhost:9090/api/v1/category/list",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            params: {
              warehouseChainId: this.warehouseChain.warehouseChainId,
            },
          }
        );
        this.category.options = data.items;
      } catch (error) {
        this.$message({
          showClose: true,
          message: error.response.data.items,
          type: "error",
        });
      }
    },
    async getValueSingleUnit() {
      try {
        const { data } = await axios.get(
          "http://localhost:9090/api/v1/single-unit/all",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            params: { warehouseChainId: this.warehouseChain.warehouseChainId },
          }
        );
        this.unitOptions = data.items;
        this.product.singleUnit.options = data.items;
      } catch (error) {
        this.$message({
          showClose: true,
          message: error.response.data.items,
          type: "error",
        });
      }
    },
    async getWarehouseSel() {
      await axios
        .get("http://localhost:9090/api/v1/warehouse/data-list", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { warehouseChainId: this.warehouseChain.warehouseChainId },
        })
        .then((res) => {
          if (res.status === 200) {
            this.product.warehouseId.options = res.data.items;
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
    handleSubmit() {
      if (this.units?.length > 0) {
        this.units.forEach((item) => {
          item.unitOriginId =
            this.unitOptions.find(
              (opt) =>
                opt.label == this.product.singleUnit.value ||
                opt.value == this.product.singleUnit.value
            ).value || "";
          item.unitDestinationId =
            this.unitOptions.find(
              (opt) =>
                opt.label == item.unitDestinationId ||
                opt.value == item.unitDestinationId
            ).value || "";
        });
      }
      let warehouseIdLocal = null;
      if (this.warehouse?.warehouseId) {
        warehouseIdLocal = this.warehouse.warehouseId;
      } else {
        warehouseIdLocal =
          this.product.warehouseId.options.find(
            (opt) =>
              opt.label == this.product.warehouseId.value ||
              opt.value == this.product.warehouseId.value
          ).value || 0;
      }
      const productDetail = {
        warehouseId: warehouseIdLocal,
        id: this.productPId,
        productId: this.$route.params.data.id,
        singleUnitId: this.product.singleUnit.baseId,
        categoryProductId: this.category.baseId,
        units: this.units,
      };
      Object.keys(this.product || {}).map((key) => {
        productDetail[key] = this.product[key].value;
        if (key == "expiredDate") {
          if (productDetail["expiredDate"]) {
            productDetail["expiredDate"] = moment(
              productDetail.expiredDate
            ).format("YYYY-MM-DD HH:mm:ss");
          } else {
            productDetail["expiredDate"] == null;
          }
        }
      });
      const productDetailForm = this.transformInToFormObject(productDetail);
      if (this.productPhotos[0]) {
        productDetailForm.append("image", this.productPhotos[0].raw);
      } else {
        productDetailForm.append("image", "");
      }
      productDetailForm.append("numberOfImg", this.productPhotos?.length);
      if (this.$route.params.data.type === "EDIT") {
        productDetailForm.delete("id");
        productDetailForm.delete("productId");
        productDetailForm.append("id", this.productPId);
        productDetailForm.append("productId", this.$route.params.data.id);
        this.handleEditProduct(productDetailForm);
      } else {
        this.handleCreateProduct(productDetailForm);
      }
    },
    transformInToFormObject(data) {
      let formData = new FormData();
      for (let key in data) {
        if (Array.isArray(data[key])) {
          data[key].forEach((obj, index) => {
            let keyList = Object.keys(obj);
            keyList.forEach((keyItem) => {
              let keyName = [key, "[", index, "]", ".", keyItem].join("");
              formData.append(keyName, obj[keyItem]);
            });
          });
        } else if (typeof data[key] === "object") {
          for (let innerKey in data[key]) {
            formData.append(`${key}.${innerKey}`, data[key][innerKey]);
          }
        } else {
          formData.append(key, data[key]);
        }
      }
      return formData;
    },
    handlePayment() {},
    handleEditProduct(productDetail) {
      axios
        .put(`http://localhost:9090/api/v1/product`, productDetail, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          contentType: "multipart/form-data",
        })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ path: "/product" });
            this.$message({
              showClose: true,
              message: "Sửa thành công",
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
    handleCreateProduct(productDetail) {
      axios
        .post(`http://localhost:9090/api/v1/product`, productDetail, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          contentType: "multipart/form-data",
        })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ path: "/product" });
            this.$message({
              showClose: true,
              message: "Thêm thành công",
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
      this.$confirm("Bạn có muốn thoát")
        .then((_) => {
          this.$router.push({ name: "Danh sách Nguyên Vật Liệu" });
        })
        .catch((_) => {});
    },
    async getProductDetail() {
      if (this.$route.params.data && this.$route.params.data.id != null) {
        await axios
          .get(
            `http://localhost:9090/api/v1/product/detail/${this.$route.params.data.id}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              Object.keys(this.product).forEach((key) => {
                this.units = [];
                this.product[key].value = res.data.items[key];
                this.units = res.data.items.units;
                this.category.value = res.data.items.categoryProductRes.name;
                this.category.baseId = res.data.items.categoryProductRes.id;
                this.product.singleUnit.baseId = res.data.items.singleUnit.id;
                this.product.singleUnit.value = res.data.items.singleUnit.name;
              });
              this.productPId = res.data.items.id;
              if (res.data.items?.imageDetailRes) {
                this.productPhotos = res.data.items.imageDetailRes;
              } else {
                this.productPhotos = [];
              }
              if (
                this.product.warehouseId?.options.length > 0 &&
                res.data.items?.warehouseDetailRes !== null
              ) {
                this.product.warehouseId.value =
                  this.product.warehouseId.options?.find(
                    (opt) =>
                      opt.label ==
                        res.data.items.warehouseDetailRes?.warehouseId ||
                      opt.value ==
                        res.data.items.warehouseDetailRes?.warehouseId
                  ).value || "";
              }
            }
            if (this.units && this.units?.length > 0) {
              this.units.forEach((item) => {
                item.unitDestinationId =
                  this.unitOptions.find(
                    (opt) =>
                      opt.value == item.unitDestinationId ||
                      opt.label == item.unitDestinationId
                  ).label || "";
                item.unitOriginId =
                  this.unitOptions.find(
                    (opt) =>
                      opt.value == item.unitOriginId ||
                      opt.label == item.unitOriginId
                  ).label || "";
              });
            }
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error.response.data.items,
              type: "error",
            });
          });
        if (this.$route.params.data.type === "DUPLICATED") {
          this.productId = null;
          this.productPId = null;
        }
      }
    },
  },
  created() {},
  async mounted() {
    if (!this.$route.params.data) {
      this.$router.push({ name: "Danh sách Nguyên Vật Liệu" });
      return;
    }
    if (!this.user?.roles.includes("ADMIN")) {
      this.product.warehouseId.value = this.warehouse.name;
      this.product.warehouseId.disabled = "disabled";
    }
    await this.getValueCategory();
    await this.getValueSingleUnit();
    await this.getWarehouseSel();
    await this.getProductDetail();
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

<style>
.el-upload-list--picture-card.is-disabled ~ .el-upload--picture-card {
  display: none !important;
}
</style>
