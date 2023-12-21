<template>
  <el-input
    :placeholder="field.placeholder ? field.placeholder : 'Nhập vào...'"
    v-model="value"
    :class="field.class"
    clearable
    @input.native="change"
  >
    <el-button slot="append" icon="el-icon-search" @click="change"></el-button>
  </el-input>
</template>
<script>
export default {
  data() {
    return {
      value: "",
    };
  },

  props: {
    field: {
      type: Object,
      default: {},
    },
  },
  methods: {
    change(event) {
      this.value = event.target.value;
      if (!event.target.value) {
        this.$emit("get-value", "");
      } else {
        this.$emit("get-value", this.value.trim());
      }
    },
  },
};
</script>
<style>
.el-input-group__append {
  background-color: #60a5fa !important;
}

.el-input-group__append .el-icon-search {
  color: white;
}

.el-input-group__append,
.el-input-group__prepend {
  border: none !important;
}
</style>
