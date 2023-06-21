<template>
  <div class="bg-page-background overflow-y-auto">
    <div class="p-4 flex gap-x-4">
      <div class="w-[1130px] forms grow flex flex-col gap-y-4">
        <FormCard title="Information">
          <template v-slot:content>
            <div class="!w-[1168px]">
              <div class="w-[540px]">
                <BaseInput :field="warehouse.code" v-model="warehouse.code.value" />
              </div>
              <div>
                <BaseTextArea :field="warehouse.name" v-model="warehouse.name.value" />
              </div>
              <div>
                <BaseInput :field="warehouse.shortName" v-model="warehouse.shortName.value" />
              </div>
              <div>
                <BaseTextArea :field="warehouse.description" v-model="warehouse.description.value" />
              </div>
            </div>
          </template>
        </FormCard>

        <BaseKeyContact ref="key-contact" />

        <div class="card bg-white !mb-0">
          <div class="font-medium text-base text-primary-85 p-3 border border-divider">
            Window Time
          </div>
          <div class="p-3 !pt-2 pb-0">
            <el-tabs v-model="workingHour.activeName">
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
                <el-table style="width: 100%">
                  <el-table-column label="Date" prop="date">
                  </el-table-column>
                  <el-table-column label="Name" prop="name">
                  </el-table-column>
                  <el-table-column align="right">
                    <template slot-scope="scope">
                      <el-button size="mini" type="danger" class="bg-red-300"
                        @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
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
                <el-table :data="specialDayOn" style="width: 100%">
                  <el-table-column label="Date" prop="specialDay">
                  </el-table-column>
                  <el-table-column label="Time" prop="weekDay">
                  </el-table-column>
                  <el-table-column label="Remark" prop="remark">
                  </el-table-column>
                  <el-table-column align="right">
                    <template slot-scope="scope">
                      <el-button size="mini" type="danger" class="bg-red-300"
                        @click="handleDeleteSpecialDay(scope)">Delete</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <BaseDialog :dialogVisible.sync="dialogVisible" @handle-data="handleData" />
        <FormCard title="Address">
          <template v-slot:content>
            <div class="!w-[1168px]">
              <div>
                <BaseTextArea :field="address.addressDes" v-model="address.addressDes.value" />
              </div>
              <div class="flex justify-between">
                <!-- <BaseInput :field="address.country" v-model="address.country.value" /> -->
                <BaseSelection :field="address.country" />
                <BaseInput :field="address.city" v-model="address.city.value" />
              </div>
              <div class="flex justify-between">
                <BaseInput :field="address.district" v-model="address.district.value" />
                <BaseInput :field="address.subDistrict" v-model="address.subDistrict.value" />
              </div>
            </div>
          </template>
        </FormCard>

        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="handleSubmit">
          Create
        </button>
      </div>
      <div class="flex flex-col gap-y-4 min-w-[380px] w-[380px] h-full">
        <div class="p-3 bg-white radius-shadow_add">
          <p class="text-xs text-secondary-45">Driver ID:</p>
          <p class="text-base text-neutral-13 font-medium">
            {{ "ANL-Dxxxxxxxxxx" }}
          </p>
        </div>
      </div>
    </div>
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
export default {
  components: { FormCard, BaseInput, BaseTextArea, Button, BaseSelection, BaseDialog, BaseKeyContact },
  data() {
    return {
      dialogVisible: false,
      specialDayOn: [
        {
          id: 0,
          specialDay: '',
          specialStartDay: '',
          specialCloseDay: '',
          dayType: '',
          remark: '',
          weekDay: ''
        }
      ],
      search: '',
      workingHour: {
        activeName: 'first',
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
          classes: "!w-[540px]",
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
          classes: "!w-[1168px] !h-[64px]",
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
          classes: "!w-[1168px]",
          type: "text",
          label: "Short Name",
          value: "",
          placeholder: "Enter Warehouse Short Name",
          maxlength: 100,
          error: "",
        },
        description: {
          id: "warehouseDescription",
          classes: "!w-[1168px] !h-[64px]",
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
          classes: "!w-[1168px]",
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
          classes: "!w-[544px]",
          isRequired: 'true',
          placeholder: "Select Country",
          error: "",
          value: '',
          label: "Country",
          options: [{
            value: 'Option1',
            label: 'Option1'
          }, {
            value: 'Option2',
            label: 'Option2'
          }, {
            value: 'Option3',
            label: 'Option3'
          }, {
            value: 'Option4',
            label: 'Option4'
          }, {
            value: 'Option5',
            label: 'Option5'
          }],
        },
        city: {
          id: "city",
          classes: "!w-[544px]",
          type: "text",
          label: "City",
          isRequired: 'true',
          value: "",
          placeholder: "Enter City",
          maxlength: 0,
          error: "",
        },
        district: {
          id: "district",
          classes: "!w-[544px]",
          type: "text",
          label: "District",
          isRequired: 'true',
          value: "",
          placeholder: "Enter District",
          maxlength: 0,
          error: "",
        },
        subDistrict: {
          id: "subdistrict",
          classes: "!w-[544px]",
          type: "text",
          label: "Sub-District",
          isRequired: 'true',
          value: "",
          placeholder: "Enter Sub-District",
          maxlength: 0,
          error: "",
        }
      }
    };
  },
  methods: {
    handleSubmit() {
      Object.keys(this.warehouse).forEach((key) => {
        if (this.warehouse[key].value == "") {
          this.warehouse[key].error = this.warehouse[key].label.concat(" is not empty");
        } else {
          this.warehouse[key].error = "";
        }
      });
      Object.keys(this.address).forEach((key) => {
        if (this.address[key].value == "") {
          this.address[key].error = this.address[key].label.concat(" is not empty");
        } else {
          this.address[key].error = "";
        }
      });
      const warehouseAdd = {
        "code": "Warehouse Code2",
        "name": "name123123",
        "shortName": "shortName",
        "addressDes": "addressDes",
        "description": "description",
        "openWorkingHourReq": {
          "mondayEnd": "mondayEnd",
          "tuesdayStart": "tuesdayStart",
          "tuesdayEnd": "tuesdayEnd",
          "wednesdayStart": "wednesdayStart",
          "wednesdayEnd": "wednesdayEnd",
          "thursdayStart": "thursdayStart",
          "thursdayEnd": "thursdayEnd",
          "fridayStart": "fridayStart",
          "fridayEnd": "fridayEnd",
          "saturdayStart": "saturdayStart",
          "saturdayEnd": "saturdayEnd",
          "sundayStart": "sundayStart",
          "sundayEnd": "sundayEnd"
        },
        "countryId": 1,
        "cityId": 1,
        "districtId": 1,
        "subdistrictId": 1,
        "postalCode": "123456",
        "warehouseChainId": 1,
        "specialDayTimeReqList": [
          {
            "specialDay": "specialDay",
            "specialStartDay": "specialStartDay",
            "specialCloseDay": "specialCloseDay",
            "dayType": "dayType",
            "remark": "remark",
            "weekDay": "weekDay"
          },
          {
            "specialDay": "specialDay1",
            "specialStartDay": "specialStartDay1",
            "specialCloseDay": "specialCloseDay1",
            "dayType": "dayType1",
            "remark": "remark1",
            "weekDay": "weekDay1"
          }
        ],
        "keyContactReqs": [
          {
            "code": "code",
            "firstName": "abc",
            "lastName": "adb",
            "title": "title",
            "email": "email@gmail.com",
            "mobilePhone": "0987216273",
            "landlinePhone": "0987216201"
          }, {
            "code": "cod12e",
            "firstName": "aabc",
            "lastName": "adbb",
            "title": "title2",
            "email": "email@gmail.com",
            "mobilePhone": "0987216273",
            "landlinePhone": "0987216201"
          }
        ]
      };
      // Object.keys(this.warehouse).forEach((key) => {
      //   warehouseAdd[key] = this.warehouse[key].value;
      // });
      axios({
        method: 'post',
        url: 'http://localhost:9090/api/v1/warehouse',
        data: warehouseAdd
      });
    },
    handleAddSpecialDay(param) {
      if (param !== null) {
        this.dialogVisible = param;
      }
    },
    handleDeleteSpecialDay(item) {
      const index = item.$index;
      if (index > -1) {
        this.specialDayOn.splice(index, 1);
      }
    },
    handleData(param) {
      this.specialDayOn.push(param);
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
      
    }
  },
  mounted() {
    axios.get(`http://localhost:9090/api/v1/warehouse/detail/${this.$route.params.code}`)
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
  },
};
</script>

<style scoped>
.radius-shadow_add {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}
</style>