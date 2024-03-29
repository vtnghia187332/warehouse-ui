<template>
  <ValidationObserver v-slot="{ invalid }" ref="observer">
    <el-dialog
      title="Thêm khách hàng"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
      :append-to-body="true"
      destroy-on-close
    >
      <div>
        <FormCard title="Khách hàng" class="mb-3">
          <template v-slot:content>
            <div class="">
              <el-tabs v-model="activeName">
                <el-tab-pane label="Cá nhân" name="first">
                  <div class="col-span-12 grid grid-cols-12 gap-x-6">
                    <div class="col-span-12 grid grid-cols-12 gap-x-6">
                      <div class="col-span-6">
                        <BaseInput
                          :field="customer.fullName"
                          v-model="customer.fullName.value"
                        />
                      </div>
                      <div class="col-span-6">
                        <BaseInput
                          :field="customer.taxNumber"
                          v-model="customer.taxNumber.value"
                        />
                      </div>
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
                    <div class="col-span-6">
                      <BaseInput
                        :field="customer.taxNumberEnter"
                        v-model="customer.taxNumberEnter.value"
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
                  <BaseSelection
                    @getValue=""
                    v-model="customer.warehouseId.value"
                    :field="customer.warehouseId"
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
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">Huỷ</el-button>
        <el-button class="bg-blue-700" type="primary" @click="handleData"
          >Create</el-button
        >
      </span>
    </el-dialog>
  </ValidationObserver>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";
import BaseInput from "@/components/Inputs/BaseInput.vue";
import BaseSelection from "../../components/Inputs/BaseSelection.vue";
import BaseTextArea from "./../../components/Inputs/BaseTextArea.vue";
import DatePicker from "../../components/Date/DatePicker.vue";
import { ValidationObserver } from "vee-validate";
import FormCard from "./../../components/Cards/FormCard.vue";

export default {
  components: {
    BaseInput,
    ValidationObserver,
    BaseSelection,
    BaseTextArea,
    DatePicker,
    FormCard,
  },
  computed: {
    ...mapGetters(["user", "warehouse", "warehouseChain"]),
  },
  props: {
    dialogVisible: {
      type: Boolean,
    },
  },
  data() {
    return {
      activeName: "first",
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
          name: "Birthday",
          classes: "!w-full",
          label: "Birthday",
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
          label: "Title",
          isRequired: "true",
          value: "",
          placeholder: "Select Title...",
          maxlength: 50,
          error: "",
          options: [
            {
              value: 1,
              label: "Mr",
            },
            {
              value: 2,
              label: "Mrs",
            },
            {
              value: 3,
              label: "Other",
            },
          ],
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
          classes: "w-full !h-[64px]",
          type: "text",
          label: "Note",
          isRequired: "",
          value: "",
          placeholder: "Enter Detail Address...",
          maxlength: 50,
          error: "",
        },
        taxNumber: {
          id: "taxNumber",
          name: "Tax Number",
          rules: "",
          classes: "w-full col-span-6",
          type: "text",
          label: "Mã số thuế Cá nhân",
          isRequired: "",
          value: "",
          placeholder: "Nhập vào mã số thuế cá nhân...",
          maxlength: 20,
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
        taxNumberEnter: {
          id: "taxNumberEnter",
          name: "Tax Number For",
          rules: "required",
          classes: "w-full col-span-6",
          type: "text",
          label: "Mã số thuế Doanh nghiệp",
          isRequired: "true",
          value: "",
          placeholder: "Nhập vào Mã số thuế Doanh nghiệp...",
          maxlength: 20,
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
    handleClose() {
      this.$confirm("Bạn có muốn tắt cửa sổ không?")
        .then((_) => {
          this.$emit("update:dialogVisible", false);
        })
        .catch((_) => {});
    },
    handleData() {
      const customerDetail = {
        warehouseId: this.warehouse.warehouseId,
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

      customerDetail.countryId =
        this.customer.country.options.find(
          (opt) =>
            opt.label == customerDetail.country ||
            opt.value == customerDetail.country
        ).value || 0;
      customerDetail.cityId =
        this.customer.city.options.find(
          (opt) =>
            opt.label == customerDetail.city || opt.value == customerDetail.city
        ).value || 0;
      customerDetail.districtId =
        this.customer.district.options.find(
          (opt) =>
            opt.label == customerDetail.district ||
            opt.value == customerDetail.district
        ).value || 0;
      customerDetail.subdistrictId =
        this.customer.subdistrict.options.find(
          (opt) =>
            opt.label == customerDetail.subdistrict ||
            opt.value == customerDetail.subdistrict
        ).value || 0;
      customerDetail.warehouseId =
        this.customer.warehouseId.options.find(
          (opt) =>
            opt.label == this.customer.warehouseId.value ||
            opt.value == this.customer.warehouseId.value
        ).value || 0;
      this.handleCreateCustomer(customerDetail);
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
            this.$message({
              showClose: true,
              message: "Thêm mới thành công",
              type: "success",
            });
          }
          this.$emit("update:dialogVisible", false);
          this.$emit("addCus");
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
  },
  async created() {
    if (!this.user?.roles.includes("ADMIN")) {
      this.customer.warehouseId.value = this.warehouse.name;
      this.customer.warehouseId.disabled = "disabled";
    }
    await this.getListAddress();
    await this.getWarehouseSel();
  },
};
</script>
<style></style>
