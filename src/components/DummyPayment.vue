<!--&lt;!&ndash;<template>&ndash;&gt;-->
<!--&lt;!&ndash;  <div>&ndash;&gt;-->
<!--&lt;!&ndash;    <h2>상품 주문하기</h2>&ndash;&gt;-->
<!--    <button @click="submitOrder">주문하기</button>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from "axios";-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      orderId: null,-->
<!--      userId: 123, // 실제 사용자 ID로 교체-->
<!--      productId: 456, // 실제 상품 ID로 교체-->
<!--      quantity: 3, // 실제 수량으로 교체-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    async submitOrder() {-->
<!--      try {-->
<!--        // 1. 주문 요청 보내기-->
<!--        const orderResponse = await axios.post(-->
<!--          "https://065e-203-212-125-51.ngrok-free.app/api/orders/products/" +-->
<!--            this.productId,-->
<!--          {-->
<!--            quantity: this.quantity,-->
<!--          },-->
<!--          {-->
<!--            headers: {-->
<!--              "Content-Type": "application/json",-->
<!--              userid: this.userId,-->
<!--            },-->
<!--          }-->
<!--        );-->

<!--        // 주문 성공 시 orderId 저장-->
<!--        this.orderId = orderResponse.data;-->
<!--        console.log("주문 성공:", this.orderId);-->

<!--        // 2. 아임포트 결제 모듈 초기화-->
<!--        const IMP = window.IMP;-->
<!--        IMP.init("imp25188857"); // 아임포트 가맹점 식별코드-->

<!--        // 3. 결제 데이터 준비-->
<!--        const paymentData = {-->
<!--          pg: "kakaopay",-->
<!--          pay_method: "card",-->
<!--          orderId: this.orderId,-->
<!--          name: "주문명: 결제 테스트",-->
<!--          amount: 100, // 결제 금액-->
<!--          buyer_email: "buyer@example.com",-->
<!--          buyer_name: "구매자 이름",-->
<!--          buyer_tel: "010-1234-5678",-->
<!--          buyer_addr: "서울특별시 강남구 삼성동",-->
<!--          buyer_postcode: "123-456",-->
<!--        };-->

<!--        // 4. 아임포트 결제 요청-->
<!--        IMP.request_pay(paymentData, async (response) => {-->
<!--          if (response.success) {-->
<!--            // 결제 성공 시 서버로 결제 정보 전송-->
<!--            console.log("결제 성공", response);-->

<!--            console.log("결제 처리 완료:");-->
<!--            alert("결제가 성공적으로 완료되었습니다.");-->
<!--          } else {-->
<!--            // 결제 실패 시 처리-->
<!--            console.log("결제 실패", response);-->
<!--            alert("결제 실패: " + response.error);-->
<!--          }-->
<!--        });-->
<!--      } catch (error) {-->
<!--        console.error("에러 발생:", error);-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--button {-->
<!--  padding: 10px 20px;-->
<!--  font-size: 16px;-->
<!--  background-color: #4caf50;-->
<!--  color: white;-->
<!--  border: none;-->
<!--  cursor: pointer;-->
<!--}-->
<!--</style>-->

<template>
  <div class="checkout-container">
    <div class="form-box">
      <!-- 결제 페이지 헤더 -->
      <div class="form-frame">
        <h1 class="form-title">결제 정보</h1>
        <p class="form-description">
          결제를 완료하기 위해 양식을 작성해주세요.
        </p>

        <form @submit.prevent="handleSubmit">
          <!-- 카드 정보 필드 -->
          <div class="text-field">
            <label for="card_number" class="form-label">카드 번호</label>
            <input
              id="card_number"
              type="text"
              v-model="cardNumber"
              required
              placeholder="카드 번호 입력"
              class="form-input"
            />
          </div>

          <!-- 유효기간 필드 -->
          <div class="text-field">
            <label for="expiry_date" class="form-label">유효기간</label>
            <input
              id="expiry_date"
              type="text"
              v-model="expiryDate"
              required
              placeholder="MM/YY"
              class="form-input"
            />
          </div>

          <!-- CVC 필드 -->
          <div class="text-field">
            <label for="cvc" class="form-label">CVC</label>
            <input
              id="cvc"
              type="text"
              v-model="cvc"
              required
              placeholder="CVC 입력"
              class="form-input"
            />
          </div>

          <!-- 주소 필드 -->
          <div class="text-field-address">
            <label for="postal_code" class="form-label">우편번호</label>
            <input
              id="postal_code"
              type="text"
              v-model="postalCode"
              placeholder="우편번호 입력"
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
          </div>

          <!-- 결제 요약 -->
          <div class="summary-section">
            <div class="summary-item">
              <p class="summary-label">상품 가격:</p>
              <p class="summary-value">{{ productPrice }} 원</p>
            </div>
            <div class="summary-item">
              <p class="summary-label">배송비:</p>
              <p class="summary-value">{{ shippingFee }} 원</p>
            </div>
            <div class="summary-item total">
              <p class="summary-label">총 결제 금액:</p>
              <p class="summary-value total-value">{{ totalPrice }} 원</p>
            </div>
          </div>

          <!-- 제출 버튼 -->
          <button :disabled="isSubmitting" class="form-button">
            {{ isSubmitting ? "결제 처리 중..." : "결제하기" }}
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
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      postalCode: "",
      address: "",
      isSubmitting: false,
      productPrice: 29000,
      shippingFee: 3000,
      totalPrice: 32000,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // 1. 주문 요청 보내기
        const orderResponse = await axios.post(
          "https://yoger.o-r.kr/api/orders/products/" + this.productId,
          {
            quantity: this.quantity,
          },
          {
            headers: {
              "Content-Type": "application/json",
              userid: this.userId,
            },
          }
        );

        // 주문 성공 시 orderId 저장
        this.orderId = orderResponse.data;
        console.log("주문 성공:", this.orderId);

        // 2. 아임포트 결제 모듈 초기화
        const IMP = window.IMP;
        IMP.init("imp25188857"); // 아임포트 가맹점 식별코드

        // 3. 결제 데이터 준비
        const paymentData = {
          pg: "kakaopay",
          pay_method: "card",
          orderId: this.orderId,
          name: "주문명: 결제 테스트",
          amount: 100, // 결제 금액
          buyer_email: "buyer@example.com",
          buyer_name: "구매자 이름",
          buyer_tel: "010-1234-5678",
          buyer_addr: "서울특별시 강남구 삼성동",
          buyer_postcode: "123-456",
        };

        // 4. 아임포트 결제 요청
        IMP.request_pay(paymentData, async (response) => {
          if (response.success) {
            // 결제 성공 시 서버로 결제 정보 전송
            console.log("결제 성공", response);

            console.log("결제 처리 완료:");
            this.$toast.success("결제가 성공적으로 완료되었습니다.");
          } else {
            // 결제 실패 시 처리
            console.log("결제 실패", response);
            this.$toast.error("결제 실패: " + response.error);
          }
        });
      } catch (error) {
        console.error("에러 발생:", error);
      }
    },
  },
};
</script>

<style scoped>
/* 결제 페이지 스타일 */
.checkout-container {
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

/* 결제 요약 섹션 */
.summary-section {
  margin-top: 40px;
  width: 100%;
  border-top: 1px solid #e6e6e6;
  padding-top: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-label {
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #666666;
}

.summary-value {
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #333333;
}

.total {
  font-weight: 600;
}

.total-value {
  color: #56b280;
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
  margin-top: 40px;
}

.form-button:disabled {
  background-color: gray;
}
</style>
