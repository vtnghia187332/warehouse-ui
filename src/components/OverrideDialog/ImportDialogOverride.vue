<template>
    <div class="import-dlg">
        <el-dialog :append-to-body="true" title="Import Warehouse" :before-close="handleCloseDialog"
            :visible="isOpenDialogConfirmed">
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
                    <el-table :data="warehousesOverrided" style="width: 100%" @selection-change="handleSelectionChange"
                        height="400">
                        <div slot="append" v-if="warehousesOverrided.length == '0'">
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
            multipleSelection: [],
            paginationPage: {
                pageNo: 1,
                pageSize: 30,
                sorting: 'createdAt',
                orderBy: 'DESC',
            },
            search: {
                value: '',
                class: 'w-full'
            },
        }
    },
    props: {
        isOpenDialogConfirmed: {
            type: Boolean,
        },
        field: {
            type: Object,
        }
    },
    methods: {
        replaceFromEnd(string1, string2) {
            if (string2 != null) {
                return string1.substr(0, string1.length - string2.toString().length) + string2.toString();
            }
            else {
                return null;
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = [];
            val.map(item => {
                this.multipleSelection.push(item.id);
            })
            console.log();
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
            this.$emit('update:isOpenDialogConfirmed', false);
        },
        handleContinueImport() {
            this.$emit('handleContinueImport', this.multipleSelection);
        },
        initData(data) {
            this.getWarehouseConfirm(data);
        },
        handleErrorFile(data) {
            this.$emit('handleOpenDialog');
            this.isOpenDialogErr = true;
            this.$refs["import-dialog-data"].initDataErr(data);
        },
        async getWarehouseConfirm(data) {
            var me = this;
            me.loadingTable = true;
            const confirmedId = data;
            await axios
                .get("http://localhost:9090/api/v1/warehouse/confirm", {
                    headers: { "Access-Control-Allow-Origin": "*" }, params: {
                        searchText: me.search.value,
                        pageNo: me.paginationPage.pageNo,
                        pageSize: me.paginationPage.pageSize,
                        sorting: me.paginationPage.sorting,
                        orderBy: me.paginationPage.orderBy,
                        errorId: confirmedId,
                    }
                })
                .then(function (response) {
                    me.warehousesOverrided = response.data.items.content;
                    me.paginationVal = {
                        currentPage: response.data.items.pageNum,
                        pageSizeList: [10, 20, 30, 50, 100],
                        currentPage: response.data.items.number + 1,
                        pageSizeval: response.data.items.size,
                        total: response.data.items.totalElements,
                    },
                        me.loadingTable = false;
                });
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
