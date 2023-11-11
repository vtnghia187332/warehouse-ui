<template>
  <ValidationObserver v-slot="{ invalid }" ref="observerAdd">
    <loading-page v-show="loadingPageDetail"></loading-page>
    <div
      v-show="!loadingPageDetail"
      class="bg-page-background overflow-y-auto w-full py-4 mb-16"
    >
      <el-row :gutter="20" class="flex gap-x-4 detail w-full">
        <el-col :span="15" class="forms grow">
          <FormCard title="Information" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-6">
                  <BaseInput
                    :field="warehouse.code"
                    v-model="warehouse.code.value"
                  />
                </div>
                <div class="col-span-12">
                  <BaseInput
                    :field="warehouse.name"
                    v-model="warehouse.name.value"
                  />
                </div>
                <div class="col-span-12">
                  <BaseInput
                    :field="warehouse.shortName"
                    v-model="warehouse.shortName.value"
                  />
                </div>
                <div class="col-span-12">
                  <BaseTextArea
                    :field="warehouse.description"
                    v-model="warehouse.description.value"
                  />
                </div>
              </div>
            </template>
          </FormCard>

          <BaseKeyContact ref="key-contact" />
          <BaseDialog
            ref="special-time"
            v-show="dialogVisible"
            :dialogVisible.sync="dialogVisible"
            @handle-data="handleData"
            :rowDataSpecialDay="rowDataSpecialDay"
          />
          <div class="card bg-white !mb-3">
            <div
              class="font-medium text-base text-primary-85 p-3 border border-divider"
            >
              Window Time
            </div>
            <div class="p-3 !pt-2 pb-0">
              <el-tabs v-model="activeName">
                <el-tab-pane label="OpenHour" name="first">
                  <div class="mb-4 items-center grid grid-cols-4 gap-4">
                    <el-checkbox class="" v-model="workingHour.monday.checked"
                      >Monday</el-checkbox
                    >
                    <el-time-picker
                      ref="mondayPicker"
                      is-range
                      format="HH:mm"
                      v-model="workingHour.monday.time"
                      range-separator="To"
                      start-placeholder="Start time"
                      end-placeholder="End time"
                      :disabled="workingHour.monday.checked == false"
                    >
                    </el-time-picker>
                  </div>

                  <div class="mb-4 items-center grid grid-cols-4 gap-4">
                    <el-checkbox class="" v-model="workingHour.tuesday.checked"
                      >Tuesday</el-checkbox
                    >
                    <el-time-picker
                      ref="tuesdayPicker"
                      is-range
                      format="HH:mm"
                      v-model="workingHour.tuesday.time"
                      range-separator="To"
                      start-placeholder="Start time"
                      end-placeholder="End time"
                      :disabled="workingHour.tuesday.checked == false"
                    >
                    </el-time-picker>
                  </div>

                  <div class="mb-4 items-center grid grid-cols-4 gap-4">
                    <el-checkbox
                      class=""
                      v-model="workingHour.wednesday.checked"
                      >Wednesday</el-checkbox
                    >
                    <el-time-picker
                      ref="wednesdayPicker"
                      is-range
                      format="HH:mm"
                      v-model="workingHour.wednesday.time"
                      range-separator="To"
                      start-placeholder="Start time"
                      end-placeholder="End time"
                      :disabled="workingHour.wednesday.checked == false"
                    >
                    </el-time-picker>
                  </div>

                  <div class="mb-4 items-center grid grid-cols-4 gap-4">
                    <el-checkbox class="" v-model="workingHour.thursday.checked"
                      >Thursday</el-checkbox
                    >
                    <el-time-picker
                      ref="thursdayPicker"
                      is-range
                      format="HH:mm"
                      v-model="workingHour.thursday.time"
                      range-separator="To"
                      start-placeholder="Start time"
                      end-placeholder="End time"
                      :disabled="workingHour.thursday.checked == false"
                    >
                    </el-time-picker>
                  </div>

                  <div class="mb-4 items-center grid grid-cols-4 gap-4">
                    <el-checkbox class="" v-model="workingHour.friday.checked"
                      >Friday</el-checkbox
                    >
                    <el-time-picker
                      ref="fridayPicker"
                      is-range
                      format="HH:mm"
                      v-model="workingHour.friday.time"
                      range-separator="To"
                      start-placeholder="Start time"
                      end-placeholder="End time"
                      :disabled="workingHour.friday.checked == false"
                    >
                    </el-time-picker>
                  </div>

                  <div class="mb-4 items-center grid grid-cols-4 gap-4">
                    <el-checkbox class="" v-model="workingHour.saturday.checked"
                      >Saturday</el-checkbox
                    >
                    <el-time-picker
                      ref="saturdayPicker"
                      is-range
                      format="HH:mm"
                      v-model="workingHour.saturday.time"
                      range-separator="To"
                      start-placeholder="Start time"
                      end-placeholder="End time"
                      :disabled="workingHour.saturday.checked == false"
                    >
                    </el-time-picker>
                  </div>

                  <div class="mb-4 items-center grid grid-cols-4 gap-4">
                    <el-checkbox class="" v-model="workingHour.sunday.checked"
                      >Sunday</el-checkbox
                    >
                    <el-time-picker
                      ref="sundayPicker"
                      is-range
                      format="HH:mm"
                      v-model="workingHour.sunday.time"
                      range-separator="To"
                      start-placeholder="Start time"
                      end-placeholder="End time"
                      :disabled="workingHour.sunday.checked == false"
                    >
                    </el-time-picker>
                  </div>
                </el-tab-pane>
                <el-tab-pane
                  class="relative"
                  label="Holiday, Special Day-Off"
                  name="second"
                >
                  <el-table
                    height="448"
                    :data="specialDayOff"
                    style="width: 100%"
                    @row-dblclick="handleSpecialDayDetail"
                    :row-class-name="specialTimeOn"
                  >
                    <div slot="append" v-if="specialDayOff.length == '0'">
                      <el-empty :image-size="200"></el-empty>
                    </div>
                    <el-table-column
                      label="STT"
                      type="index"
                      :index="indexMethod"
                    >
                    </el-table-column>
                    <el-table-column label="Date" prop="date">
                      <template slot-scope="scope">
                        {{ moment(scope.row.date).format("DD/MM/YYYY") }}
                      </template>
                    </el-table-column>
                    <el-table-column label="Time" prop="time">
                      <template slot-scope="scope">
                        {{
                          moment(scope.row.time[0]).format("HH:mm") +
                          " - " +
                          moment(scope.row.time[1]).format("HH:mm")
                        }}
                      </template>
                    </el-table-column>
                    <el-table-column label="Remark" prop="remark">
                      <template slot-scope="scope">
                        {{ scope.row.remark }}
                      </template>
                    </el-table-column>
                    <el-table-column align="right">
                      <template slot="header" slot-scope="scope">
                        <el-button
                          size="mini"
                          type="primary"
                          class="bg-blue-300"
                          @click="handleAddSpecialDay(true, 'OFF')"
                          :handleAddSpecialDay="handleAddSpecialDay"
                          >Add</el-button
                        >
                      </template>
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="danger"
                          class="bg-red-300"
                          @click="handleDeleteSpecialDay(scope, 'ON')"
                          >Delete</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="Special Day-On" name="third">
                  <el-table
                    height="448"
                    :data="specialDayOn"
                    style="width: 100%"
                    @row-dblclick="handleSpecialDayDetail"
                    :row-class-name="specialTimeOn"
                  >
                    <div slot="append" v-if="specialDayOn.length == '0'">
                      <el-empty :image-size="200"></el-empty>
                    </div>

                    <el-table-column
                      label="STT"
                      type="index"
                      :index="indexMethod"
                    >
                    </el-table-column>
                    <el-table-column label="Date" prop="date">
                      <template slot-scope="scope">
                        {{ moment(scope.row.date).format("DD/MM/YYYY") }}
                      </template>
                    </el-table-column>
                    <el-table-column label="Time" prop="time">
                      <template slot-scope="scope">
                        {{
                          moment(scope.row.time[0]).format("HH:mm") +
                          " - " +
                          moment(scope.row.time[1]).format("HH:mm")
                        }}
                      </template>
                    </el-table-column>
                    <el-table-column label="Remark" prop="remark">
                      <template slot-scope="scope">
                        {{ scope.row.remark }}
                      </template>
                    </el-table-column>
                    <el-table-column align="right">
                      <template slot="header" slot-scope="scope">
                        <el-button
                          size="mini"
                          type="primary"
                          class="bg-blue-300"
                          @click="handleAddSpecialDay(true, 'ON')"
                          :handleAddSpecialDay="handleAddSpecialDay"
                          >Add</el-button
                        >
                      </template>
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="danger"
                          class="bg-red-300"
                          @click="handleDeleteSpecialDay(scope, 'ON')"
                          >Delete</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>

          <FormCard title="Address" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
                <div class="col-span-12">
                  <BaseTextArea
                    :field="address.addressDes"
                    v-model="address.addressDes.value"
                  />
                </div>
                <div class="col-span-6">
                  <BaseSelection
                    @getValue="getValueCountry"
                    v-model="address.country.value"
                    :field="address.country"
                  />
                </div>
                <div class="col-span-6">
                  <BaseSelection
                    @getValue="getValueCity"
                    v-model="address.city.value"
                    :field="address.city"
                  />
                </div>
                <div class="col-span-6">
                  <BaseSelection
                    @getValue="getValueDistrict"
                    v-model="address.district.value"
                    :field="address.district"
                  />
                </div>
                <div class="col-span-6">
                  <BaseSelection
                    @getValue="getValueSubdistrict"
                    v-model="address.subdistrict.value"
                    :field="address.subdistrict"
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
              >{{ warehouseId != 0 ? "Update" : "Create" }}</el-button
            >
          </div>
        </el-col>
        <el-col :span="5" class="">
          <AssignedModuleVue
            title="Warehouse Chain"
            :nameKey="'name'"
            :item="warehouseChainC.data"
            :fields="warehouseChainC.fields"
            :isShowButton="false"
          />
        </el-col>
      </el-row>
    </div>
  </ValidationObserver>
</template>

<script>
import axios from "axios";
import { mapGetters, mapMutations, mapActions } from "vuex";
import BaseInput from "./../../components/Inputs/BaseInput.vue";
import BaseTextArea from "./../../components/Inputs/BaseTextArea.vue";
import FormCard from "./../../components/Cards/FormCard.vue";
import Button from "../../components/Button.vue";
import BaseSelection from "../../components/Inputs/BaseSelection.vue";
import BaseDialog from "../../components/Dialog/BaseDialog.vue";
import BaseKeyContact from "../../components/KeyContact/BaseKeyContact.vue";
import moment from "moment";
import AssignedModuleVue from "../../components/AssignedModule.vue";
import LoadingPage from "../../components/Cards/LoadingPage.vue";
import { ValidationObserver } from "vee-validate";

export default {
  components: {
    FormCard,
    BaseInput,
    BaseTextArea,
    Button,
    BaseSelection,
    BaseDialog,
    BaseKeyContact,
    AssignedModuleVue,
    LoadingPage,
    ValidationObserver,
  },
  data() {
    return {
      loadingPageDetail: false,
      warehouseId: null,
      warehouseIdTxt: null,
      typeSpecialTime: "",
      dialogVisible: false,
      warehouseChainC: {
        data: {
          id: null,
          code: null,
          name: null,
          taxNumber: null,
        },
        fields: [
          { text: "warehouse Chain Code", value: "code" },
          { text: "Tax ID", value: "taxNumber" },
        ],
      },
      specialDayOn: [],
      specialDayOff: [],
      search: "",
      activeName: "first",
      workingHour: {
        monday: {
          checked: true,
          time: [new Date(0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59)],
        },
        tuesday: {
          checked: true,
          time: [new Date(0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59)],
        },
        wednesday: {
          checked: true,
          time: [new Date(0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59)],
        },
        thursday: {
          checked: true,
          time: [new Date(0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59)],
        },
        friday: {
          checked: true,
          time: [new Date(0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59)],
        },
        saturday: {
          checked: true,
          time: [new Date(0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59)],
        },
        sunday: {
          checked: true,
          time: [new Date(0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59)],
        },
      },
      warehouse: {
        code: {
          id: "warehouseCode",
          name: "warehouseCode",
          rules: "required",
          classes: "w-full col-span-6",
          type: "text",
          label: "Code",
          isRequired: "true",
          value: "",
          placeholder: "Enter Warehouse Code",
          maxlength: 20,
          error: "",
        },
        name: {
          id: "warehouseName",
          name: "warehouseName",
          rules: "required",
          classes: "col-span-12 !h-[64px]",
          type: "text",
          label: "Name",
          isRequired: "true",
          value: "",
          placeholder: "Enter Warehouse Name",
          maxlength: 150,
          error: "",
        },
        shortName: {
          id: "warehouseShortName",
          name: "warehouseShortName",
          rules: "required",
          classes: "col-span-12",
          type: "text",
          isRequired: "true",
          label: "Short Name",
          value: "",
          placeholder: "Enter Warehouse Short Name",
          maxlength: 100,
          error: "",
        },
        description: {
          id: "warehouseDescription",
          name: "warehouseDescription",
          rules: "",
          classes: "col-span-12 !h-[64px]",
          type: "text",
          label: "Description",
          isRequired: "false",
          value: "",
          placeholder: "Enter Warehouse Description",
          maxlength: 150,
          error: "",
        },
      },
      address: {
        addressDes: {
          id: "addressDes",
          name: "addressDes",
          rules: "required",
          classes: "w-full",
          type: "text",
          label: "Address",
          isRequired: "true",
          value: "",
          placeholder: "Enter Adress",
          maxlength: 150,
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
      rowDataSpecialDay: {},
    };
  },
  computed: {
    moment() {
      return moment;
    },
    ...mapGetters(["user", "warehouse", "warehouseChain"]),
  },
  watch: {},
  methods: {
    getValueCountry(newVal) {
      this.address.city.disabled = "notDisabled";
      this.getListCityByCountry(newVal);
      this.address.city.value = "";
      this.address.district.value = "";
      this.address.district.disabled = "disabled";
      this.address.subdistrict.value = "";
      this.address.subdistrict.disabled = "disabled";
    },
    getValueCity(newVal) {
      this.address.district.disabled = "notDisabled";
      this.getListDistrictByCity(newVal);

      this.address.district.value = "";
      this.address.subdistrict.value = "";
      this.address.subdistrict.disabled = "disabled";
    },
    getValueDistrict(newVal) {
      this.address.subdistrict.disabled = "notDisabled";
      this.getListSubDistrictByDistrict(newVal);
      this.address.subdistrict.value = "";
    },
    getValueSubdistrict() {},
    handleCancelSubmit() {
      this.$confirm("Are you sure to cancel adding Warehouse")
        .then((_) => {
          this.$router.push({ path: "/warehouse-list" });
        })
        .catch((_) => {});
    },
    handleSubmit() {
      const keyContactReqs = this.$refs["key-contact"].getDataKeyContacts();
      this.specialDayOn.forEach((object) => {
        object.specialStartDay = object.time[0];
        object.specialCloseDay = object.time[1];
      });
      this.specialDayOff.forEach((object) => {
        object.specialStartDay = object.time[0];
        object.specialCloseDay = object.time[1];
      });
      const warehouseDetail = {
        warehouseChainId: this.warehouseChain.warehouseChainId,
        id: this.warehouseId,
        specialDayTimeReqList: [...this.specialDayOn, ...this.specialDayOff],
        keyContactReqs: keyContactReqs,
        openWorkingHourReq: {},
        warehouseId: this.warehouseIdTxt,
      };
      Object.keys(this.warehouse).map((key) => {
        warehouseDetail[key] = this.warehouse[key].value;
      });
      Object.keys(this.workingHour).map((key) => {
        if (this.workingHour[key].checked) {
          warehouseDetail.openWorkingHourReq[key + "Start"] = moment(
            this.workingHour[key].time[0]
          ).format("YYYY-MM-DD HH:mm:ss");
          warehouseDetail.openWorkingHourReq[key + "End"] = moment(
            this.workingHour[key].time[1]
          ).format("YYYY-MM-DD HH:mm:ss");
        }
      });
      Object.keys(this.address).map((key) => {
        warehouseDetail[key + "Id"] = this.address[key].value;
        warehouseDetail[key] = this.address[key].value;
      });
      warehouseDetail.countryId =
        this.address.country.options.find(
          (opt) =>
            opt.label == warehouseDetail.country ||
            opt.value == warehouseDetail.country
        ).value || 0;
      warehouseDetail.cityId =
        this.address.city.options.find(
          (opt) =>
            opt.label == warehouseDetail.city ||
            opt.value == warehouseDetail.city
        ).value || 0;
      warehouseDetail.districtId =
        this.address.district.options.find(
          (opt) =>
            opt.label == warehouseDetail.district ||
            opt.value == warehouseDetail.district
        ).value || 0;
      warehouseDetail.subdistrictId =
        this.address.subdistrict.options.find(
          (opt) =>
            opt.label == warehouseDetail.subdistrict ||
            opt.value == warehouseDetail.subdistrict
        ).value || 0;

      console.log(warehouseDetail, "warehouseDetailwarehouseDetail");
      if (this.$route.params.data.type === "EDIT") {
        axios({
          method: "put",
          url: "http://localhost:9090/api/v1/warehouse",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          data: warehouseDetail,
        })
          .then((response) => {
            if (response.status === 200) {
              this.$router.push({ path: "/warehouse-list" });
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
              message: error,
              type: "error",
            });
          });
      } else {
        axios({
          method: "post",
          url: "http://localhost:9090/api/v1/warehouse",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          data: warehouseDetail,
        })
          .then((response) => {
            if (response.status === 200) {
              this.$router.push({ path: "/warehouse-list" });
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
      }
    },
    handleAddSpecialDay(param, type) {
      if (param !== null) {
        this.$refs["special-time"].typeSpecialTime = type;
        this.rowDataSpecialDay = {};
        this.dialogVisible = true;
      }
    },
    handleDeleteSpecialDay(item, type) {
      const index = item.$index;
      if (index > -1) {
        if ((type = "ON")) {
          this.specialDayOn.splice(index, 1);
        } else if ((type = "OFF")) {
          this.specialDayOff.splice(index, 1);
        }
      }
    },
    handleSpecialDayDetail(row, col, event) {
      this.rowDataSpecialDay = row;
      this.$refs["special-time"].initData({ ...row, id: { value: row.index } });
      this.dialogVisible = true;
    },
    specialTimeOn({ row, rowIndex }) {
      row.index = rowIndex;
    },
    handleData(param) {
      if (param.dayType == "ON") {
        if (param.id) {
          this.specialDayOn = this.specialDayOn.map((el) => {
            return el.index == param.id.value ? { ...param } : el;
          });
        } else {
          this.specialDayOn.push({ ...param, id: this.specialDayOn.length });
        }
      } else if (param.dayType == "OFF") {
        if (param.id) {
          this.specialDayOff = this.specialDayOff.map((el) => {
            return el.index == param.id.value ? { ...param } : el;
          });
        } else {
          this.specialDayOff.push({ ...param, id: this.specialDayOff.length });
        }
      }
    },
    initKeyContactForm(data) {
      this.$refs["key-contact"].initKeyContact(data);
    },
    initTimeWorking(data) {
      Object.keys(this.workingHour).map((key) => {
        if (data[key + "Start"] != null || data[key + "Start"] != null) {
          this.workingHour[key].time[0] = data[key + "Start"];
          this.workingHour[key].time[1] = data[key + "End"];
          this.workingHour[key].time = [data[key + "Start"], data[key + "End"]];
        } else {
          this.workingHour[key].checked = false;
        }
      });
    },
    indexMethod(index) {
      return index + 1;
    },
    initSpecialtime(data) {
      data.forEach((el) => {
        if (el.dayType === "ON") {
          this.specialDayOn.push(el);
          this.specialDayOn.forEach((object) => {
            object.time = [object.specialStartDay, object.specialCloseDay];
          });
        } else if (el.dayType === "OFF") {
          this.specialDayOff.push(el);
          this.specialDayOff.forEach((object) => {
            object.time = [object.specialStartDay, object.specialCloseDay];
          });
        }
      });
    },
    async getWarehouseDetail() {
      this.loadingPageDetail = true;
      if (this.$route.params.data.id != null) {
        await axios
          .get(
            `http://localhost:9090/api/v1/warehouse/detail/${this.$route.params.data.id}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              Object.keys(this.warehouse).forEach((key) => {
                this.warehouse[key].value = res.data.items[key];
              });
              this.initKeyContactForm(res.data.items.keyContactVos);

              this.address.country.value =
                this.address.country.options.find(
                  (opt) =>
                    opt.value == res.data.items.country ||
                    opt.label == res.data.items.country
                ).label || "";
              this.address.city.value =
                this.address.city.options.find(
                  (opt) =>
                    opt.value == res.data.items.city ||
                    opt.label == res.data.items.city
                ).label || "";
              this.address.district.value =
                this.address.district.options.find(
                  (opt) =>
                    opt.value == res.data.items.district ||
                    opt.label == res.data.items.district
                ).label || "";
              this.address.subdistrict.value =
                this.address.subdistrict.options.find(
                  (opt) =>
                    opt.value == res.data.items.subdistrict ||
                    opt.label == res.data.items.subdistrict
                ).label || "";
              const countriesRes = this.address.country.options;
              const citiesRes = this.address.city.options.filter(
                (item) => item.countryRefId == res.data.items.country
              );
              const districtsRes = this.address.district.options.filter(
                (item) => item.cityRefId == res.data.items.city
              );
              const subdistrictsRes = this.address.subdistrict.options.filter(
                (item) => item.districtRefId == res.data.items.district
              );
              this.address.country.options = countriesRes;
              this.address.city.options = citiesRes;
              this.address.district.options = districtsRes;
              this.address.subdistrict.options = subdistrictsRes;

              this.address.country.disabled = "";
              this.address.city.disabled = "";
              this.address.district.disabled = "";
              this.address.subdistrict.disabled = "";

              this.initTimeWorking(res.data.items.openWorkingHour);
              this.initSpecialtime(res.data.items.specialDayTimes);
              this.warehouseChainC.data = res.data.items.warehousechainRes;
              this.warehouseId = res.data.items.id;
              this.warehouseIdTxt = res.data.items.warehouseId;
            }
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error,
              type: "error",
            });
          })
          .finally(() => (this.loadingPageDetail = false));
        if (this.$route.params.data.type === "DUPLICATED") {
          this.warehouseId = null;
          this.warehouseIdTxt = null;
        }
      } else {
      }
    },
    async getListAddress() {
      await axios
        .get("http://localhost:9090/api/v1/address", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if (res.status === 200) {
            this.address.country.options = res.data.items.countriesLists;
            this.address.city.options = res.data.items.citiesLists;
            this.address.district.options = res.data.items.districtsLists;
            this.address.subdistrict.options = res.data.items.subdistrictLists;
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
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { id: id },
        })
        .then((res) => {
          if (res.status === 200) {
            this.address.city.options = res.data.items;
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
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { id: id },
        })
        .then((res) => {
          if (res.status === 200) {
            this.address.district.options = res.data.items;
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
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { id: id },
        })
        .then((res) => {
          if (res.status === 200) {
            this.address.subdistrict.options = res.data.items;
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
    initData(data) {},
  },
  async mounted() {
    if (!this.$route.params.data) {
      this.$router.push({ path: "/warehouse-list" });
      return;
    }
    await this.getListAddress();
    await this.getWarehouseDetail();
    this.loadingPageDetail = false;
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
