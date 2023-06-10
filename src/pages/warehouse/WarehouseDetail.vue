<template>
  <div class="bg-page-background overflow-y-auto">
    <div class="p-4 flex gap-x-4">
      <div class="w-[1130px] forms grow flex flex-col gap-y-4">
        <FormCard title="Information">
          <template v-slot:content>
            <div class="!w-[1168px]">
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
      warehouse: {
        code: {
          id: "warehouseCode",
          classes: "!w-[544px]",
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
      keyContact: {
        title: {
          id: "keycontactTitle",
          classes: "!w-[540px]",
          type: "text",
          label: "Title",
          isRequired: 'true',
          value: "",
          placeholder: "Enter Keycontact Title",
          maxlength: '',
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
          maxlength: 150,
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
          maxlength: 150,
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
          maxlength: 150,
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
          maxlength: 150,
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
  },
};
</script>

<style scoped>
.radius-shadow_add {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}
</style>