<template>
    <div class="import-dlg">
        <el-dialog :append-to-body="true" title="Import Warehouse" :before-close="handleCloseDialog"
            :visible="isOpenDialogImport">
            <div class="flex">
                <el-button class="mb-2 ml-auto" @click="downloadFileTemplate">Download Template</el-button>
            </div>
            <el-upload ref="upload" :action-upload="false" class="upload-demo" :before-upload="handleUploadBefore"
                :auto-upload="false" :on-change="handleChange" drag action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text"><b>Click or drag file to this area</b></div>
                <div class="el-upload__text">Only .xls or .xlsx file format is supported.</div>
                <div class="el-upload__text">The maximum allow file size is 5MB</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <div class="flex justify-end border-spacing-1">
                    <el-button @click="handleCloseDialog">Cancel</el-button>
                    <el-button @click="handleUploadBefore" class="bg-blue-400 text-white">Import</el-button>
                </div>
            </span>
        </el-dialog>

        <ImportDialogError ref="import-dialog-data" v-show="isOpenDialogErr" :isOpenDialogImportErr.sync="isOpenDialogErr"
            @handleOpenDialog="handleOpenDialog" />
        <ImportDialogOverride ref="import-confirmed-dialog" v-show="isOpenDialogConfirmed"
            :isOpenDialogConfirmed.sync="isOpenDialogConfirmed" @handleOpenDialog="handleOpenDialog" />
    </div>
</template>
<script>
import axios from "axios";
import ImportDialogError from "./ImportDialogError.vue";
import ImportDialogOverride from "./ImportDialogOverride.vue";

export default {
    components: {
        ImportDialogError, ImportDialogOverride
    },
    data() {
        return {
            isOpenDialogErr: false,
            importOverride: {},
            isOpenDialogConfirmed: false,
            dataImporting: null,
            continuedImportItems: {
                "successId": null,
                "errorId": null,
                "confirmId": null,
                "ids": [],
                "fileNames": [],
            },
            confirmedImporedFile: {},
        }
    },
    props: {
        isOpenDialogImport: {
            type: Boolean,
        }
    },
    methods: {
        handleErrorFile(data) {
            this.$emit('update:isOpenDialogImport', false);
            this.isOpenDialogErr = true;
            this.$refs["import-dialog-data"].initDataErr(data);
        },
        handleConfirmedData(data) {
            this.$emit('update:isOpenDialogImport', false);
            this.isOpenDialogConfirmed = true;
            this.$refs["import-confirmed-dialog"].initData(data);
        },
        downloadFileTemplate() {
        },
        handleChange(file) {
            this.dataImporting = file.raw;
        },
        handleCloseDialog() {
            this.$emit('update:isOpenDialogImport', false);
        },
        clearStateFile() {
            this.$refs["upload"].clearFiles();
            this.dataImporting = null;
        },
        handleOpenDialog() {
            this.isOpenDialogConfirmed = false;
            this.$emit('update:isOpenDialogImport', true);
        },
        async handleUploadBefore() {
            var me = this;
            var bodyFormData = new FormData();
            bodyFormData.append('uploadFiles', me.dataImporting);
            await axios({
                method: "post",
                url: "http://localhost:9090/api/v1/warehouse/import",
                data: bodyFormData,
                headers: { 'Content-Type': 'multipart/form-data' },
                headers: { "Access-Control-Allow-Origin": "*" },
            })
                .then(function (response) {
                    me.clearStateFile();
                    me.handleContinueImport(response);
                })
                .catch(function (response) {
                    me.$message({
                        showClose: true,
                        message: response.response.data.message,
                        type: 'error'
                    });
                });
        },
        async handleContinueImport(data) {
            this.continuedImportItems = {
                successId: null,
                errorId: null,
                confirmId: null,
                ids: [],
                fileNames: [],
            };
            if (data.data.items.errorId) {
                this.continuedImportItems.errorId = data.data.items.errorId;
            };
            if (data.data.items.successId) {
                this.continuedImportItems.successId = data.data.items.successId;
            };
            if (data.data.items.confirmId) {
                this.continuedImportItems.confirmId = data.data.items.confirmId;
            };
            if (this.continuedImportItems.confirmId) {
                this.handleConfirmedData(this.continuedImportItems.confirmId);
            } else {
                await axios({
                    method: 'post',
                    url: 'http://localhost:9090/api/v1/warehouse/continue',
                    headers: { "Access-Control-Allow-Origin": "*" },
                    data: this.continuedImportItems,
                })
                    .then(function (response) {
                        this.handleErrorFile(data);
                    })
                    .catch(function (response) {

                    });
            }

        }
    },
    beforeCreate() {
        this.$nextTick().then(() => document.body.classList.add('import-dlg'))
    },
    mounted() {
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
