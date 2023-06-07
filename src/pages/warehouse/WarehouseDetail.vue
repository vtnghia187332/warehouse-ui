<template>
  <div class="bg-page-background overflow-y-auto">
    <div class="p-4 flex gap-x-4">
      <div class="forms grow flex flex-col gap-y-4">
        <FormCard title="Information">
          <template v-slot:content>
            <div class="flex justify-between">
              <div>
                <h4 class="mb-2">Warehouse Code</h4>
                <el-input
                  class="w-[550px]"
                  placeholder="Please input"
                  v-model="input"
                >
                </el-input>
              </div>
              <div>
                <h4 class="mb-2">Warehouse Code</h4>
                <el-input
                  class="w-[550px]"
                  placeholder="Please input"
                  v-model="input"
                >
                </el-input>
              </div>
            </div>
          </template>
        </FormCard>
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
import FormCard from "./../../components/Cards/FormCard.vue";
export default {
  components: { FormCard },
};
</script>

<style></style>
