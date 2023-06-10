<template>
  <div class="bg-page-background overflow-y-auto">
    <div class="p-4 flex gap-x-4">
      <div class="forms grow flex flex-col gap-y-4">
        <FormCard title="Information">
          <template v-slot:content>
            <div>
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
          classes: "!w-[560px]",
          type: "text",
          label: "Warehouse Code",
          value: "",
          placeholder: "Enter Warehouse Code",
          maxlength: 20,
          error: "",
        },
        name: {
          id: "warehouseName",
          classes: "!w-[1200px] !h-[64px]",
          type: "text",
          label: "Warehouse Name",
          value: "",
          placeholder: "Enter Warehouse Name",
          maxlength: 150,
          error: "",
        },
        shortName: {
          id: "warehouseShortName",
          classes: "!w-[1200px]",
          type: "text",
          label: "Warehouse Short Name",
          value: "",
          placeholder: "Enter Warehouse Short Name",
          maxlength: 100,
          error: "",
        },
        description: {
          id: "warehouseDescription",
          classes: "!w-[1200px] !h-[64px]",
          type: "text",
          label: "Warehouse Description",
          value: "",
          placeholder: "Enter Warehouse Description",
          maxlength: 150,
          error: "",
        },

      },
    };
  },
  methods: {
    checkData() {
      Object.keys(this.warehouse).forEach((key) => {
        console.log(key);
        if (this.warehouse[key].value == "") {
          this.warehouse[key].error = this.warehouse[key].label.concat(" is not empty");
        } else {
          this.warehouse[key].error = "";
        }
      });
    },
  },
};
</script>

<style></style>