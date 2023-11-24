import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";
import WarehouseList from "@/pages/warehouse/WarehouseList.vue";
import WarehouseDetail from "@/pages/warehouse/WarehouseDetail.vue";
import WarehouseHistory from "@/pages/warehouse/WarehouseHistory";
import AddressList from "@/pages/address/AddressList.vue";
import CategoryList from "@/pages/categoryProduct/CategoryList.vue";
import ProductList from "@/pages/product/ProductList.vue";
import ProductHistory from "@/pages/product/ProductHistory.vue";
import ProductDetail from "@/pages/product/ProductDetail.vue";
import singleUnitList from "@/pages/singleUnit/SingleUnitList.vue";
import ContractList from "@/pages/contract/ContractList.vue";
import CustomerList from "@/pages/customer/CustomerList.vue";
import CustomerDetail from "@/pages/customer/CustomerDetail.vue";
import StaffList from "@/pages/staff/StaffList.vue";
import StaffHistory from "@/pages/staff/StaffHistory.vue";
import StaffDetail from "@/pages/staff/StaffDetail.vue";
import ExportReceiptList from "@/pages/contract/ExportReceiptList.vue";
import ExportReceiptHistory from "@/pages/contract/ExportReceiptHistory.vue";
import ExportReceiptDetail from "@/pages/contract/ExportReceiptDetail.vue";
import Payment from "@/pages/contract/Payment.vue";
import InvoiceHistory from "@/pages/contract/InvoiceHistory.vue";
import Login from "@/pages/authentication/Login.vue";
import Signup from "@/pages/authentication/Signup.vue";
import ChangePwd from "@/pages/authentication/ChangePwd.vue";
import ForgotPassword from "@/pages/authentication/ForgotPassword.vue";

const routes = [
  {
    mode: "history",
    path: "/",
    component: DashboardLayout,
    redirect: "/login",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "stats",
        name: "stats",
        component: UserProfile,
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications,
      },
      {
        path: "icons",
        name: "icons",
        component: Icons,
      },
      {
        path: "maps",
        name: "maps",
        component: Maps,
      },
      {
        path: "typography",
        name: "typography",
        component: Typography,
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList,
      },
      {
        path: "warehouse-list",
        name: "warehouse-list",
        component: WarehouseList,
      },
      {
        path: "/warehouse-detail",
        name: "warehouse-detail",
        component: WarehouseDetail,
      },
      {
        path: "warehouse-history",
        name: "warehouse-history",
        component: WarehouseHistory,
      },
      {
        path: "/address",
        name: "address",
        component: AddressList,
      },
      {
        path: "/category",
        name: "category",
        component: CategoryList,
      },
      {
        path: "/single-unit",
        name: "Single-Unit",
        component: singleUnitList,
      },
      {
        path: "/product",
        name: "product",
        component: ProductList,
      },
      {
        path: "/product-history",
        name: "product history",
        component: ProductHistory,
      },
      {
        path: "/product-detail",
        name: "product-detail",
        component: ProductDetail,
      },
      {
        path: "/contract",
        name: "invoice",
        component: ContractList,
      },
      {
        path: "/export-receipt",
        name: "export-receipt",
        component: ExportReceiptList,
      },
      {
        path: "/export-receipt-detail",
        name: "export-receipt detail",
        component: ExportReceiptDetail,
      },
      {
        path: "/payment",
        name: "payment",
        component: Payment,
      },
      {
        path: "/export-receipt-history",
        name: "export-receipt history",
        component: ExportReceiptHistory,
      },
      {
        path: "/customer",
        name: "customer",
        component: CustomerList,
      },
      {
        path: "/customer-detail",
        name: "customer-detail",
        component: CustomerDetail,
      },
      {
        path: "/invoice-history",
        name: "invoice-history",
        component: InvoiceHistory,
      },
      {
        path: "/staff",
        name: "staff",
        component: StaffList,
      },
      {
        path: "/staff-detail",
        name: "staff-detail",
        component: StaffDetail,
      },
      {
        path: "/staff-history",
        name: "staff history",
        component: StaffHistory,
      },

      {
        path: "/changepwd",
        name: "changePwd",
        component: ChangePwd,
      },
    ],
  },
  { path: "*", component: NotFound },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/forgot-pwd",
    name: "forgot-pwd",
    component: ForgotPassword,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
