<!--<template>-->
<!--  <div class="product-container" v-if="!isCompany">-->
<!--    <div class="form-box">-->
<!--      <div class="form-frame">-->
<!--        <h1 class="form-title">상품 등록</h1>-->
<!--        <p class="form-description">상품 정보를 입력해주세요.</p>-->

<!--        <form @submit.prevent="handleSubmit">-->
<!--          &lt;!&ndash; 상품 이름 필드 &ndash;&gt;-->
<!--          <div class="text-field">-->
<!--            <label for="name" class="form-label">상품 이름</label>-->
<!--            <input-->
<!--              id="name"-->
<!--              type="text"-->
<!--              v-model="name"-->
<!--              required-->
<!--              placeholder="상품 이름 입력"-->
<!--              class="form-input"-->
<!--            />-->
<!--          </div>-->

<!--          &lt;!&ndash; 상품 설명 필드 &ndash;&gt;-->
<!--          <div class="text-field">-->
<!--            <label for="description" class="form-label">상품 설명</label>-->
<!--            <input-->
<!--              id="description"-->
<!--              type="text"-->
<!--              v-model="description"-->
<!--              required-->
<!--              placeholder="상품 설명 입력"-->
<!--              class="form-input"-->
<!--            />-->
<!--          </div>-->

<!--          &lt;!&ndash; 상품 이미지 업로드 필드 &ndash;&gt;-->
<!--          <div class="text-field">-->
<!--            <label for="image" class="form-label">상품 이미지</label>-->
<!--            <input-->
<!--              id="image"-->
<!--              type="file"-->
<!--              @change="handleFileUpload('image', $event)"-->
<!--              accept="image/jpeg, image/png, image/gif"-->
<!--              required-->
<!--              class="form-input"-->
<!--            />-->
<!--          </div>-->

<!--          &lt;!&ndash; 썸네일 이미지 업로드 필드 &ndash;&gt;-->
<!--          <div class="text-field">-->
<!--            <label for="thumbnailImage" class="form-label">썸네일 이미지</label>-->
<!--            <input-->
<!--              id="thumbnailImage"-->
<!--              type="file"-->
<!--              @change="handleFileUpload('thumbnailImage', $event)"-->
<!--              accept="image/jpeg, image/png, image/gif"-->
<!--              required-->
<!--              class="form-input"-->
<!--            />-->
<!--          </div>-->

<!--          &lt;!&ndash; 상품 제작자 ID 필드 &ndash;&gt;-->
<!--          &lt;!&ndash;          <div class="text-field">&ndash;&gt;-->
<!--          &lt;!&ndash;            <label for="creatorId" class="form-label">상품 제작자 ID</label>&ndash;&gt;-->
<!--          &lt;!&ndash;            <input&ndash;&gt;-->
<!--          &lt;!&ndash;              id="creatorId"&ndash;&gt;-->
<!--          &lt;!&ndash;              type="=text"&ndash;&gt;-->
<!--          &lt;!&ndash;              v-model="creatorId"&ndash;&gt;-->
<!--          &lt;!&ndash;              required&ndash;&gt;-->
<!--          &lt;!&ndash;              placeholder="상품 제작자 ID 입력"&ndash;&gt;-->
<!--          &lt;!&ndash;              class="form-input"&ndash;&gt;-->
<!--          &lt;!&ndash;            />&ndash;&gt;-->
<!--          &lt;!&ndash;          </div>&ndash;&gt;-->

<!--          &lt;!&ndash; 상품 제작자 이름 필드 &ndash;&gt;-->
<!--          <div class="text-field">-->
<!--            <label for="creatorName" class="form-label">상품 제작자 이름</label>-->
<!--            <input-->
<!--              id="creatorName"-->
<!--              type="text"-->
<!--              v-model="creatorName"-->
<!--              required-->
<!--              placeholder="상품 제작자 이름 입력"-->
<!--              class="form-input"-->
<!--            />-->
<!--          </div>-->

<!--          &lt;!&ndash; 제출 버튼 &ndash;&gt;-->
<!--          <button :disabled="isSubmitting" class="form-button">-->
<!--            {{ isSubmitting ? "등록 중..." : "상품 등록" }}-->
<!--          </button>-->
<!--        </form>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div v-else class="error-message">일반 회원에게만 허락된 기능입니다.</div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from "axios";-->
<!--import { mapState } from "vuex";-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      name: "",-->
<!--      description: "",-->
<!--      image: null,-->
<!--      thumbnailImage: null,-->
<!--      // creatorId: null,-->
<!--      creatorName: "",-->
<!--      isSubmitting: false,-->
<!--    };-->
<!--  },-->
<!--  computed: {-->
<!--    // Vuex의 authorities 상태를 가져옴-->
<!--    ...mapState(["authorities"]),-->

<!--    isCompany() {-->
<!--      return this.authorities.includes("COMPANY");-->
<!--    },-->
<!--  },-->
<!--  methods: {-->
<!--    handleFileUpload(fieldName, event) {-->
<!--      const file = event.target.files[0];-->
<!--      if (fieldName === "image") {-->
<!--        this.image = file;-->
<!--      } else if (fieldName === "thumbnailImage") {-->
<!--        this.thumbnailImage = file;-->
<!--      }-->
<!--    },-->
<!--    async handleSubmit() {-->
<!--      this.isSubmitting = true;-->
<!--      const formData = new FormData();-->
<!--      formData.append("name", this.name);-->
<!--      formData.append("description", this.description);-->
<!--      formData.append("image", this.image);-->
<!--      formData.append("thumbnailImage", this.thumbnailImage);-->
<!--      // formData.append("creatorId", localStorage.getItem("userId"));-->
<!--      formData.append("creatorName", this.creatorName);-->

<!--      try {-->
<!--        const accessToken = localStorage.getItem("access-token");-->

<!--        const response = await axios.post(-->
<!--          "https://yoger.o-r.kr/api/products/demo",-->
<!--          formData,-->
<!--          {-->
<!--            headers: {-->
<!--              "Content-Type": "multipart/form-data",-->
<!--              Authorization: `Bearer ${accessToken}`,-->
<!--            },-->
<!--          }-->
<!--        );-->
<!--        console.log("상품 등록 성공:", response.data);-->
<!--        this.$toast.success("상품 등록이 완료되었습니다!");-->
<!--      } catch (error) {-->
<!--        console.error("상품 등록 실패:", error);-->
<!--        this.$toast.error("상품 등록에 실패했습니다.");-->
<!--      } finally {-->
<!--        this.isSubmitting = false;-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style>-->
<!--/* 전체 컨테이너 스타일 */-->
<!--.product-container {-->
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

<!--.error-message {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: start;-->
<!--  min-height: 100vh;-->
<!--  font-size: 18px;-->
<!--  color: black;-->
<!--  font-weight: bold;-->
<!--}-->
<!--</style>-->

<template>
  <div v-if="!isLoggedIn" class="error-message">로그인이 필요합니다.</div>
  <div v-else-if="!isCompany" class="product-container">
    <div class="form-box">
      <div class="form-frame">
        <h1 class="form-title">상품 등록</h1>
        <p class="form-description">상품 정보를 입력해주세요.</p>

        <form @submit.prevent="handleSubmit">
          <!-- 상품 이름 필드 -->
          <div class="text-field">
            <label for="name" class="form-label">상품 이름</label>
            <input
              id="name"
              type="text"
              v-model="name"
              required
              placeholder="상품 이름 입력"
              class="form-input"
            />
          </div>
          <span
            v-if="!/^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9-_]+$/.test(name)"
            class="error-text"
          >
            상품 이름은 한글, 영어, 숫자, '-', '_'만 사용할 수 있습니다.
          </span>

          <!-- 상품 설명 필드 -->
          <div class="text-field">
            <label for="description" class="form-label">상품 설명</label>
            <input
              id="description"
              type="text"
              v-model="description"
              required
              placeholder="상품 설명 입력"
              class="form-input"
            />
          </div>
          <span v-if="description.length <= 10" class="error-text">
            상품 상세설명은 10글자를 넘어야 합니다.
          </span>

          <!-- 상품 이미지 업로드 필드 -->
          <div class="text-field">
            <label for="image" class="form-label">상품 이미지</label>
            <input
              id="image"
              type="file"
              @change="handleFileUpload('image', $event)"
              accept="image/jpeg, image/png, image/gif"
              required
              class="form-input"
            />
          </div>

          <!-- 썸네일 이미지 업로드 필드 -->
          <div class="text-field">
            <label for="thumbnailImage" class="form-label">썸네일 이미지</label>
            <input
              id="thumbnailImage"
              type="file"
              @change="handleFileUpload('thumbnailImage', $event)"
              accept="image/jpeg, image/png, image/gif"
              required
              class="form-input"
            />
          </div>

          <!-- 상품 제작자 이름 필드 -->
          <div class="text-field">
            <label for="creatorName" class="form-label">상품 제작자 이름</label>
            <input
              id="creatorName"
              type="text"
              v-model="creatorName"
              required
              placeholder="상품 제작자 이름 입력"
              class="form-input"
            />
          </div>

          <!-- 제출 버튼 -->
          <button :disabled="isSubmitting" class="form-button">
            {{ isSubmitting ? "등록 중..." : "상품 등록" }}
          </button>
        </form>
      </div>
    </div>
  </div>
  <div v-else class="error-message">일반 회원에게만 허락된 기능입니다.</div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      name: "",
      description: "",
      image: null,
      thumbnailImage: null,
      creatorName: "",
      isSubmitting: false,
    };
  },
  computed: {
    // Vuex의 상태를 가져옴
    ...mapState(["authorities", "isLoggedIn"]),

    isCompany() {
      return this.authorities.includes("COMPANY");
    },
  },
  methods: {
    validateInput() {
      const nameRegex = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9-_]+$/; // 한글, 영어, 숫자, '-', '_'
      const errors = [];

      if (!nameRegex.test(this.name)) {
        errors.push(
          "상품 이름은 한글, 영어, 숫자, '-', '_'만 사용할 수 있습니다."
        );
      }

      if (this.description.length <= 10) {
        errors.push("상품 상세설명은 10글자를 넘어야 합니다.");
      }

      return errors;
    },
    handleFileUpload(fieldName, event) {
      const file = event.target.files[0];
      if (fieldName === "image") {
        this.image = file;
      } else if (fieldName === "thumbnailImage") {
        this.thumbnailImage = file;
      }
    },
    async handleSubmit() {
      this.isSubmitting = true;
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("description", this.description);
      formData.append("image", this.image);
      formData.append("thumbnailImage", this.thumbnailImage);
      formData.append("creatorName", this.creatorName);

      try {
        const accessToken = localStorage.getItem("access-token");

        const response = await axios.post(
          "https://yoger.o-r.kr/api/products/demo",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("상품 등록 성공:", response.data);
        this.$toast.success("상품 등록이 완료되었습니다!");
      } catch (error) {
        console.error("상품 등록 실패:", error);
        this.$toast.error("상품 등록에 실패했습니다.");
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style>
.product-container {
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

.error-message {
  display: flex;
  justify-content: center;
  align-items: start;
  min-height: 100vh;
  font-size: 18px;
  color: black;
  font-weight: bold;
}
/* 스타일은 기존 코드 유지 */
.error-message {
  display: flex;
  justify-content: center;
  align-items: start;
  min-height: 100vh;
  font-size: 18px;
  color: black;
  font-weight: bold;
}
.error-text {
  color: red;
  font-size: 14px;
  margin-top: 4px;
  display: block;
}
</style>
