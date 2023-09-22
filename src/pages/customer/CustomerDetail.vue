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
                    :field="customer.fullName"
                    v-model="customer.fullName.value"
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
          <div class="footer-btn-fixed flex justify-end p-4">
            <el-button @click="handleCancelSubmit">Cancel</el-button>
            <el-button
              @click="handleSubmit"
              class="bg-blue-400"
              :disabled="invalid"
              type="primary"
              >{{ customerPId != 0 ? "Update" : "Create" }}</el-button
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
      customerPId: 0,
      customer: {
        fullName: {
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
          rules: "",
          classes: "w-full !h-[135px]",
          type: "text",
          label: "Note",
          isRequired: "",
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
      this.$confirm("Are you sure to canncel adding Customer")
        .then((_) => {
          this.$router.push({ path: "/customer" });
        })
        .catch((_) => {});
    },
    handleSubmit() {
      const customerDetail = {
        warehouseId: 1,
        id: this.customerPId,
        customerId: this.$route.params.data.id,
        countryId: this.customer.country.value,
        cityId: this.customer.city.value,
        districtId: this.customer.district.value,
        subDistrictId: this.customer.subdistrict.value,
      };
      Object.keys(this.customer).map((key) => {
        customerDetail[key] = this.customer[key].value;
      });
      if (this.$route.params.data.type === "EDIT") {
        this.handleEditCustomer(customerDetail);
      } else {
        this.handleCreateCustomer(customerDetail);
      }
    },
    handleCreateCustomer(customerDetail) {
      axios({
        method: "post",
        url: "http://localhost:9090/api/v1/customer",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: customerDetail,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ path: "/customer" });
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
    handleEditCustomer(customerDetail) {
      axios({
        method: "put",
        url: "http://localhost:9090/api/v1/customer",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: customerDetail,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ path: "/customer" });
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
    getCustomerDetail() {
      if (this.$route.params.data.id != null) {
        axios
          .get(
            `http://localhost:9090/api/v1/customer/detail/${this.$route.params.data.id}`,
            { headers: { "Access-Control-Allow-Origin": "*" } }
          )
          .then((res) => {
            if (res.status === 200) {
              Object.keys(this.customer).forEach((key) => {
                this.customer[key].value = res.data.items[key];
              });
              this.customerPId = res.data.items.id;
              this.customer.country.value = res.data.items.countryId;
              this.customer.city.value = res.data.items.cityId;
              this.customer.district.value = res.data.items.districtId;
              this.customer.subdistrict.value = res.data.items.subDistrictId;

              this.customer.city.disabled = "notDisabled";
              this.customer.district.disabled = "notDisabled";
              this.customer.subdistrict.disabled = "notDisabled";
            }
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
    getListAddress() {
      axios
        .get("http://localhost:9090/api/v1/address", {
          headers: { "Access-Control-Allow-Origin": "*" },
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
            message: error,
            type: "error",
          });
        });
    },
    getListCityByCountry(id) {
      axios
        .get("http://localhost:9090/api/v1/city", {
          headers: { "Access-Control-Allow-Origin": "*" },
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
            message: error,
            type: "error",
          });
        });
    },
    getListDistrictByCity(id) {
      axios
        .get("http://localhost:9090/api/v1/district", {
          headers: { "Access-Control-Allow-Origin": "*" },
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
            message: error,
            type: "error",
          });
        });
    },
    getListSubDistrictByDistrict(id) {
      axios
        .get("http://localhost:9090/api/v1/subDistrict", {
          headers: { "Access-Control-Allow-Origin": "*" },
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
            message: error,
            type: "error",
          });
        });
    },
  },
  mounted() {},
  created() {
    if (!this.$route.params.data) {
      this.$router.push({ path: "/customer" });
      return;
    }
    this.getListAddress();
    this.getCustomerDetail();
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
