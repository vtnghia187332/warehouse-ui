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
                    <template slot-scope="scope">
                        {{ replaceFromEnd('WH-00000000', scope.row.warehouseId) }}
                    </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="Create Date" width="250">
                </el-table-column>
                <el-table-column prop="editedAt" label="Updated Date" width="250">
                </el-table-column>
                <el-table-column prop="code" label="Warehouse Code" width="300">
                </el-table-column>
                <el-table-column prop="name" label="Warehouse Name" width="300">
                </el-table-column>
                <el-table-column prop="shortName" label="Warehouse Short Name" width="300">
                </el-table-column>
                <el-table-column prop="addressDes" label="Warehouse Address" width="300">
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
            if (string2 != null) {
                return string1.substr(0, string1.length - string2.toString().length) + string2.toString();
            }
            else {
                return null;
            }
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
                    console.log(response, "response");
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
            sorting: 'createdAt, editedAt',
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