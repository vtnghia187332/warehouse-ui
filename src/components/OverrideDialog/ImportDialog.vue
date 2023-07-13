<template>
    <div class="import-dlg">
        <el-dialog :append-to-body="true" title="Import Warehouse" :before-close="handleCloseDialog"
            :visible="isOpenDialogImport" width="30%" max-width="30%" min-width="30%">
            <el-upload :action-upload="false" class="upload-demo" :before-upload="handleUploadBefore" :auto-upload="false"
                :on-change="handleChange" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text"><b>Click or drag file to this area</b></div>
                <div class="el-upload__text">Only .xls or .xlsx file format is supported.</div>
                <div class="el-upload__text">The maximum allow file size is 5MB</div>
            </el-upload>
            <div class="flex justify-end border-spacing-1">
                <el-button @click="handleCloseDialog">Cancel</el-button>
                <el-button @click="handleUploadBefore" class="bg-blue-400 text-white">Import</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            url_link: null,
        }
    },
    props: {
        isOpenDialogImport: {
            type: Boolean,
        }
    },
    methods: {
        handleChange(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file.raw);
            reader.onload = (e) => {
                this.url_link = e.target.result
            }
        },
        handleCloseDialog() {
            this.$emit('update:isOpenDialogImport', false);
        },
        async handleUploadBefore() {
            var bodyFormData = new FormData();
            bodyFormData.append('uploadFiles', this.url_link);
            console.log(this.url_link);
            await axios({
                method: "post",
                url: "http://localhost:9090/api/v1/warehouse/import",
                data: bodyFormData,
                headers: { "Access-Control-Allow-Origin": "*", 'Content-Type': 'multipart/form-data' },
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
