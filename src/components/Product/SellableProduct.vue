<template>
  <div class="product-page">
    <!-- 상품 컨테이너 -->
    <div class="container">
      <!-- 상품 이미지 및 설명 -->
      <div class="product-container" v-if="product">
        <!-- 이미지 및 세부사항 컨테이너 -->
        <div class="image-details-container">
          <div class="product-image">
            <div class="bg"></div>
            <img
              :src="product.imageUrl || require('@/assets/goods-demo.webp')"
              alt="Product Image"
              class="image"
            />
          </div>
          <div class="product-info">
            <h1 class="product-name">{{ product.name }}</h1>
            <p class="price">
              <span
                v-if="
                  product.priceByQuantities &&
                  product.priceByQuantities.length > 0
                "
              >
                <!-- 가격 드롭다운 -->
                <div class="details">
                  <div class="bg-details"></div>
                  <label for="priceSelect" class="form-label"
                    >수량별 가격 보기</label
                  >
                  <select
                    id="priceSelect"
                    v-model="selectedPrice"
                    class="form-select"
                  >
                    <option
                      v-for="(price, index) in product.priceByQuantities"
                      :key="index"
                      :value="price"
                    >
                      판매량: {{ price.quantity }}개 이상 - 가격:
                      {{ price.price }}원
                    </option>
                  </select>
                  <!--                  <p class="selected-price">-->
                  <!--                    선택한 가격: {{ selectedPrice.price || 0 }}원-->
                  <!--                  </p>-->
                </div>
              </span>
            </p>

            <p class="price">현재 가격: {{ computedPrice }}원</p>

            <p class="creator">크리에이터: {{ product.creatorName }}</p>
            <!--            <p class="state">상태: {{ product.state }}</p>-->
            <!--            <p class="due-date">판매 마감 시간: {{ product.dueDate }}</p>-->

            <div class="details">
              <div class="bg-details"></div>
              <p class="sold-quantity">판매량: {{ product.soldQuantity }}개</p>
              <p class="price-by-quantity">
                <span
                  v-if="
                    product.priceByQuantities &&
                    product.priceByQuantities.length > 0
                  "
                >
                  <!--                  가격: ₩{{ product.priceByQuantities[0].price }} 원-->
                </span>
                <span v-else> 가격 미정 </span>
              </p>
            </div>

            <!-- 수량 및 구매/삭제 버튼 -->
            <div class="purchase-section">
              <div class="quantity">
                <input
                  type="number"
                  v-model="quantity"
                  min="1"
                  class="quantity-input"
                />
              </div>
              <button class="big-button" @click="submitOrder">
                <div class="button-content">
                  <div class="vector"></div>
                  <span class="cart">구매</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- 하단 설명 섹션 -->
        <div class="description-section">
          <h2>상품 설명</h2>
          <p class="description">{{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orderId: null,
      userId: 123, // 실제 사용자 ID로 교체
      quantity: 1, // 선택한 수량
      product: null, // API에서 가져온 데이터를 저장할 변수
      selectedPrice: {}, // 선택한 가격 객체
    };
  },
  computed: {
    productId() {
      return this.$route.params.productId; // URL에서 productId를 가져옴
    },
    computedPrice() {
      if (!this.product || !this.product.priceByQuantities) return 0;
      const priceByQuantities = this.product.priceByQuantities;
      let currentPrice = priceByQuantities[0]?.price || 0; // 초기 가격 설정

      // for (const price of priceByQuantities) {
      //   if (this.product.soldQuantity >= price.quantity) {
      //     currentPrice = priceByQuantities[0]?.price || 0;
      //   }
      // }
      return currentPrice;
    },
  },
  methods: {
    async fetchProductData() {
      try {
        const response = await axios.get(
          `https://yoger.o-r.kr/api/products/${this.productId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        this.product = response.data;
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    },

    async submitOrder() {
      try {
        const token = localStorage.getItem("access-token");

        // 토큰 확인 로그
        if (!token) {
          console.error(
            "토큰이 없습니다. 사용자가 로그아웃된 상태일 수 있습니다."
          );
          this.$toast.error("로그인이 필요합니다.");
          return;
        }

        // 디버깅: 헤더와 바디를 출력
        const headers = {
          Authorization: `Bearer ` + token,
          "Content-Type": "application/json",
        };
        const body = {
          quantity: this.quantity, // 수량 정보
        };

        console.log("요청 헤더:", headers);
        console.log("요청 바디:", body);

        // 1. 주문 요청 보내기
        const orderResponse = await axios.post(
          `https://yoger.o-r.kr/api/orders/products/${this.productId}`,
          body,
          { headers }
        );

        // 주문 성공 시 orderId 저장
        this.orderId = orderResponse.data.orderId;
        console.log("주문 성공:", this.orderId);

        // 2. 아임포트 결제 모듈 초기화
        const IMP = window.IMP;
        IMP.init("imp25188857"); // 아임포트 가맹점 식별코드

        // 3. 결제 데이터 준비
        const paymentData = {
          pg: "kakaopay",
          pay_method: "card",
          merchant_uid: this.orderId,
          name: "주문명: 결제 테스트",
          amount: this.computedPrice * this.quantity, // 수량에 따른 결제 금액
          buyer_email: "buyer@example.com",
          buyer_name: "구매자 이름",
          buyer_tel: "010-1234-5678",
          buyer_addr: "서울특별시 강남구 삼성동",
          buyer_postcode: "123-456",
        };

        console.log("결제 데이터:", paymentData);

        // 4. 아임포트 결제 요청
        IMP.request_pay(paymentData, async (response) => {
          if (response.success) {
            // 결제 성공 시 처리
            console.log("결제 성공", response);
            this.$toast.success("결제가 성공적으로 완료되었습니다.");
          } else {
            // 결제 실패 시 처리
            console.log("결제 실패", response);
            this.$toast.error("결제 실패: " + response.error);
          }
        });
      } catch (error) {
        console.error("에러 발생:", error);
        this.$toast.error("주문 처리 중 문제가 발생했습니다.");
      }
    },
  },
  created() {
    this.fetchProductData();
  },
};
</script>

<style scoped>
/* 상품 페이지 전체 컨테이너 스타일 */
.product-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fff;
  padding-top: 10px; /* 상단 패딩 줄임 */
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  padding: 10px 10px; /* 컨테이너 패딩 줄임 */
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  margin: 10px auto; /* 마진 줄임 */
  padding-top: 5px;
}

/* 상품 이미지 및 설명 */
.product-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.image-details-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 40px;
}

.product-image {
  position: relative;
  width: 100%; /* 너비를 컨테이너에 맞춤 */
  height: 50vh; /* 높이를 뷰포트의 50%로 고정 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f8fa; /* 배경색 추가 */
}

.product-image img {
  width: 100%; /* 가로를 컨테이너 100%에 맞춤 */
  height: auto; /* 비율 유지하며 높이 자동 조정 */
  display: block;
  max-height: 100%;
  max-width: 100%;
}

.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}

.image {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px; /* 이미지 모서리를 둥글게 (선택 사항) */
}

.product-info {
  max-width: 500px;
  width: 100%;
  padding-left: 40px;
  padding-right: 20px;
}

.product-name {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 28px;
  color: #333;
  margin-bottom: 16px;
}

.price {
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #56b280;
  margin-bottom: 10px;
}

.creator {
  font-family: "Helvetica", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #1d252c;
  margin-bottom: 20px;
}

.details {
  margin-bottom: 20px;
}

.sold-amount,
.price-by-quantity {
  font-family: "Helvetica", sans-serif;
  font-size: 16px;
  color: #1d252c;
  margin-bottom: 8px;
}

.purchase-section {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.quantity {
  width: 80px;
  height: 50px;
}

.quantity-input {
  width: 100%;
  height: 100%;
  border: 1px solid #56b280;
  text-align: center;
  font-size: 18px;
}

.big-button {
  width: 200px;
  height: 50px;
  background-color: #56b280;
  color: white;
  border: none;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 6px;
}

.delete-button {
  background-color: #ff4d4f; /* 삭제 버튼 색상 */
}

.button-content {
  display: flex;
  align-items: center;
  font-size: 20px;
}

.vector {
  width: 10px;
  height: 10px;
  background-color: white;
  margin-right: 10px;
}

.cart {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 20px;
  color: white;
}

.description-section {
  margin-top: 30px;
  width: 100%;
}

.description-section h2 {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.description {
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  color: #666;
  line-height: 1.6;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.selected-price {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.form-label {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
}

.form-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}

.selected-price {
  font-size: 18px;
  font-weight: 600;
  color: #333333;
}
</style>
