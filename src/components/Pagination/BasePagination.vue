<template>
    <div class="m-2">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page.sync="field.currentPage" :page-sizes="field.pageSizeList" :page-size="field.pageSizeval"
            layout="total, prev, pager, next, sizes, jumper" :total="field.total">
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
            this.$emit("handleSizeChange", val);
        },
        handleCurrentChange(val) {
            this.$emit("handleCurrentChange", val);
        }
    },
}
</script>

<style>
.el-pagination__sizes .el-input__inner {
    background-color: #f4f3ef !important;
}

.el-pagination .btn-prev {
    background-color: #f4f3ef !important;
    border: 1px solid #e5e7eb;
    margin-right: 4px !important;
}

.el-pagination .btn-next {
    background-color: #f4f3ef !important;
    border: 1px solid #e5e7eb;
    margin-left: 4px !important;
}

.el-pagination .number {
    background-color: #f4f3ef !important;
    border: 1px solid #e5e7eb;
    margin-left: 2px;
    margin-right: 2px;
}

.el-pagination .el-icon-more {
    background-color: #f4f3ef !important;
    border: 1px solid #e5e7eb;
    margin-left: 2px;
    margin-right: 2px;
}

.el-pagination .el-pager .el-icon.more.btn-quicknext.el-icon-d-arrow-right {
    margin-left: 2px;
    margin-right: 2px;
}

.el-pagination .el-pager .el-icon.more.btn-quickprev.el-icon-d-arrow-left {
    margin-left: 2px;
    margin-right: 2px;
}


.el-pagination .el-input__inner {
    background-color: #f4f3ef !important;
}

.el-pagination .el-pager .number.active {
    border: 1px solid #409EFF !important;
}

.el-pagination {

    padding-left: 24px !important;
    padding-right: 24px !important;
    width: 100%;
}

.el-pagination {
    display: flex;
    justify-content: flex-end;
}

.el-pagination .el-pagination__jump {
    margin-left: -8px;
}

.el-pagination .el-pagination__total {
    margin-right: auto;
}
</style>