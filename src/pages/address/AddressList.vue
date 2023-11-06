<template>
  <div class="p-3 bg-white">
    <div class="mb-2 flex justify-end">
      <el-button class="bg-blue-400" type="primary">Import</el-button>
    </div>
    <LoadingPage v-show="loadingTable"></LoadingPage>
    <el-row :gutter="5">
      <el-col :span="6" v-show="!loadingTable">
        <div
          class="address-col grid-content bg-purple h-[848px] shadow-2xl border-2"
        >
          <div
            class="p-3 item-header border-b-2 flex justify-between items-center"
          >
            <div class="">
              <div class="font-semibold text-lg">Country</div>
            </div>
            <div class="add-header-btn flex">
              <el-button
                v-show="this.countriesChoosed.length > 0"
                type="danger"
                class="bg-red-600"
                @click="handleDeleteCountry()"
                >Delete</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-plus"
                @click="isCreateAddress('country')"
                >Create</el-button
              >
            </div>
          </div>
          <div v-if="countries.length == '0'">
            <el-empty :image-size="200"></el-empty>
          </div>
          <div
            v-else
            class="p-3 hover:bg-slate-100 item h-16 flex justify-between items-center"
            v-for="item in countries"
            v-bind:key="item.id"
            :class="
              isCountrySelected == item.id ? 'is-selected' : 'is-not-selected'
            "
          >
            <div @dblclick="handleUpdateAddress(item, 'country')">
              <el-checkbox
                :label="item.countryName"
                @change="handleChooseCountry(item.id)"
              ></el-checkbox>
            </div>
            <button
              class="el-icon-arrow-right"
              @click="getCitiesByCountry(item.id)"
            ></button>
          </div>
        </div>
      </el-col>

      <el-col
        :span="6"
        :class="{
          'display-none': this.isHideCity,
        }"
        v-show="!loadingTable"
      >
        <div
          class="address-col grid-content bg-purple h-[848px] shadow-2xl border-2"
        >
          <div
            class="p-3 item-header border-b-2 flex justify-between items-center"
          >
            <div class="">
              <div class="font-semibold text-lg">City</div>
            </div>
            <div class="add-header-btn flex">
              <el-button
                v-show="this.citiesChoosed.length > 0"
                type="danger"
                class="bg-red-600"
                @click="handleDeleteCity()"
                >Delete</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-plus"
                @click="isCreateAddress('city')"
                >Create</el-button
              >
            </div>
          </div>
          <div v-if="cities.length == '0'">
            <el-empty :image-size="200"></el-empty>
          </div>
          <div
            v-else
            class="p-3 hover:bg-slate-100 item h-16 flex justify-between items-center"
            v-for="item in cities"
            :key="item.value"
            :class="
              isCitySelected == item.value ? 'is-selected' : 'is-not-selected'
            "
          >
            <div @dblclick="handleUpdateAddress(item, 'city')">
              <el-checkbox
                :label="item.label"
                @change="handleChooseCity(item.value)"
              ></el-checkbox>
            </div>
            <button
              class="el-icon-arrow-right"
              @click="getListDistrictByCity(item.value)"
            ></button>
          </div>
        </div>
      </el-col>

      <el-col
        v-show="!loadingTable"
        :span="6"
        :class="{
          'display-none': this.isHideDistrict,
        }"
      >
        <div
          class="address-col grid-content bg-purple h-[848px] shadow-2xl border-2"
        >
          <div
            class="p-3 item-header border-b-2 flex justify-between items-center"
          >
            <div class="">
              <div class="font-semibold text-lg">District</div>
            </div>
            <div class="add-header-btn flex">
              <el-button
                v-show="this.districtsChoosed.length > 0"
                type="danger"
                class="bg-red-600"
                @click="handleDeleteDistrict()"
                >Delete</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-plus"
                @click="isCreateAddress('district')"
                >Create</el-button
              >
            </div>
          </div>
          <div v-if="districts.length == '0'">
            <el-empty :image-size="200"></el-empty>
          </div>
          <div
            v-else
            class="p-3 hover:bg-slate-100 item h-16 flex justify-between items-center"
            v-for="item in districts"
            :key="item.value"
            :class="
              isDistrictSelected == item.value
                ? 'is-selected'
                : 'is-not-selected'
            "
          >
            <div @dblclick="handleUpdateAddress(item, 'district')">
              <el-checkbox
                :label="item.label"
                @change="handleChooseDistrict(item.value)"
              ></el-checkbox>
            </div>
            <button
              class="el-icon-arrow-right"
              @click="getListSubDistrictByDistrict(item.value)"
            ></button>
          </div>
        </div>
      </el-col>

      <el-col
        v-show="!loadingTable"
        :span="6"
        :class="{
          'display-none': this.isHideSubdistrict,
        }"
      >
        <div
          class="address-col grid-content bg-purple h-[848px] shadow-2xl border-2"
        >
          <div
            class="p-3 item-header border-b-2 flex justify-between items-center"
          >
            <div class="">
              <div class="font-semibold text-lg">Subdistrict</div>
            </div>
            <div class="add-header-btn flex">
              <el-button
                v-show="this.subdistrictsChoosed.length > 0"
                type="danger"
                class="bg-red-600"
                @click="handleDeleteSubdistrict()"
                >Delete</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-plus"
                @click="isCreateAddress('subdistrict')"
                >Create</el-button
              >
            </div>
          </div>
          <div v-if="subdistricts.length == '0'">
            <el-empty :image-size="200"></el-empty>
          </div>
          <div
            v-else
            class="p-3 hover:bg-slate-100 item h-16 flex justify-between items-center"
            v-for="item in subdistricts"
            :key="item.value"
          >
            <div @dblclick="handleUpdateAddress(item, 'subdistrict')">
              <el-checkbox
                :label="item.label"
                @change="handleChooseSubdistrict(item.value)"
              ></el-checkbox>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <DialogCreate
      :field="addressField"
      v-show="dialogVisible"
      :dialogVisible.sync="dialogVisible"
      v-model="addressField.value"
      @handle-dataAddr="handleDataAddr"
    />
  </div>
</template>

<script>
import axios from "axios";
import DialogCreate from "../../pages/address/DialogCreate.vue";
import LoadingPage from "@/components/Cards/LoadingPage";
export default {
  components: {
    DialogCreate,
    LoadingPage,
  },
  data() {
    return {
      loadingTable: false,
      isHideCity: true,
      isHideDistrict: true,
      isHideSubdistrict: true,
      isCountrySelected: 0,
      isCitySelected: null,
      isDistrictSelected: null,
      isSubdistrictSelected: null,
      countriesChoosed: [],
      citiesChoosed: [],
      districtsChoosed: [],
      subdistrictsChoosed: [],
      countries: [],
      cities: [],
      districts: [],
      subdistricts: [],
      addressField: {
        title: "",
        baseId: "",
        id: "",
        refId: "",
        classes: "!w-full",
        type: "text",
        label: "",
        rules: "required",
        isRequired: "true",
        value: "",
        placeholder: "",
        maxlength: 50,
        error: "",
        actionType: "",
      },
      dialogVisible: false,
    };
  },
  methods: {
    handleDataAddr(field) {
      switch (field.id) {
        case "country":
          if (field.actionType == "CREATED") {
            this.handleCreateCountry(field);
          } else if (field.actionType == "UPDATED") {
            this.updateCountry(field);
          }
          this.countriesChoosed = [];
          break;
        case "city":
          if (field.actionType == "CREATED") {
            this.handleCreateCity(field);
          } else if (field.actionType == "UPDATED") {
            this.updateCity(field);
          }
          this.citiesChoosed = [];
          break;
        case "district":
          if (field.actionType == "CREATED") {
            this.handleCreateDistrict(field);
          } else if (field.actionType == "UPDATED") {
            this.updateDistrict(field);
          }
          break;
        case "subdistrict":
          if (field.actionType == "CREATED") {
            this.handleCreateSubdistrict(field);
          } else if (field.actionType == "UPDATED") {
            this.updateSubdistrict(field);
          }
          break;
        default:
          return;
      }
    },

    handleCreateCountry(field) {
      const country = {
        name: field.value,
      };
      axios({
        method: "post",
        url: "http://localhost:9090/api/v1/country",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: country,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: "Created successfully",
              type: "success",
            });
            this.getCountries();
            this.dialogVisible = false;
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

    handleCreateCity(field) {
      const city = {
        countryId: this.isCountrySelected,
        name: field.value,
      };
      axios({
        method: "post",
        url: "http://localhost:9090/api/v1/city",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: city,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: "Created successfully",
              type: "success",
            });
            this.getCitiesByCountry(field.refId);
            this.dialogVisible = false;
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

    handleCreateDistrict(field) {
      const district = {
        cityId: field.refId,
        name: field.value,
      };
      axios({
        method: "post",
        url: "http://localhost:9090/api/v1/district",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: district,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: "Created successfully",
              type: "success",
            });
            this.getListDistrictByCity(field.refId);
            this.dialogVisible = false;
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

    handleCreateSubdistrict(field) {
      const subdistrict = {
        districtId: field.refId,
        name: field.value,
      };
      axios({
        method: "post",
        url: "http://localhost:9090/api/v1/subDistrict",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: subdistrict,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: "Created successfully",
              type: "success",
            });
            this.getListSubDistrictByDistrict(field.refId);
            this.dialogVisible = false;
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

    handleUpdateAddress(item, type) {
      switch (type) {
        case "country":
          this.dialogVisible = true;
          this.addressField = {
            title: "Update Country",
            baseId: item.id,
            id: "country",
            refId: "",
            classes: "!w-full",
            type: "text",
            label: "Country",
            rules: "required",
            isRequired: "true",
            value: item.countryName,
            placeholder: "Typing country name...",
            maxlength: 50,
            error: "",
            actionType: "UPDATED",
          };
          break;
        case "city":
          this.dialogVisible = true;
          this.addressField = {
            title: "Update City",
            baseId: item.value,
            id: "city",
            refId: this.isCountrySelected,
            classes: "!w-full",
            type: "text",
            label: "City",
            rules: "required",
            isRequired: "true",
            value: item.label,
            placeholder: "Typing city name...",
            maxlength: 50,
            error: "",
            actionType: "UPDATED",
          };
          break;
        case "district":
          this.dialogVisible = true;
          this.addressField = {
            title: "Update District",
            baseId: item.value,
            id: "district",
            refId: this.isCitySelected,
            classes: "!w-full",
            type: "text",
            label: "District",
            rules: "required",
            isRequired: "true",
            value: item.label,
            placeholder: "Typing district name...",
            maxlength: 50,
            error: "",
            actionType: "UPDATED",
          };
          break;
        case "subdistrict":
          this.dialogVisible = true;
          this.addressField = {
            title: "Update Subdistrict",
            baseId: item.value,
            id: "subdistrict",
            refId: this.isDistrictSelected,
            classes: "!w-full",
            type: "text",
            label: "Subdistrict",
            rules: "required",
            isRequired: "true",
            value: item.label,
            placeholder: "Typing subdistrict name...",
            maxlength: 50,
            error: "",
            actionType: "UPDATED",
          };
          break;
        default:
          return;
      }
    },

    handleDeleteCountry() {
      this.deleteCountries();
    },
    handleDeleteCity(id) {
      this.deleteCities();
    },
    handleDeleteDistrict(id) {
      this.deleteDistricts();
    },
    handleDeleteSubdistrict(id) {
      this.deleteSubdistricts();
    },
    handleChooseCountry(id) {
      const index = this.countriesChoosed.indexOf(id);
      if (index > -1) {
        this.countriesChoosed.splice(index, 1);
      } else {
        this.countriesChoosed.push(id);
      }
    },
    handleChooseCity(id) {
      const index = this.citiesChoosed.indexOf(id);
      if (index > -1) {
        this.citiesChoosed.splice(index, 1);
      } else {
        this.citiesChoosed.push(id);
      }
    },
    handleChooseDistrict(id) {
      const index = this.districtsChoosed.indexOf(id);
      if (index > -1) {
        this.districtsChoosed.splice(index, 1);
      } else {
        this.districtsChoosed.push(id);
      }
    },
    handleChooseSubdistrict(id) {
      const index = this.subdistrictsChoosed.indexOf(id);
      if (index > -1) {
        this.subdistrictsChoosed.splice(index, 1);
      } else {
        this.subdistrictsChoosed.push(id);
      }
    },
    isOpenCityTab() {
      this.isHideCity = false;
      this.isHideDistrict = true;
      this.isHideSubdistrict = true;
    },
    isOpenDistrictTab() {
      this.isHideDistrict = false;
      this.isHideSubdistrict = true;
    },
    isOpenSubdistrictTab() {
      this.isHideSubdistrict = false;
    },
    isCreateAddress(type) {
      switch (type) {
        case "country":
          this.dialogVisible = true;
          this.addressField = {
            title: "Create Country",
            id: "country",
            refId: "",
            classes: "!w-full",
            type: "text",
            label: "Country",
            rules: "required",
            isRequired: "true",
            value: "",
            placeholder: "Typing country name...",
            maxlength: 50,
            error: "",
            actionType: "CREATED",
          };
          break;
        case "city":
          this.dialogVisible = true;
          this.addressField = {
            title: "Create City",
            id: "city",
            refId: this.isCountrySelected,
            classes: "!w-full",
            type: "text",
            label: "City",
            rules: "required",
            isRequired: "true",
            value: "",
            placeholder: "Typing city name...",
            maxlength: 50,
            error: "",
            actionType: "CREATED",
          };
          break;
        case "district":
          this.dialogVisible = true;
          this.addressField = {
            title: "Create District",
            id: "district",
            refId: this.isCitySelected,
            classes: "!w-full",
            type: "text",
            label: "District",
            rules: "required",
            isRequired: "true",
            value: "",
            placeholder: "Typing district name...",
            maxlength: 50,
            error: "",
            actionType: "CREATED",
          };
          break;
        case "subdistrict":
          this.dialogVisible = true;
          this.addressField = {
            title: "Create Subdistrict",
            id: "subdistrict",
            refId: this.isDistrictSelected,
            classes: "!w-full",
            type: "text",
            label: "Subdistrict",
            rules: "required",
            isRequired: "true",
            value: "",
            placeholder: "Typing subdistrict name...",
            maxlength: 50,
            error: "",
            actionType: "CREATED",
          };
          break;
        default:
          return;
      }
    },
    getCountries() {
      this.loadingTable = true;
      this.isCitySelected = 0;
      this.isDistrictSelected = 0;
      this.isSubdistrictSelected = 0;
      axios
        .get("http://localhost:9090/api/v1/country", {
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then((res) => {
          if (res.status === 200) {
            this.countries = res.data.items;
          }
          this.loadingTable = false;
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: error,
            type: "error",
          });
        });
    },

    getCitiesByCountry(countryId) {
      this.isHideDistrict = true;
      this.isHideSubdistrict = true;
      this.loadingTable = true;
      this.isCountrySelected = countryId;
      this.isCitySelected = 0;
      this.isDistrictSelected = 0;
      this.isSubdistrictSelected = 0;
      axios
        .get("http://localhost:9090/api/v1/city", {
          headers: { "Access-Control-Allow-Origin": "*" },
          params: { id: countryId },
        })
        .then((res) => {
          if (res.status === 200) {
            this.cities = res.data.items;
          }
          this.loadingTable = false;
          this.isHideCity = false;
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
      this.isCitySelected = id;
      this.isDistrictSelected = 0;
      this.isSubdistrictSelected = 0;
      this.loadingTable = true;
      this.isHideSubdistrict = true;
      axios
        .get("http://localhost:9090/api/v1/district", {
          headers: { "Access-Control-Allow-Origin": "*" },
          params: { id: id },
        })
        .then((res) => {
          if (res.status === 200) {
            this.districts = res.data.items;
          }
          this.loadingTable = false;
          this.isHideDistrict = false;
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
      this.loadingTable = true;
      this.isDistrictSelected = id;
      this.isSubdistrictSelected = 0;
      axios
        .get("http://localhost:9090/api/v1/subDistrict", {
          headers: { "Access-Control-Allow-Origin": "*" },
          params: { id: id },
        })
        .then((res) => {
          if (res.status === 200) {
            this.subdistricts = res.data.items;
          }
          this.isHideSubdistrict = false;
          this.loadingTable = false;
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: error,
            type: "error",
          });
        });
    },
    updateCountry(field) {
      const country = {
        id: field.baseId,
        name: field.value,
      };
      axios({
        method: "put",
        url: "http://localhost:9090/api/v1/country",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: country,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: "Updated successfully",
              type: "success",
            });
            this.getCountries();
            this.dialogVisible = false;
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

    updateCity(field) {
      const city = {
        countryId: this.isCountrySelected,
        id: field.baseId,
        name: field.value,
      };
      axios({
        method: "put",
        url: "http://localhost:9090/api/v1/city",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: city,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: "Updated successfully",
              type: "success",
            });
            this.getCitiesByCountry(this.isCountrySelected);
            this.dialogVisible = false;
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
    updateDistrict(field) {
      const district = {
        cityId: this.isCitySelected,
        id: field.baseId,
        name: field.value,
      };
      axios({
        method: "put",
        url: "http://localhost:9090/api/v1/district",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: district,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: "Updated successfully",
              type: "success",
            });
            this.getListDistrictByCity(this.isCitySelected);
            this.dialogVisible = false;
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
    updateSubdistrict(field) {
      const subdistrict = {
        districtId: this.isDistrictSelected,
        id: field.baseId,
        name: field.value,
      };
      axios({
        method: "put",
        url: "http://localhost:9090/api/v1/subDistrict",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: subdistrict,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: "Updated successfully",
              type: "success",
            });
            this.getListSubDistrictByDistrict(this.isDistrictSelected);
            this.dialogVisible = false;
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

    deleteCountries() {
      this.loadingTable = true;
      axios
        .delete("http://localhost:9090/api/v1/country", {
          headers: { "Access-Control-Allow-Origin": "*" },
          params: { id: this.countriesChoosed.toString() },
        })
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              showClose: true,
              message: "Created successfully",
              type: "success",
            });
            this.getCountries();
            this.countriesChoosed = [];
          }
          this.loadingTable = false;
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: error,
            type: "error",
          });
        });
    },
    deleteCities() {
      this.loadingTable = true;
      axios
        .delete("http://localhost:9090/api/v1/city", {
          headers: { "Access-Control-Allow-Origin": "*" },
          params: { id: this.citiesChoosed.toString() },
        })
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              showClose: true,
              message: "Deleted successfully",
              type: "success",
            });
            this.getCitiesByCountry(this.isCountrySelected);
            this.citiesChoosed = [];
          }
          this.loadingTable = false;
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: error,
            type: "error",
          });
        });
    },

    deleteDistricts() {
      this.loadingTable = true;
      axios
        .delete("http://localhost:9090/api/v1/district", {
          headers: { "Access-Control-Allow-Origin": "*" },
          params: { id: this.districtsChoosed.toString() },
        })
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              showClose: true,
              message: "Deleted successfully",
              type: "success",
            });
            this.getListDistrictByCity(this.isCitySelected);
            this.districtsChoosed = [];
          }
          this.loadingTable = false;
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: error,
            type: "error",
          });
        });
    },

    deleteSubdistricts() {
      this.loadingTable = true;
      axios
        .delete("http://localhost:9090/api/v1/subDistrict", {
          headers: { "Access-Control-Allow-Origin": "*" },
          params: { id: this.subdistrictsChoosed.toString() },
        })
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              showClose: true,
              message: "Deleted successfully",
              type: "success",
            });
            this.getListSubDistrictByDistrict(this.isDistrictSelected);
            this.subdistrictsChoosed = [];
          }
          this.loadingTable = false;
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
  mounted() {
    this.getCountries();
  },
};
</script>

<style>
.address-col {
  overflow-y: auto;
}

.add-header-btn .el-button.el-button--primary {
  background-color: blue !important;
  color: white !important;
}

.display-none {
  display: none !important;
}
.display {
  display: block !important;
}
.is-selected {
  background-color: rgb(241 245 249);
}
.is-not-selected {
  background-color: white;
}
</style>
