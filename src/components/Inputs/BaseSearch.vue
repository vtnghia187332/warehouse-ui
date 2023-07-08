<template>
    <el-input placeholder="Please input" v-model="value" :class="field.class" @input.native="change">
        <el-button slot="append" icon="el-icon-search" @click="change"></el-button>
    </el-input>
</template>
<script>
export default {
    data() {
        return {
            value: '',
        }
    },
    watch: {
    },
    props: {
        field: {
            type: Object,
            default: {},
        },
    },
    methods: {
        change(event) {
            this.$emit("get-value", event.target.value);
        }
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

}
</style>