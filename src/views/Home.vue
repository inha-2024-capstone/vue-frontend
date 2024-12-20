<!--<script>-->
<!--import HomeProduct from "@/components/Home/HomeProduct.vue";-->

<!--import HomeHowto from "@/components/Home/HomeHowto.vue";-->
<!--export default {-->
<!--  name: "HomeComponent",-->
<!--  components: {-->
<!--    HomeProduct,-->

<!--    HomeHowto,-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<template>-->
<!--  <HomeHowto />-->
<!--  <HomeProduct />-->
<!--</template>-->

<!--<style scoped></style>-->

<template>
  <div class="home-container">
    <!-- 왼쪽: HomeProduct -->
    <div class="left-section">
      <HomeProduct />
    </div>

    <!-- 오른쪽: HomeHowto -->
    <div class="right-section">
      <HomeHowto />
    </div>
  </div>
</template>

<script>
import HomeProduct from "@/components/Home/HomeProduct.vue";
import HomeHowto from "@/components/Home/HomeHowto.vue";

export default {
  name: "HomeComponent",
  components: {
    HomeProduct,
    HomeHowto,
  },
};
</script>

<style scoped>
/* 전체 컨테이너 스타일 */
.home-container {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  height: 75vh;
  overflow: hidden; /* 스크롤 방지 */
  background-color: #ffffff; /* 배경색 설정 */
  padding: 20px; /* 여백 추가 */
  gap: 20px; /* 섹션 간 간격 추가 */
}

/* 왼쪽 섹션 스타일 */
.left-section {
  flex: 3; /* 왼쪽 섹션 비율 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

/* 오른쪽 섹션 스타일 */
.right-section {
  flex: 2; /* 오른쪽 섹션 비율 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

/* 반응형 스타일 */
@media (max-width: 1024px) {
  .home-container {
    flex-direction: column; /* 세로로 정렬 */
    gap: 20px;
    height: auto;
  }

  .left-section,
  .right-section {
    flex: none;
    width: 100%;
  }
}
</style>
