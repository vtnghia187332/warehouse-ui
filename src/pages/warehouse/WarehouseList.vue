<template>
  <div>
    <el-table :data="warehouses" style="width: 100%">
      <el-table-column
        fixed
        prop="warehouseId"
        label="Warehouse ID"
        width="150"
      >
      </el-table-column>
      <el-table-column prop="createdAt" label="Create Date" width="250">
      </el-table-column>
      <el-table-column prop="editedAt" label="Updated Date" width="250">
      </el-table-column>
      <el-table-column prop="code" label="Warehouse Code" width="300">
      </el-table-column>
      <el-table-column prop="name" label="Warehouse Name" width="300">
      </el-table-column>
      <el-table-column
        prop="shortName"
        label="Warehouse Short Name"
        width="300"
      >
      </el-table-column>
      <el-table-column prop="addressDes" label="Warehouse Address" width="300">
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template slot-scope="scope">
          <el-button @click="handleClick" type="text" size="small"
            >Detail</el-button
          >
          <el-button type="text" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="end-right"
      background
      :total="total"
      :current-page="currentPage"
      :page-sizes="[30, 100, 200, 300, 400]"
      layout="prev, pager, next,sizes"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      warehouses: [],
      total: 0,
      currentPage: 0,
    };
  },
  methods: {},
  created() {
    // var me = this;
    // axios
    //   .get("http://localhost:9090/api/v1/warehouse/list")
    //   .then(function (response) {
    //     me.warehouses = response.data.items.list;
    //     me.total = response.data.items.total;
    //     me.currentPage = response.data.items.pages;
    //   });
  },
};
</script>

<style lang="scss" scoped>
.end-right {
  display: flex;
  justify-content: end;
}
</style>
