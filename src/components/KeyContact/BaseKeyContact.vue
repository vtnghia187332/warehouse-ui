<template>
  <div class="pt-3 mb-3 bg-white radius-shadow_add">
    <div class="px-3 text-primary-85 font-bold text-base">
      Thông tin liên lạc
    </div>
    <div
      class="mt-3 px-[15px] border-t border-b border-divider content-rate-card"
    >
      <div class="flex justify-between py-3">
        <span class="text-sm font-bold flex items-center">Người liên hệ </span>
        <el-button
          class="bg-blue-500 text-white font-bold"
          type="primary"
          @click="handleAddKeyContact"
          :disabled="this.keyContact.length >= 3"
        >
          Thêm
        </el-button>
      </div>
      <div
        class="bg-neutral-2 w-full border border-neutral-5 rounded-sm mb-4"
        v-for="(item, index) in keyContact"
        :key="index"
      >
        <div class="flex justify-between border-b p-3 bg-gray-100">
          <span class="text-sm font-bold flex items-center"
            >Người liên hệ {{ index + 1 }}
          </span>
          <div class="cursor-pointer">
            <button
              class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              @click="handleDeleteKeyContact(index)"
            >
              Xóa
            </button>
          </div>
        </div>
        <div class="p-3 bg-gray-100 grid grid-cols-12 gap-x-6">
          <div class="col-span-6">
            <BaseSelection :field="item.title" v-model="item.title.value" />
          </div>
          <div class="col-span-6"></div>
          <div class="col-span-6">
            <BaseInput :field="item.firstName" v-model="item.firstName.value" />
          </div>
          <div class="col-span-6">
            <BaseInput :field="item.lastName" v-model="item.lastName.value" />
          </div>
          <div class="col-span-6">
            <BaseInput :field="item.email" v-model="item.email.value" />
          </div>
          <div class="col-span-6">
            <BaseInput
              :field="item.mobilePhone"
              v-model="item.mobilePhone.value"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseInput from "../Inputs/BaseInput.vue";
import BaseSelection from "../../components/Inputs/BaseSelection.vue";

import _ from "lodash";
export default {
  components: { BaseInput, BaseSelection },
  data() {
    return {
      defaultKeyContact: {
        title: {
          id: "title",
          name: "title",
          rules: "",
          classes: "w-full",
          type: "text",
          label: "Giới tính",
          isRequired: "",
          value: "",
          placeholder: "Chọn giới tính...",
          maxlength: 50,
          error: "",
          options: [
            {
              value: 1,
              label: "Nam",
            },
            {
              value: 2,
              label: "Nữ",
            },
            {
              value: 3,
              label: "Khác",
            },
          ],
        },
        firstName: {
          id: "keycontactFirstName",
          classes: "w-full",
          type: "text",
          label: "Tên",
          isRequired: "",
          value: "",
          placeholder: "Nhập tên ",
          maxlength: 30,
          error: "",
        },
        lastName: {
          id: "keycontactLastName",
          classes: "w-full",
          type: "text",
          label: "Họ",
          isRequired: "",
          value: "",
          placeholder: "Enter họ ",
          maxlength: 30,
          error: "",
        },
        email: {
          id: "keycontactEmail",
          classes: "w-full",
          type: "text",
          label: "Email",
          isRequired: "",
          value: "",
          placeholder: "Nhập email ",
          maxlength: 150,
          error: "",
        },
        mobilePhone: {
          id: "keycontactPhoneNo",
          classes: "w-full",
          type: "text",
          label: "Số điện thoại",
          isRequired: "",
          value: "",
          placeholder: "Nhập số điện thoại",
          maxlength: 150,
          error: "",
        },
      },
      keyContact: [
        {
          title: {
            id: "title",
            name: "title",
            rules: "",
            classes: "w-full",
            type: "text",
            label: "Giới tính",
            isRequired: "",
            value: "",
            placeholder: "Chọn giới tính...",
            maxlength: 50,
            error: "",
            options: [
              {
                value: 1,
                label: "Nam",
              },
              {
                value: 2,
                label: "Nữ",
              },
              {
                value: 3,
                label: "Khác",
              },
            ],
          },
          firstName: {
            id: "keycontactFirstName",
            name: "keycontactFirstName",
            rules: "",
            classes: "w-full",
            type: "text",
            label: "Tên",
            isRequired: "",
            value: "",
            placeholder: "Nhập tên...",
            maxlength: 30,
            error: "",
          },
          lastName: {
            id: "keycontactLastName",
            name: "keycontactLastName",
            rules: "",
            classes: "w-full",
            type: "text",
            label: "Họ",
            isRequired: "",
            value: "",
            placeholder: "Nhập họ...",
            maxlength: 30,
            error: "",
          },
          email: {
            id: "keycontactEmail",
            name: "keycontactEmail",
            rules: "",
            classes: "w-full",
            type: "text",
            label: "Email",
            isRequired: "",
            value: "",
            placeholder: "Nhập email...",
            maxlength: 150,
            error: "",
          },
          mobilePhone: {
            id: "keycontactPhoneNo",
            name: "keycontactPhoneNo",
            rules: "",
            classes: "w-full",
            type: "text",
            label: "Số điện thoại",
            isRequired: "",
            value: "",
            placeholder: "Nhập số điện thoại...",
            maxlength: 150,
            error: "",
          },
        },
      ],
    };
  },
  methods: {
    getDataKeyContacts() {
      return this.keyContact.map((item) => {
        const keyContactItem = {};
        Object.keys(this.defaultKeyContact).map((key) => {
          keyContactItem[key] = item[key].value;
        });
        return keyContactItem;
      });
    },
    handleAddKeyContact() {
      if (this.keyContact.length < 3) {
        this.keyContact.push(_.cloneDeep(this.defaultKeyContact));
      }
    },
    handleDeleteKeyContact(index) {
      if (this.keyContact.length > 1) {
        this.keyContact.splice(index, 1);
      }
    },
    initKeyContact(data) {
      const keyContactAfterBinding = [];
      data.forEach((x, index) => {
        let keyContactTemp = _.cloneDeep(this.defaultKeyContact);
        Object.keys(keyContactTemp).forEach((key) => {
          if (keyContactTemp[key]) {
            keyContactTemp[key].value = x[key];
            if (key == "title") {
              keyContactTemp[key].value =
                this.defaultKeyContact.title.options.find(
                  (opt) => opt.label == x[key] || opt.value == x[key]
                ).label || "";
            }
          }
        });

        keyContactAfterBinding.push(keyContactTemp);
      });
      this.keyContact = keyContactAfterBinding.map((x) => x);
    },
  },
};
</script>
<style scoped></style>
