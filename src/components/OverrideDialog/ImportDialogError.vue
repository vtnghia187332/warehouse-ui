<template>
    <div class="import-dlg">
        <el-dialog :append-to-body="true" title="Import Warehouse" :before-close="handleCloseDialog"
            :visible="isOpenDialogImport">
            <div class="flex justify-center">
                <i class="el-icon-success text-7xl text-green-600"></i>
            </div>
            <div class="flex justify-center mt-4 mb-4">
                <h2 class="text-2xl">Import successfully</h2>
            </div>
            <div class="flex justify-center mb-4">
                <h2>file have been uploaded and information has been update</h2>
            </div>
            <div class="h-16 bg-gray-100 flex flex-col flex-grow place-content-center pl-3 rounded-sm">
                <div class="mx-auto w-full">
                    <div class="flex items-center">
                        <i class="el-icon-edit-outline text-lg "></i>
                        <span class="ml-1 mr-1">1</span>
                        <span>item have been updated</span>
                    </div>
                </div>
            </div>
            <div class="h-16 bg-gray-100 flex flex-col flex-grow place-content-center pl-3 rounded-sm mt-2">
                <div class="mx-auto w-full">
                    <div class="flex items-center">
                        <i class="el-icon-edit-outline text-lg "></i>
                        <span class="ml-1 mr-1 text-red-400">1</span>
                        <span>item with an issue</span>
                    </div>
                    <div class="text-red-300 text-xs">Item with an issue will not be uploaded and save to servier. Please solve these issues, and reupload file</div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <div class="flex justify-end border-spacing-1">
                    <el-button @click="handleCloseDialog">Cancel</el-button>
                    <el-button @click="reUploadFile" class="bg-blue-400 text-white">Reupload File</el-button>
                </div>
            </span>
        </el-dialog>
        <div>hello</div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            dataImporting: null,
        }
    },
    props: {
        isOpenDialogImport: {
            type: Boolean,
        }
    },
    methods: {
        downloadFileTemplate() {

        },
        handleChange(file) {
            this.dataImporting = file.raw;
        },
        handleCloseDialog() {
            this.$emit('update:isOpenDialogImport', false);
        },
        reUploadFile() {

        },
    },
    beforeCreate() {
        this.$nextTick().then(() => document.body.classList.add('import-dlg'))
    },
}
</script>
<style>
.el-dialog .el-dialog__header {
    border-bottom: 1px solid rgba(128, 128, 128, 0.322) !important;
}

.el-dialog .el-dialog__footer {
    border-top: 1px solid rgba(128, 128, 128, 0.322) !important;
}

.upload-demo .el-upload.el-upload--text {
    margin: auto !important;
}

.import-dlg .el-dialog {
    width: 934px !important;
    margin-top: 15vh !important;
}

.import-dlg .el-dialog__body {
    margin-top: -20px;
}

.el-upload-dragger {
    width: 895px !important;
    height: 220px !important;
    background: rgba(128, 128, 128, 0.089) !important;
}
</style>