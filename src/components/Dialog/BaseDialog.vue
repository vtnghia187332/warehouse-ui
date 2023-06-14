<template>
    <el-dialog title="Tips" :visible="dialogVisible" :before-close="() => $emit('update:dialogVisible', false)" width="30%"
        :append-to-body="true">
        <el-input placeholder="Please input text" v-model="input.text"></el-input>
        <el-input placeholder="Please input number" v-model="input.number"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:dialogVisible', false)">Cancel</el-button>
            <el-button type="primary" @click="handleData">Confirm</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: {
        dialogVisible: {
            type: Boolean,
        },
    },
    data() {
        return {
            input: {
                text: '',
                number: '',
            }
        }
    },

    methods: {
        closeForm() {
            this.$emit("handleAddSpecialDay", false);
        },
        handleData() {
            this.$emit("handle-data", input);
        }
    },
};
</script>