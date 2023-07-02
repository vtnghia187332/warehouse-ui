<template>
  <div class="bg-page-background overflow-y-auto w-full py-4">
    <el-row :gutter="20" class="flex gap-x-4 detail w-full">
      <el-col :span="15" class="forms grow">
        <FormCard title="Information" class="mb-3">
          <template v-slot:content>
            <div class="grid grid-cols-12 gap-x-6 gap-y-3">
              <div class="col-span-6">
                <BaseInput :field="warehouse.code" v-model="warehouse.code.value" />
              </div>
              <div class="col-span-12">
                <BaseTextArea :field="warehouse.name" v-model="warehouse.name.value" />
              </div>
              <div class="col-span-12">
                <BaseInput :field="warehouse.shortName" v-model="warehouse.shortName.value" />
              </div>
              <div class="col-span-12">
                <BaseTextArea :field="warehouse.description" v-model="warehouse.description.value" />
              </div>
            </div>
          </template>
        </FormCard>

        <BaseKeyContact ref="key-contact" />

        <div class="card bg-white !mb-3">
          <div class="font-medium text-base text-primary-85 p-3 border border-divider">
            Window Time
          </div>
          <div class="p-3 !pt-2 pb-0">
            <el-tabs v-model="activeName">
              <el-tab-pane label="OpenHour" name="first">
                <div class="mb-4 items-center grid grid-cols-4 gap-4">
                  <el-checkbox class="" v-model="workingHour.monday.checked">Monday</el-checkbox>
                  <el-time-picker ref="mondayPicker" is-range format="HH:mm" v-model="workingHour.monday.time"
                    range-separator="To" start-placeholder="Start time" end-placeholder="End time"
                    :disabled="workingHour.monday.checked == false">
                  </el-time-picker>
                </div>

                <div class="mb-4 items-center grid grid-cols-4 gap-4">
                  <el-checkbox class="" v-model="workingHour.tuesday.checked">Tuesday</el-checkbox>
                  <el-time-picker ref="tuesdayPicker" is-range format="HH:mm" v-model="workingHour.tuesday.time"
                    range-separator="To" start-placeholder="Start time" end-placeholder="End time"
                    :disabled="workingHour.tuesday.checked == false">
                  </el-time-picker>
                </div>

                <div class="mb-4 items-center grid grid-cols-4 gap-4">
                  <el-checkbox class="" v-model="workingHour.wednesday.checked">Wednesday</el-checkbox>
                  <el-time-picker ref="wednesdayPicker" is-range format="HH:mm" v-model="workingHour.wednesday.time"
                    range-separator="To" start-placeholder="Start time" end-placeholder="End time"
                    :disabled="workingHour.wednesday.checked == false">
                  </el-time-picker>
                </div>

                <div class="mb-4 items-center grid grid-cols-4 gap-4">
                  <el-checkbox class="" v-model="workingHour.thursday.checked">Thursday</el-checkbox>
                  <el-time-picker ref="thursdayPicker" is-range format="HH:mm" v-model="workingHour.thursday.time"
                    range-separator="To" start-placeholder="Start time" end-placeholder="End time"
                    :disabled="workingHour.thursday.checked == false">
                  </el-time-picker>
                </div>

                <div class="mb-4 items-center grid grid-cols-4 gap-4">
                  <el-checkbox class="" v-model="workingHour.friday.checked">Friday</el-checkbox>
                  <el-time-picker ref="fridayPicker" is-range format="HH:mm" v-model="workingHour.friday.time"
                    range-separator="To" start-placeholder="Start time" end-placeholder="End time"
                    :disabled="workingHour.friday.checked == false">
                  </el-time-picker>
                </div>

                <div class="mb-4 items-center grid grid-cols-4 gap-4">
                  <el-checkbox class="" v-model="workingHour.saturday.checked">Saturday</el-checkbox>
                  <el-time-picker ref="saturdayPicker" is-range format="HH:mm" v-model="workingHour.saturday.time"
                    range-separator="To" start-placeholder="Start time" end-placeholder="End time"
                    :disabled="workingHour.saturday.checked == false">
                  </el-time-picker>
                </div>

                <div class="mb-4 items-center grid grid-cols-4 gap-4">
                  <el-checkbox class="" v-model="workingHour.sunday.checked">Sunday</el-checkbox>
                  <el-time-picker ref="sundayPicker" is-range format="HH:mm" v-model="workingHour.sunday.time"
                    range-separator="To" start-placeholder="Start time" end-placeholder="End time"
                    :disabled="workingHour.sunday.checked == false">
                  </el-time-picker>
                </div>
              </el-tab-pane>
              <el-tab-pane class="relative" label="Holiday, Special Day-Off" name="second">
                <button
                  class="absolute z-20 ml-[1085px] !bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
                  Add
                </button>
                <el-table :data="specialDayOff" style="width: 100%" @row-dblclick="handleSpecialDayDetail">
                  <el-table-column label="Date" prop="specialDay">
                  </el-table-column>
                  <el-table-column label="Name" prop="weekDay">
                  </el-table-column>
                  <el-table-column label="Remark" prop="remark">
                  </el-table-column>
                  <el-table-column align="right">
                    <template slot-scope="scope">
                      <el-button size="mini" type="danger" class="bg-red-300"
                        @click="handleDeleteSpecialDay(scope, 'OFF')">Delete</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="Special Day-On" name="third">
                <button
                  class="absolute z-20 ml-[1082px] !bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                  @click="handleAddSpecialDay(true)" :handleAddSpecialDay="handleAddSpecialDay">
                  Add
                </button>
                <el-table :data="specialDayOn" style="width: 100%" @row-dblclick="handleSpecialDayDetail">
                  <el-table-column label="Date" prop="date">
                    <template slot-scope="scope">
                      {{ moment(scope.row.date).format("DD/MM/YYYY") }}
                    </template>
                  </el-table-column>
                  <el-table-column label="Time" prop="time">
                    <template slot-scope="scope">
                      {{ moment(scope.row.time[0]).format("HH:mm") + " - " + moment(scope.row.time[1]).format("HH:mm") }}
                    </template>
                  </el-table-column>
                  <el-table-column label="Remark" prop="remark">
                    <template slot-scope="scope">
                      {{ scope.row.remark }}
                    </template>
                  </el-table-column>
                  <el-table-column align="right">
                    <template slot-scope="scope">
                      <el-button size="mini" type="danger" class="bg-red-300"
                        @click="handleDeleteSpecialDay(scope, 'ON')">Delete</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <BaseDialog ref="special-time" v-if="dialogVisible" :dialogVisible.sync="dialogVisible" @handle-data="handleData"
          :rowDataSpecialDayOn="rowDataSpecialDayOn" />
        <FormCard title="Address" class="mb-3">
          <template v-slot:content>
            <div class="grid grid-cols-12 gap-x-6">
              <div class="col-span-12">
                <BaseTextArea :field="address.addressDes" v-model="address.addressDes.value" />
              </div>
              <div class="col-span-6">
                <BaseSelection :field="address.country" />
              </div>
              <div class="col-span-6">
                <BaseSelection :field="address.city" />
              </div>
              <div class="col-span-6">
                <BaseSelection :field="address.district" />
              </div>
              <div class="col-span-6">
                <BaseSelection :field="address.subdistrict" />
              </div>
            </div>
          </template>
        </FormCard>

        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="handleSubmit">
          Create
        </button>
      </el-col>
      <el-col :span="5" class="">
        <div class="p-3 bg-white radius-shadow_add">
          <p class="text-xs text-secondary-45">Driver ID:</p>
          <p class="text-base text-neutral-13 font-medium">
            {{ "ANL-Dxxxxxxxxxx" }}
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import BaseInput from "./../../components/Inputs/BaseInput.vue";
import BaseTextArea from "./../../components/Inputs/BaseTextArea.vue";
import FormCard from "./../../components/Cards/FormCard.vue";
import Button from "../../components/Button.vue";
import BaseSelection from "../../components/Inputs/BaseSelection.vue";
import BaseDialog from "../../components/Dialog/BaseDialog.vue";
import BaseKeyContact from "../../components/KeyContact/BaseKeyContact.vue";
import moment from 'moment';

export default {
  components: { FormCard, BaseInput, BaseTextArea, Button, BaseSelection, BaseDialog, BaseKeyContact },
  data() {
    return {
      dialogVisible: false,
      specialDayOn: [
      ],
      specialDayOff: [
      ],
      search: '',
      activeName: 'first',
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
          classes: "w-full col-span-6",
          type: "text",
          label: "Code",
          isRequired: 'true',
          value: "",
          placeholder: "Enter Warehouse Code",
          maxlength: 20,
          error: "",
        },
        name: {
          id: "warehouseName",
          classes: "col-span-12 !h-[64px]",
          type: "text",
          label: "Name",
          isRequired: 'true',
          value: "",
          placeholder: "Enter Warehouse Name",
          maxlength: 150,
          error: "",
        },
        shortName: {
          id: "warehouseShortName",
          classes: "col-span-12",
          type: "text",
          label: "Short Name",
          value: "",
          placeholder: "Enter Warehouse Short Name",
          maxlength: 100,
          error: "",
        },
        description: {
          id: "warehouseDescription",
          classes: "col-span-12 !h-[64px]",
          type: "text",
          label: "Description",
          isRequired: 'true',
          value: "",
          placeholder: "Enter Warehouse Description",
          maxlength: 150,
          error: "",
        },
      },
      address: {
        addressDes: {
          id: "addressDes",
          classes: "w-full",
          type: "text",
          label: "Address",
          isRequired: 'true',
          value: "",
          placeholder: "Enter Adress",
          maxlength: 150,
          error: "",
        },
        country: {
          id: "country",
          classes: "w-full",
          isRequired: 'true',
          placeholder: "Select Country",
          error: "",
          value: '',
          label: "Country",
          options: [],
        },
        city: {
          id: "city",
          classes: "w-full",
          isRequired: 'true',
          placeholder: "Select City",
          error: "",
          value: '',
          label: "City",
          options: [],
        },
        district: {
          id: "district",
          classes: "w-full",
          isRequired: 'true',
          placeholder: "Select District",
          error: "",
          value: '',
          label: "District",
          options: [],
        },
        subdistrict: {
          id: "subdistrict",
          classes: "w-full",
          isRequired: 'true',
          placeholder: "Select Sub District",
          error: "",
          value: '',
          label: "Sub District",
          options: [],
        }
      },
      rowDataSpecialDayOn: {}
    };
  },
  computed: {
    moment() {
      return moment
    }
  },
  methods: {
    handleSubmit() {
      // Object.keys(this.warehouse).forEach((key) => {
      //   if (this.warehouse[key].value == "") {
      //     this.warehouse[key].error = this.warehouse[key].label.concat(" is not empty");
      //   } else {
      //     this.warehouse[key].error = "";
      //   }
      // });
      // Object.keys(this.address).forEach((key) => {
      //   if (this.address[key].value == "") {
      //     this.address[key].error = this.address[key].label.concat(" is not empty");
      //   } else {
      //     this.address[key].error = "";
      //   }
      // });
      const keyContactReqs = this.$refs["key-contact"].getDataKeyContacts()
      console.log("specialDayOn", this.specialDayOn);
      const warehouseAdd = {
        warehouseChainId: 1,
        specialDayTimeReqList: this.specialDayOn,
        keyContactReqs: keyContactReqs,
        openWorkingHourReq: {}
      };
      Object.keys(this.warehouse).map((key) => {
        console.log("key", key, this.warehouse[key].value);
        warehouseAdd[key] = this.warehouse[key].value
      })
      Object.keys(this.workingHour).map((key) => {
        warehouseAdd.openWorkingHourReq[key + "Start"] = this.workingHour[key].time[0]
        warehouseAdd.openWorkingHourReq[key + "End"] = this.workingHour[key].time[1]
      })
      Object.keys(this.address).map((key) => {
        warehouseAdd[key + "Id"] = this.address[key].value
        warehouseAdd[key] = this.address[key].value
      })

      axios({
        method: 'post',
        url: 'http://localhost:9090/api/v1/warehouse',
        headers: { "Access-Control-Allow-Origin": "*" },
        data: warehouseAdd,
      });
    },
    handleAddSpecialDay(param) {
      if (param !== null) {
        this.rowDataSpecialDayOn = {}
        this.dialogVisible = true;
      }
    },
    handleDeleteSpecialDay(item, type) {
      const index = item.$index;
      if (index > -1) {
        if (type = 'ON') {
          this.specialDayOn.splice(index, 1);
        } else if (type = 'OFF') {
          this.specialDayOff.splice(index, 1);
        }
      }
    },
    handleSpecialDayDetail(row, col, event) {
      this.rowDataSpecialDayOn = row
      this.dialogVisible = true;
    },
    handleData(param) {
      console.log(param);
      if (param.id) {
        this.specialDayOn = this.specialDayOn.map(item => {
          if (param.id === item.id) {
            return param
          }
        })
      } else {
        this.specialDayOn.push({ ...param, id: this.specialDayOn.length });
      }

    },
    initKeyContactForm(data) {
      this.$refs["key-contact"].initKeyContact(data);
    },
    initTimeWorking(data) {
      if (data.mondayStart == '' || data.mondayEnd == '' || data.mondayStart == null || data.mondayEnd == null) {
        this.workingHour.monday.checked = false;
      } else {
        this.workingHour.monday.time[0].setHours(this.splitTime(data.mondayStart)[0]);
        this.workingHour.monday.time[0].setMinutes(this.splitTime(data.mondayStart)[1]);
        this.workingHour.monday.time[1].setHours(this.splitTime(data.mondayEnd)[0]);
        this.workingHour.monday.time[1].setMinutes(this.splitTime(data.mondayEnd)[1]);
        this.$refs.mondayPicker.userInput = [data.mondayStart, data.mondayEnd];
      }
      if (data.tuesdayStart == '' || data.tuesdayEnd == '' || data.tuesdayStart == null || data.tuesdayEnd == null) {
        this.workingHour.tuesday.checked = false;
      } else {
        this.workingHour.tuesday.time[0].setHours(this.splitTime(data.tuesdayStart)[0]);
        this.workingHour.tuesday.time[0].setMinutes(this.splitTime(data.tuesdayStart)[1]);
        this.workingHour.tuesday.time[1].setHours(this.splitTime(data.tuesdayEnd)[0]);
        this.workingHour.tuesday.time[1].setMinutes(this.splitTime(data.tuesdayEnd)[1]);
        this.$refs.tuesdayPicker.userInput = [data.tuesdayStart, data.tuesdayEnd];
      }
      if (data.wednesdayStart == '' || data.wednesdayEnd == '' || data.wednesdayStart == null || data.wednesdayEnd == null) {
        this.workingHour.wednesday.checked = false;
      } else {
        this.workingHour.wednesday.time[0].setHours(this.splitTime(data.wednesdayStart)[0]);
        this.workingHour.wednesday.time[0].setMinutes(this.splitTime(data.wednesdayStart)[1]);
        this.workingHour.wednesday.time[1].setHours(this.splitTime(data.wednesdayEnd)[0]);
        this.workingHour.wednesday.time[1].setMinutes(this.splitTime(data.wednesdayEnd)[1]);
        this.$refs.wednesdayPicker.userInput = [data.wednesdayStart, data.wednesdayEnd];
      }
      if (data.thursdayStart == '' || data.thursdayEnd == '' || data.thursdayStart == null || data.thursdayEnd == null) {
        this.workingHour.thursday.checked = false;
      } else {
        this.workingHour.thursday.time[0].setHours(this.splitTime(data.thursdayStart)[0]);
        this.workingHour.thursday.time[0].setMinutes(this.splitTime(data.thursdayStart)[1]);
        this.workingHour.thursday.time[1].setHours(this.splitTime(data.thursdayEnd)[0]);
        this.workingHour.thursday.time[1].setMinutes(this.splitTime(data.thursdayEnd)[1]);
        this.$refs.thursdayPicker.userInput = [data.thursdayStart, data.thursdayEnd];
      }

      if (data.thursdayStart == '' || data.thursdayEnd == '' || data.thursdayStart == null || data.thursdayEnd == null) {
        this.workingHour.friday.checked = false;
      } else {
        this.workingHour.friday.time[0].setHours(this.splitTime(data.fridayStart)[0]);
        this.workingHour.friday.time[0].setMinutes(this.splitTime(data.fridayStart)[1]);
        this.workingHour.friday.time[1].setHours(this.splitTime(data.fridayEnd)[0]);
        this.workingHour.friday.time[1].setMinutes(this.splitTime(data.fridayEnd)[1]);
        this.$refs.fridayPicker.userInput = [data.fridayStart, data.fridayEnd];
      }
      if (data.saturdayStart == '' || data.saturdayEnd == '' || data.saturdayStart == null || data.saturdayEnd == null) {
        this.workingHour.saturday.checked = false;
      } else {
        this.workingHour.saturday.time[0].setHours(this.splitTime(data.saturdayStart)[0]);
        this.workingHour.saturday.time[0].setMinutes(this.splitTime(data.saturdayStart)[1]);
        this.workingHour.saturday.time[1].setHours(this.splitTime(data.saturdayEnd)[0]);
        this.workingHour.saturday.time[1].setMinutes(this.splitTime(data.saturdayEnd)[1]);
        this.$refs.saturdayPicker.userInput = [data.saturdayStart, data.saturdayEnd];
      }
      if (data.sundayStart == '' || data.sundayEnd == '' || data.sundayStart == null || data.sundayEnd == null) {
        this.workingHour.sunday.checked = false;
      } else {
        this.workingHour.sunday.time[0].setHours(this.splitTime(data.sundayStart)[0]);
        this.workingHour.sunday.time[0].setMinutes(this.splitTime(data.sundayStart)[1]);
        this.workingHour.sunday.time[1].setHours(this.splitTime(data.sundayEnd)[0]);
        this.workingHour.sunday.time[1].setMinutes(this.splitTime(data.sundayEnd)[1]);
        this.$refs.sundayPicker.userInput = [data.sundayStart, data.sundayEnd];
      }
    },
    splitTime(data) {
      return data.split(":")
    },
    initDayTimeOnOff(data) {
      console.log(data);
      this.$refs["special-time"].initSepcialTimes(data);
    },
  },
  mounted() {
    axios.get(`http://localhost:9090/api/v1/warehouse/detail/${this.$route.params.code}`, { headers: { "Access-Control-Allow-Origin": "*" } },)
      .then(res => {
        Object.keys(this.warehouse).forEach((key) => {
          this.warehouse[key].value = res.data.items[key];
        });
        this.initKeyContactForm(res.data.items.keyContactVos);
        Object.keys(this.address).forEach((key) => {
          this.address[key].value = res.data.items[key];
        });
        this.initTimeWorking(res.data.items.openWorkingHour);
        this.initDayTimeOnOff(res.data.items.specialDayTimes);
      })
      .catch(err => console.log(err));

    axios.get('http://localhost:9090/api/v1/address', { headers: { "Access-Control-Allow-Origin": "*" } },)
      .then(res => {
        this.address.country.options = res.data.items.countriesLists;
        this.address.city.options = res.data.items.citiesLists;
        this.address.district.options = res.data.items.districtsLists;
        this.address.subdistrict.options = res.data.items.subdistrictLists;
      })
      .catch(err => console.log(err));
  },
};
</script>

<style scoped>
.radius-shadow_add {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}

.detail .el-col.el-col-5 {
  padding: 0 !important;
}
</style>