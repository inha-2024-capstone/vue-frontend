<!--<template>-->
<!--  <div class="signup-container">-->
<!--    <div class="form-box">-->
<!--      &lt;!&ndash; 회원 정보 폼 &ndash;&gt;-->
<!--      <div class="form-frame">-->
<!--        <h1 class="form-title">회원 정보</h1>-->
<!--        <p class="form-description">계정을 확인합니다.</p>-->

<!--        <form @submit.prevent="handleSubmit">-->
<!--          &lt;!&ndash; 이메일 필드 &ndash;&gt;-->
<!--          <div class="text-field">-->
<!--            <label for="email" class="form-label">이메일</label>-->
<!--            <input-->
<!--              id="email"-->
<!--              type="email"-->
<!--              v-model="userInfo.email"-->
<!--              disabled-->
<!--              class="form-input"-->
<!--              readonly-->
<!--            />-->
<!--          </div>-->

<!--          &lt;!&ndash; 이름 필드 &ndash;&gt;-->
<!--          <div class="text-field">-->
<!--            <label for="username" class="form-label">이름</label>-->
<!--            <input-->
<!--              id="username"-->
<!--              type="text"-->
<!--              v-model="userInfo.username"-->
<!--              class="form-input"-->
<!--              readonly-->
<!--            />-->
<!--          </div>-->

<!--          &lt;!&ndash; 닉네임 필드 &ndash;&gt;-->
<!--          <div class="text-field">-->
<!--            <label for="nick_name" class="form-label">닉네임</label>-->
<!--            <input-->
<!--              id="nick_name"-->
<!--              type="text"-->
<!--              v-model="userInfo.nickName"-->
<!--              class="form-input"-->
<!--              readonly-->
<!--            />-->
<!--          </div>-->

<!--          &lt;!&ndash; 역할 선택 필드 &ndash;&gt;-->
<!--          <div class="text-field">-->
<!--            <label for="role" class="form-label">역할</label>-->
<!--            <select v-model="userInfo.role" class="form-input" disabled>-->
<!--              <option value="USER">사용자</option>-->
<!--              <option value="COMPANY">회사</option>-->
<!--              <option value="ADMIN">관리자</option>-->
<!--            </select>-->
<!--          </div>-->

<!--          &lt;!&ndash; 성별 선택 필드 &ndash;&gt;-->
<!--          <div class="text-field">-->
<!--            <label for="gender" class="form-label">성별</label>-->
<!--            <select v-model="userInfo.gender" class="form-input" disabled>-->
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
<!--              v-model="userInfo.phoneNumber"-->
<!--              class="form-input"-->
<!--              readonly-->
<!--            />-->
<!--          </div>-->

<!--          &lt;!&ndash; 주소 필드 &ndash;&gt;-->
<!--          <div class="text-field-address">-->
<!--            <label for="postal_code" class="form-label">우편번호</label>-->
<!--            <input-->
<!--              id="postal_code"-->
<!--              type="text"-->
<!--              v-model="userInfo.postalCode"-->
<!--              class="postal-code-field"-->
<!--              disabled-->
<!--            />-->
<!--            <label for="address" class="form-label">주소</label>-->
<!--            <input-->
<!--              id="address"-->
<!--              type="text"-->
<!--              v-model="userInfo.address"-->
<!--              class="address-field"-->
<!--              readonly-->
<!--            />-->
<!--          </div>-->

<!--          &lt;!&ndash; 제출 버튼 &ndash;&gt;-->
<!--          <button :disabled="isSubmitting" class="form-button">-->
<!--            {{ isSubmitting ? "저장 중..." : "저장하기" }}-->
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
<!--      userInfo: {-->
<!--        email: "",-->
<!--        username: "",-->
<!--        nickName: "",-->
<!--        gender: "",-->
<!--        phoneNumber: "",-->
<!--        postalCode: "",-->
<!--        address: "",-->
<!--      },-->
<!--      isSubmitting: false,-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    async fetchUserInfo() {-->
<!--      try {-->
<!--        const token = localStorage.getItem("access-token"); // 인증 토큰 가져오기-->
<!--        const response = await axios.get("https://yoger.o-r.kr/api/user/info", {-->
<!--          headers: {-->
<!--            Authorization: `Bearer ${token}`,-->
<!--          },-->
<!--        });-->

<!--        const result = response.data.result;-->
<!--        // address 파싱 (우편번호 + 주소)-->
<!--        const postalCode = result.address.substring(0, 5);-->
<!--        const address = result.address.substring(5);-->

<!--        this.userInfo = {-->
<!--          email: result.email,-->
<!--          username: result.username,-->
<!--          nickName: result.nickName,-->
<!--          gender: result.gender,-->
<!--          phoneNumber: result.phoneNumber,-->
<!--          postalCode,-->
<!--          address,-->
<!--        };-->
<!--      } catch (error) {-->
<!--        console.error("사용자 정보 로드 실패:", error);-->
<!--        this.$toast.error("사용자 정보를 가져오는 데 실패했습니다.");-->
<!--      }-->
<!--    },-->
<!--    async handleSubmit() {-->
<!--      this.isSubmitting = true;-->
<!--      try {-->
<!--        const token = localStorage.getItem("access-token");-->
<!--        await axios.put(-->
<!--          "https://yoger.o-r.kr/api/user/sign-up/info",-->
<!--          {-->
<!--            ...this.userInfo,-->
<!--            address: `${this.userInfo.postalCode}${this.userInfo.address}`,-->
<!--          },-->
<!--          {-->
<!--            headers: {-->
<!--              Authorization: `Bearer ${token}`,-->
<!--              "Content-Type": "application/json",-->
<!--            },-->
<!--          }-->
<!--        );-->
<!--        this.$toast.success("사용자 정보가 저장되었습니다!");-->
<!--      } catch (error) {-->
<!--        console.error("사용자 정보 저장 실패:", error);-->
<!--        this.$toast.error("사용자 정보를 저장하는 데 실패했습니다.");-->
<!--      } finally {-->
<!--        this.isSubmitting = false;-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--  created() {-->
<!--    this.fetchUserInfo();-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--/* CSS 그대로 유지 */-->
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

<!--.text-field,-->
<!--.text-field-address {-->
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
<!--</style>-->

<template>
  <div class="info-container">
    <div class="form-box">
      <div class="form-frame">
        <h1 class="form-title">
          {{ isCompany ? "회사 정보" : "회원 정보" }}
        </h1>
        <p class="form-description">
          {{
            isCompany
              ? "회사의 정보를 확인하고 관리합니다."
              : "계정을 확인합니다."
          }}
        </p>

        <!-- USER 정보 렌더링 -->
        <div v-if="!isCompany">
          <form @submit.prevent="handleSubmit">
            <!-- 이메일 필드 -->
            <div class="text-field">
              <label for="email" class="form-label">이메일</label>
              <input
                id="email"
                type="email"
                v-model="userInfo.email"
                disabled
                class="form-input"
                readonly
              />
            </div>

            <!-- 이름 필드 -->
            <div class="text-field">
              <label for="username" class="form-label">이름</label>
              <input
                id="username"
                type="text"
                v-model="userInfo.username"
                class="form-input"
                readonly
              />
            </div>

            <!-- 닉네임 필드 -->
            <div class="text-field">
              <label for="nick_name" class="form-label">닉네임</label>
              <input
                id="nick_name"
                type="text"
                v-model="userInfo.nickName"
                class="form-input"
                readonly
              />
            </div>

            <!-- 성별 선택 필드 -->
            <div class="text-field">
              <label for="gender" class="form-label">성별</label>
              <select v-model="userInfo.gender" class="form-input" disabled>
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
                v-model="userInfo.phoneNumber"
                class="form-input"
                readonly
              />
            </div>

            <!-- 주소 필드 -->
            <div class="text-field-address">
              <label for="postal_code" class="form-label">우편번호</label>
              <input
                id="postal_code"
                type="text"
                v-model="userInfo.postalCode"
                class="postal-code-field"
                disabled
              />
              <label for="address" class="form-label">주소</label>
              <input
                id="address"
                type="text"
                v-model="userInfo.address"
                class="address-field"
                readonly
              />
            </div>

            <!-- 제출 버튼 -->
            <button :disabled="isSubmitting" class="form-button">
              {{ isSubmitting ? "저장 중..." : "저장하기" }}
            </button>
          </form>
        </div>

        <!-- COMPANY 정보 렌더링 -->
        <div v-else>
          <div
            class="text-field"
            v-for="(value, key) in companyFields"
            :key="key"
          >
            <label :for="key" class="form-label">{{ key }}</label>
            <div class="form-input-group">
              <input
                :id="key"
                :type="key === 'description' ? 'textarea' : 'text'"
                v-model="companyInfo[key]"
                class="form-input"
                readonly
              />
              <!--              <button class="edit-button" @click="editField(key)">수정</button>-->
            </div>
          </div>

          <!--          Imageinput-->
          <div class="image-input-section">
            <label for="companyImage" class="form-label">회사 이미지</label>
            <div class="image-preview">
              <img
                v-if="companyInfo.imageUrl"
                :src="companyInfo.imageUrl"
                alt="Company Image"
                class="image-preview-thumbnail"
              />
              <p v-else class="no-image">이미지가 없습니다.</p>
            </div>
            <input
              id="companyImage"
              type="file"
              @change="handleImageUpload"
              class="form-input"
              accept="image/*"
            />
            <div class="image-buttons">
              <button
                @click="uploadImage"
                :disabled="isSubmitting"
                class="form-button"
              >
                {{ isSubmitting ? "업로드 중..." : "이미지 수정" }}
              </button>
              <button @click="deleteImage" class="form-button delete-button">
                이미지 삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      userInfo: {
        email: "",
        username: "",
        nickName: "",
        gender: "",
        phoneNumber: "",
        postalCode: "",
        address: "",
      },
      companyInfo: {
        companyName: "",
        email: "",
        phoneNumber: "",
        address: "",
        description: "",
        shortDescription: "",
      },
      companyFields: {
        companyName: "회사명",
        email: "이메일",
        phoneNumber: "전화번호",
        address: "주소",
        description: "상세 설명",
        shortDescription: "간단 설명",
      },
      isSubmitting: false,
    };
  },
  computed: {
    ...mapGetters(["userAuthorities"]), // authorities 상태를 가져옴
    isCompany() {
      return this.userAuthorities === "COMPANY"; // COMPANY 여부 확인
    },
  },
  methods: {
    handleImageUpload(event) {
      this.selectedImage = event.target.files[0];
    },
    async uploadImage() {
      if (!this.selectedImage) {
        this.$toast.error("이미지를 선택해주세요.");
        return;
      }

      this.isSubmitting = true;
      const formData = new FormData();
      formData.append("companyImage", this.selectedImage);

      try {
        const token = localStorage.getItem("access-token");
        const response = await axios.post(
          "https://yoger.o-r.kr/api/company/image",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.isSucceeded) {
          this.companyInfo.imageUrl =
            response.data.result?.imageUrl || this.companyInfo.imageUrl;
          this.$toast.success("이미지가 성공적으로 수정되었습니다.");

          // 이미지 업로드 후 회사 정보를 다시 가져오기
          await this.fetchUserInfo();
        } else {
          console.warn("이미지 업로드 응답:", response.data);
          this.$toast.error(
            response.data.message || "이미지 업로드에 실패했습니다."
          );
        }
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        this.$toast.error("이미지 업로드 중 오류가 발생했습니다.");
      } finally {
        this.isSubmitting = false;
      }
    },
    async deleteImage() {
      this.isSubmitting = true;

      try {
        const token = localStorage.getItem("access-token");
        await axios.delete("https://yoger.o-r.kr/api/company/image", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.companyInfo.imageUrl = null; // 이미지 삭제 후 URL 제거
        this.$toast.success("이미지가 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("이미지 삭제 실패:", error);
        this.$toast.error("이미지 삭제에 실패했습니다.");
      } finally {
        this.isSubmitting = false;
      }
    },
    async fetchUserInfo() {
      const endpoint = this.isCompany
        ? "https://yoger.o-r.kr/api/company/auth-info"
        : "https://yoger.o-r.kr/api/user/info";
      try {
        const token = localStorage.getItem("access-token");
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (this.isCompany) {
          this.companyInfo = response.data.result;
        } else {
          const result = response.data.result;
          const postalCode = result.address.substring(0, 5);
          const address = result.address.substring(5);
          this.userInfo = {
            ...result,
            postalCode,
            address,
          };
        }
      } catch (error) {
        console.error(
          `${this.isCompany ? "회사" : "사용자"} 정보 로드 실패:`,
          error
        );
        this.$toast.error(
          `${
            this.isCompany ? "회사" : "사용자"
          } 정보를 가져오는 데 실패했습니다.`
        );
      }
    },
    async handleSubmit() {
      this.isSubmitting = true;
      try {
        const token = localStorage.getItem("access-token");
        const endpoint = "https://yoger.o-r.kr/api/user/sign-up/info";
        await axios.put(
          endpoint,
          {
            ...this.userInfo,
            address: `${this.userInfo.postalCode}${this.userInfo.address}`,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        this.$toast.success("사용자 정보가 저장되었습니다!");
      } catch (error) {
        console.error("사용자 정보 저장 실패:", error);
        this.$toast.error("사용자 정보를 저장하는 데 실패했습니다.");
      } finally {
        this.isSubmitting = false;
      }
    },
    editField(key) {
      console.log(`${key} 수정 클릭됨`);
    },
  },
  created() {
    this.fetchUserInfo();
  },
};
</script>

<style scoped>
/* CSS 그대로 유지 */
.info-container {
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

.text-field,
.text-field-address {
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

.image-input-section {
  padding-top: 20px;
}

.image-preview {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.image-preview-thumbnail {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.no-image {
  color: #999;
  font-size: 14px;
}

.image-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  padding-top: 10px;
}

.small-button {
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.small-button:hover {
  background-color: #0056b3;
}

.delete-button {
  background-color: #ff4d4f;
  padding-top: 10px;
}

.delete-button:hover {
  background-color: #d4001a;
}
</style>
