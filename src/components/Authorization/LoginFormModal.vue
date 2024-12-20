<!--<template>-->
<!--  <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">-->
<!--    <div class="modal-content">-->
<!--      <h1>Log In</h1>-->
<!--      <form @submit.prevent="handleSubmit">-->
<!--        <div class="form-group">-->
<!--          <label for="email">Email</label>-->
<!--          <input-->
<!--            id="email"-->
<!--            type="email"-->
<!--            v-model="email"-->
<!--            required-->
<!--            placeholder="Enter your email"-->
<!--          />-->
<!--        </div>-->

<!--        <div class="form-group">-->
<!--          <label for="password">Password</label>-->
<!--          <input-->
<!--            id="password"-->
<!--            type="password"-->
<!--            v-model="password"-->
<!--            required-->
<!--            placeholder="Enter your password"-->
<!--          />-->
<!--          <p v-if="!isPasswordValid && password" class="error-message">-->
<!--            비밀번호는 10글자 이상이여야 합니다-->
<!--          </p>-->
<!--        </div>-->

<!--        &lt;!&ndash; 로그인과 레지스터 버튼을 가로로 배치 &ndash;&gt;-->
<!--        <div class="form-actions horizontal">-->
<!--          <button :disabled="isSubmitting" class="submit-button">-->
<!--            {{ isSubmitting ? "Logging In..." : "Log In" }}-->
<!--          </button>-->

<!--          &lt;!&ndash; Register 버튼을 router-link로 변경하고 클릭 시 모달 닫기 &ndash;&gt;-->
<!--          <router-link-->
<!--            to="/register"-->
<!--            class="register-button"-->
<!--            @click="closeModal"-->
<!--            >Register</router-link-->
<!--          >-->
<!--        </div>-->
<!--      </form>-->

<!--      &lt;!&ndash; 밑줄 &ndash;&gt;-->
<!--      <hr class="divider" />-->

<!--      &lt;!&ndash; OAuth 로그인 버튼 &ndash;&gt;-->
<!--      <div class="oauth-buttons">-->
<!--        <button @click="loginWithGoogle" class="oauth-button google">G</button>-->
<!--        <button @click="loginWithKakao" class="oauth-button kakao">K</button>-->
<!--        <button @click="loginWithNaver" class="oauth-button naver">N</button>-->
<!--      </div>-->
<!--      &lt;!&ndash;      <button @click="sendRefreshToken">Refresh Token</button>&ndash;&gt;-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from "axios";-->
<!--import { mapActions } from "vuex";-->
<!--export default {-->
<!--  props: {-->
<!--    isModalOpen: {-->
<!--      type: Boolean,-->
<!--      required: true,-->
<!--    },-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      email: "",-->
<!--      password: "",-->
<!--      isPasswordValid: false,-->
<!--      isSubmitting: false,-->
<!--    };-->
<!--  },-->
<!--  watch: {-->
<!--    password(newPassword) {-->
<!--      this.isPasswordValid = newPassword.length >= 10;-->
<!--    },-->
<!--  },-->
<!--  methods: {-->
<!--    ...mapActions(["signIn"]), // Vuex 액션 매핑-->
<!--    closeModal() {-->
<!--      this.$emit("close");-->
<!--    },-->
<!--    async handleSubmit() {-->
<!--      if (!this.isPasswordValid) {-->
<!--        return;-->
<!--      }-->
<!--      this.isSubmitting = true;-->

<!--      try {-->
<!--        //   const credentials = btoa(`${this.email}:${this.password}`);-->
<!--        //-->
<!--        //   // axios를 사용하여 로그인 요청-->
<!--        //   const response = await axios.get(-->
<!--        //     "https://yoger.o-r.kr/api/user/sign-in",-->
<!--        //     {-->
<!--        //       headers: {-->
<!--        //         Authorization: `Basic ${credentials}`,-->
<!--        //         // "ngrok-skip-browser-warning": "69420",-->
<!--        //         "Content-Type": "application/json",-->
<!--        //       },-->
<!--        //       withCredentials: true,-->
<!--        //     }-->
<!--        //   );-->
<!--        //-->
<!--        //   // 전체 응답 로깅-->
<!--        //   console.log("전체 응답:", response.headers);-->
<!--        //-->
<!--        //   // 응답이 성공적인지 확인-->
<!--        //   if (response.status !== 200) {-->
<!--        //     throw new Error("Network response was not ok");-->
<!--        //   }-->
<!--        //-->
<!--        //   // 응답에서 헤더 추출-->
<!--        //   const accessToken = response.headers["access-token"];-->
<!--        //   const refreshToken = response.headers["refresh-token"];-->
<!--        //-->
<!--        //   if (accessToken && refreshToken) {-->
<!--        //     // 토큰을 로컬 스토리지에 저장-->
<!--        //     localStorage.setItem("access-token", accessToken);-->
<!--        //     localStorage.setItem("refresh-token", refreshToken);-->
<!--        //-->
<!--        //     this.$toast.success("로그인 성공");-->
<!--        //-->
<!--        //     // 로그인 성공 후 모달 닫기 및 홈으로 리다이렉트-->
<!--        //     this.closeModal();-->
<!--        //     this.$router.push("/");-->
<!--        //   } else {-->
<!--        //     this.$toast.error("로그인 실패: 토큰이 없습니다.");-->
<!--        //   }-->
<!--        //-->
<!--        //   // 응답 데이터 로깅-->
<!--        //   console.log("로그인 성공:", response.data);-->
<!--        // } catch (error) {-->
<!--        //   console.error("로그인 실패:", error);-->
<!--        //   this.$toast.error("로그인 실패");-->
<!--        // } finally {-->
<!--        //   this.isSubmitting = false;-->
<!--        // }-->
<!--        await this.signIn({ email: this.email, password: this.password });-->
<!--        this.$toast.success("로그인 성공!");-->
<!--        this.closeModal();-->
<!--        this.$router.push("/");-->
<!--      } catch (error) {-->
<!--        console.error("로그인 실패:", error);-->
<!--        this.$toast.error("로그인에 실패했습니다.");-->
<!--      } finally {-->
<!--        this.isSubmitting = false;-->
<!--      }-->
<!--    },-->

<!--    loginWithGoogle() {-->
<!--      const redirectUri = encodeURIComponent("https://yoger.0-r.kr/oauth"); // 리디렉션할 URL-->
<!--      const mode = "login"; // 로그인 모드-->
<!--      const oauthUrl = `http://yoger.o-r.kr:8080/oauth2/authorization/google?redirect_uri=${redirectUri}&mode=${mode}`;-->

<!--      // 구글 OAuth 로그인 페이지로 리디렉션-->
<!--      window.location.href = oauthUrl;-->
<!--    },-->

<!--    loginWithKakao() {-->
<!--      const redirectUri = encodeURIComponent("https://yoger.0-r.kr/oauth"); // 리디렉션할 URL-->
<!--      const mode = "login"; // 로그인 모드-->
<!--      const oauthUrl = `http://yoger.o-r.kr:8080/oauth2/authorization/kakao?redirect_uri=${redirectUri}&mode=${mode}`;-->

<!--      // 카카오 OAuth 로그인 페이지로 리디렉션-->
<!--      window.location.href = oauthUrl;-->
<!--    },-->

<!--    loginWithNaver() {-->
<!--      const redirectUri = encodeURIComponent("https://yoger.0-r.kr/oauth"); // 리디렉션할 URL-->
<!--      const mode = "login"; // 로그인 모드-->
<!--      const oauthUrl = `http://yoger.o-r.kr:8080/oauth2/authorization/naver?redirect_uri=${redirectUri}&mode=${mode}`;-->

<!--      // 네이버 OAuth 로그인 페이지로 리디렉션-->
<!--      window.location.href = oauthUrl;-->
<!--    },-->

<!--    async sendRefreshToken() {-->
<!--      // 로컬 스토리지에서 refresh-token을 가져옵니다.-->
<!--      const refreshToken = localStorage.getItem("refresh-token");-->

<!--      if (!refreshToken) {-->
<!--        console.error("Refresh token not found in localStorage");-->
<!--        return;-->
<!--      }-->

<!--      try {-->
<!--        // axios를 사용하여 GET 요청을 보냅니다.-->
<!--        const response = await axios.get(-->
<!--          "https://yoger.o-r.kr/api/user/refresh",-->
<!--          {-->
<!--            headers: {-->
<!--              "refresh-token": refreshToken,-->

<!--              "Content-Type": "application/json",-->
<!--            },-->
<!--            withCredentials: true, // 쿠키를 함께 보낼 경우-->
<!--          }-->
<!--        );-->

<!--        console.log("응답 데이터:", response.data);-->

<!--        // 응답에서 새로 발급받은 access-token 및 refresh-token이 있을 경우 저장-->
<!--        const newAccessToken = response.headers["access-token"];-->
<!--        const newRefreshToken = response.headers["refresh-token"];-->

<!--        if (newAccessToken && newRefreshToken) {-->
<!--          localStorage.setItem("access-token", newAccessToken);-->
<!--          localStorage.setItem("refresh-token", newRefreshToken);-->
<!--          console.log("새로운 토큰이 저장되었습니다.");-->
<!--        } else {-->
<!--          console.log("응답에 토큰이 없습니다.");-->
<!--        }-->
<!--      } catch (error) {-->
<!--        console.error("요청 실패:", error);-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.modal-overlay {-->
<!--  position: fixed;-->
<!--  top: 0;-->
<!--  left: 0;-->
<!--  right: 0;-->
<!--  bottom: 0;-->
<!--  background-color: rgba(0, 0, 0, 0.5);-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  z-index: 1000;-->
<!--}-->

<!--.modal-content {-->
<!--  background-color: white;-->
<!--  padding: 20px;-->
<!--  border-radius: 8px;-->
<!--  width: 25%;-->
<!--  text-align: center;-->
<!--  position: relative;-->
<!--}-->

<!--.form-group {-->
<!--  margin-bottom: 15px;-->
<!--  text-align: left;-->
<!--  margin-right: 10px;-->
<!--}-->

<!--label {-->
<!--  font-weight: bold;-->
<!--  margin-bottom: 5px;-->
<!--  display: block;-->
<!--}-->

<!--input {-->
<!--  width: 100%;-->
<!--  padding: 8px;-->
<!--  border: 1px solid #ccc;-->
<!--  border-radius: 4px;-->
<!--  margin-top: 5px;-->
<!--}-->

<!--.error-message {-->
<!--  color: red;-->
<!--  font-size: 12px;-->
<!--  margin-top: 5px;-->
<!--}-->

<!--/* 로그인과 레지스터 버튼을 가로로 배치하는 스타일 */-->
<!--.form-actions.horizontal {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  margin-top: 10px;-->
<!--}-->

<!--.submit-button,-->
<!--.register-button {-->
<!--  padding: 10px 20px;-->
<!--  background-color: transparent; /* 버튼 투명하게 */-->
<!--  color: #4caf50;-->
<!--  border: 2px solid #4caf50;-->
<!--  border-radius: 4px;-->
<!--  cursor: pointer;-->
<!--  transition: background-color 0.3s, color 0.3s;-->
<!--  flex-basis: 48%; /* 버튼이 동일한 크기로 배치되도록 설정 */-->
<!--}-->

<!--.submit-button:hover,-->
<!--.register-button:hover {-->
<!--  background-color: #4caf50;-->
<!--  color: white;-->
<!--}-->

<!--/* 밑줄 */-->
<!--.divider {-->
<!--  margin: 20px 0;-->
<!--  border: none;-->
<!--  border-top: 1px solid #ccc;-->
<!--}-->

<!--/* OAuth 버튼 스타일 */-->
<!--.oauth-buttons {-->
<!--  display: flex;-->
<!--  justify-content: space-around;-->
<!--  margin-top: 20px;-->
<!--}-->

<!--.oauth-button {-->
<!--  width: 50px;-->
<!--  height: 50px;-->
<!--  border-radius: 50%;-->
<!--  border: none;-->
<!--  cursor: pointer;-->
<!--  font-size: 20px;-->
<!--  color: white;-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--}-->

<!--.oauth-button.google {-->
<!--  background-color: #db4437;-->
<!--}-->

<!--.oauth-button.kakao {-->
<!--  background-color: #fee500;-->
<!--  color: black;-->
<!--}-->

<!--.oauth-button.naver {-->
<!--  background-color: #03c75a;-->
<!--}-->
<!--</style>-->

<template>
  <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h1>Log In</h1>

      <!-- 역할 선택 토글 버튼 -->
      <div class="role-selection">
        <button
          type="button"
          :class="['role-button', role === 'USER' ? 'active' : '']"
          @click="role = 'USER'"
        >
          사용자
        </button>
        <button
          type="button"
          :class="['role-button', role === 'COMPANY' ? 'active' : '']"
          @click="role = 'COMPANY'"
        >
          회사
        </button>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
            placeholder="Enter your email"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            placeholder="Enter your password"
          />
        </div>

        <!-- 로그인과 레지스터 버튼을 가로로 배치 -->
        <div class="form-actions horizontal">
          <button :disabled="isSubmitting" class="submit-button">
            {{ isSubmitting ? "Logging In..." : "Log In" }}
          </button>

          <router-link
            to="/register"
            class="register-button"
            @click="closeModal"
            >Register</router-link
          >
        </div>
      </form>

      <!-- 밑줄 -->
      <hr class="divider" />

      <!-- OAuth 로그인 버튼 -->
      <div class="oauth-buttons">
        <button @click="loginWithGoogle" class="oauth-button google">G</button>
        <button @click="loginWithKakao" class="oauth-button kakao">K</button>
        <button @click="loginWithNaver" class="oauth-button naver">N</button>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
import { mapActions } from "vuex";

export default {
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      email: "",
      password: "",
      isPasswordValid: false,
      isSubmitting: false,
      role: "USER", // 기본값: 사용자
    };
  },
  watch: {
    password(newPassword) {
      this.isPasswordValid = newPassword.length >= 10;
    },
  },
  methods: {
    ...mapActions(["signIn"]), // Vuex 액션 매핑
    closeModal() {
      this.$emit("close");
    },
    // async handleSubmit() {
    //   if (!this.isPasswordValid) {
    //     return;
    //   }
    //   this.isSubmitting = true;
    //
    //   try {
    //     let credentials;
    //     let url;
    //     if (this.role === "USER") {
    //       // 사용자 로그인
    //       credentials = btoa(`${this.email}:${this.password}`);
    //       url = "https://yoger.o-r.kr/api/user/sign-in";
    //     } else {
    //       // 회사 로그인
    //       credentials = btoa(`${this.email}#2:${this.password}`);
    //       url = "https://yoger.o-r.kr/api/company/sign-in";
    //     }
    //
    //     const response = await axios.get(url, {
    //       headers: {
    //         Authorization: `Basic ${credentials}`,
    //         "Content-Type": "application/json",
    //       },
    //       withCredentials: true,
    //     });
    //
    //     console.log("전체 응답:", response.headers);
    //
    //     if (response.status !== 200) {
    //       throw new Error("Network response was not ok");
    //     }
    //
    //     const accessToken = response.headers["access-token"];
    //     const refreshToken = response.headers["refresh-token"];
    //
    //     if (accessToken && refreshToken) {
    //       localStorage.setItem("access-token", accessToken);
    //       localStorage.setItem("refresh-token", refreshToken);
    //       this.$toast.success("로그인 성공");
    //       this.closeModal();
    //       this.$router.push("/");
    //     } else {
    //       this.$toast.error("로그인 실패: 토큰이 없습니다.");
    //     }
    //
    //     console.log("로그인 성공:", response.data);
    //   } catch (error) {
    //     console.error("로그인 실패:", error);
    //     this.$toast.error("로그인 실패");
    //   } finally {
    //     this.isSubmitting = false;
    //   }
    // },
    async handleSubmit() {
      if (!this.isPasswordValid) {
        return;
      }
      this.isSubmitting = true;

      try {
        const tokens = {
          email: this.email,
          password: this.password,
          role: this.role,
        };

        await this.signIn(tokens);
        this.$toast.success("로그인 성공");
        this.closeModal();
        this.$router.push("/");
      } catch (error) {
        console.error("로그인 실패:", error);
        this.$toast.error("로그인 실패");
      } finally {
        this.isSubmitting = false;
      }
    },

    loginWithGoogle() {
      const redirectUri = encodeURIComponent("https://yoger.o-r.kr/oauth");
      const mode = "login";
      const oauthUrl = `https://yoger.o-r.kr/oauth2/authorization/google?redirect_uri=${redirectUri}&mode=${mode}`;
      window.location.href = oauthUrl;
    },

    loginWithKakao() {
      const redirectUri = encodeURIComponent("https://yoger.o-r.kr/oauth");
      const mode = "login";
      const oauthUrl = `https://yoger.o-r.kr/oauth2/authorization/kakao?redirect_uri=${redirectUri}&mode=${mode}`;
      window.location.href = oauthUrl;
    },

    loginWithNaver() {
      const redirectUri = encodeURIComponent("https://yoger.o-r.kr/oauth");
      const mode = "login";
      const oauthUrl = `https://yoger.o-r.kr/oauth2/authorization/naver?redirect_uri=${redirectUri}&mode=${mode}`;
      window.location.href = oauthUrl;
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 25%;
  text-align: center;
  position: relative;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
  margin-right: 10px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
}

.form-actions.horizontal {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.submit-button,
.register-button {
  padding: 10px 20px;
  background-color: transparent;
  color: #4caf50;
  border: 2px solid #4caf50;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  flex-basis: 48%;
}

.submit-button:hover,
.register-button:hover {
  background-color: #4caf50;
  color: white;
}

.divider {
  margin: 20px 0;
  border: none;
  border-top: 1px solid #ccc;
}

.oauth-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.oauth-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.oauth-button.google {
  background-color: #db4437;
}

.oauth-button.kakao {
  background-color: #fee500;
  color: black;
}

.oauth-button.naver {
  background-color: #03c75a;
}

/* 역할 선택 스타일 */
.role-selection {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  gap: 20px;
}

.role-button {
  background-color: #ddd;
  color: #333;
  padding: 12px 24px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
}
.role-button.active {
  background-color: #111111;
  color: #fff;
}
.role-button:hover {
  background-color: #ccc;
}
</style>
