<!--<template>-->
<!--  <div class="signup-container">-->
<!--    <div class="form-box">-->
<!--      &lt;!&ndash; 회원가입 폼 &ndash;&gt;-->
<!--      <div class="form-frame">-->
<!--        <h1 class="form-title">회원 가입</h1>-->
<!--        <p class="form-description">계정을 만들기 위해 양식을 작성해주세요.</p>-->

<!--        <form @submit.prevent="handleSubmit">-->
<!--          &lt;!&ndash; 이메일 필드 &ndash;&gt;-->
<!--          <div class="text-field">-->
<!--            <label for="email" class="form-label">이메일</label>-->
<!--            <input-->
<!--              id="email"-->
<!--              type="email"-->
<!--              v-model="email"-->
<!--              required-->
<!--              placeholder="이메일 입력"-->
<!--              class="form-input"-->
<!--            />-->
<!--          </div>-->

<!--          &lt;!&ndash; 이름 필드 &ndash;&gt;-->
<!--          <div class="text-field">-->
<!--            <label for="username" class="form-label">이름</label>-->
<!--            <input-->
<!--              id="username"-->
<!--              type="text"-->
<!--              :value="username"-->
<!--              @input="username = $event.target.value"-->
<!--              required-->
<!--              placeholder="이름 입력"-->
<!--              class="form-input"-->
<!--            />-->
<!--          </div>-->

<!--          &lt;!&ndash; 닉네임 필드 &ndash;&gt;-->
<!--          <div class="text-field">-->
<!--            <label for="nick_name" class="form-label">닉네임</label>-->
<!--            <input-->
<!--              id="nick_name"-->
<!--              type="text"-->
<!--              :value="nick_name"-->
<!--              @input="nick_name = $event.target.value"-->
<!--              placeholder="닉네임 입력"-->
<!--              class="form-input"-->
<!--            />-->
<!--          </div>-->

<!--          &lt;!&ndash; 비밀번호 필드 &ndash;&gt;-->
<!--          <div class="text-field password-field">-->
<!--            <label for="password" class="form-label">비밀번호</label>-->
<!--            <input-->
<!--              id="password"-->
<!--              type="password"-->
<!--              v-model="password"-->
<!--              required-->
<!--              placeholder="비밀번호 입력"-->
<!--              class="form-input"-->
<!--              @input="handlePasswordChange"-->
<!--            />-->
<!--            &lt;!&ndash;            <p v-if="passwordError" class="error-message">&ndash;&gt;-->
<!--            &lt;!&ndash;              {{ passwordError }}&ndash;&gt;-->
<!--            &lt;!&ndash;            </p>&ndash;&gt;-->
<!--            <div class="password-requirements">-->
<!--              <p>• 비밀번호는 10글자 이상으로 입력해주세요</p>-->
<!--            </div>-->
<!--          </div>-->

<!--          &lt;!&ndash; 역할 선택 필드 &ndash;&gt;-->
<!--          <div class="text-field">-->
<!--            <label for="role" class="form-label">역할</label>-->
<!--            <select v-model="role" required class="form-input">-->
<!--              <option disabled value="">역할을 선택하세요</option>-->
<!--              <option value="USER">사용자</option>-->
<!--              <option value="COMPANY">회사</option>-->
<!--              <option value="ADMIN">관리자</option>-->
<!--            </select>-->
<!--          </div>-->

<!--          &lt;!&ndash; 성별 선택 필드 &ndash;&gt;-->
<!--          <div class="text-field">-->
<!--            <label for="gender" class="form-label">성별</label>-->
<!--            <select v-model="gender" required class="form-input">-->
<!--              <option disabled value="">성별을 선택하세요</option>-->
<!--              <option value="MALE">남성</option>-->
<!--              <option value="FEMALE">여성</option>-->
<!--            </select>-->
<!--          </div>-->

<!--          &lt;!&ndash; 연락처 필드 &ndash;&gt;-->
<!--          <div class="text-field">-->
<!--            <label for="phone_number" class="form-label">핸드폰 번호</label>-->
<!--            <input-->
<!--              id="phone_number"-->
<!--              type="text"-->
<!--              v-model="phone_number"-->
<!--              required-->
<!--              placeholder="핸드폰 번호 입력"-->
<!--              class="form-input"-->
<!--              @input="phoneErrorCheck"-->
<!--            />-->
<!--          </div>-->
<!--          <p>{{ phoneError }}</p>-->

<!--          &lt;!&ndash; 주소 필드 &ndash;&gt;-->
<!--          <div class="text-field-address">-->
<!--            <label for="postal_code" class="form-label">우편번호</label>-->
<!--            <input-->
<!--              id="postal_code"-->
<!--              type="text"-->
<!--              v-model="postal_code"-->
<!--              placeholder="우편번호"-->
<!--              class="postal-code-field"-->
<!--            />-->
<!--            <label for="address" class="form-label">주소</label>-->
<!--            <input-->
<!--              id="address"-->
<!--              type="text"-->
<!--              v-model="address"-->
<!--              placeholder="주소 입력"-->
<!--              class="address-field"-->
<!--            />-->
<!--            <button type="button" class="search-button" @click="openPostcode">-->
<!--              주소 검색-->
<!--            </button>-->
<!--            <div v-if="isPostcodeOpen" class="modal-overlay">-->
<!--              <div class="modal">-->
<!--                <VueDaumPostcode-->
<!--                  @complete="onCompletePostcode"-->
<!--                  @close="closePostcode"-->
<!--                />-->
<!--                <button @click="closePostcode" class="close-button">-->
<!--                  <font-awesome-icon icon="times" />-->
<!--                </button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

<!--          &lt;!&ndash; 상세주소 필드 &ndash;&gt;-->
<!--          <div class="text-field">-->
<!--            <label for="detailed_address" class="form-label">상세 주소</label>-->
<!--            <input-->
<!--              id="detailed_address"-->
<!--              type="text"-->
<!--              :value="detailed_address"-->
<!--              @input="detailed_address = $event.target.value"-->
<!--              placeholder="상세 주소 입력"-->
<!--              class="form-input"-->
<!--            />-->
<!--          </div>-->

<!--          &lt;!&ndash; 프로필 사진 URL 필드 &ndash;&gt;-->
<!--          &lt;!&ndash;          <div class="text-field">&ndash;&gt;-->
<!--          &lt;!&ndash;            <label for="image_url" class="form-label">프로필 사진 URL</label>&ndash;&gt;-->
<!--          &lt;!&ndash;            <input&ndash;&gt;-->
<!--          &lt;!&ndash;              id="image_url"&ndash;&gt;-->
<!--          &lt;!&ndash;              type="text"&ndash;&gt;-->
<!--          &lt;!&ndash;              v-model="image_url"&ndash;&gt;-->
<!--          &lt;!&ndash;              placeholder="프로필 사진 URL 입력"&ndash;&gt;-->
<!--          &lt;!&ndash;              class="form-input"&ndash;&gt;-->
<!--          &lt;!&ndash;            />&ndash;&gt;-->
<!--          &lt;!&ndash;          </div>&ndash;&gt;-->

<!--          &lt;!&ndash; 로그인 소스 필드 (THIS로 고정) &ndash;&gt;-->
<!--          &lt;!&ndash;          <div class="text-field">&ndash;&gt;-->
<!--          &lt;!&ndash;            <label for="login_source" class="form-label">로그인 소스</label>&ndash;&gt;-->
<!--          &lt;!&ndash;            <input&ndash;&gt;-->
<!--          &lt;!&ndash;              id="login_source"&ndash;&gt;-->
<!--          &lt;!&ndash;              type="text"&ndash;&gt;-->
<!--          &lt;!&ndash;              value="THIS"&ndash;&gt;-->
<!--          &lt;!&ndash;              disabled&ndash;&gt;-->
<!--          &lt;!&ndash;              class="form-input"&ndash;&gt;-->
<!--          &lt;!&ndash;            />&ndash;&gt;-->
<!--          &lt;!&ndash;          </div>&ndash;&gt;-->

<!--          &lt;!&ndash; 제출 버튼 &ndash;&gt;-->
<!--          <button :disabled="isSubmitting" class="form-button">-->
<!--            {{ isSubmitting ? "회원가입 중..." : "회원가입" }}-->
<!--          </button>-->
<!--        </form>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from "axios";-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      email: "",-->
<!--      username: "",-->
<!--      password: "",-->
<!--      role: "",-->
<!--      gender: "",-->
<!--      phone_number: "",-->
<!--      address: "",-->
<!--      postal_code: "",-->
<!--      detailed_address: "",-->
<!--      nick_name: "",-->
<!--      image_url: "",-->
<!--      passwordError: "",-->
<!--      phoneError: "",-->
<!--      isSubmitting: false,-->
<!--      isPostcodeOpen: false, // 주소 검색창 상태-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    async handleSubmit() {-->
<!--      if (this.passwordError) {-->
<!--        return;-->
<!--      }-->
<!--      this.isSubmitting = true;-->
<!--      try {-->
<!--        // 회원가입 요청-->
<!--        const response = await axios.post(-->
<!--          "https://yoger.o-r.kr/api/user/sign-up",-->
<!--          {-->
<!--            email: this.email,-->
<!--            username: this.username,-->
<!--            password: this.password,-->
<!--            role: this.role,-->
<!--            gender: this.gender,-->
<!--            phoneNumber: this.phone_number,-->
<!--            address: this.postal_code + this.address + this.detailed_address,-->
<!--            // postal_code: this.postal_code,-->
<!--            // detailed_address: this.detailed_address,-->
<!--            nickName: this.nick_name,-->
<!--            //image_url: this.image_url,-->
<!--            loginSource: "THIS", // 고정값-->
<!--          },-->
<!--          {-->
<!--            headers: {-->
<!--              "Content-Type": "application/json",-->
<!--            },-->

<!--            withCredentials: false, // 자격 증명을 포함하지 않음 (기본값)-->
<!--          }-->
<!--        );-->

<!--        console.log("회원가입 성공:", response.data);-->
<!--        this.$toast.success("회원가입이 완료되었습니다!");-->
<!--      } catch (error) {-->
<!--        console.error("회원가입 실패:", error);-->
<!--        this.$toast.error("회원가입에 실패했습니다.");-->
<!--      } finally {-->
<!--        this.isSubmitting = false;-->
<!--        this.$router.push("/");-->
<!--      }-->
<!--    },-->
<!--    openPostcode() {-->
<!--      this.isPostcodeOpen = true; // 주소 검색창 열기-->
<!--    },-->
<!--    onCompletePostcode(data) {-->
<!--      this.postal_code = data.zonecode; // 우편번호 저장-->
<!--      this.address = data.address; // 주소 저장-->
<!--      this.isPostcodeOpen = false; // 검색창 닫기-->
<!--    },-->
<!--    closePostcode() {-->
<!--      this.isPostcodeOpen = false; // 검색창 닫기-->
<!--    },-->
<!--    handlePasswordChange(event) {-->
<!--      if (event.target.value.length < 10) {-->
<!--        this.passwordError = "10글자 이상 입력해주세요";-->
<!--      } else {-->
<!--        this.passwordError = "";-->
<!--      }-->
<!--    },-->
<!--    phoneErrorCheck(event) {-->
<!--      const phoneInput = event.target.value;-->
<!--      const phoneRegex = /^010-\d{4}-\d{4}$/; // 전화번호 형식 정규식-->

<!--      if (!phoneRegex.test(phoneInput)) {-->
<!--        this.phoneError = "010-xxxx-xxxx 형식을 맞춰주세요";-->
<!--      } else {-->
<!--        this.phoneError = "";-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style>-->
<!--/* 전체 컨테이너 스타일 */-->
<!--.signup-container {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  min-height: 100vh;-->
<!--  background-color: #ffffff;-->
<!--}-->

<!--.form-box {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  align-items: center;-->
<!--  padding: 40px;-->
<!--  background-color: #ffffff;-->
<!--  border: 1px solid rgba(102, 102, 102, 0.3);-->
<!--  border-radius: 32px;-->
<!--  width: 60%;-->
<!--  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);-->
<!--}-->

<!--.form-frame {-->
<!--  width: 100%;-->
<!--}-->

<!--.form-title {-->
<!--  font-family: "Poppins", sans-serif;-->
<!--  font-size: 32px;-->
<!--  font-weight: 500;-->
<!--  text-align: center;-->
<!--  color: #333333;-->
<!--  margin-bottom: 8px;-->
<!--}-->

<!--.form-description {-->
<!--  font-family: "Poppins", sans-serif;-->
<!--  font-size: 16px;-->
<!--  font-weight: 400;-->
<!--  text-align: center;-->
<!--  color: #666666;-->
<!--  margin-bottom: 40px;-->
<!--}-->

<!--.text-field {-->
<!--  margin-bottom: 24px;-->
<!--}-->

<!--.form-label {-->
<!--  font-family: "Poppins", sans-serif;-->
<!--  font-size: 16px;-->
<!--  font-weight: 400;-->
<!--  color: #666666;-->
<!--  margin-bottom: 8px;-->
<!--  display: block;-->
<!--}-->

<!--.form-input {-->
<!--  width: 100%;-->
<!--  padding: 12px;-->
<!--  border: 1px solid #666666;-->
<!--  border-radius: 12px;-->
<!--  font-size: 16px;-->
<!--  box-sizing: border-box;-->
<!--}-->

<!--.form-button {-->
<!--  width: 100%;-->
<!--  padding: 12px;-->
<!--  background-color: #111111;-->
<!--  color: white;-->
<!--  border: none;-->
<!--  border-radius: 40px;-->
<!--  font-size: 18px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.form-button:disabled {-->
<!--  background-color: gray;-->
<!--}-->

<!--.login-link-box {-->
<!--  margin-top: 20px;-->
<!--  text-align: center;-->
<!--}-->

<!--.login-link {-->
<!--  color: #333333;-->
<!--  font-size: 16px;-->
<!--  text-decoration: none;-->
<!--}-->

<!--.login-link:hover {-->
<!--  text-decoration: underline;-->
<!--}-->

<!--.error-message {-->
<!--  color: #ee1d52;-->
<!--  font-size: 14px;-->
<!--  margin-top: 4px;-->
<!--}-->

<!--.password-requirements {-->
<!--  font-size: 12px;-->
<!--  color: #666666;-->
<!--  margin-top: 8px;-->
<!--}-->

<!--/* 주소 필드 컨테이너: 한 줄에 배치 및 비율 설정 */-->
<!--.text-field-address {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  margin-bottom: 24px;-->
<!--  gap: 10px; /* 필드 간격 추가 */-->
<!--}-->

<!--.text-field-address input {-->
<!--  padding: 12px;-->
<!--  border-radius: 12px;-->
<!--  border: 1px solid #666666;-->
<!--  font-size: 16px;-->
<!--  box-sizing: border-box;-->
<!--}-->

<!--.postal-code-field {-->
<!--  flex: 4.5;-->
<!--}-->

<!--.address-field {-->
<!--  flex: 4.5;-->
<!--}-->

<!--.search-button {-->
<!--  flex: 1;-->
<!--  padding: 12px;-->
<!--  background-color: #4caf50;-->
<!--  color: white;-->
<!--  cursor: pointer;-->
<!--  border: none;-->
<!--  border-radius: 12px;-->
<!--  transition: background-color 0.3s ease;-->
<!--}-->

<!--.search-button:hover {-->
<!--  background-color: #45a049;-->
<!--}-->

<!--/* 모달 스타일 */-->
<!--.modal {-->
<!--  max-height: 80%; /* 최대 높이를 설정 */-->
<!--  width: 40%;-->
<!--  overflow-y: auto; /* 세로 스크롤 활성화 */-->
<!--  position: fixed;-->
<!--  top: 50%;-->
<!--  left: 50%;-->
<!--  transform: translate(-50%, -50%);-->
<!--  background-color: white;-->
<!--  border-radius: 10px;-->
<!--  padding: 20px;-->
<!--  z-index: 1000;-->
<!--  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);-->
<!--}-->

<!--.modal-overlay {-->
<!--  position: fixed;-->
<!--  top: 0;-->
<!--  left: 0;-->
<!--  right: 0;-->
<!--  bottom: 0;-->
<!--  background-color: rgba(0, 0, 0, 0.5);-->
<!--  z-index: 999;-->
<!--}-->

<!--.close-button {-->
<!--  position: absolute;-->
<!--  top: 10px;-->
<!--  right: 10px;-->
<!--  background: none;-->
<!--  border: none;-->
<!--  font-size: 20px;-->
<!--  cursor: pointer;-->
<!--}-->
<!--</style>-->

<template>
  <div class="signup-container">
    <div class="form-box">
      <div class="form-frame">
        <h1 class="form-title">회원 가입</h1>
        <p class="form-description">계정을 만들기 위해 양식을 작성해주세요.</p>

        <!-- 역할 선택 영역 -->
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
          <!-- 사용자용 필드: role === 'USER'일 때만 표시 -->
          <template v-if="role === 'USER'">
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
              />
            </div>

            <!-- 이름 필드 -->
            <div class="text-field">
              <label for="username" class="form-label">이름</label>
              <input
                id="username"
                type="text"
                :value="username"
                @input="username = $event.target.value"
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
                :value="nick_name"
                @input="nick_name = $event.target.value"
                placeholder="닉네임 입력"
                class="form-input"
              />
            </div>

            <!-- 비밀번호 필드 -->
            <div class="text-field password-field">
              <label for="password" class="form-label">비밀번호</label>
              <input
                id="password"
                type="password"
                v-model="password"
                required
                placeholder="비밀번호 입력"
                class="form-input"
                @input="handlePasswordChange"
              />
              <div class="password-requirements">
                <p>• 비밀번호는 10글자 이상으로 입력해주세요</p>
              </div>
            </div>

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
                id="phone_number"
                type="text"
                v-model="phone_number"
                required
                placeholder="010-xxxx-xxxx"
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
                :value="detailed_address"
                @input="detailed_address = $event.target.value"
                placeholder="상세 주소 입력"
                class="form-input"
              />
            </div>
          </template>

          <!-- 회사용 필드: role === 'COMPANY'일 때만 표시 -->
          <template v-else-if="role === 'COMPANY'">
            <!-- 회사명 -->
            <div class="text-field">
              <label class="form-label">회사명</label>
              <input
                type="text"
                v-model="companyName"
                required
                placeholder="회사명 입력"
                class="form-input"
              />
            </div>

            <!-- 이메일 -->
            <div class="text-field">
              <label class="form-label">이메일</label>
              <input
                type="email"
                v-model="email"
                required
                placeholder="이메일 입력"
                class="form-input"
              />
            </div>

            <!-- 비밀번호 -->
            <div class="text-field password-field">
              <label class="form-label">비밀번호</label>
              <input
                type="password"
                v-model="password"
                required
                placeholder="비밀번호 입력"
                class="form-input"
                @input="handlePasswordChange"
              />
              <div class="password-requirements">
                <p>• 비밀번호는 10글자 이상으로 입력해주세요</p>
              </div>
            </div>

            <!-- 연락처 -->
            <div class="text-field">
              <label class="form-label">
                {{ role === "COMPANY" ? "전화번호" : "핸드폰 번호" }}
              </label>
              <input
                type="text"
                v-model="phone_number"
                required
                :placeholder="
                  role === 'COMPANY' ? '02-xxx-xxxx' : '010-xxxx-xxxx'
                "
                class="form-input"
                @input="phoneErrorCheck"
              />
              <p>{{ phoneError }}</p>
            </div>

            주소

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
                :value="detailed_address"
                @input="detailed_address = $event.target.value"
                placeholder="상세 주소 입력"
                class="form-input"
              />
            </div>

            <!--            <div class="text-field-address">-->
            <!--              <label class="form-label">우편번호</label>-->
            <!--              <input-->
            <!--                type="text"-->
            <!--                v-model="postal_code"-->
            <!--                placeholder="우편번호"-->
            <!--                class="postal-code-field"-->
            <!--              />-->
            <!--              <label class="form-label">주소</label>-->
            <!--              <input-->
            <!--                type="text"-->
            <!--                v-model="address"-->
            <!--                placeholder="주소 입력"-->
            <!--                class="address-field"-->
            <!--              />-->
            <!--              <button type="button" class="search-button" @click="openPostcode">-->
            <!--                주소 검색-->
            <!--              </button>-->
            <!--              <div v-if="isPostcodeOpen" class="modal-overlay">-->
            <!--                <div class="modal">-->
            <!--                  <VueDaumPostcode-->
            <!--                    @complete="onCompletePostcode"-->
            <!--                    @close="closePostcode"-->
            <!--                  />-->
            <!--                  <button @click="closePostcode" class="close-button">-->
            <!--                    <font-awesome-icon icon="times" />-->
            <!--                  </button>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->

            <!-- 짧은 설명 -->
            <div class="text-field">
              <label class="form-label">짧은 설명</label>
              <input
                type="text"
                v-model="shortDescription"
                placeholder="간단한 회사 소개"
                class="form-input"
              />
            </div>

            <!-- 상세 설명 -->
            <div class="text-field">
              <label class="form-label">상세 설명</label>
              <textarea
                v-model="description"
                placeholder="회사 상세 설명"
                class="form-input"
                style="height: 100px"
              ></textarea>
            </div>
          </template>

          <!-- 제출 버튼: role이 선택되어야 렌더링되도록 조건 추가 가능 -->
          <button :disabled="isSubmitting || !role" class="form-button">
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
      password: "",
      gender: "",
      phone_number: "",
      address: "",
      postal_code: "",
      detailed_address: "",
      nick_name: "",
      image_url: "",
      passwordError: "",
      phoneError: "",
      isSubmitting: false,
      isPostcodeOpen: false,
      role: "", // USER or COMPANY
      // 회사용 필드
      companyName: "",
      shortDescription: "",
      description: "",
    };
  },
  methods: {
    async handleSubmit() {
      if (this.passwordError) {
        return;
      }
      this.isSubmitting = true;
      let url = "https://yoger.o-r.kr/api/user/sign-up"; // 기본 URL
      try {
        let payload;
        if (this.role === "USER") {
          payload = {
            email: this.email,
            username: this.username,
            password: this.password,
            role: this.role,
            gender: this.gender,
            phoneNumber: this.phone_number,
            address:
              this.postal_code +
              " " +
              this.address +
              " " +
              this.detailed_address,
            nickName: this.nick_name,
            loginSource: "THIS",
          };
        } else if (this.role === "COMPANY") {
          // COMPANY일 경우 URL 변경
          url = "https://yoger.o-r.kr/api/company/sign-up";
          payload = {
            companyName: this.companyName,
            email: this.email,
            password: this.password,
            phoneNumber: this.phone_number,
            address:
              this.postal_code +
              " " +
              this.address +
              " " +
              this.detailed_address,
            shortDescription: this.shortDescription,
            description: this.description,
          };
        }

        const response = await axios.post(url, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("회원가입 성공:", response.data);
        this.$toast.success("회원가입이 완료되었습니다!");
        this.$router.push("/");
      } catch (error) {
        console.error("회원가입 실패:", error);
        this.$toast.error("회원가입에 실패했습니다.");
      } finally {
        this.isSubmitting = false;
      }
    },
    openPostcode() {
      this.isPostcodeOpen = true;
    },
    onCompletePostcode(data) {
      this.postal_code = data.zonecode;
      this.address = data.address;
      this.isPostcodeOpen = false;
    },
    closePostcode() {
      this.isPostcodeOpen = false;
    },
    handlePasswordChange(event) {
      if (event.target.value.length < 10) {
        this.passwordError = "10글자 이상 입력해주세요";
      } else {
        this.passwordError = "";
      }
    },
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
