import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Register from "./views/Register.vue";
import EntireProduct from "@/views/EntireProduct.vue";
import DetailedPage from "@/views/DetailedPage.vue";
import DummyPayment from "@/components/DummyPayment.vue";
import OauthPage from "@/views/OauthPage.vue";
import OAuthRegister from "@/views/OAuthRegister.vue";
import MakeProductPage from "@/views/MakeProductPage.vue";
import MyProduct from "@/components/Product/MyProduct.vue";
import SellableProduct from "@/components/Product/SellableProduct.vue";
import CompanyListPage from "@/views/CompanyListPage.vue";
import CompanyDetail from "@/components/Company/CompanyDetail.vue";
import UserInfoPage from "@/views/UserInfoPage.vue";
import ProductPatchPage from "@/views/ProductPatchPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/products",
    name: "Products",
    component: EntireProduct,
  },
  {
    path: "/products/register",
    name: "RegisterProduct",
    component: MakeProductPage,
  },
  {
    path: "/demo/:productId", // 동적 경로 설정
    name: "DummyProduct",
    component: DetailedPage,
    props: true, // 컴포넌트에서 `id`를 prop으로 받을 수 있도록 설정
  },
  {
    path: "/demo/:productId/patch", // 동적 경로 설정
    name: "PatchProduct",
    component: ProductPatchPage,
    props: true, // 컴포넌트에서 `id`를 prop으로 받을 수 있도록 설정
  },
  {
    path: "/product/:productId", // 동적 경로 설정
    name: "Product",
    component: SellableProduct,
    props: true, // 컴포넌트에서 `id`를 prop으로 받을 수 있도록 설정
  },
  {
    path: "/dp",
    component: DummyPayment,
  },
  {
    path: "/oauth",
    component: OauthPage,
  },
  {
    path: "/register-oauth",
    component: OAuthRegister,
  },
  {
    path: "/products/manage",
    component: MyProduct,
  },
  {
    path: "/company", // 업체 목록 페이지
    name: "CompanyListPage",
    component: CompanyListPage,
  },
  {
    path: "/company/:companyId", // 업체 상세 페이지
    name: "CompanyDetail",
    component: CompanyDetail,
    props: true, // 동적 경로의 `companyId`를 컴포넌트에서 prop으로 받음
  },
  {
    path: "/user",
    name: "UserInfoPage",
    component: UserInfoPage,
  },
];

const router = createRouter({
  history: createWebHistory(), // Vue 3에서는 createWebHistory 사용
  routes,
});

export default router;
