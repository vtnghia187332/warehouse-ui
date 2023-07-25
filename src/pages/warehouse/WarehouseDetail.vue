<template>
  <ValidationObserver v-slot="{ invalid }" ref="observer">
    <loading-page v-show="loadingPageDetail"></loading-page>
    <div v-show="!loadingPageDetail" class="bg-page-background overflow-y-auto w-full py-4">
      <el-row :gutter="20" class="flex gap-x-4 detail w-full">
        <el-col :span="15" class="forms grow">
          <FormCard title="Information" class="mb-3">
            <template v-slot:content>
              <div class="grid grid-cols-12 gap-x-6">
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
          <BaseDialog ref="special-time" v-show="dialogVisible" :dialogVisible.sync="dialogVisible"
            @handle-data="handleData" :rowDataSpecialDay="rowDataSpecialDay" />
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
                  <el-table height="448" :data="specialDayOff" style="width: 100%" @row-dblclick="handleSpecialDayDetail"
                    :row-class-name="specialTimeOn">
                    <div slot="append" v-if="specialDayOff.length == '0'">
                      <el-empty :image-size="200"></el-empty>
                    </div>
                    <el-table-column label="STT" type="index" :index="indexMethod">
                    </el-table-column>
                    <el-table-column label="Date" prop="date">
                      <template slot-scope="scope">
                        {{ moment(scope.row.date).format("DD/MM/YYYY") }}
                      </template>
                    </el-table-column>
                    <el-table-column label="Time" prop="time">
                      <template slot-scope="scope">
                        {{ moment(scope.row.time[0]).format("HH:mm") + " - " + moment(scope.row.time[1]).format("HH:mm")
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
                        <el-button size="mini" type="danger" class="bg-blue-300" @click="handleAddSpecialDay(true, 'OFF')"
                          :handleAddSpecialDay="handleAddSpecialDay">Add</el-button>
                      </template>
                      <template slot-scope="scope">
                        <el-button size="mini" type="danger" class="bg-red-300"
                          @click="handleDeleteSpecialDay(scope, 'ON')">Delete</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="Special Day-On" name="third">
                  <el-table height="448" :data="specialDayOn" style="width: 100%" @row-dblclick="handleSpecialDayDetail"
                    :row-class-name="specialTimeOn">
                    <div slot="append" v-if="specialDayOn.length == '0'">
                      <el-empty :image-size="200"></el-empty>
                    </div>

                    <el-table-column label="STT" type="index" :index="indexMethod">
                    </el-table-column>
                    <el-table-column label="Date" prop="date">
                      <template slot-scope="scope">
                        {{ moment(scope.row.date).format("DD/MM/YYYY") }}
                      </template>
                    </el-table-column>
                    <el-table-column label="Time" prop="time">
                      <template slot-scope="scope">
                        {{ moment(scope.row.time[0]).format("HH:mm") + " - " + moment(scope.row.time[1]).format("HH:mm")
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
                        <el-button size="mini" type="danger" class="bg-blue-300" @click="handleAddSpecialDay(true, 'ON')"
                          :handleAddSpecialDay="handleAddSpecialDay">Add</el-button>
                      </template>
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


          <div :class="invalid ? `footer-btn-fixed flex justify-end p-2 no-display` : `footer-btn-fixed flex justify-end p-2`">
            <button class="text-gray-500 border border-gray-500 font-bold py-2 px-4 rounded" @click="handleCancelSubmit">
              Cancel
            </button>
            <button class="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              @click="handleSubmit">
              Create
            </button>
          </div>
        </el-col>
        <el-col :span="5" class="">
          <AssignedModuleVue title="Warehouse Chain" :nameKey="'code'" :item="warehouseChain.data"
            :fields="warehouseChain.fields" :isShowButton="false" />
        </el-col>
      </el-row>
    </div>
  </ValidationObserver>
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
import AssignedModuleVue from '../../components/AssignedModule.vue';
import LoadingPage from '../../components/Cards/LoadingPage.vue';
import { ValidationObserver } from 'vee-validate';

export default {
  components: { FormCard, BaseInput, BaseTextArea, Button, BaseSelection, BaseDialog, BaseKeyContact, AssignedModuleVue, LoadingPage, ValidationObserver },
  data() {
    return {
      loadingPageDetail: false,
      warehouseId: null,
      warehouseIdTxt: null,
      typeSpecialTime: '',
      dialogVisible: false,
      warehouseChain: {
        data: null,
        fields: [
          { text: "warehouse Chain ID", value: "id" },
          { text: "Tax ID", value: "taxNumber" },
        ],
      },
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
          name: "warehouseCode",
          rules: "required",
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
          name: "warehouseName",
          rules: "required",
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
          name: "warehouseShortName",
          rules: "required",
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
          name: "warehouseDescription",
          rules: "required",
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
          name: "addressDes",
          rules: "required",
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
          name: "country",
          rules: "required",
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
          name: "city",
          rules: "required",
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
          name: "district",
          rules: "required",
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
          name: "subdistrict",
          rules: "required",
          classes: "w-full",
          isRequired: 'true',
          placeholder: "Select Sub District",
          error: "",
          value: '',
          label: "Sub District",
          options: [],
        }
      },
      rowDataSpecialDay: {},
    };
  },
  computed: {
    moment() {
      return moment
    }
  },
  methods: {
    handleCancelSubmit() { },
    handleSubmit() {
      const keyContactReqs = this.$refs["key-contact"].getDataKeyContacts();
      this.specialDayOn.forEach(object => {
        object.specialStartDay = object.time[0];
        object.specialCloseDay = object.time[1];
      });
      this.specialDayOff.forEach(object => {
        object.specialStartDay = object.time[0];
        object.specialCloseDay = object.time[1];
      });
      const warehouseDetail = {
        warehouseChainId: 1,
        id: this.warehouseId,
        specialDayTimeReqList: [...this.specialDayOn, ...this.specialDayOff],
        keyContactReqs: keyContactReqs,
        openWorkingHourReq: {},
        warehouseId: this.warehouseIdTxt,
      };
      Object.keys(this.warehouse).map((key) => {
        warehouseDetail[key] = this.warehouse[key].value
      })
      Object.keys(this.workingHour).map((key) => {
        if (this.workingHour[key].checked) {
          warehouseDetail.openWorkingHourReq[key + "Start"] = moment(this.workingHour[key].time[0]).format("YYYY-MM-DD HH:mm:ss");
          warehouseDetail.openWorkingHourReq[key + "End"] = moment(this.workingHour[key].time[1]).format("YYYY-MM-DD HH:mm:ss");
        }
      })
      Object.keys(this.address).map((key) => {
        warehouseDetail[key + "Id"] = this.address[key].value
        warehouseDetail[key] = this.address[key].value
      })
      if (this.$route.params.data.type === 'EDIT') {
        axios({
          method: 'put',
          url: 'http://localhost:9090/api/v1/warehouse',
          headers: { "Access-Control-Allow-Origin": "*" },
          data: warehouseDetail,
        })
          .then(response => {
            if (response.status === 200) {
              this.$router.push({ path: '/warehouse-list' });
              this.$message({
                showClose: true,
                message: 'Updated successfully',
                type: 'success'
              });
            }
          })
          .catch(error => {
            this.$message({
              showClose: true,
              message: error,
              type: 'error'
            });
          })

      } else {
        axios({
          method: 'post',
          url: 'http://localhost:9090/api/v1/warehouse',
          headers: { "Access-Control-Allow-Origin": "*" },
          data: warehouseDetail,
        })
          .then(response => {
            if (response.status === 200) {
              this.$router.push({ path: '/warehouse-list' });
              this.$message({
                showClose: true,
                message: 'Created successfully',
                type: 'success'
              });
            }
          })
          .catch(error => {
            this.$message({
              showClose: true,
              message: error,
              type: 'error'
            });
          })
      }
    },
    handleAddSpecialDay(param, type) {
      if (param !== null) {
        this.$refs["special-time"].typeSpecialTime = type;
        this.rowDataSpecialDay = {}
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
      this.rowDataSpecialDay = row;
      this.$refs["special-time"].initData({ ...row, id: { value: row.index } });
      this.dialogVisible = true;
    },
    specialTimeOn({ row, rowIndex }) {
      row.index = rowIndex;
    },
    handleData(param) {
      if (param.dayType == 'ON') {
        if (param.id) {
          this.specialDayOn = this.specialDayOn.map(el => { return el.index == param.id.value ? { ...param } : el })
        } else {
          this.specialDayOn.push({ ...param, id: this.specialDayOn.length });
        }
      } else if (param.dayType == 'OFF') {
        if (param.id) {
          this.specialDayOff = this.specialDayOff.map(el => { return el.index == param.id.value ? { ...param } : el })
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
      })
    },
    indexMethod(index) {
      return index + 1;
    },
    initSpecialtime(data) {
      data.forEach(el => {
        if (el.dayType === 'ON') {
          this.specialDayOn.push(el);
          this.specialDayOn.forEach(object => {
            object.time = [object.specialStartDay, object.specialCloseDay]
          });
        } else if (el.dayType === 'OFF') {
          this.specialDayOff.push(el);
          this.specialDayOff.forEach(object => {
            object.time = [object.specialStartDay, object.specialCloseDay]
          });
        }
      })
    },
    getWarehouseDetail() {
      this.loadingPageDetail = true;
      if (this.$route.params.data.id != null) {
        axios.get(`http://localhost:9090/api/v1/warehouse/detail/${this.$route.params.data.id}`, { headers: { "Access-Control-Allow-Origin": "*" } },)
          .then(res => {
            if (res.status === 200) {
              Object.keys(this.warehouse).forEach((key) => {
                this.warehouse[key].value = res.data.items[key];
              });
              this.initKeyContactForm(res.data.items.keyContactVos);
              Object.keys(this.address).forEach((key) => {
                this.address[key].value = res.data.items[key];
              });
              this.initTimeWorking(res.data.items.openWorkingHour);
              this.initSpecialtime(res.data.items.specialDayTimes);
              this.warehouseChain.data = res.data.items.warehousechainRes;
              this.warehouseId = res.data.items.id;
              this.warehouseIdTxt = res.data.items.warehouseId;
            }
          })
          .catch(error => {
            this.$message({
              showClose: true,
              message: error,
              type: 'error'
            });
          })
          .finally(() => this.loadingPageDetail = false)
        if (this.$route.params.data.type === 'DUPLICATED') {
          this.warehouseId = null;
          this.warehouseIdTxt = null;
        }
      }
    },
    getListAddress() {
      axios.get('http://localhost:9090/api/v1/address', { headers: { "Access-Control-Allow-Origin": "*" } },)
        .then(res => {
          if (res.status === 200) {
            this.address.country.options = res.data.items.countriesLists;
            this.address.city.options = res.data.items.citiesLists;
            this.address.district.options = res.data.items.districtsLists;
            this.address.subdistrict.options = res.data.items.subdistrictLists;
          }
        })
        .catch(error => {
          this.$message({
            showClose: true,
            message: error,
            type: 'error'
          });
        })
    },
    initData(data) {
    }
  },
  mounted() {
    this.getWarehouseDetail();
    this.getListAddress();
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