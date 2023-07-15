<template>
    <div class="import-dlg">
        <el-dialog :append-to-body="true" title="Import Warehouse" :before-close="handleCloseDialog"
            :visible="isOpenDialogImport">
            <div class="flex">
                <el-button class="mb-2 ml-auto" @click="downloadFileTemplate">Download Template</el-button>
            </div>
            <el-upload :action-upload="false" class="upload-demo" :before-upload="handleUploadBefore" :auto-upload="false"
                :on-change="handleChange" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
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
        async handleUploadBefore() {
            var bodyFormData = new FormData();
            bodyFormData.append('uploadFiles', this.dataImporting);
            await axios({
                method: "post",
                url: "http://localhost:9090/api/v1/warehouse/import",
                data: bodyFormData,
                headers: { 'Content-Type': 'multipart/form-data' },
                headers: { "Access-Control-Allow-Origin": "*" },
            })
                .then(function (response) {
                    //handle success
                    console.log(response);
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
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
