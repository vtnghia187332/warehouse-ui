<template>
    <el-input placeholder="Please input" v-model="field.input" :class="field.class">
        <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
</template>
<script>
export default {
    props: {
        field: {
            type: Object,
            default: {},
        },
    },
}
</script>
<style>
.el-input-group__append {
    background-color: #60A5FA !important;
}

.el-input-group__append .el-icon-search {
    color: white;
}

.el-input-group__append,
.el-input-group__prepend {
    border: none !important;

}</style>