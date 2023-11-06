export default {
  setUserDetail(state, data) {
    state.user.token = data.token;
    state.user.userId = data.userId;
    state.user.name = data.firstname + data.lastname;
    state.warehouse.warehouseId = data.warehouseDetailRes.warehouseId;
    state.warehouse.name = data.warehouseDetailRes.name;
    localStorage.setItem("token", data.token);
  },
};
