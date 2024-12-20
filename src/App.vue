<template>
  <div id="app">
    <Header />
    <SideBar />
    <div class="content">
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/AppHeader.vue";
import SideBar from "@/components/SideBar.vue";
export default {
  name: "App",
  components: {
    SideBar,
    Header,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left; /* 콘텐츠를 왼쪽 정렬 */
  color: #2c3e50;
}

/* Header 고정 스타일 */
header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

/* Header와 SideBar 아래쪽 콘텐츠 레이아웃 */
.content {
  display: flex;
  margin-top: 60px; /* 헤더 높이만큼 공간을 확보 */
}

/* SideBar 스타일 */
.content .side-bar {
  width: 200px; /* 사이드바의 너비 */
  height: 100vh; /* 화면의 전체 높이 */
  background-color: #f5f5f5;
  position: fixed;
  top: 60px; /* 헤더 아래에서 시작되도록 */
  left: 0;
  padding: 1rem;
  box-sizing: border-box;
}

/* 메인 콘텐츠 영역 */
.main-content {
  margin-left: 200px; /* 사이드바 너비만큼 여백을 추가 */
  padding: 1rem;
  flex-grow: 1; /* 남은 공간을 모두 사용 */
}
</style>
