<template>
  <div class="signup-container">
    <div class="form-box">
      <!-- 회원가입 폼 -->
      <div class="form-frame">
        <h1 class="form-title">회원 가입</h1>
        <p class="form-description">
          계정을 완성하기 위해 양식을 작성해주세요.
        </p>

        <form @submit.prevent="handleSubmit">
          <!-- 이메일 필드 -->
          <div class="text-field">
            <label for="email" class="form-label">이메일</label>
            <input
              id="email"
              type="email"
              v-model="email"
              required
              placeholder="이메일 입력"
              class="form-input"
              disabled
            />
          </div>

          <!-- 이름 필드 -->
          <div class="text-field">
            <label for="username" class="form-label">이름</label>
            <input
              id="username"
              type="text"
              v-model="username"
              required
              placeholder="이름 입력"
              class="form-input"
            />
          </div>

          <!-- 닉네임 필드 -->
          <div class="text-field">
            <label for="nick_name" class="form-label">닉네임</label>
            <input
              id="nick_name"
              type="text"
              v-model="nick_name"
              placeholder="닉네임 입력"
              class="form-input"
            />
          </div>

          <!--          <div class="text-field">-->
          <!--            <label for="role" class="form-label">역할</label>-->
          <!--            <select v-model="role" required class="form-input">-->
          <!--              <option disabled value="">역할을 선택하세요</option>-->
          <!--              <option value="USER">사용자</option>-->
          <!--              <option value="COMPANY">회사</option>-->
          <!--              <option value="ADMIN">관리자</option>-->
          <!--            </select>-->
          <!--          </div>-->

          <!-- 성별 선택 필드 -->
          <div class="text-field">
            <label for="gender" class="form-label">성별</label>
            <select v-model="gender" required class="form-input">
              <option disabled value="">성별을 선택하세요</option>
              <option value="MALE">남성</option>
              <option value="FEMALE">여성</option>
            </select>
          </div>

          <!-- 연락처 필드 -->
          <div class="text-field">
            <label for="phone_number" class="form-label">핸드폰 번호</label>
            <input
              type="text"
              v-model="phone_number"
              required
              :placeholder="'010-xxxx-xxxx'"
              class="form-input"
              @input="phoneErrorCheck"
            />
            <p>{{ phoneError }}</p>
          </div>

          <!-- 주소 필드 -->
          <div class="text-field-address">
            <label for="postal_code" class="form-label">우편번호</label>
            <input
              id="postal_code"
              type="text"
              v-model="postal_code"
              placeholder="우편번호"
              class="postal-code-field"
            />
            <label for="address" class="form-label">주소</label>
            <input
              id="address"
              type="text"
              v-model="address"
              placeholder="주소 입력"
              class="address-field"
            />
            <button type="button" class="search-button" @click="openPostcode">
              주소 검색
            </button>
            <div v-if="isPostcodeOpen" class="modal-overlay">
              <div class="modal">
                <VueDaumPostcode
                  @complete="onCompletePostcode"
                  @close="closePostcode"
                />
                <button @click="closePostcode" class="close-button">
                  <font-awesome-icon icon="times" />
                </button>
              </div>
            </div>
          </div>

          <!-- 상세주소 필드 -->
          <div class="text-field">
            <label for="detailed_address" class="form-label">상세 주소</label>
            <input
              id="detailed_address"
              type="text"
              v-model="detailed_address"
              placeholder="상세 주소 입력"
              class="form-input"
            />
          </div>

          <!-- 제출 버튼 -->
          <button :disabled="isSubmitting" class="form-button">
            {{ isSubmitting ? "회원가입 중..." : "회원가입" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      username: "",

      nick_name: "",
      gender: "",
      phone_number: "",
      address: "",
      role: "",
      postal_code: "",
      detailed_address: "",
      isSubmitting: false,
      isPostcodeOpen: false, // 주소 검색창 상태
      loginSource: null,
      phoneError: "",
    };
  },
  async created() {
    try {
      const accessToken = localStorage.getItem("access-token");

      // OAuth 회원 정보 불러오기
      const response = await axios.get(
        "https://yoger.o-r.kr/api/oauth/sign-up",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response);
      const userData = response.data.result;

      // 불러온 데이터를 필드에 기본값으로 설정
      this.email = userData.email;
      this.username = userData.username;

      this.role = "USER";
      this.nick_name = userData.nick_name;
      this.gender = userData.gender;
      this.phone_number = userData.phone_number;
      this.address = userData.address;
      this.postal_code = userData.postal_code;
      this.detailed_address = userData.detailed_address;
      this.loginSource = userData.loginSource;
    } catch (error) {
      console.error("사용자 정보 불러오기 실패:", error);
    }
  },
  methods: {
    phoneErrorCheck(event) {
      const phoneInput = event.target.value;
      let phoneRegex;

      if (this.role === "COMPANY") {
        phoneRegex = /^02-\d{3,4}-\d{4}$/; // COMPANY용: 02-xxx-xxxx 또는 02-xxxx-xxxx
        this.phoneError = phoneRegex.test(phoneInput)
          ? ""
          : "02-xxx-xxxx 형식을 맞춰주세요";
      } else {
        phoneRegex = /^010-\d{4}-\d{4}$/; // USER용: 010-xxxx-xxxx
        this.phoneError = phoneRegex.test(phoneInput)
          ? ""
          : "010-xxxx-xxxx 형식을 맞춰주세요";
      }
    },
    async handleSubmit() {
      this.isSubmitting = true;
      try {
        const accessToken = localStorage.getItem("access-token");
        // 사용자 정보 업데이트 (PATCH)
        const response = await axios.patch(
          "https://yoger.o-r.kr/api/oauth/sign-up",
          {
            email: this.email,
            username: this.username,

            role: this.role,
            nickName: this.nick_name,
            gender: this.gender,
            phoneNumber: this.phone_number,
            address:
              this.postal_code +
              " " +
              this.address +
              " " +
              this.detailed_address,
            loginSource: this.loginSource,
          },
          {
            headers: {
              "Content-Type": "application/json",

              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("회원정보 수정 성공:", response.data);
        this.$toast.success("회원가입이 완료되었습니다!");
        this.$router.push("/"); // 완료 후 홈으로 리다이렉션
      } catch (error) {
        console.error("회원가입 실패:", error);
        this.$toast.error("회원가입에 실패했습니다.");
      } finally {
        this.isSubmitting = false;
      }
    },
    openPostcode() {
      this.isPostcodeOpen = true; // 주소 검색창 열기
    },
    onCompletePostcode(data) {
      this.postal_code = data.zonecode; // 우편번호 저장
      this.address = data.address; // 주소 저장
      this.isPostcodeOpen = false; // 검색창 닫기
    },
    closePostcode() {
      this.isPostcodeOpen = false; // 검색창 닫기
    },
  },
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #ffffff;
}
.form-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #ffffff;
  border: 1px solid rgba(102, 102, 102, 0.3);
  border-radius: 32px;
  width: 60%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.form-frame {
  width: 100%;
}
.form-title {
  font-family: "Poppins", sans-serif;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  color: #333333;
  margin-bottom: 8px;
}
.form-description {
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  color: #666666;
  margin-bottom: 40px;
}
.text-field {
  margin-bottom: 24px;
}
.form-label {
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #666666;
  margin-bottom: 8px;
  display: block;
}
.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #666666;
  border-radius: 12px;
  font-size: 16px;
  box-sizing: border-box;
}
.form-button {
  width: 100%;
  padding: 12px;
  background-color: #111111;
  color: white;
  border: none;
  border-radius: 40px;
  font-size: 18px;
  cursor: pointer;
}
.form-button:disabled {
  background-color: gray;
}
.password-requirements {
  font-size: 12px;
  color: #666666;
  margin-top: 8px;
}
.text-field-address {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  gap: 10px;
}
.postal-code-field {
  flex: 4.5;
}
.address-field {
  flex: 4.5;
}
.search-button {
  flex: 1;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 12px;
  transition: background-color 0.3s ease;
}
.search-button:hover {
  background-color: #45a049;
}
.modal {
  max-height: 80%;
  width: 40%;
  overflow-y: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
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

/* 주소 필드 컨테이너: 한 줄에 배치 및 비율 설정 */
.text-field-address {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  gap: 10px; /* 필드 간격 추가 */
}

.text-field-address input {
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #666666;
  font-size: 16px;
  box-sizing: border-box;
}

.postal-code-field {
  flex: 4.5;
}

.address-field {
  flex: 4.5;
}

.search-button {
  flex: 1;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 12px;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: #45a049;
}
</style>
