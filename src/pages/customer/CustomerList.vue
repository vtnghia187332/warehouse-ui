<template>
  <div class="fix_highted">
    <div class="flex justify-between px-4 py-2">
      <div class="flex">
        <BaseSearch :field="search" @get-value="getBaseSearchVal" />
        <button
          class="ml-1 !bg-[#f4f3ef] border !border-gray-300 text-black font-medium py-2 px-4 rounded-sm"
        >
          <span class="ti-filter"></span> Tìm kiếm
        </button>
      </div>
      <div>
        <button
          class="ml-1 !bg-blue-400 text-white font-bold py-2 px-4 rounded-sm"
          @click="addCustomer"
        >
          <i class="el-icon-plus ml font-bold"></i>
          Thêm
        </button>
      </div>
    </div>
    <LoadingPage v-show="loadingTable"></LoadingPage>
    <div class="table_style px-2" v-show="!loadingTable">
      <el-table
        :data="customers"
        style="width: 100%"
        @row-dblclick="updateCustomer"
        @sort-change=""
        height="780"
      >
        <div slot="append" v-if="customers.length == '0'">
          <el-empty :image-size="300"></el-empty>
        </div>
        <el-table-column
          fixed
          prop="customerId"
          label="ID Khách hàng"
          width="150"
        >
        </el-table-column>
        <el-table-column sortable prop="createdAt" label="Ngày tạo" width="250">
        </el-table-column>
        <el-table-column sortable prop="editedAt" label="Ngày sửa" width="250">
        </el-table-column>
        <el-table-column sortable prop="fullName" label="Họ & Tên" width="250">
        </el-table-column>
        <el-table-column
          sortable
          prop="companyName"
          label="Doanh nghiệp/Công ty"
          width="250"
        >
        </el-table-column>
        <el-table-column sortable prop="titleTxt" label="Giới tính" width="150">
        </el-table-column>
        <el-table-column sortable prop="birthDay" label="Ngày sinh" width="200">
          <template slot-scope="scope">
            {{ moment(scope.row.birthDay.value).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="mobilePhone"
          label="Số điện thoại"
          width="250"
        >
        </el-table-column>
        <el-table-column sortable prop="email" label="Email" width="250">
        </el-table-column>
        <el-table-column sortable prop="taxNumber" label="Số thuế" width="100">
        </el-table-column>
        <el-table-column
          sortable
          prop="detailAddress"
          label="Địa chỉ"
          width="350"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="type"
          label="Tệp khách hàng"
          width="160"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.type == 0 ? 'success' : 'primary'"
              disable-transitions
              >{{ scope.row.type == 0 ? "Nhập hàng" : "Bán hàng" }}</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <BasePagination
      v-show="!loadingTable"
      :field="paginationVal"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import axios from "axios";
import BaseSearch from "../../components/Inputs/BaseSearch.vue";
import BasePagination from "../../components/Pagination/BasePagination.vue";
import LoadingPage from "@/components/Cards/LoadingPage";
import moment from "moment";
export default {
  components: {
    BaseSearch,
    BasePagination,
    LoadingPage,
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    moment() {
      return moment;
    },
    ...mapGetters(["warehouseChain"]),
  },
  data() {
    return {
      search: {
        value: "",
        class: "w-96",
      },
      loadingTable: false,
      customers: [],
      paginationPage: {
        pageNo: 1,
        pageSize: 30,
        sorting: "createdAt",
        orderBy: "DESC",
      },
      paginationVal: {},
    };
  },
  methods: {
    addCustomer() {
      let data = {
        id: null,
        type: "ADD",
      };
      this.$router.push({
        name: "Chi tiết khách hàng",
        params: { data },
      });
    },
    updateCustomer(row) {
      let data = {
        id: row.customerId,
        type: "EDIT",
      };
      this.$router.push({
        name: "Chi tiết khách hàng", //use name for router push
        params: { data },
      });
    },
    getBaseSearchVal(param) {
      // clears the timer on a call so there is always x seconds in between calls
      clearTimeout(this.timer);
      // if the timer resets before it hits 150ms it will not run
      this.timer = setTimeout(
        function () {
          this.search.value = param;
          this.handleGetCustomers();
        }.bind(this),
        300
      );
    },
    handleSizeChange(param) {
      this.paginationPage.pageNo = 1;
      this.paginationPage.pageSize = param;
      this.handleGetCustomers();
    },
    handleCurrentChange(param) {
      this.paginationPage.pageNo = param;
      this.handleGetCustomers();
    },
    handleGetCustomers() {
      var me = this;
      me.loadingTable = true;
      axios
        .get("http://localhost:9090/api/v1/customer/list", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: {
            searchText: me.search.value,
            pageNo: me.paginationPage.pageNo,
            pageSize: me.paginationPage.pageSize,
            sorting: me.paginationPage.sorting,
            orderBy: me.paginationPage.orderBy,
            warehouseChainId: me.warehouseChain.warehouseChainId,
          },
        })
        .then(function (response) {
          me.customers = response.data.items.content;
          (me.paginationVal = {
            currentPage: response.data.items.pageNum,
            pageSizeList: [10, 20, 30, 50, 100],
            currentPage: response.data.items.number + 1,
            pageSizeval: response.data.items.size,
            total: response.data.items.totalElements,
          }),
            (me.loadingTable = false);
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: error.response.data.items,
            type: "error",
          });
        });
    },
  },
  mounted() {
    this.handleGetCustomers();
  },
};
</script>
<style></style>
