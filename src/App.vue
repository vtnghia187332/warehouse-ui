<template>
  <div :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      defaultUserDetail: {
        token: null,
        userId: null,
        firstname: null,
        avatar: [
          {
            name: null,
            url: null,
          },
        ],
        lastname: null,
        warehouseDetailRes: {
          warehouseId: null,
          name: null,
          avatar: [
            {
              name: null,
              url: null,
            },
          ],
        },
      },
    };
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
          if (response.status == 200) {
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

<style lang="scss">
.vue-notifyjs.notifications {
  .alert {
    z-index: 10000;
  }

  .list-move {
    transition: transform 0.3s, opacity 0.4s;
  }

  .list-item {
    display: inline-block;
    margin-right: 10px;
  }

  .list-enter-active {
    transition: transform 0.2s ease-in, opacity 0.4s ease-in;
  }

  .list-leave-active {
    transition: transform 1s ease-out, opacity 0.4s ease-out;
  }

  .list-enter {
    opacity: 0;
    transform: scale(1.1);
  }

  .list-leave-to {
    opacity: 0;
    transform: scale(1.2, 0.7);
  }
}

.el-range-separator {
  width: 100px !important;
}

.el-date-picker__time-header {
  display: none !important;
}
</style>
