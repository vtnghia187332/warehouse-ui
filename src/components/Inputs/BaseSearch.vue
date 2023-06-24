<template>
    <el-input placeholder="Please input" v-model="field.input"></el-input>
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
<style></style>