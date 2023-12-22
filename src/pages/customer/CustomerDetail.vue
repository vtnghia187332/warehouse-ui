<template>
  <ValidationObserver v-slot="{ invalid }" ref="observerAdd">
    <div class="mb-16">
      <el-row class="pt-4 pl-3 pr-3" :gutter="20">
        <el-col :span="18" class="forms grow">
          <FormCard title="Khách hàng" class="mb-3">
            <template v-slot:content>
              <div class="">
                <el-tabs v-model="activeName">
                  <el-tab-pane label="Cá nhân" name="first">
                    <div class="col-span-12 grid grid-cols-12 gap-x-6">
                      <div class="col-span-6">
                        <BaseInput
                          :field="customer.fullName"
                          v-model="customer.fullName.value"
                        />
                      </div>
                      <div class="col-span-12 grid grid-cols-12 gap-x-6">
                        <div class="col-span-6">
                          <DatePicker
                            :field="customer.birthDay"
                            v-model="customer.birthDay.value"
                          />
                        </div>
                        <div class="col-span-6">
                          <BaseSelection
                            :field="customer.title"
                            v-model="customer.title.value"
                          />
                        </div>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="Doanh nghiệp" name="second">
                    <div class="col-span-12 grid grid-cols-12 gap-x-6">
                      <div class="col-span-6">
                        <BaseInput
                          :field="customer.companyName"
                          v-model="customer.companyName.value"
                        />
                      </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </template>
          </FormCard>
          <FormCard title="Thông tin chung" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <!-- <div class="col-span-12 grid grid-cols-12 gap-x-6">
                  <div class="col-span-6">
                    <BaseInput
                      :field="customer.fullName"
                      v-model="customer.fullName.value"
                    />
                  </div>
                  <div class="col-span-6">
                    <BaseInput
                      :field="customer.companyName"
                      v-model="customer.companyName.value"
                    />
                  </div>
                </div> -->

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
                      :field="customer.taxNumber"
                      v-model="customer.taxNumber.value"
                    />
                  </div>
                </div>

                <div class="col-span-12 grid grid-cols-12 gap-x-6">
                  <div class="col-span-6">
                    <BaseSelection
                      @getValue="getValueCountry"
                      v-model="customer.country.value"
                      :field="customer.country"
                    />
                  </div>
                  <div class="col-span-6">
                    <BaseSelection
                      @getValue="getValueCity"
                      v-model="customer.city.value"
                      :field="customer.city"
                    />
                  </div>
                  <div class="col-span-6">
                    <BaseSelection
                      @getValue="getValueDistrict"
                      v-model="customer.district.value"
                      :field="customer.district"
                    />
                  </div>
                  <div class="col-span-6">
                    <BaseSelection
                      @getValue="getValueSubdistrict"
                      v-model="customer.subdistrict.value"
                      :field="customer.subdistrict"
                    />
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
          <FormCard title="ID Khách hàng" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12">
                  <b>
                    {{
                      $route.params.data.id !== null
                        ? $route.params.data.id
                        : "CT-xxx"
                    }}
                  </b>
                </div>
              </div>
            </template>
          </FormCard>
          <FormCard title="Thêm thông tin" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6 border-b border-gray-200">
                <div class="col-span-12">
                  <BaseTextArea
                    :field="customer.note"
                    v-model="customer.note.value"
                  />
                </div>
              </div>
              <div class="grid grid-cols-12 gap-x-6 border-b border-gray-200">
                <div class="col-span-12">
                  <BaseSelection
                    @getValue=""
                    v-model="customer.type.value"
                    :field="customer.type"
                  />
                </div>
              </div>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12">
                  <BaseSelection
                    @getValue=""
                    v-model="customer.warehouseId.value"
                    :field="customer.warehouseId"
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
              >{{ customerPId != 0 ? "Sửa" : "Thêm" }}</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
  </ValidationObserver>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
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
      activeName: "first",
      customerPId: 0,
      customer: {
        fullName: {
          id: "fullname",
          name: "Full Name",
          rules: "required",
          classes: "w-full col-span-6",
          type: "text",
          label: "Họ & Tên",
          isRequired: "true",
          value: "",
          placeholder: "Nhập họ & tên...",
          maxlength: 50,
          error: "",
        },
        companyName: {
          id: "companyName",
          name: "Company's name",
          rules: "required",
          classes: "w-full col-span-6",
          type: "text",
          label: "Công ty / doanh nghiệp",
          isRequired: "true",
          value: "",
          placeholder: "Nhập vào công ty / doanh nghiệp...",
          maxlength: 50,
          error: "",
        },
        taxNumber: {
          id: "taxNumber",
          name: "Tax Number",
          rules: "",
          classes: "w-full col-span-6",
          type: "text",
          label: "Mã số thuế",
          isRequired: "",
          value: "",
          placeholder: "Nhập vào mã số thuế...",
          maxlength: 20,
          error: "",
        },
        mobilePhone: {
          id: "mobilePhone",
          name: "Mobile Phone",
          rules: "required",
          classes: "w-full col-span-6",
          type: "text",
          label: "Số điện thoại",
          isRequired: "true",
          value: "",
          placeholder: "Nhập vào số điện thoại...",
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
          placeholder: "Nhập vào email...",
          maxlength: 50,
          error: "",
        },
        birthDay: {
          id: "birthDay",
          name: "Birthday",
          classes: "!w-full",
          label: "Ngày sinh",
          isRequired: "false",
          rules: "",
          value: "",
          error: "",
          pickerOptions: {
            disabledDate(time) {
              return time.getTime() > Date.now();
            },
          },
        },
        title: {
          id: "title",
          name: "title",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Giới tính",
          isRequired: "true",
          value: "",
          placeholder: "Chọn giới tính...",
          maxlength: 50,
          error: "",
          options: [
            {
              value: 1,
              label: "Nam",
            },
            {
              value: 2,
              label: "Nữ",
            },
            {
              value: 3,
              label: "Khác",
            },
          ],
        },
        type: {
          id: "type",
          name: "type",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Tệp khách hàng",
          isRequired: "true",
          value: "",
          placeholder: "Chọn tệp khách hàng...",
          maxlength: 50,
          error: "",
          options: [
            {
              value: 0,
              label: "Nhập hàng",
            },
            {
              value: 1,
              label: "Mua hàng",
            },
          ],
        },
        detailAddress: {
          id: "detailAddress",
          name: "Detail Address",
          rules: "required",
          classes: "w-full col-span-6 !h-[64px]",
          type: "text",
          label: "Địa chỉ",
          isRequired: "true",
          value: "",
          placeholder: "Nhập địa chỉ...",
          maxlength: 50,
          error: "",
        },
        note: {
          id: "note",
          name: "Note",
          rules: "",
          classes: "w-full !h-[135px]",
          type: "text",
          label: "Ghi chú",
          isRequired: "",
          value: "",
          placeholder: "Nhập ghi chú...",
          maxlength: 50,
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
        country: {
          id: "country",
          name: "country",
          rules: "required",
          classes: "w-full",
          isRequired: "true",
          placeholder: "Chọn quốc gia",
          error: "",
          value: "",
          disabled: "notDisabled",
          label: "Quốc gia",
          options: [],
        },
        city: {
          id: "city",
          name: "city",
          rules: "required",
          classes: "w-full",
          isRequired: "true",
          placeholder: "Chọn tỉnh / thành phố",
          error: "",
          value: "",
          label: "Tỉnh/Thành phố",
          disabled: "disabled",
          options: [],
        },
        district: {
          id: "district",
          name: "district",
          rules: "required",
          classes: "w-full",
          isRequired: "true",
          placeholder: "Chọn quận/huyện",
          error: "",
          value: "",
          disabled: "disabled",
          label: "Quận/Huyện",
          options: [],
        },
        subdistrict: {
          id: "subdistrict",
          name: "subdistrict",
          rules: "required",
          classes: "w-full",
          isRequired: "true",
          placeholder: "Chọn xã/phường",
          error: "",
          value: "",
          disabled: "disabled",
          label: "Xã/Phường",
          options: [],
        },
      },
    };
  },
  watch: {},
  methods: {
    getValueCountry(newVal) {
      this.customer.city.disabled = "notDisabled";
      this.getListCityByCountry(newVal);
      this.customer.city.value = "";
      this.customer.district.value = "";
      this.customer.district.disabled = "disabled";
      this.customer.subdistrict.value = "";
      this.customer.subdistrict.disabled = "disabled";
    },
    getValueCity(newVal) {
      this.customer.district.disabled = "notDisabled";
      this.getListDistrictByCity(newVal);
      this.customer.district.value = "";
      this.customer.subdistrict.value = "";
      this.customer.subdistrict.disabled = "disabled";
    },
    getValueDistrict(newVal) {
      this.customer.subdistrict.disabled = "notDisabled";
      this.getListSubDistrictByDistrict(newVal);
      this.customer.subdistrict.value = "";
    },
    getValueSubdistrict() {},
    handleCancelSubmit() {
      this.$confirm("Bạn muốn thoát màn hình tạo mới khách hàng?")
        .then((_) => {
          this.$router.push({ name: "Danh sách khách hàng" });
        })
        .catch((_) => {});
    },
    handleSubmit() {
      const customerDetail = {
        warehouseId: this.warehouse.warehouseId,
        id: this.customerPId,
        customerId: this.$route.params.data.id,
      };
      Object.keys(this.customer).map((key) => {
        customerDetail[key] = this.customer[key].value;
      });

      customerDetail.countryId =
        this.customer.country.options.find(
          (opt) =>
            opt.label == this.customer.country.value ||
            opt.value == this.customer.country.value
        ).value || 0;
      customerDetail.cityId =
        this.customer.city.options.find(
          (opt) =>
            opt.label == this.customer.city.value ||
            opt.value == this.customer.city.value
        ).value || 0;
      customerDetail.districtId =
        this.customer.district.options.find(
          (opt) =>
            opt.label == this.customer.district.value ||
            opt.value == this.customer.district.value
        ).value || 0;
      customerDetail.subDistrictId =
        this.customer.subdistrict.options.find(
          (opt) =>
            opt.label == this.customer.subdistrict.value ||
            opt.value == this.customer.subdistrict.value
        ).value || 0;
      customerDetail.warehouseId =
        this.customer.warehouseId.options.find(
          (opt) =>
            opt.label == this.customer.warehouseId.value ||
            opt.value == this.customer.warehouseId.value
        ).value || 0;
      if (this.$route.params.data.type === "EDIT") {
        this.handleEditCustomer(customerDetail);
      } else {
        this.handleCreateCustomer(customerDetail);
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
            this.customer.warehouseId.options = res.data.items;
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
    handleCreateCustomer(customerDetail) {
      axios({
        method: "post",
        url: "http://localhost:9090/api/v1/customer",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        data: customerDetail,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ path: "/customer" });
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
        });
    },
    handleEditCustomer(customerDetail) {
      axios({
        method: "put",
        url: "http://localhost:9090/api/v1/customer",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        data: customerDetail,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ path: "/customer" });
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
        });
    },
    async getCustomerDetail() {
      if (this.$route.params.data.id != null) {
        await axios
          .get(
            `http://localhost:9090/api/v1/customer/detail/${this.$route.params.data.id}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              Object.keys(this.customer).forEach((key) => {
                this.customer[key].value = res.data.items[key];
              });
              this.customerPId = res.data.items.id;

              this.customer.country.value =
                this.customer.country.options.find(
                  (opt) =>
                    opt.value == res.data.items.countryId ||
                    opt.label == res.data.items.countryId
                ).label || "";
              this.customer.city.value =
                this.customer.city.options.find(
                  (opt) =>
                    opt.value == res.data.items.cityId ||
                    opt.label == res.data.items.cityId
                ).label || "";
              this.customer.district.value =
                this.customer.district.options.find(
                  (opt) =>
                    opt.value == res.data.items.districtId ||
                    opt.label == res.data.items.districtId
                ).label || "";
              this.customer.subdistrict.value =
                this.customer.subdistrict.options.find(
                  (opt) =>
                    opt.value == res.data.items.subDistrictId ||
                    opt.label == res.data.items.subDistrictId
                ).label || "";
              const countriesRes = this.customer.country.options;
              const citiesRes = this.customer.city.options.filter(
                (item) => item.countryRefId == res.data.items.countryId
              );
              const districtsRes = this.customer.district.options.filter(
                (item) => item.cityRefId == res.data.items.cityId
              );
              const subdistrictsRes = this.customer.subdistrict.options.filter(
                (item) => item.districtRefId == res.data.items.districtId
              );

              this.customer.country.options = countriesRes;
              this.customer.city.options = citiesRes;
              this.customer.district.options = districtsRes;
              this.customer.subdistrict.options = subdistrictsRes;
              this.customer.country.disabled = "";
              this.customer.city.disabled = "";
              this.customer.district.disabled = "";
              this.customer.subdistrict.disabled = "";
              if (
                this.customer.warehouseId?.options.length > 0 &&
                res.data.items?.warehouseDetailRes !== null
              ) {
                this.customer.warehouseId.value =
                  this.customer.warehouseId.options?.find(
                    (opt) =>
                      opt.label ==
                        res.data.items.warehouseDetailRes?.warehouseId ||
                      opt.value ==
                        res.data.items.warehouseDetailRes?.warehouseId
                  ).value || "";
              }
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
        }
      }
    },
    async getListAddress() {
      await axios
        .get("http://localhost:9090/api/v1/address", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if (res.status === 200) {
            this.customer.country.options = res.data.items.countriesLists;
            this.customer.city.options = res.data.items.citiesLists;
            this.customer.district.options = res.data.items.districtsLists;
            this.customer.subdistrict.options = res.data.items.subdistrictLists;
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
    getListCityByCountry(id) {
      axios
        .get("http://localhost:9090/api/v1/city", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { id: id },
        })
        .then((res) => {
          if (res.status === 200) {
            this.customer.city.options = res.data.items;
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
    getListDistrictByCity(id) {
      axios
        .get("http://localhost:9090/api/v1/district", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { id: id },
        })
        .then((res) => {
          if (res.status === 200) {
            this.customer.district.options = res.data.items;
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
    getListSubDistrictByDistrict(id) {
      axios
        .get("http://localhost:9090/api/v1/subDistrict", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { id: id },
        })
        .then((res) => {
          if (res.status === 200) {
            this.customer.subdistrict.options = res.data.items;
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
  computed: {
    ...mapGetters(["user", "warehouse", "warehouseChain"]),
  },
  async mounted() {
    if (!this.$route.params.data) {
      this.$router.push({ name: "Danh sách khách hàng" });
      return;
    }
    if (!this.user?.roles.includes("ADMIN")) {
      this.customer.warehouseId.value = this.warehouse.name;
      this.customer.warehouseId.disabled = "disabled";
    }
    await this.getListAddress();
    await this.getWarehouseSel();
    await this.getCustomerDetail();
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
