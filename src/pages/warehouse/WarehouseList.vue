<template>
  <div class="fix_highted">
    <div class="flex justify-between px-4 py-2">
      <div class="flex">
        <BaseSearch :field="search" />
        <button class="ml-1 !bg-[#f4f3ef] border !border-gray-300 text-black font-medium py-2 px-4 rounded-sm">
          <span class="ti-filter"></span> Filter
        </button>
      </div>
      <div>
        <button class="ml-1 !bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm">
          History
        </button>
        <button class="ml-1 !bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm"
          @click="HandleAddWarehouse">
          Add
        </button>
        <button class="ml-1 !bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm"
          @click="HandleAddWarehouse">
          Import
        </button>
      </div>
    </div>
    <el-table :data="warehouses" style="width: 100%" @row-dblclick="goToDetailWarehouse">
      <el-table-column fixed prop="warehouseId" label="Warehouse ID" width="150">
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
      <el-table-column fixed="right" label="Operations" width="100">
        <template slot-scope="scope" >
          <el-button type="text" size="small"><i class="el-icon-document-copy text-2xl"></i></el-button>
          <el-button type="text" size="small"><i class="el-icon-edit-outline text-2xl"></i></el-button>
        </template>
      </el-table-column>
    </el-table>
    <BasePagination :field="paginationPage" />
  </div>
</template>

<script>
import axios from "axios";
import BaseSearch from "../../components/Inputs/BaseSearch.vue";
import BasePagination from "../../components/Pagination/BasePagination.vue";
export default {
  components: { BaseSearch, BasePagination },
  data() {
    return {
      search: {
        value: '',
        class: 'w-96'
      },
      warehouses: [],
      warehouseDetail: {},
      paginationPage: {
        currentPage: 1,
        pageSizeList: [10, 30, 50, 100],
        pageSizeval: 10,
        total: 100,
      },
    };
  },
  methods: {
    HandleAddWarehouse() {
      this.$router.push({ name: "warehouse-detail" });
    },
    goToDetailWarehouse(row) {
      this.$router.push({ path: `/warehouse-detail/${row.code}` });
    },

  },
  created() {
    var me = this;
    axios
      .get("http://localhost:9090/api/v1/warehouse/list")
      .then(function (response) {
        me.warehouses = response.data.items.list;
        me.total = response.data.items.total;
        me.currentPage = response.data.items.pages;
      });
  },
};
</script>

<style lang="scss" scoped>
.end-right {
  display: flex;
  justify-content: end;
}
</style>
