<!--<script setup>-->
<!--import { useRoute, useRouter } from "vue-router";-->

<!--// Vue Router 사용-->
<!--const route = useRoute();-->
<!--const router = useRouter();-->

<!--// URL에서 'sign-up', 'access-token', 'refresh-token' 쿼리 파라미터 가져오기-->
<!--const signUp = route.query["sign-up"];-->
<!--const accessToken = route.query["access-token"];-->
<!--const refreshToken = route.query["refresh-token"];-->

<!--// access-token과 refresh-token이 있으면 로컬 스토리지에 저장-->
<!--if (accessToken && refreshToken) {-->
<!--  localStorage.setItem("access-token", accessToken);-->
<!--  localStorage.setItem("refresh-token", refreshToken);-->
<!--}-->

<!--// sign-up 값에 따라 페이지 이동 처리-->
<!--if (signUp === "true") {-->
<!--  // 회원가입 페이지로 이동-->
<!--  router.push("/register-oauth");-->
<!--} else if (signUp === "false") {-->
<!--  // 원래 페이지로 돌아가기 (홈페이지로 이동)-->
<!--  router.push("/");-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <div>-->
<!--    &lt;!&ndash; 화면에는 아무 내용이 없을 수 있음, 여기서 바로 리디렉션 처리 &ndash;&gt;-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--/* 필요한 경우 스타일 추가 */-->
<!--</style>-->
<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex"; // Vuex Store 가져오기

// Vue Router와 Vuex Store 사용
const route = useRoute();
const router = useRouter();
const store = useStore();

// 현재 URL 출력
console.log("Current URL:", window.location.href);

// URL에서 'sign-up', 'access-token', 'refresh-token' 쿼리 파라미터 가져오기
const signUp = route.query["sign-up"];
const accessToken = route.query["access-token"];
const refreshToken = route.query["refresh-token"];

// JWT access-token에서 userId 추출 함수
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to parse JWT:", error);
    return null;
  }
}

// access-token과 refresh-token이 있으면 Vuex 액션을 통해 저장
if (accessToken && refreshToken) {
  store.dispatch("login", { accessToken, refreshToken });

  // access-token에서 userId 추출 및 로컬스토리지에 저장
  const decodedToken = parseJwt(accessToken);
  if (decodedToken) {
    localStorage.setItem("userId", decodedToken.sub); // userId를 바로 저장
  } else {
    console.log("userId not found in token");
  }
}

// sign-up 값에 따라 페이지 이동 처리
if (signUp === "false") {
  router.push("/register-oauth");
} else if (signUp === "true") {
  // 원래 페이지로 돌아가기 (홈페이지로 이동)
  router.push("/");
}
</script>

<template>
  <div>
    <!-- 화면에는 아무 내용이 없을 수 있음, 여기서 바로 리디렉션 처리 -->
  </div>
</template>

<style scoped>
/* 필요한 경우 스타일 추가 */
</style>
