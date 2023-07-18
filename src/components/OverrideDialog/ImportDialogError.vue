<template>
    <div class="import-dlg">
        <el-dialog :append-to-body="true" title="Import Warehouse" :before-close="handleCloseDialog"
            :visible="isOpenDialogImportErr">
            <div class="flex justify-center">
                <i v-if="this.importError.numberSuccessItem.numItems > 0"
                    class="el-icon-success text-7xl text-green-600"></i>
                <i v-else class="el-icon-error text-7xl text-red-600"></i>
            </div>
            <div class="flex justify-center mt-4 mb-4">
                <h2 v-if="this.importError.numberSuccessItem.numItems > 0" class="text-2xl">Import successfully</h2>
                <h2 v-else class="text-2xl">Import unsuccessfully</h2>
            </div>
            <div class="flex justify-center mb-4">
                <h2><span class="font-bold">{{ importError.fileName.join() }}</span> have been uploaded and information has
                    been update</h2>
            </div>
            <div v-show="this.importError.numberSuccessItem.numItems > 0"
                class="h-16 bg-gray-100 flex flex-col flex-grow place-content-center pl-3 rounded-sm">
                <div class="mx-auto w-full">
                    <div class="flex items-center">
                        <i class="el-icon-edit-outline text-lg "></i>
                        <span class="ml-1 mr-1">{{ this.importError.numberSuccessItem.numItems }}</span>
                        <span>item have been updated</span>
                    </div>
                </div>
            </div>
            <div v-show="this.importError.numberErrItem.numItems > 0"
                class="h-16 bg-gray-100 flex flex-col flex-grow place-content-center pl-3 rounded-sm mt-2">
                <div class="mx-auto w-full">
                    <div class="flex items-center">
                        <i class="el-icon-edit-outline text-lg "></i>
                        <span class="ml-1 mr-1 text-red-400">{{ this.importError.numberErrItem.numItems }}</span>
                        <span>item with an issue</span>
                    </div>
                    <div class="text-red-300 font-medium text-xs">Item with an issue will not be uploaded and save to
                        servier. Please
                        solve these issues, and reupload file</div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <div class="flex justify-end border-spacing-1">
                    <el-button @click="handleCloseDialog">Cancel</el-button>
                    <el-button @click="reUploadFile" class="bg-blue-400 text-white">Reupload File</el-button>
                </div>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            errorImporing: {},
            importError: {
                fileName: [],
                numberErrItem: {
                    numItems: 0,
                    errorId: 0,
                },
                numberSuccessItem: {
                    numItems: 0,
                    errorId: 0,
                },
                numberOverrideItem: {
                    numItems: 0,
                    errorId: 0,
                },
            },
        }
    },
    watch: {

    },
    props: {
        isOpenDialogImportErr: {
            type: Boolean,
        },
        field: {
            type: Object,
        }
    },
    methods: {
        downloadFileTemplate() {

        },
        handleCloseDialog() {
            this.$emit('update:isOpenDialogImportErr', false);
        },
       
        reUploadFile() {
            this.$emit('handleOpenDialog');
        },
        clearState() {
            this.importError.numberSuccessItem.numItems = 0;
            this.importError.numberSuccessItem.errorId = 0;
            this.importError.numberErrItem.numItems = 0;
            this.importError.numberSuccessItem.errorId = 0;
            this.importError.numberOverrideItem.numItems = 0;
            this.importError.numberSuccessItem.errorId = 0;
            this.importError.fileName = [];
        },
        initDataErr(data) {
            this.clearState();
            if (data.data.items.numOfSuccess > 0) {
                this.importError.numberSuccessItem.numItems = data.data.items.numOfSuccess;
                this.importError.numberSuccessItem.errorId = data.data.items.successId;
            }
            if (data.data.items.numOfFailure > 0) {
                this.importError.numberErrItem.numItems = data.data.items.numOfFailure;
                this.importError.numberSuccessItem.errorId = data.data.items.errorId;
            }
            if (data.data.items.numOfConfirms > 0) {
                this.importError.numberOverrideItem.numItems = data.data.items.numOfConfirms;
                this.importError.numberSuccessItem.errorId = data.data.items.confirmId;
            }
            this.importError.fileName = data.data.items.fileNames;
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