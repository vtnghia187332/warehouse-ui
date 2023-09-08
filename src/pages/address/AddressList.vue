<template>
  <div class="p-3 bg-white">
    <el-row :gutter="5">
      <el-col :span="6">
        <div class="address-col grid-content bg-purple h-[896px] shadow-2xl border-2">
          <div class="p-3 item-header border-b-2 flex justify-between items-center">
            <div class="">
              <div class="font-semibold text-lg">Country</div>
            </div>
            <div class="add-header-btn">
              <el-button type="primary" icon="el-icon-plus">Create</el-button>
            </div>
          </div>
          <div class="p-3 hover:bg-slate-100 item h-16 flex justify-between items-center">
            <div> <el-checkbox label="Viet Nam"></el-checkbox></div>
            <div class="el-icon-arrow-right"></div>
          </div>
        </div>
      </el-col>

      <el-col :span="6" class="display-none">
        <div class="address-col grid-content bg-purple h-[896px] shadow-2xl border-2">
          <div class="p-3 item-header border-b-2 flex justify-between items-center">
            <div class="">
              <div class="font-semibold text-lg">City</div>
            </div>
            <div class="add-header-btn">
              <el-button type="primary" icon="el-icon-plus">Create</el-button>
            </div>
          </div>
          <div class="p-3 hover:bg-slate-100 item h-16 flex justify-between items-center">
            <div> <el-checkbox label="Viet Nam"></el-checkbox></div>
            <div class="el-icon-arrow-right"></div>
          </div>
        </div>
      </el-col>

      <el-col :span="6" :class="{ 'display-none': isShowPlace == true }">
        <div class="address-col grid-content bg-purple h-[896px] shadow-2xl border-2">
          <div class="p-3 item-header border-b-2 flex justify-between items-center">
            <div class="">
              <div class="font-semibold text-lg">District</div>
            </div>
            <div class="add-header-btn">
              <el-button type="primary" icon="el-icon-plus">Create</el-button>
            </div>
          </div>
          <div class="p-3 hover:bg-slate-100 item h-16 flex justify-between items-center">
            <div> <el-checkbox label="Viet Nam"></el-checkbox></div>
            <div class="el-icon-arrow-right"></div>
          </div>
        </div>
      </el-col>

      <el-col :span="6" class="display-none">
        <div class="address-col grid-content bg-purple h-[896px] shadow-2xl border-2">
          <div class="p-3 item-header border-b-2 flex justify-between items-center">
            <div class="">
              <div class="font-semibold text-lg">Subdistrict</div>
            </div>
            <div class="add-header-btn">
              <el-button type="primary" icon="el-icon-plus">Create</el-button>
            </div>
          </div>
          <div class="p-3 hover:bg-slate-100 item h-16 flex justify-between items-center">
            <div> <el-checkbox label="Viet Nam"></el-checkbox></div>
            <div class="el-icon-arrow-right"></div>
          </div>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowPlace: false,
    }
  }
};
</script>

<style>
.address-col {
  overflow-y: auto;
}

.add-header-btn .el-button.el-button--primary {
  background-color: blue !important;
  color: white !important;
}

.display-none {
  display: none !important;
}
</style>
