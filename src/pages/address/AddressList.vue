<template>
  <div class="p-3 bg-white">
    <LoadingPage v-show="loadingTable"></LoadingPage>
    <el-row :gutter="5">
      <el-col :span="6" v-show="!loadingTable">
        <div
          class="address-col grid-content bg-purple h-[896px] shadow-2xl border-2"
        >
          <div
            class="p-3 item-header border-b-2 flex justify-between items-center"
          >
            <div class="">
              <div class="font-semibold text-lg">Country</div>
            </div>
            <div class="add-header-btn">
              <el-button
                type="primary"
                icon="el-icon-plus"
                @click="isCreateAddress"
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
            <div><el-checkbox :label="item.countryName"></el-checkbox></div>
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
          class="address-col grid-content bg-purple h-[896px] shadow-2xl border-2"
        >
          <div
            class="p-3 item-header border-b-2 flex justify-between items-center"
          >
            <div class="">
              <div class="font-semibold text-lg">City</div>
            </div>
            <div class="add-header-btn">
              <el-button type="primary" icon="el-icon-plus">Create</el-button>
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
          >
            <div><el-checkbox :label="item.label"></el-checkbox></div>
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
          class="address-col grid-content bg-purple h-[896px] shadow-2xl border-2"
        >
          <div
            class="p-3 item-header border-b-2 flex justify-between items-center"
          >
            <div class="">
              <div class="font-semibold text-lg">District</div>
            </div>
            <div class="add-header-btn">
              <el-button type="primary" icon="el-icon-plus">Create</el-button>
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
          >
            <div><el-checkbox :label="item.label"></el-checkbox></div>
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
          class="address-col grid-content bg-purple h-[896px] shadow-2xl border-2"
        >
          <div
            class="p-3 item-header border-b-2 flex justify-between items-center"
          >
            <div class="">
              <div class="font-semibold text-lg">Subdistrict</div>
            </div>
            <div class="add-header-btn">
              <el-button type="primary" icon="el-icon-plus">Create</el-button>
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
            <div><el-checkbox :label="item.label"></el-checkbox></div>
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
      isCountrySelected: false,
      isCitySelected: null,
      isDistrictSelected: null,
      isSubdistrictSelected: null,
      countries: [],
      cities: [],
      districts: [],
      subdistricts: [],
      addressField: {
        title: "",
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
      },
      dialogVisible: false,
    };
  },
  methods: {
    handleDataAddr(field) {
      switch (field.id) {
        case "country":
          console.log("country", field);
          this.handleCreateCountry(field);
          break;
        case "city":
          console.log("city", field);
          break;
        case "district":
          console.log("district", field);
          break;
        case "subdistrict":
          console.log("subdistrict", field);
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
          this.$refs.observerAdd.setErrors(error.response.data.items);
        });
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
    isCreateAddress() {
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
      };
      console.log(this.addressField);
    },
    getCountries() {
      this.loadingTable = true;
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
