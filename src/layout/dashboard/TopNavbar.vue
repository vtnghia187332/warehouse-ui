<template>
  <nav class="navbar navbar-expand-lg navbar-light !h-12">
    <div class="container-fluid">
      <a class="navbar-brand">{{ routeName }}</a>
      <div class="flex !space-x-4 mr-4">
        <div class="m-auto">
          <b> {{ warehouseChain.name }} - {{ warehouse.name }}</b>
        </div>
        <div class="m-auto">
          <div class="demo-type">
            <el-avatar :size="30" src="https://empty">
              <img :src="user.avatar" />
            </el-avatar>
          </div>
        </div>
        <div class="m-auto">{{ user.name }}</div>
        <div>
          <el-dropdown>
            <el-button @click="" type="text" size="small"
              ><i class="ti-more !ml-3"></i
            ></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <button @click="handleLogout" class="!bg-[#fdfdfd] text-black">
                  <i class=""></i>Log out
                </button>
              </el-dropdown-item>
              <el-dropdown-item>
                <button @click="changePwd" class="!bg-[#fdfdfd] text-black">
                  <i class=""></i>Change password
                </button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  computed: {
    ...mapGetters(["user", "warehouse", "warehouseChain"]),
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
  },
  data() {
    return {
      defaultUserDetail: {
        token: null,
        userId: null,
        firstname: null,
        imageDetailRes: [
          {
            name: null,
            url: null,
          },
        ],
        lastname: null,
        warehouseDetailRes: {
          warehouseId: null,
          name: null,
        },
        warehouseChainRes: {
          warehouseChainId: null,
          name: null,
          imageDetailRes: [
            {
              name: null,
              url: null,
            },
          ],
        },
      },
      activeNotifications: false,
    };
  },
  methods: {
    ...mapActions(["updateUserDetail"]),
    changePwd() {
      this.$router.push({ path: "/changepwd" });
    },
    async handleLogout() {
      await axios
        .get(`http://localhost:9090/api/v1/auth/logout`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          contentType: "multipart/form-data",
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.removeItem("token");
            this.$message({
              showClose: true,
              message: "You have been successfully log out of the system",
              type: "success",
            });
            this.updateUserDetail(this.defaultUserDetail);
            this.$router.push({ name: "Login" });
          }
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: error.response.data.items,
            type: "error",
          });
        });
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
  },
};
</script>
<style></style>
