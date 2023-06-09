<template>
  <div class="bg-page-background overflow-y-auto">
    <div class="p-4 flex gap-x-4">
      <div class="forms grow flex flex-col gap-y-4">
        <FormCard title="Information">
          <template v-slot:content>
            <div class="flex justify-between">
              <div>
                <h4 class="mb-2">Warehouse Code</h4>
                <el-input class="w-[550px]" placeholder="Please input" v-model="input">
                </el-input>
              </div>
              <div>
                <h4 class="mb-2">Warehouse Code</h4>
                <el-input class="w-[550px]" placeholder="Please input" v-model="input">
                </el-input>
              </div>
            </div>
          </template>
        </FormCard>
        <BaseInput :field="warehouse.name" v-model="warehouse.name.value" />
        <BaseInput :field="warehouse.email" v-model="warehouse.email.value" />
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
import FormCard from "./../../components/Cards/FormCard.vue";
import Button from "../../components/Button.vue";
export default {
  components: { FormCard, BaseInput, Button },
  data() {
    return {
      warehouse: {
        name: {
          id: "warehouseName",
          classes: "!w-[100px]",
          type: "text",
          label: "Warehouse Name",
          value: "",
          error: "",
        },
        email: {
          id: "warehouseEmail",
          classes: "!w-[100px]",
          type: "text",
          label: "Warehouse Email",
          value: "",
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