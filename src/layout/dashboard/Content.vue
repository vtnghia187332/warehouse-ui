<template>
  <div class="content">
    <div class="container-fluid">
      <transition name="fade" mode="out-in">
   
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.el-table__empty-block {
  display: none !important;
}

.el-empty__description {
  display: none !important;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.container-fluid {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.tab-warehouse-chain .el-tabs__nav-wrap {
  padding-left: 15px !important;
}
</style>
