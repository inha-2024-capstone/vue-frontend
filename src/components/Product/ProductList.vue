<template>
  <div class="page-container">
    <!-- 상단 카드 -->
    <div class="wide-card">
      <div class="card-content">
        <div class="card-img">
          <img src="@/assets/goods-demo.webp" alt="Custom Goods Image" />
        </div>
        <div class="card-text">
          <div class="category-tag">
            <span class="category">Custom</span>
          </div>
          <h1 class="title">판매중인 Yoger의 커스텀 굿즈</h1>
        </div>
      </div>
    </div>

    <!-- 책갈피 형식 필터 바 -->
    <div class="filter-bar">
      <div class="view-tabs">
        <span
          @click="setProductType('available')"
          :class="{ active: productType === 'available' }"
        >
          판매중인 상품 보기
        </span>
        <span
          @click="setProductType('inProduction')"
          :class="{ active: productType === 'inProduction' }"
        >
          제작중인 상품 보기
        </span>
      </div>
      <div class="view-options">
        <span @click="setViewCount(25)" :class="{ active: viewCount === 25 }"
          >25개씩 보기</span
        >
        <span @click="setViewCount(36)" :class="{ active: viewCount === 36 }"
          >36개씩 보기</span
        >
      </div>
    </div>

    <!-- 상품 리스트 -->
    <div class="product-list" :class="gridClass">
      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        class="primary-card"
      >
        <div class="image-container">
          <a
            :href="
              product.state === 'SELLABLE'
                ? `/product/${product.id}`
                : `/demo/${product.id}`
            "
          >
            <img
              :src="product.thumbnailImageUrl"
              alt="Product Image"
              class="product-image"
            />
          </a>
        </div>
        <div class="product-info">
          <div class="product-name-container">
            <span class="product-name">
              <!-- 상태에 따라 다른 URL로 이동 -->

              {{ product.name }}
            </span>
            <span class="product-subtitle">{{ product.creatorName }}</span>
          </div>
          <div class="price-container">
            <span class="product-price">
              <!--              {{-->
              <!--                product.priceByQuantities &&-->
              <!--                product.priceByQuantities.length > 0-->
              <!--                  ? product.priceByQuantities[0].price + "원"-->
              <!--                  : "가격 미정"-->
              <!--              }}-->
              {{ computedPrice(product) }}
            </span>

            <span v-if="product.priceByQuantities" class="sold-amount">
              판매량: {{ product.soldQuantity }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 페이지네이션 영역 -->
    <div class="pagination" v-if="totalPages > 1">
      <button @click="prevPage" :disabled="currentPage === 1">이전</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        다음
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      viewCount: 25,
      products: [],
      productType: "inProduction", // 기본값을 제작중인 상품으로 설정
      currentPage: 1, // 현재 페이지
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.viewCount);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.viewCount;
      const end = this.currentPage * this.viewCount;
      return this.products.slice(start, end);
    },
    gridClass() {
      return {
        "grid-25": this.viewCount === 25,
        "grid-36": this.viewCount === 36,
      };
    },
  },
  methods: {
    setViewCount(count) {
      this.viewCount = count;
      this.currentPage = 1; // 보기 개수 변경 시 1페이지로 돌아감
    },
    setProductType(type) {
      this.productType = type;
      this.currentPage = 1; // 상품 타입 변경 시 1페이지로 돌아감
      this.fetchProducts();
    },
    async fetchProducts() {
      try {
        const url =
          this.productType === "available"
            ? "https://yoger.o-r.kr/api/products"
            : "https://yoger.o-r.kr/api/products/demo";

        const response = await axios.get(url, {
          headers: {
            // "ngrok-skip-browser-warning": "69420",
          },
        });
        this.products = response.data;
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    computedPrice(product) {
      if (!product || !product.priceByQuantities) return "가격 미정";
      let currentPrice = product.priceByQuantities[0]?.price || 0;

      // for (const price of product.priceByQuantities) {
      //   if (product.soldQuantity >= price.quantity) {
      //     currentPrice = product.priceByQuantities[0] + "원";
      //   }
      // }
      return currentPrice + "원";
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.page-container {
  padding: 20px;
}

/* 페이지네이션 스타일 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
}

.pagination button {
  background-color: #444;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* 나머지 스타일은 원래 코드와 동일 */
.wide-card {
  position: relative;
  width: 80%;
  height: 300px;
  margin: 0 auto 40px;
  background: #1d1d1d;
  box-shadow: 0px 16px 16px 4px rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  overflow: hidden;
}
.card-content {
  display: flex;
  align-items: center;
  width: 100%;
}
.card-img {
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: left;
  align-items: center;
}
.card-img img {
  width: 50%;
  height: auto;
  object-fit: cover;
  border-radius: 16px 0 0 16px;
}
.card-text {
  width: 50%;
  padding-left: 20px;
  color: #ffffff;
}
.category-tag {
  background-color: rgba(29, 29, 29, 0.5);
  padding: 8px 12px;
  border-radius: 8px;
  display: inline-block;
  margin-bottom: 12px;
}
.category {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #0feffd;
}
.title {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.2;
  color: #ffffff;
}
.view-tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}
.view-tabs span {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  cursor: pointer;
  color: #212429;
  padding: 8px 16px;
  border-radius: 8px;
}
.view-tabs span.active {
  background-color: #444444;
  color: #fff;
  font-weight: bold;
}
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f5f5f5;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
.view-options {
  display: flex;
  gap: 16px;
}
.view-options span {
  font-family: "Inter", sans-serif;
  font-size: 14px;
  cursor: pointer;
  color: #212429;
}
.view-options span.active {
  font-weight: bold;
}
.product-list {
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-top: 20px;
  width: 100%;
}
.product-list.grid-25 {
  grid-template-columns: repeat(5, 1fr);
}
.product-list.grid-36 {
  grid-template-columns: repeat(6, 1fr);
}
.primary-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.image-container {
  width: 100%;
  height: 220px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.product-image {
  width: 180px;
  height: 180px;
  object-fit: cover;
}
.product-info {
  padding: 12px;
}
.product-name-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}
.product-name {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: #212429;
}
.product-subtitle {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #868d94;
}
.price-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}
.product-price {
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #212429;
}
.sold-amount {
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: #868d94;
}

.wide-card {
  display: flex; /* Flexbox 사용 */
  align-items: stretch; /* 내부 요소 높이 맞춤 */
  position: relative;
  width: 100%; /* 화면 전체 너비 */
  max-width: 1200px; /* 최대 너비 */
  margin: 0 auto; /* 중앙 정렬 */
  background: #1d1d1d;
  box-shadow: 0px 16px 16px 4px rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  overflow: hidden;
  margin: 0 auto 40px;
}

.card-content {
  display: flex;
  width: 100%;
  height: 300px; /* 고정된 높이 설정 */
}

.card-img {
  flex: 0 0 40%; /* 왼쪽 이미지 영역의 너비를 40%로 설정 */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7; /* 배경색 추가 */
}

.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 비율 유지하며 컨테이너 채우기 */
}

.card-text {
  flex: 1; /* 남은 영역 모두 차지 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px; /* 좌우 여백 추가 */
  color: #ffffff;
}

.category-tag {
  background-color: rgba(29, 29, 29, 0.5);
  padding: 8px 12px;
  border-radius: 8px;
  display: inline-block;
  margin-bottom: 12px;
}

.category {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #0feffd;
}

.title {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.2;
  color: #ffffff;
  margin: 0;
}
</style>
