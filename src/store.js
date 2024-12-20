// // // // src/store.js
// // // import { createStore } from "vuex";
// // //
// // // const store = createStore({
// // //   state() {
// // //     return {
// // //       isLoggedIn: !!localStorage.getItem("access-token"), // 로그인 상태는 토큰 존재 여부에 따라 결정
// // //       accessToken: localStorage.getItem("access-token") || null,
// // //       refreshToken: localStorage.getItem("refresh-token") || null,
// // //     };
// // //   },
// // //   mutations: {
// // //     setAuth(state, { accessToken, refreshToken }) {
// // //       state.isLoggedIn = true;
// // //       state.accessToken = accessToken;
// // //       state.refreshToken = refreshToken;
// // //       localStorage.setItem("access-token", accessToken);
// // //       localStorage.setItem("refresh-token", refreshToken);
// // //     },
// // //     logout(state) {
// // //       state.isLoggedIn = false;
// // //       state.accessToken = null;
// // //       state.refreshToken = null;
// // //       localStorage.removeItem("access-token");
// // //       localStorage.removeItem("refresh-token");
// // //     },
// // //   },
// // //   actions: {
// // //     login({ commit }, tokens) {
// // //       commit("setAuth", tokens);
// // //     },
// // //     logout({ commit }) {
// // //       commit("logout");
// // //     },
// // //   },
// // //   getters: {
// // //     isAuthenticated(state) {
// // //       return state.isLoggedIn;
// // //     },
// // //   },
// // // });
// // //
// // // export default store;
// //
// // import { createStore } from "vuex";
// // import axios from "axios"; // axios로 가정
// //
// // let logoutTimer;
// // let refreshTimer;
// //
// // const store = createStore({
// //   state() {
// //     return {
// //       isLoggedIn: !!localStorage.getItem("access-token"),
// //       accessToken: localStorage.getItem("access-token") || null,
// //       refreshToken: localStorage.getItem("refresh-token") || null,
// //     };
// //   },
// //   mutations: {
// //     setAuth(state, { accessToken, refreshToken }) {
// //       state.isLoggedIn = true;
// //       state.accessToken = accessToken;
// //       state.refreshToken = refreshToken;
// //       localStorage.setItem("access-token", accessToken);
// //       localStorage.setItem("refresh-token", refreshToken);
// //     },
// //     logout(state) {
// //       state.isLoggedIn = false;
// //       state.accessToken = null;
// //       state.refreshToken = null;
// //       localStorage.removeItem("access-token");
// //       localStorage.removeItem("refresh-token");
// //
// //       // 타이머 초기화
// //       if (logoutTimer) clearTimeout(logoutTimer);
// //       if (refreshTimer) clearTimeout(refreshTimer);
// //     },
// //   },
// //   actions: {
// //     login({ commit, dispatch }, tokens) {
// //       commit("setAuth", tokens);
// //
// //       // 5분 전 리프레시 타이머 설정 (55분 = 3300초 * 1000밀리초)
// //       refreshTimer = setTimeout(() => {
// //         dispatch("refreshToken");
// //       }, 3300 * 1000);
// //
// //       // 1시간 후 자동 로그아웃 타이머 설정 (3600초 * 1000밀리초)
// //       logoutTimer = setTimeout(() => {
// //         dispatch("logout");
// //       }, 3600 * 1000);
// //     },
// //     async refreshToken({ commit, state, dispatch }) {
// //       try {
// //         // 더미 리프레시 토큰 요청
// //         const response = await axios.post("/api/refresh-token", {
// //           refreshToken: state.refreshToken,
// //         });
// //
// //         // 리프레시 성공 시 새로운 토큰 갱신
// //         const { accessToken, refreshToken } = response.data;
// //         commit("setAuth", { accessToken, refreshToken });
// //
// //         // 리프레시 후 타이머 다시 설정
// //         dispatch("login", { accessToken, refreshToken });
// //       } catch (error) {
// //         console.error("토큰 갱신 실패:", error);
// //         dispatch("logout");
// //       }
// //     },
// //     logout({ commit }) {
// //       commit("logout");
// //     },
// //   },
// //   getters: {
// //     isAuthenticated(state) {
// //       return state.isLoggedIn;
// //     },
// //   },
// // });
// //
// // export default store;
//
// import { createStore } from "vuex";
// import axios from "axios";
//
// let logoutTimer;
// let refreshTimer;
//
// function decodeJWT(token) {
//   // JWT는 header.payload.signature 로 나뉘어 있으며 payload에 exp 정보가 들어있음
//   const parts = token.split(".");
//   if (parts.length !== 3) {
//     throw new Error("Invalid JWT token format");
//   }
//
//   const base64Url = parts[1]; // payload 부분
//   // base64Url -> base64 변환: '-' -> '+', '_' -> '/'
//   const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//
//   // base64 디코딩
//   const jsonPayload = decodeURIComponent(
//     atob(base64)
//       .split("")
//       .map((c) => {
//         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//       })
//       .join("")
//   );
//
//   return JSON.parse(jsonPayload);
// }
//
// const store = createStore({
//   state() {
//     return {
//       isLoggedIn: !!localStorage.getItem("access-token"),
//       accessToken: localStorage.getItem("access-token") || null,
//       refreshToken: localStorage.getItem("refresh-token") || null,
//     };
//   },
//   mutations: {
//     setAuth(state, { accessToken, refreshToken }) {
//       state.isLoggedIn = true;
//       state.accessToken = accessToken;
//       state.refreshToken = refreshToken;
//       localStorage.setItem("access-token", accessToken);
//       localStorage.setItem("refresh-token", refreshToken);
//     },
//     logout(state) {
//       state.isLoggedIn = false;
//       state.accessToken = null;
//       state.refreshToken = null;
//       localStorage.removeItem("access-token");
//       localStorage.removeItem("refresh-token");
//
//       if (logoutTimer) clearTimeout(logoutTimer);
//       if (refreshTimer) clearTimeout(refreshTimer);
//     },
//   },
//   actions: {
//     // login({ commit, dispatch }, tokens) {
//     //   commit("setAuth", tokens);
//     //
//     //   // 55분 후에 refreshToken 호출 (3300초 * 1000ms)
//     //   refreshTimer = setTimeout(() => {
//     //     dispatch("refreshToken");
//     //   }, 1600 * 1000);
//     //
//     //   // 1시간 후 자동 로그아웃 (3600초 * 1000ms)
//     //   logoutTimer = setTimeout(() => {
//     //     dispatch("logout");
//     //   }, 1800 * 1000);
//     // },
//     // async refreshToken({ commit, dispatch }) {
//     //   const refreshToken = localStorage.getItem("refresh-token");
//     //
//     //   if (!refreshToken) {
//     //     console.error("Refresh token not found in localStorage");
//     //     dispatch("logout"); // 토큰이 없으면 로그아웃
//     //     return;
//     //   }
//     //
//     //   try {
//     //     const response = await axios.get(
//     //       "https://yoger.o-r.kr/api/user/refresh",
//     //       {
//     //         headers: {
//     //           "refresh-token": refreshToken,
//     //
//     //           "Content-Type": "application/json",
//     //         },
//     //         withCredentials: true,
//     //       }
//     //     );
//     //
//     //     console.log("응답 데이터:", response.data);
//     //
//     //     const newAccessToken = response.headers["access-token"];
//     //     const newRefreshToken = response.headers["refresh-token"];
//     //
//     //     if (newAccessToken && newRefreshToken) {
//     //       commit("setAuth", {
//     //         accessToken: newAccessToken,
//     //         refreshToken: newRefreshToken,
//     //       });
//     //
//     //       // 리프레시 후 타이머 재설정
//     //       dispatch("login", {
//     //         accessToken: newAccessToken,
//     //         refreshToken: newRefreshToken,
//     //       });
//     //       console.log("새로운 토큰이 저장되었습니다.");
//     //     } else {
//     //       console.log("응답에 토큰이 없습니다.");
//     //       dispatch("logout"); // 토큰 갱신 실패 시 로그아웃
//     //     }
//     //   } catch (error) {
//     //     console.error("요청 실패:", error);
//     //     dispatch("logout"); // 요청 실패 시 로그아웃
//     //   }
//     // },
//     async signIn({ commit, dispatch }, { email, password }) {
//       try {
//         const credentials = btoa(`${email}:${password}`);
//         const response = await axios.get(
//           "https://yoger.o-r.kr/api/user/sign-in",
//           {
//             headers: {
//               Authorization: `Basic ${credentials}`,
//               "Content-Type": "application/json",
//             },
//             withCredentials: true,
//           }
//         );
//
//         const accessToken = response.headers["access-token"];
//         const refreshToken = response.headers["refresh-token"];
//
//         if (accessToken && refreshToken) {
//           commit("setAuth", { accessToken, refreshToken });
//
//           // 자동 리프레시와 로그아웃 타이머 설정
//           dispatch("startAuthTimers", { accessToken, refreshToken });
//
//           console.log("로그인 성공!");
//         } else {
//           throw new Error("Token not provided in the response.");
//         }
//       } catch (error) {
//         console.error("로그인 실패:", error);
//         throw error; // 컴포넌트에서 처리할 수 있도록 에러 다시 던짐
//       }
//     },
//     async refreshToken({ commit, dispatch }) {
//       const refreshToken = localStorage.getItem("refresh-token");
//
//       if (!refreshToken) {
//         console.error("Refresh token not found in localStorage");
//         dispatch("logout"); // 토큰이 없으면 로그아웃
//         return;
//       }
//
//       try {
//         const response = await axios.get(
//           "https://yoger.o-r.kr/api/user/refresh",
//           {
//             headers: {
//               "refresh-token": refreshToken,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         console.log(response);
//
//         const newAccessToken = response.headers["access-token"];
//         const newRefreshToken = response.headers["refresh-token"];
//
//         if (newAccessToken && newRefreshToken) {
//           commit("setAuth", {
//             accessToken: newAccessToken,
//             refreshToken: newRefreshToken,
//           });
//
//           // 리프레시 후 타이머 재설정
//           dispatch("startAuthTimers", {
//             accessToken: newAccessToken,
//             refreshToken: newRefreshToken,
//           });
//           console.log("새로운 토큰이 저장되었습니다.");
//         } else {
//           console.log("응답에 토큰이 없습니다.");
//           dispatch("logout"); // 토큰 갱신 실패 시 로그아웃
//         }
//       } catch (error) {
//         console.error("요청 실패:", error);
//         dispatch("logout"); // 요청 실패 시 로그아웃
//       }
//     },
//     startAuthTimers({ dispatch, state }) {
//       if (refreshTimer) clearTimeout(refreshTimer);
//       if (logoutTimer) clearTimeout(logoutTimer);
//
//       const accessToken = state.accessToken;
//       if (!accessToken) return;
//
//       let decoded;
//       try {
//         decoded = decodeJWT(accessToken);
//       } catch (err) {
//         console.error("토큰 디코딩 실패:", err);
//         dispatch("logout");
//         return;
//       }
//
//       const exp = decoded.exp * 1000; // 밀리초 단위
//       const now = Date.now();
//       const remainingTime = exp - now;
//       console.log(remainingTime);
//
//       if (remainingTime <= 0) {
//         // 이미 만료되었으면 즉시 로그아웃
//         dispatch("logout");
//         return;
//       }
//
//       // 55분 후에 refreshToken 호출
//       // refreshTimer = setTimeout(() => {
//       //   dispatch("refreshToken");
//       // }, 4 * 60 * 1000);
//       const refreshTime = remainingTime - 60 * 1000; // 만료 1분 전
//
//       if (refreshTime > 0) {
//         refreshTimer = setTimeout(() => {
//           dispatch("refreshToken");
//         }, refreshTime);
//       }
//
//       // 1시간 후 자동 로그아웃
//       // logoutTimer = setTimeout(() => {
//       //   dispatch("logout");
//       // }, 5 * 60 * 1000);
//       logoutTimer = setTimeout(() => {
//         dispatch("logout");
//       }, remainingTime);
//     },
//     logout({ commit }) {
//       commit("logout");
//     },
//   },
//
//   getters: {
//     isAuthenticated(state) {
//       return state.isLoggedIn;
//     },
//   },
// });
//
// export default store;
import { createStore } from "vuex";
import axios from "axios";

let logoutTimer;
let refreshTimer;

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

const store = createStore({
  state() {
    return {
      isLoggedIn: !!localStorage.getItem("access-token"),
      accessToken: localStorage.getItem("access-token") || null,
      refreshToken: localStorage.getItem("refresh-token") || null,
      tokenExp: localStorage.getItem("token-exp") || null, // exp를 로컬스토리지에 저장
      authorities: localStorage.getItem("authorities") || null, // 사용자 권한
    };
  },
  mutations: {
    setAuth(state, { accessToken, refreshToken }) {
      state.isLoggedIn = true;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      localStorage.setItem("access-token", accessToken);
      localStorage.setItem("refresh-token", refreshToken);

      // 토큰 디코딩을 통해 exp 추출 후 저장
      const decoded = parseJwt(accessToken);
      console.log(decoded);
      if (decoded && decoded.exp) {
        const expMs = decoded.exp * 1000;
        state.tokenExp = expMs;
        localStorage.setItem("token-exp", expMs.toString());
      }
      if (decoded.authorities) {
        state.authorities = decoded.authorities;
        localStorage.setItem("authorities", decoded.authorities);
      }
    },
    logout(state) {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.tokenExp = null;
      state.authorities = null;
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
      localStorage.removeItem("token-exp");
      localStorage.removeItem("authorities");
      localStorage.removeItem("userId");

      if (logoutTimer) clearTimeout(logoutTimer);
      if (refreshTimer) clearTimeout(refreshTimer);
    },
  },
  actions: {
    async signIn({ commit, dispatch }, { email, password, role }) {
      try {
        // 역할에 따라 credentials 포맷 변경
        const suffix = role === "COMPANY" ? "#2" : "#1"; // COMPANY이면 #2, USER이면 #1
        const credentials = btoa(`${email}${suffix}:${password}`);

        const response = await axios.get(
          "https://yoger.o-r.kr/api/user/sign-in",
          {
            headers: {
              Authorization: `Basic ${credentials}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const accessToken = response.headers["access-token"];
        const refreshToken = response.headers["refresh-token"];

        if (accessToken && refreshToken) {
          commit("setAuth", { accessToken, refreshToken });

          // JWT 디코딩 후 authorities 저장
          const decoded = parseJwt(accessToken);
          if (decoded && decoded.authorities) {
            commit("setAuthorities", decoded.authorities);
          }

          dispatch("startAuthTimers");
          console.log("로그인 성공!");
        } else {
          throw new Error("Token not provided in the response.");
        }
      } catch (error) {
        console.error("로그인 실패:", error);
        throw error;
      }
    },
    async refreshToken({ commit, dispatch }) {
      const refreshToken = localStorage.getItem("refresh-token");

      if (!refreshToken) {
        console.error("Refresh token not found in localStorage");
        dispatch("logout");
        return;
      }

      try {
        const response = await axios.get(
          "https://yoger.o-r.kr/api/user/refresh",
          {
            headers: {
              "refresh-token": refreshToken,
              "Content-Type": "application/json",
            },
          }
        );

        const newAccessToken = response.headers["access-token"];
        const newRefreshToken = response.headers["refresh-token"];

        if (newAccessToken && newRefreshToken) {
          commit("setAuth", {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          });

          dispatch("startAuthTimers");
          console.log("새로운 토큰이 저장되었습니다.");
        } else {
          console.log("응답에 토큰이 없습니다.");
          dispatch("logout");
        }
      } catch (error) {
        console.error("요청 실패:", error);
        dispatch("logout");
      }
    },
    startAuthTimers({ dispatch, state }) {
      if (refreshTimer) clearTimeout(refreshTimer);
      if (logoutTimer) clearTimeout(logoutTimer);

      const accessToken = state.accessToken;
      const tokenExp = state.tokenExp;

      if (!accessToken || !tokenExp) return;

      const now = Date.now();
      const remainingTime = tokenExp - now;

      console.log(`남은 유효시간(remainingTime): ${remainingTime}ms`);

      if (remainingTime <= 0) {
        dispatch("logout");
        return;
      }

      const refreshTime = remainingTime - 60 * 1000; // 만료 1분 전
      if (refreshTime > 0) {
        console.log(
          `리프레시 호출까지 남은 시간(refreshTime): ${refreshTime}ms`
        );
        refreshTimer = setTimeout(() => {
          dispatch("refreshToken");
        }, refreshTime);
      }

      console.log(`로그아웃까지 남은 시간: ${remainingTime}ms`);
      logoutTimer = setTimeout(() => {
        dispatch("logout");
      }, remainingTime);
    },
    logout({ commit }) {
      commit("logout");
    },
    login({ commit }, { accessToken, refreshToken }) {
      // `setAuth` mutation을 호출
      commit("setAuth", { accessToken, refreshToken });
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.isLoggedIn;
    },
    userAuthorities(state) {
      return state.authorities;
    },
  },
});

export default store;
