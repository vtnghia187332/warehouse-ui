<template>
    <div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page.sync="field.currentPage" :page-sizes="field.pageSizeList" :page-size="field.pageSizeval"
            layout="total, sizes, prev, pager, next, jumper" :total="field.total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: "BasePagination",
    data() {
        return {
        }
    },
    props: {
        field: {
            type: Object,
            default: {},
        },
    },
    methods: {
        handleSizeChange(val) {
            console.log(`${val} items per page`);
        },
        handleCurrentChange(val) {
            console.log(`current page: ${val}`);
        }
    },
}
</script>

<style>
.el-pagination__sizes .el-input__inner {
    background-color: red !important;
}

.el-pagination .btn-prev {
    background-color: red !important;
}

.el-pagination .btn-next {
    background-color: red !important;
}

.el-pagination .number {
    background-color: red !important;
}

.el-pagination .el-icon-more {
    background-color: red !important;
}

.el-pagination .el-icon-more:after {
    background-color: blue;
}

.el-pagination .el-input__inner {
    background-color: red !important;
}
</style>