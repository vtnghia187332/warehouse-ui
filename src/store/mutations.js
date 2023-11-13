export default {
  setUserDetail(state, data) {
    state.user.token = data.token;
    state.user.userId = data.userId;
    state.user.name = data.firstname + " " + data.lastname;
    if (data.imageDetailRes) {
      state.user.avatar = data.imageDetailRes[0].url;
    } else {
      state.user.avatar = null;
    }
    if (data.warehouseDetailRes) {
      state.warehouse.warehouseId = data.warehouseDetailRes.warehouseId;
      state.warehouse.name = data.warehouseDetailRes.name;
    } else {
      state.warehouse.warehouseId = null;
      state.warehouse.name = null;
    }
    if (data.warehouseChainRes) {
      state.warehouseChain.warehouseChainId =
        data.warehouseChainRes.warehouseChainId;
      state.warehouseChain.name = data.warehouseChainRes.name;
      state.warehouseChain.avatar =
        data.warehouseChainRes.imageDetailRes[0].url;
    } else {
      state.warehouseChain.warehouseChainId = null;
      state.warehouseChain.name = null;
      state.warehouseChain.avatar = null;
    }
  },
};
