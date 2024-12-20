<template>
  <div class="product-container">
    <div class="form-box">
      <div class="form-frame">
        <h1 class="form-title">상품 수정</h1>
        <p class="form-description">상품 정보를 수정해주세요.</p>

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

          <!-- 상품 이미지 업로드 필드 (이미지를 변경하지 않으면 기존 이미지 유지) -->
          <div class="text-field">
            <label for="image" class="form-label">상품 이미지 (선택사항)</label>
            <input
              id="image"
              type="file"
              @change="handleFileUpload('image', $event)"
              accept="image/jpeg, image/png, image/gif"
              class="form-input"
            />
          </div>

          <!-- 썸네일 이미지 업로드 필드 (이미지를 변경하지 않으면 기존 이미지 유지) -->
          <div class="text-field">
            <label for="thumbnailImage" class="form-label"
              >썸네일 이미지 (선택사항)</label
            >
            <input
              id="thumbnailImage"
              type="file"
              @change="handleFileUpload('thumbnailImage', $event)"
              accept="image/jpeg, image/png, image/gif"
              class="form-input"
            />
          </div>

          <!-- 상품 제작자 이름 필드 -->
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

          <!-- 제출 버튼 -->
          <button :disabled="isSubmitting" class="form-button">
            {{ isSubmitting ? "수정 중..." : "상품 수정" }}
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
      productId: this.$route.params.productId,
      name: "",
      description: "",
      image: null,
      thumbnailImage: null,
      creatorName: "",
      isSubmitting: false,
    };
  },
  methods: {
    handleFileUpload(fieldName, event) {
      const file = event.target.files[0];
      if (fieldName === "image") {
        this.image = file;
      } else if (fieldName === "thumbnailImage") {
        this.thumbnailImage = file;
      }
    },
    async fetchProductData() {
      try {
        const response = await axios.get(
          `https://yoger.o-r.kr/api/products/demo/${this.productId}`,
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );

        const productData = response.data;
        // 기존 데이터로 폼 필드 초기화
        this.name = productData.name;
        this.description = productData.description;
        this.creatorName = productData.creatorName;
        // 이미지, 썸네일은 선택적 업로드를 위해 바로 할당 X
        // (이미지 URL을 서버에서 관리하므로, 여기서는 실제 파일을 재업로드하지 않을 경우 값 없음)
      } catch (error) {
        console.error("상품 정보 가져오기 실패:", error);
        this.$toast.error("상품 정보를 불러오지 못했습니다.");
      }
    },
    async handleSubmit() {
      this.isSubmitting = true;
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("description", this.description);
      // 이미지를 변경한 경우에만 formData에 append
      if (this.image) {
        formData.append("image", this.image);
      }
      if (this.thumbnailImage) {
        formData.append("thumbnailImage", this.thumbnailImage);
      }
      //formData.append("creatorName", this.creatorName);

      try {
        const accessToken = localStorage.getItem("access-token");
        const response = await axios.patch(
          `https://yoger.o-r.kr/api/products/demo/${this.productId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("상품 수정 성공:", response.data);
        this.$toast.success("상품 정보가 성공적으로 수정되었습니다!");
        this.$router.push(`/demo/${this.productId}`); // 수정 후 상품 페이지로 이동
      } catch (error) {
        console.error("상품 수정 실패:", error);
        this.$toast.error("상품 수정에 실패했습니다.");
      } finally {
        this.isSubmitting = false;
      }
    },
  },
  created() {
    this.fetchProductData();
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
</style>
