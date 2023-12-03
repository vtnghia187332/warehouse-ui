export default {
  setUserDetail(state, data) {
    state.user.token = data.token;
    state.user.userId = data.userId;
    if (data.roles) {
      state.user.roles = [];
      data.roles.forEach((item) => {
        state.user.roles.push(item.roleName);
      });
    }
    state.user.name = data.firstname + " " + data.lastname;
    if (data?.imageDetailRes) {
      state.user.avatar = data.imageDetailRes[0]?.url;
    }
    state.warehouse.warehouseId = data.warehouseDetailRes?.warehouseId;
    state.warehouse.name = data.warehouseDetailRes?.name;
    state.warehouse.detailAddress = data.warehouseDetailRes?.addressDes;
    state.warehouse.country = data.warehouseDetailRes?.countryName;
    state.warehouse.city = data.warehouseDetailRes?.cityName;
    state.warehouse.district = data.warehouseDetailRes?.districtName;
    state.warehouse.subdistrict = data.warehouseDetailRes?.subdistrictName;
    state.warehouseChain.warehouseChainId =
      data.warehouseChainRes?.warehouseChainId;
    state.warehouseChain.name = data.warehouseChainRes?.name;
    if (data.warehouseChainRes?.imageDetailRes) {
      state.warehouseChain.avatar =
        data.warehouseChainRes.imageDetailRes[0]?.url;
    }
  },
};
