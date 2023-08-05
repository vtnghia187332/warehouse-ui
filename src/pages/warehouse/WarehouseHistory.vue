<template>
    <div class="">
        <div class="flex justify-between px-4 py-2">
            <div class="flex">
                <BaseSearch :field="search" @get-value="getBaseSearchVal" />
                <button class="ml-1 !bg-[#f4f3ef] border !border-gray-300 text-black font-medium py-2 px-4 rounded-sm">
                    <span class="ti-filter"></span> Filter
                </button>
            </div>
        </div>
        <LoadingPage v-show="loadingTable"></LoadingPage>
        <div class="table_style px-2" v-show="!loadingTable">
            <el-table :data="warehouses" style="width: 100%" height="776">
                <div slot="append" v-if="warehouses.length == '0'">
                    <el-empty :image-size="300"></el-empty>
                </div>

                <el-table-column fixed prop="warehouseId" label="Warehouse ID" width="150">
                </el-table-column>
                <el-table-column prop="createdAt" label="Create Date" width="180">
                </el-table-column>
                <el-table-column prop="editedAt" label="Updated Date" width="180">
                </el-table-column>
                <el-table-column prop="actionType" label="Action" width="150">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.actionType == 0 ? 'success' : 'primary'" disable-transitions>{{
                            scope.row.actionType == 0 ? 'INSERTED' : 'UPDATED' }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="code" label="Warehouse Code" width="300">
                </el-table-column>
                <el-table-column prop="name" label="Warehouse Name" width="300">
                </el-table-column>
                <el-table-column prop="shortName" label="Warehouse Short Name" width="300">
                </el-table-column>
                <el-table-column prop="addressDes" label="Warehouse Address" width="300">
                </el-table-column>

                <el-table-column prop="openWorkingHour" label="Monday" width="300">
                    <template slot-scope="scope">
                        {{ scope.row.openWorkingHour ? scope.row.openWorkingHour.mondayStart + " - "
                            + scope.row.openWorkingHour.mondayEnd : "" }}
                    </template>
                </el-table-column>
                <el-table-column prop="openWorkingHour" label="Tuesday" width="300">
                    <template slot-scope="scope">
                    </template>
                </el-table-column>
                <el-table-column prop="openWorkingHour" label="Wednesday" width="300">
                    <template slot-scope="scope">
                    </template>
                </el-table-column>
                <el-table-column prop="openWorkingHour" label="Thursday" width="300">
                    <template slot-scope="scope">
                    </template>
                </el-table-column>
                <el-table-column prop="openWorkingHour" label="Friday" width="300">
                    <template slot-scope="scope">
                    </template>
                </el-table-column>
                <el-table-column prop="openWorkingHour" label="Saturday" width="300">
                    <template slot-scope="scope">
                    </template>
                </el-table-column>
                <el-table-column prop="openWorkingHour" label="Sunday" width="300">
                    <template slot-scope="scope">
                    </template>
                </el-table-column>


                <el-table-column prop="keyContactVos" label="Contact Title" width="300">
                    <template slot-scope="scope">
                        {{ scope.row.keyContactVos[0].title }}
                    </template>
                </el-table-column>
                <el-table-column prop="keyContactVos" label="Contact First Name" width="300">
                    <template slot-scope="scope">
                        {{ scope.row.keyContactVos[0].firstName }}
                    </template>
                </el-table-column>
                <el-table-column prop="keyContactVos" label="Contact Last Name" width="300">
                    <template slot-scope="scope">
                        {{ scope.row.keyContactVos[0].lastName }}
                    </template>
                </el-table-column>
                <el-table-column prop="keyContactVos" label="Contact Email" width="300">
                    <template slot-scope="scope">
                        {{ scope.row.keyContactVos[0].email }}
                    </template>
                </el-table-column>
                <el-table-column prop="keyContactVos" label="Contact Mobile Phone" width="300">
                    <template slot-scope="scope">
                        {{ scope.row.keyContactVos[0].mobilePhone }}
                    </template>
                </el-table-column>

                <el-table-column prop="keyContactVos" label="Contact Title 1" width="300">
                    <template slot-scope="scope">
                        {{ scope.row.keyContactVos[1] ? scope.row.keyContactVos[1].title : "" }}
                    </template>
                </el-table-column>
                <el-table-column prop="keyContactVos" label="Contact First Name 1" width="300">
                    <template slot-scope="scope">
                        {{ scope.row.keyContactVos[1] ? scope.row.keyContactVos[1].firstName : "" }}
                    </template>
                </el-table-column>
                <el-table-column prop="keyContactVos" label="Contact Last Name 1" width="300">
                    <template slot-scope="scope">
                        {{ scope.row.keyContactVos[1] ? scope.row.keyContactVos[1].lastName : "" }}

                    </template>
                </el-table-column>
                <el-table-column prop="keyContactVos" label="Contact Email 1" width="300">
                    <template slot-scope="scope">
                        {{ scope.row.keyContactVos[1] ? scope.row.keyContactVos[1].email : "" }}
                    </template>
                </el-table-column>
                <el-table-column prop="keyContactVos" label="Contact Mobile Phone 1" width="300">
                    <template slot-scope="scope">
                        {{ scope.row.keyContactVos[1] ? scope.row.keyContactVos[1].mobilePhone : "" }}
                    </template>
                </el-table-column>

                <el-table-column prop="keyContactVos" label="Contact Title 2" width="300">
                    <template slot-scope="scope">
                        {{ scope.row.keyContactVos[2] ? scope.row.keyContactVos[2].title : "" }}
                    </template>
                </el-table-column>
                <el-table-column prop="keyContactVos" label="Contact First Name 2" width="300">
                    <template slot-scope="scope">
                        {{ scope.row.keyContactVos[2] ? scope.row.keyContactVos[2].firstName : "" }}
                    </template>
                </el-table-column>
                <el-table-column prop="keyContactVos" label="Contact Last Name 2" width="300">
                    <template slot-scope="scope">
                        {{ scope.row.keyContactVos[2] ? scope.row.keyContactVos[2].lastName : "" }}
                    </template>
                </el-table-column>
                <el-table-column prop="keyContactVos" label="Contact Email 2" width="300">
                    <template slot-scope="scope">
                        {{ scope.row.keyContactVos[2] ? scope.row.keyContactVos[2].email : "" }}
                    </template>
                </el-table-column>
                <el-table-column prop="keyContactVos" label="Contact Mobile Phone 2" width="300">
                    <template slot-scope="scope">
                        {{ scope.row.keyContactVos[2] ? scope.row.keyContactVos[2].mobilePhone : "" }}
                    </template>
                </el-table-column>
                <el-table-column prop="isActive" label="Status" width="100">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.isActive === 1 ? 'success' : 'danger'" disable-transitions>{{
                            scope.row.isActive == 1 ? 'ACTIVE' : 'INACTIVE' }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="Action" width="70">
                    <template slot-scope="scope">
                        <el-button @click="handleRestoreWarehouse(scope.row)" type="text" size="small"><i
                                class="el-icon-document-copy text-2xl"></i></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <BasePagination v-show="!loadingTable" :field="paginationVal" @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange" />
    </div>
</template>
<script>
import axios from 'axios';
import BasePagination from '@/components/Pagination/BasePagination';
import BaseSearch from "../../components/Inputs/BaseSearch.vue";
import LoadingPage from '../../components/Cards/LoadingPage.vue';

export default {
    components: { BaseSearch, BasePagination, LoadingPage },
    data() {
        return {
            loadingTable: false,
            warehouses: [],
            timer: 0,
            paginationPage: {
                pageNo: 1,
                pageSize: 30,
                sorting: 'createdAt',
                orderBy: 'DESC',
            },
            paginationVal: {},
            search: {
                value: '',
                class: 'w-96'
            },
        };
    },
    methods: {
        getBaseSearchVal(param) {
            // clears the timer on a call so there is always x seconds in between calls
            clearTimeout(this.timer);
            // if the timer resets before it hits 150ms it will not run 
            this.timer = setTimeout(function () {
                this.search.value = param;
                this.getHistoryWarehouses();
            }.bind(this), 300);
        },
        handleSizeChange(param) {
            this.paginationPage.pageNo = 1;
            this.paginationPage.pageSize = param;
            this.getHistoryWarehouses();
        },
        handleCurrentChange(param) {
            this.paginationPage.pageNo = param;
            this.getHistoryWarehouses();
        },
        replaceFromEnd(string1, string2) {
            if (string2 !== null) {
                return string1.concat(string2);
            }
        },
        handleRestoreWarehouse(data) {
            axios({
                method: 'post',
                url: 'http://localhost:9090/api/v1/warehouse/restore',
                headers: { "Access-Control-Allow-Origin": "*" },
                params: { warehouseId: data.id },
            });
            this.$message({
                showClose: true,
                message: 'Restored successfully',
                type: 'success'
            });
            this.getHistoryWarehouses();
        },
        getHistoryWarehouses() {
            var me = this;
            me.loadingTable = true;
            axios
                .get("http://localhost:9090/api/v1/warehouse/history", {
                    headers: { "Access-Control-Allow-Origin": "*" }, params: {
                        searchText: me.search.value,
                        pageNo: me.paginationPage.pageNo,
                        pageSize: me.paginationPage.pageSize,
                        sorting: me.paginationPage.sorting,
                        orderBy: me.paginationPage.orderBy,
                    }
                },)
                .then(function (response) {
                    me.warehouses = response.data.items.content;
                    me.paginationVal = {
                        currentPage: response.data.items.pageNum,
                        pageSizeList: [10, 20, 30, 50, 100],
                        currentPage: response.data.items.number + 1,
                        pageSizeval: response.data.items.size,
                        total: response.data.items.totalElements,
                    },
                        me.loadingTable = false;
                });
        }
    },
    mounted() {
        this.paginationPage = {
            pageNo: 1,
            pageSize: 50,
            sorting: 'editedAt',
            orderBy: 'DESC',
        },
            this.search.value = '';
        this.getHistoryWarehouses();
    },
}
</script>
<style lang="scss" scoped>
.el-table__empty-text {
    display: none !important;
}

.end-right {
    display: flex;
    justify-content: end;
}

.table_style {
    height: calc(100vh - 185px);
    overflow: auto;
}
</style>