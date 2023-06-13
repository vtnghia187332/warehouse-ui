<template>
  <div class="bg-page-background overflow-y-auto">
    <div class="p-4 flex gap-x-4">
      <div class="w-[1130px] forms grow flex flex-col gap-y-4">
        <FormCard title="Information">
          <template v-slot:content>
            <div class="!w-[1168px]">
              <div>
                <div>Check input selection</div>
                <el-select v-model="value" filterable placeholder="Select">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div>
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
        <div class="pt-3 bg-white radius-shadow_add">
          <div class="px-3 text-primary-85 font-bold text-base">Key Contact</div>
          <div class="mt-3 px-[15px] border-t border-b border-divider content-rate-card">
            <div class="flex justify-between py-3">
              <span class="text-sm font-bold flex items-center">Key Contact Person (3/3)
              </span>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add
              </button>
            </div>
            <div class="bg-neutral-2 w-full border border-neutral-5 rounded-sm mb-4">
              <div class="flex justify-between border-b p-3 bg-gray-100">
                <span class="text-sm font-bold flex items-center ">Key Contact Person
                </span>
                <div class="cursor-pointer">
                  <button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                  </button>
                </div>
              </div>
              <div class="p-3 bg-gray-100">
                <div class="flex justify-between">
                  <BaseInput :field="keyContact.title" v-model="keyContact.title.value" />
                </div>
                <div class="flex justify-between">
                  <BaseInput :field="keyContact.firstName" v-model="keyContact.firstName.value" />
                  <BaseInput :field="keyContact.lastName" v-model="keyContact.lastName.value" />
                </div>
                <div class="flex justify-between">
                  <BaseInput :field="keyContact.email" v-model="keyContact.email.value" />
                  <BaseInput :field="keyContact.phoneNumber" v-model="keyContact.phoneNumber.value" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card bg-white mb-4">
          <div class="font-medium text-base text-primary-85 p-3 border border-divider">
            Window Time
          </div>
          <div class="p-3 !pt-2 pb-0">
            <el-tabs v-model="workingHour.activeName" @tab-click="handleClick">
              <el-tab-pane label="OpenHour" name="first">
                <div class="mb-2 flex items-center">
                  <el-checkbox class="!mr-[150px]" v-model="openHourTab.checked">Monday</el-checkbox>
                  <el-time-picker is-range format="HH:mm" v-model="workingHour.time" range-separator="To"
                    start-placeholder="Start time" end-placeholder="End time">
                  </el-time-picker>
                </div>
              </el-tab-pane>
              <el-tab-pane class="relative" label="Holiday, Special Day-Off" name="second">
                <button
                  class="absolute z-20 ml-[1085px] !bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
                  Add
                </button>
                <el-table :data="tableData" style="width: 100%">
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
                  class="absolute z-20 ml-[1082px] !bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
                  Add
                </button>
                <el-table :data="tableData" style="width: 100%">
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
            </el-tabs>
          </div>
        </div>

        <FormCard title="Address">
          <template v-slot:content>
            <div class="!w-[1168px]">
              <div>
                <BaseTextArea :field="address.addressDes" v-model="address.addressDes.value" />
              </div>
              <div class="flex justify-between">
                <BaseInput :field="address.country" v-model="address.country.value" />
                <BaseInput :field="address.city" v-model="address.city.value" />
              </div>
              <div class="flex justify-between">
                <BaseInput :field="address.district" v-model="address.district.value" />
                <BaseInput :field="address.subdistrict" v-model="address.subdistrict.value" />
              </div>
            </div>
          </template>
        </FormCard>

        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="checkData">
          Button
        </button>
      </div>
      <div class="flex flex-col gap-y-4 min-w-[380px] w-[380px] h-full">
        <div class="p-3 bg-white radius-shadow_add">
          <p class="text-xs text-secondary-45">Driver ID:</p>
          <p class="text-base text-neutral-13 font-medium">
            {{ this.pageId || "ANL-Dxxxxxxxxxx" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "./../../components/Inputs/BaseInput.vue";
import BaseTextArea from "./../../components/Inputs/BaseTextArea.vue";
import FormCard from "./../../components/Cards/FormCard.vue";
import Button from "../../components/Button.vue";
export default {
  components: { FormCard, BaseInput, BaseTextArea, Button },
  data() {
    return {
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
      value: '',
      tableData: [{
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-02',
        name: 'John',
        address: 'No. 189, Grove St, Los Angeles'
      }],
      search: '',
      workingHour: {
        activeName: 'first',
        time: [new Date(0), new Date(0)],
      },
      openHourTab: {
        checked: true,
      },
      warehouse: {
        code: {
          id: "warehouseCode",
          classes: "!w-[544px]",
          type: "text",
          label: "Code",
          isRequired: 'false',
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
      keyContact: {
        title: {
          id: "keycontactTitle",
          classes: "!w-[540px]",
          type: "text",
          label: "Title",
          isRequired: 'true',
          value: "",
          placeholder: "Enter Keycontact Title",
          maxlength: 0,
          error: "",
        },
        firstName: {
          id: "keycontactFirstName",
          classes: "!w-[540px]",
          type: "text",
          label: "Frist Name",
          isRequired: 'true',
          value: "",
          placeholder: "Enter Keycontact FristName",
          maxlength: 30,
          error: "",
        },
        lastName: {
          id: "keycontactLastName",
          classes: "!w-[540px]",
          type: "text",
          label: "Last Name",
          isRequired: 'true',
          value: "",
          placeholder: "Enter Keycontact LastName",
          maxlength: 30,
          error: "",
        },
        email: {
          id: "keycontactEmail",
          classes: "!w-[540px]",
          type: "text",
          label: "Email",
          isRequired: 'true',
          value: "",
          placeholder: "Enter Keycontact Email",
          maxlength: 150,
          error: "",
        },
        phoneNumber: {
          id: "keycontactPhoneNo",
          classes: "!w-[540px]",
          type: "text",
          label: "Phone Number",
          isRequired: 'true',
          value: "",
          placeholder: "Enter Keycontact Phone Number",
          maxlength: 150,
          error: "",
        }
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
          type: "text",
          label: "Country",
          isRequired: 'true',
          value: "",
          placeholder: "Enter Country",
          maxlength: 0,
          error: "",
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
        subdistrict: {
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
    checkData() {
      Object.keys(this.warehouse).forEach((key) => {
        if (this.warehouse[key].value == "") {
          this.warehouse[key].error = this.warehouse[key].label.concat(" is not empty");
        } else {
          this.warehouse[key].error = "";
        }
      });
      Object.keys(this.keyContact).forEach((key) => {
        if (this.keyContact[key].value == "") {
          this.keyContact[key].error = this.keyContact[key].label.concat(" is not empty");
        } else {
          this.keyContact[key].error = "";
        }
      });
      Object.keys(this.address).forEach((key) => {
        if (this.address[key].value == "") {
          this.address[key].error = this.address[key].label.concat(" is not empty");
        } else {
          this.address[key].error = "";
        }
      });
    },
    handleClick(tab, event) {
    }
  },
};
</script>

<style scoped>
.radius-shadow_add {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}
</style>