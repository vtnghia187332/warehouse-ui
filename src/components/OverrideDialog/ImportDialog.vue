<template>
    <div class="import-dlg">
        <el-dialog :append-to-body="true" title="Import Warehouse" :before-close="handleCloseDialog"
            :visible="isOpenDialogImport" width="30%" max-width="30%" min-width="30%">
            <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text"><b>Click or drag file to this area</b></div>
                <div class="el-upload__text">Only .xls or .xlsx file format is supported.</div>
                <div class="el-upload__text">The maximum allow file size is 5MB</div>
            </el-upload>
            <div class="flex justify-end">
                <el-button @click="handleCloseDialog">Cancel</el-button>
                <el-button class="bg-blue-400 text-white">Import</el-button>
            </div>
        </el-dialog>
    </div>
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
<style>
.el-dialog .el-dialog__header {
    border-bottom: 1px solid rgba(128, 128, 128, 0.322) !important;
}

.upload-demo .el-upload.el-upload--text {
    margin: auto !important;
}

.import-dlg .el-dialog {
    max-width: 576px !important;
    min-width: 576px !important;
}
</style>
