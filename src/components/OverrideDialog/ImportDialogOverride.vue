<template>
    <div class="import-dlg">
        <el-dialog :append-to-body="true" title="Import Warehouse" :before-close="handleCloseDialog"
            :visible="isOpenDialogImport">
            <div class="flex justify-center mt-4 mb-4">
                <div class="text-2xl">Select <span> Warehouse you want to <span class="underline">override</span></span>
                </div>
            </div>
            <div class="flex justify-center mt-4 mb-4">
                <div class="text-center w-[403px]">Found 1 item imported Warehouse with the same Code, Name, and Short Name
                    as the current Warehouse. Select new imported Warehouse you want to override</div>
            </div>
            <div class="mt-4 mb-4">
                <BaseSearch :field="search" @get-value="getBaseSearchVal" />
                <LoadingPage v-show="loadingTable"></LoadingPage>
                <div class="table_style px-2" v-show="!loadingTable">
                    <el-table :data="warehousesOverrided" style="width: 100%" height="400">
                        <div slot="append" v-if="warehousesOverrided.length == '0'"
                            @selection-change="handleSelectionChange">
                            <el-empty :image-size="250"></el-empty>
                        </div>
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column fixed prop="warehouseId" label="Warehouse ID" width="150">
                            <template slot-scope="scope">
                                {{ replaceFromEnd('WH-00000000', scope.row.warehouseId) }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="warehouseChainInfo" label="Warehouse Chain" width="300">
                            <template slot-scope="scope">
                                {{ scope.row.warehouseChainInfo.name }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="code" label="Warehouse Code" width="300">
                        </el-table-column>
                        <el-table-column prop="name" label="Warehouse Name" width="300">
                        </el-table-column>
                        <el-table-column prop="shortName" label="Warehouse Short Name" width="300">
                        </el-table-column>
                        <el-table-column prop="createdAt" label="Create Date" width="250">
                        </el-table-column>
                        <el-table-column prop="editedAt" label="Updated Date" width="250">
                        </el-table-column>
                    </el-table>
                </div>
                <BasePagination v-show="loadingTable" :field="paginationVal" @handleSizeChange="handleSizeChange"
                    @handleCurrentChange="handleCurrentChange" />
            </div>
            <span slot="footer" class="dialog-footer">
                <div class="flex justify-end border-spacing-1">
                    <el-button @click="handleCloseDialog">Cancel</el-button>
                    <el-button @click="handleContinueImport" class="bg-blue-400 text-white">Continue</el-button>
                </div>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import axios from "axios";
import LoadingPage from '@/components/Cards/LoadingPage';
import BasePagination from "../../components/Pagination/BasePagination.vue";
import BaseSearch from "../../components/Inputs/BaseSearch.vue";

export default {
    components: {
        LoadingPage, BasePagination, BaseSearch
    },
    data() {
        return {
            dataImporting: null,
            warehousesOverrided: [],
            loadingTable: false,
            paginationVal: {},
            search: {
                value: '',
                class: 'w-full'
            },
        }
    },
    props: {
        isOpenDialogImport: {
            type: Boolean,
        },
        field: {
            type: Object,
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSizeChange(param) {
            this.paginationPage.pageNo = 1;
            this.paginationPage.pageSize = param;
            this.getWarehouses();
        },
        handleCurrentChange(param) {
            this.paginationPage.pageNo = param;
            this.getWarehouses();
        },
        downloadFileTemplate() {

        },
        handleChange(file) {
            this.dataImporting = file.raw;
        },
        handleCloseDialog() {
            this.$emit('update:isOpenDialogImport', false);
        },
        handleContinueImport() {

        },
        getBaseSearchVal(param) {
            // clears the timer on a call so there is always x seconds in between calls
            clearTimeout(this.timer);
            // if the timer resets before it hits 150ms it will not run 
            this.timer = setTimeout(function () {
                this.search.value = param;
                this.getWarehouses();
            }.bind(this), 300);
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
