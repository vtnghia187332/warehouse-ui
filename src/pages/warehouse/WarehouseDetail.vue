<template>
  <div class="bg-page-background overflow-y-auto">
    <div class="p-4 flex gap-x-4">
      <div class="forms grow flex flex-col gap-y-4">
        <FormCard title="Information">
          <template v-slot:content>
            <BaseForm class="gap-y-2" :formFields="formFieldsInformation" />
          </template>
        </FormCard>
      </div>
      <div class="flex flex-col gap-y-4 min-w-[380px] w-[380px] h-full">
        <div class="p-4 border border-divider bg-white radius-shadow_add">
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
