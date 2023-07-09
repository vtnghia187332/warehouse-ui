<template>
    <el-dialog :append-to-body="true" title="Import Warehouse" :before-close="handleCloseDialog"
        :visible="isOpenDialogImport" width="30%">
        <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
            <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
        </el-upload>
        <el-button @click="handleCloseDialog">Cancel</el-button>
    </el-dialog>
</template>
<script>
export default {
    props: {
        isOpenDialogImport: {
            type: Boolean,
        }
    },
    methods: {
        handleCloseDialog() {
            this.$emit('update:isOpenDialogImport', false);
            console.log(this.isOpenDialogImport, "b");
        }
    },
}
</script>
<style scoped></style>
