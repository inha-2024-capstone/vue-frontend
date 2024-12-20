<template>
  <div>
    <nav class="nav-container">
      <div class="logo">
        <!-- router-link 대신 일반 링크 사용 -->
        <a href="/"> <font-awesome-icon icon="project-diagram" /> Yoger </a>
      </div>

      <div class="nav-items">
        <div v-if="isLoggedIn">
          <!--          <a href="/projects" class="nav-button">-->
          <!--            <font-awesome-icon icon="project-diagram" /> Projects-->
          <!--          </a>-->

          <!-- 알림 아이콘 -->
          <div class="icon-container">
            <font-awesome-icon
              icon="bell"
              class="icon"
              @click="toggleNotificationDropdown"
            />
            <div v-if="isNotificationOpen" class="notification-dropdown">
              <ul>
                <li v-for="(notification, index) in notifications" :key="index">
                  {{ notification }}
                </li>
              </ul>
            </div>
          </div>

          <!-- 유저 아이콘 -->
          <div class="icon-container">
            <font-awesome-icon
              icon="user-circle"
              class="icon"
              @click="goToUserPage"
            />
          </div>

          <form @submit.prevent="handleLogout">
            <button class="nav-button">
              <font-awesome-icon icon="sign-out-alt" /> Logout
            </button>
          </form>
        </div>
        <div v-else>
          <!-- 로그인 버튼을 클릭하면 모달 오픈 -->
          <button class="nav-button" @click="openLoginModal">
            <font-awesome-icon icon="sign-in-alt" /> Log In!
          </button>
        </div>
      </div>
    </nav>

    <!-- 로그인 모달 컴포넌트 -->
    <LoginFormModal
      :isModalOpen="isLoginModalOpen"
      @close="closeLoginModal"
      @login-success="handleLoginSuccess"
    />
  </div>
</template>

<script>
import LoginFormModal from "./Authorization/LoginFormModal.vue"; // 모달 컴포넌트 임포트
import axios from "axios";
import { mapGetters } from "vuex"; // Vuex helpers
export default {
  components: {
    LoginFormModal, // 로그인 모달 컴포넌트 등록
  },
  data() {
    return {
      isLoginModalOpen: false, // 모달 상태 관리

      notifications: ["알림 1", "알림 2", "알림 3"], // 샘플 알림 목록
      isNotificationOpen: false, // 알림 드롭다운 상태
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]), // Vuex의 isAuthenticated 상태 사용
    isLoggedIn() {
      return this.isAuthenticated; // Vuex 상태를 컴포넌트에서 사용
    },
  },

  methods: {
    openLoginModal() {
      this.isLoginModalOpen = true;
    },
    closeLoginModal() {
      this.isLoginModalOpen = false;
    },
    async handleLogout() {
      // localStorage에서 authorities 값 확인
      const authorities = localStorage.getItem("authorities");
      this.$router.push("/");

      // 권한에 따라 로그아웃 API URL 설정
      const logoutUrl =
        authorities === "COMPANY"
          ? "https://yoger.o-r.kr/api/company/sign-out"
          : "https://yoger.o-r.kr/api/user/sign-out";

      try {
        // API 호출 시 필요한 토큰 가져오기
        const accessToken = localStorage.getItem("access-token");
        const refreshToken = localStorage.getItem("refresh-token");

        // 로그아웃 API 호출
        await axios.get(logoutUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        });

        console.log("로그아웃 성공");
      } catch (error) {
        console.error("로그아웃 API 호출 실패:", error);
      } finally {
        // Vuex 상태 초기화 및 로컬스토리지 데이터 삭제
        this.$store.dispatch("logout");
      }
    },

    handleLoginSuccess({ accessToken, refreshToken }) {
      // 로그인 성공 시 로컬스토리지에 토큰 저장 및 상태 업데이트
      localStorage.setItem("access-token", accessToken);
      localStorage.setItem("refresh-token", refreshToken);
      this.token = accessToken; // 상태 갱신
      this.closeLoginModal(); // 로그인 모달 닫기
      this.$router.push({ path: this.$route.path, query: this.$route.query });
    },
    toggleNotificationDropdown() {
      this.isNotificationOpen = !this.isNotificationOpen;
    },
    goToUserPage() {
      this.$router.push("/user"); // 유저 페이지로 이동
    },
  },
  watch: {
    // 라우트 변경 감지 및 토큰 상태 확인
    $route: {
      immediate: true,
      handler() {
        this.token = localStorage.getItem("access-token");
      },
    },
  },
};
</script>

<style>
.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  z-index: 1000; /* 헤더가 다른 요소 위에 표시되도록 z-index 설정 */
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
}

.nav-items {
  display: flex;
  align-items: center;
}

.nav-button {
  background-color: #fff;
  color: black;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  margin-right: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: darkgray;
}

a {
  text-decoration: none;
  color: inherit;
}

form {
  display: inline;
}

body {
  margin: 0;
  padding-top: 5rem; /* 헤더 아래의 내용이 겹치지 않도록 패딩 추가 */
}

font-awesome-icon {
  margin-right: 5px; /* 아이콘과 텍스트 사이에 약간의 간격을 추가 */
}

.icon-container {
  position: relative;
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
  margin-top: 6px;
}

.icon {
  font-size: 1.5rem;
  color: black;
}

.icon:hover {
  color: gray;
}

.notification-dropdown {
  position: absolute;
  top: 30px;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 200px;
}

.notification-dropdown ul {
  list-style: none;
  margin: 0;
  padding: 10px;
}

.notification-dropdown li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 0.9rem;
}

.notification-dropdown li:last-child {
  border-bottom: none;
}

.notification-dropdown li:hover {
  background-color: #f5f5f5;
}
</style>
