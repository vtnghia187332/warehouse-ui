<template>
    <div class="pt-3 mb-3 bg-white radius-shadow_add">
        <div class="px-3 text-primary-85 font-bold text-base">Key Contact</div>
        <div class="mt-3 px-[15px] border-t border-b border-divider content-rate-card">
            <div class="flex justify-between py-3">
                <span class="text-sm font-bold flex items-center">Key Contact Person
                </span>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    @click="handleAddKeyContact">
                    Add
                </button>
            </div>
            <div class="bg-neutral-2 w-full border border-neutral-5 rounded-sm mb-4" v-for="(item, index) in keyContact"
                :key="index">
                <div class="flex justify-between border-b p-3 bg-gray-100">
                    <span class="text-sm font-bold flex items-center ">Key Contact Person {{ index + 1 }}
                    </span>
                    <div class="cursor-pointer">
                        <button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            @click="handleDeleteKeyContact(index)">
                            Delete
                        </button>
                    </div>
                </div>
                <div class="p-3 bg-gray-100 grid grid-cols-12 gap-x-6">
                    <div class="col-span-6">
                        <BaseInput :field="item.title" v-model="item.title.value" />
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
                        <BaseInput :field="item.mobilePhone" v-model="item.mobilePhone.value" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BaseInput from '../Inputs/BaseInput.vue';
import _ from 'lodash'
export default {
    components: { BaseInput },
    data() {
        return {
            defaultKeyContact: {
                title: {
                    id: "keycontactTitle",
                    classes: "w-full",
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
                    classes: "w-full",
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
                    classes: "w-full",
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
                    classes: "w-full",
                    type: "text",
                    label: "Email",
                    isRequired: 'true',
                    value: "",
                    placeholder: "Enter Keycontact Email",
                    maxlength: 150,
                    error: "",
                },
                mobilePhone: {
                    id: "keycontactPhoneNo",
                    classes: "w-full",
                    type: "text",
                    label: "Phone Number",
                    isRequired: 'true',
                    value: "",
                    placeholder: "Enter Keycontact Phone Number",
                    maxlength: 150,
                    error: "",
                }
            },
            keyContact: [
                {
                    title: {
                        id: "keycontactTitle",
                        classes: "w-full",
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
                        classes: "w-full",
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
                        classes: "w-full",
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
                        classes: "w-full",
                        type: "text",
                        label: "Email",
                        isRequired: 'true',
                        value: "",
                        placeholder: "Enter Keycontact Email",
                        maxlength: 150,
                        error: "",
                    },
                    mobilePhone: {
                        id: "keycontactPhoneNo",
                        classes: "w-full",
                        type: "text",
                        label: "Phone Number",
                        isRequired: 'true',
                        value: "",
                        placeholder: "Enter Keycontact Phone Number",
                        maxlength: 150,
                        error: "",
                    }
                },
            ],
        }
    },
    methods: {
        getDataKeyContacts() {
            return this.keyContact.map((item) => {
                const keyContactItem = {}
                Object.keys(this.defaultKeyContact).map((key) => {
                    keyContactItem[key] = item[key].value
                })
                return keyContactItem
            })
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
                    }
                });

                keyContactAfterBinding.push(keyContactTemp);
            });
            this.keyContact = keyContactAfterBinding.map(x => x);
        },
    },
}
</script>
<style scoped></style>