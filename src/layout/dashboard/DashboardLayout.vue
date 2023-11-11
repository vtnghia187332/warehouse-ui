<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" name="Dashboard" icon="ti-panel" />
        <sidebar-link to="/warehouse-list" name="Warehouse" icon="ti-home" />
        <sidebar-link to="/customer" name="Customer" icon="ti-user" />
        <sidebar-link to="/contract" name="Invoice" icon="ti-pencil-alt" />
        <sidebar-link
          to="/export-receipt"
          name="Export-Receipt"
          icon="ti-bookmark-alt"
        />
        <sidebar-link to="/product" name="Product" icon="ti-package" />
        <sidebar-link to="/category" name="Category" icon="ti-list-ol" />
        <sidebar-link to="/single-unit" name="Single-Unit" icon="ti-slice" />
        <sidebar-link to="/staff" name="Staff" icon="ti-headphone-alt" />
        <sidebar-link to="/address" name="Address" icon="ti-map" />
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-panel"></i>
            <p>Stats</p>
          </a>
        </li>
        <drop-down
          class="nav-item"
          title="5 Notifications"
          title-classes="nav-link"
          icon="ti-bell"
        >
          <a class="dropdown-item">Notification 1</a>
          <a class="dropdown-item">Notification 2</a>
          <a class="dropdown-item">Notification 3</a>
          <a class="dropdown-item">Notification 4</a>
          <a class="dropdown-item">Another notification</a>
        </drop-down>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"></i>
            <p>Settings</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar> </top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";
export default {
  components: {
    TopNavbar,
    // ContentFooter,
    DashboardContent,
    MobileMenu,
  },
  computed: {
    ...mapGetters(["user", "warehouse"]),
  },
  methods: {
    ...mapMutations(["setUserDetail"]),
    ...mapActions(["updateUserDetail"]),
    async handleAuthenUser() {
      await axios
        .get(`http://localhost:9090/api/v1/validating-token`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((response) => {
          if (response.status === 200) {
            this.updateUserDetail(response.data.userRes);
            localStorage.setItem("token", response.data.token);
            this.$router.push({ path: "/dashboard" });
          }
        })
        .catch((error) => {
          localStorage.removeItem("token");
          this.$message({
            showClose: true,
            message: "Your session has expired. Please login again!",
            type: "warning",
          });
          this.updateUserDetail(this.defaultUserDetail);
          this.$router.push({ path: "/login" });
        });
    },
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
  async created() {
    if (localStorage.getItem("token") != null) {
      await this.handleAuthenUser();
    } else {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>
