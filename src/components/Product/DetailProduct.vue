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
                {{ product.priceByQuantities[0].price }} 원
              </span>
              <span v-else> 가격 미정 </span>
            </p>
            <p class="creator">크리에이터: {{ product.creatorName }}</p>

            <div class="details">
              <div class="bg-details"></div>
              <!--              <p class="sold-amount">판매량: {{ product.selledAmount }}개</p>-->
              <p class="price-by-quantity">
                <span
                  v-if="
                    product.priceByQuantities &&
                    product.priceByQuantities.length > 0
                  "
                >
                  1개당 가격: ₩{{ product.priceByQuantities[0].price }} 원
                </span>
                <span v-else> 가격 미정 </span>
              </p>
            </div>

            <!-- 수량 및 구매/삭제 버튼 -->
            <div class="purchase-section">
              <!--              <div class="quantity">-->
              <!--                <input-->
              <!--                  type="number"-->
              <!--                  v-model="quantity"-->
              <!--                  min="1"-->
              <!--                  class="quantity-input"-->
              <!--                />-->
              <!--              </div>-->
              <button
                v-if="product.state !== 'DEMO'"
                class="big-button"
                @click="submitOrder"
              >
                <div class="button-content">
                  <div class="vector"></div>
                  <span class="cart">구매</span>
                </div>
              </button>
              <button
                v-if="canEditUser"
                class="big-button patch-button"
                @click="goToPatchPage"
              >
                <div class="button-content">
                  <span class="cart">수정</span>
                </div>
              </button>
              <button
                v-if="canEditUser"
                class="big-button delete-button"
                @click="deleteProduct"
              >
                <div class="button-content">
                  <span class="cart">삭제</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div
          v-if="canEditUser || canEditCompany"
          class="toggle-bar"
          @click="toggleBar"
        >
          <span class="toggle-title">가격 제안 및 상품 제작</span>
          <span class="toggle-icon"> </span>
        </div>

        <!-- 펼쳐지는 영역 -->
        <PriceOfferSection
          v-if="isBarExpanded"
          :priceOffers="priceOffers"
          @open-proposal-modal="showPriceProposalModal = true"
          @edit-offer="editOffer"
          @delete-offer="deleteOffer"
        />

        <!-- 하단 설명 섹션 -->
        <div class="description-section">
          <h2>상품 설명</h2>
          <p class="description">{{ product.description }}</p>
        </div>
      </div>
    </div>

    <div v-if="showPriceProposalModal" class="modal-overlay">
      <div class="modal">
        <h2>가격 제안</h2>
        <form @submit.prevent="submitPriceProposal">
          <div
            v-for="(entry, index) in proposals"
            :key="index"
            class="form-group"
          >
            <label for="quantity">수량</label>
            <input type="number" v-model="entry.quantity" min="1" required />
            <label for="price">가격</label>
            <input type="number" v-model="entry.price" min="1" required />
          </div>
          <div class="modal-actions">
            <button type="button" class="big-button" @click="addProposal">
              추가
            </button>
            <button type="submit" class="big-button">제안하기</button>
            <button
              type="button"
              class="big-button cancel-button"
              @click="closeModal"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import PriceOfferSection from "@/components/Product/PriceOfferSection.vue";
export default {
  components: {
    PriceOfferSection,
  },
  data() {
    return {
      orderId: null,
      // userId: localStorage.getItem("userId"), // 실제 사용자 ID로 교체
      quantity: 1, // 선택한 수량
      product: null, // API에서 가져온 데이터를 저장할 변수
      showPriceProposalModal: false, // 가격제안 모달 상태
      isBarExpanded: false, // 바의 펼침 상태
      proposals: [
        // 초기값
      ],
      priceOffers: [], // API에서 가져온 가격 제안 리스트
      editingOffer: null, // 현재 수정 중인 offer
      canEditUser: false, // canEdit 기본값 false
      canEditCompany: false, // canEdit 기본값 false
      userId: null, // JWT에서 추출한 사용자 ID
      isCompany: false,
    };
  },
  computed: {
    ...mapState(["authorities"]),
    productId() {
      return this.$route.params.productId; // URL에서 productId를 가져옴
    },
  },
  methods: {
    async fetchProductData() {
      try {
        const response = await axios.get(
          `https://yoger.o-r.kr/api/products/demo/${this.productId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        this.product = response.data;
        console.log(response);

        const isCompany = this.authorities.includes("COMPANY");
        console.log("Is COMPANY:", isCompany); // 디버깅용

        if (
          this.product &&
          this.userId &&
          String(this.product.creatorId) === String(this.userId) &&
          !isCompany
        ) {
          this.canEditUser = true;
        }

        if (isCompany) {
          this.canEditCompany = true;
        }
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    },
    async toggleBar() {
      this.isBarExpanded = !this.isBarExpanded;

      // 펼쳐지는 순간에만 API 호출
      if (this.isBarExpanded && this.priceOffers.length === 0) {
        await this.fetchPriceOffers();
      }
    },
    async deleteProduct() {
      try {
        const token = localStorage.getItem("access-token");

        // 토큰 확인
        if (!token) {
          console.error(
            "토큰이 없습니다. 사용자가 로그아웃된 상태일 수 있습니다."
          );
          this.$toast.error("로그인이 필요합니다.");
          return;
        }

        // 요청 헤더 및 URL 구성
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        console.log("삭제 요청 헤더:", headers);

        // API 요청
        await axios.delete(
          `https://yoger.o-r.kr/api/products/demo/${this.productId}`,
          {
            headers,
          }
        );

        // 성공적으로 삭제되었을 때
        this.$toast.success("상품이 삭제되었습니다.");
        this.product = null; // 삭제 후 상품 정보를 비워줌
        this.$router.push("/products"); // 상품 목록 페이지로 이동
      } catch (error) {
        console.error("상품 삭제 실패:", error);
        this.$toast.error("상품 삭제에 실패했습니다.");
      }
    },

    // async fetchPriceOffers() {
    //   const token = localStorage.getItem("access-token");
    //   try {
    //     const response = await axios.get(
    //       `https://yoger.o-r.kr/api/price-offers/${this.productId}`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //     this.priceOffers = response.data.priceOffers || []; // 응답 데이터 저장
    //     console.log("가격 제안 리스트:", this.priceOffers);
    //   } catch (error) {
    //     console.error("가격 제안 불러오기 실패:", error);
    //   }
    // },

    // async fetchPriceOffers() {
    //   const token = localStorage.getItem("access-token");
    //   try {
    //     const response = await axios.get(
    //       `https://yoger.o-r.kr/api/price-offers/${this.productId}`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //     this.priceOffers = response.data.priceOffers || []; // 응답 데이터 저장
    //     console.log("가격 제안 리스트:", this.priceOffers);
    //
    //     // companyId 별로 companyName 가져오기
    //     const companyNames = await Promise.all(
    //       this.priceOffers.map(async (offer) => {
    //         try {
    //           const companyResponse = await axios.get(
    //             `https://yoger.o-r.kr/api/company/info/${offer.companyId}`,
    //             {
    //               headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "application/json",
    //               },
    //             }
    //           );
    //           console.log(
    //             `Company ID: ${offer.companyId}, Company Name: ${companyResponse.data.result.companyName}`
    //           );
    //           return {
    //             ...offer,
    //             companyName: companyResponse.data.result.companyName,
    //           };
    //         } catch (error) {
    //           console.error(
    //             `회사 정보 불러오기 실패 (Company ID: ${offer.companyId}):`,
    //             error
    //           );
    //           return { ...offer, companyName: "알 수 없음" }; // 오류 시 기본값
    //         }
    //       })
    //     );
    //
    //     // // 결과를 this.companyNames에 저장
    //     // this.companyNames = companyNames.reduce((acc, curr) => {
    //     //   acc[curr.companyId] = curr.companyName;
    //     //   return acc;
    //     // }, {});
    //
    //     console.log("회사 이름 리스트:", this.companyNames);
    //   } catch (error) {
    //     console.error("가격 제안 불러오기 실패:", error);
    //   }
    // },

    async fetchPriceOffers() {
      const token = localStorage.getItem("access-token");
      try {
        const response = await axios.get(
          `https://yoger.o-r.kr/api/price-offers/${this.productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        this.priceOffers = await Promise.all(
          response.data.priceOffers.map(async (offer) => {
            try {
              const companyResponse = await axios.get(
                `https://yoger.o-r.kr/api/company/info/${offer.companyId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              return {
                ...offer,
                companyName: companyResponse.data.result.companyName,
              };
            } catch (error) {
              console.error(
                `회사 정보 불러오기 실패 (Company ID: ${offer.companyId}):`,
                error
              );
              return {
                ...offer,
                companyName: "알 수 없음", // 오류 시 기본값
              };
            }
          })
        );

        console.log("가격 제안 리스트:", this.priceOffers);
      } catch (error) {
        console.error("가격 제안 불러오기 실패:", error);
      }
    },

    addProposal() {
      this.proposals.push({ quantity: 1, price: 0 }); // 새로운 수량/가격 입력 필드 추가
    },
    // async submitOrder() {
    //   const token = localStorage.getItem("access-token");
    //   try {
    //     // 1. 주문 요청 보내기
    //     const orderResponse = await axios.post(
    //       "https://yoger.o-r.kr/api/orders/products/" + this.productId,
    //       {
    //         quantity: this.quantity,
    //       },
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${token}`,
    //           userId: localStorage.getItem("userId"),
    //         },
    //       }
    //     );
    //
    //     // 주문 성공 시 orderId 저장
    //     this.orderId = orderResponse.data;
    //     console.log("주문 성공:", this.orderId);
    //
    //     // 2. 아임포트 결제 모듈 초기화
    //     const IMP = window.IMP;
    //     IMP.init("imp25188857"); // 아임포트 가맹점 식별코드
    //
    //     // 3. 결제 데이터 준비
    //     const paymentData = {
    //       pg: "kakaopay",
    //       pay_method: "card",
    //       orderId: this.orderId,
    //       name: "주문명: 결제 테스트",
    //       amount: this.product.priceByQuantities[0].price * this.quantity, // 수량에 따른 결제 금액
    //       buyer_email: "buyer@example.com",
    //       buyer_name: "구매자 이름",
    //       buyer_tel: "010-1234-5678",
    //       buyer_addr: "서울특별시 강남구 삼성동",
    //       buyer_postcode: "123-456",
    //     };
    //
    //     // 4. 아임포트 결제 요청
    //     IMP.request_pay(paymentData, async (response) => {
    //       if (response.success) {
    //         // 결제 성공 시 처리
    //         console.log("결제 성공", response);
    //         this.$toast.success("결제가 성공적으로 완료되었습니다.");
    //       } else {
    //         // 결제 실패 시 처리
    //         console.log("결제 실패", response);
    //         this.$toast.error("결제 실패: " + response.error);
    //       }
    //     });
    //   } catch (error) {
    //     console.error("에러 발생:", error);
    //   }
    // },
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
          amount: this.product.priceByQuantities[0].price * this.quantity, // 수량에 따른 결제 금액
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
    // async submitPriceProposal() {
    //   const token = localStorage.getItem("access-token");
    //   try {
    //     const response = await axios.post(
    //       `https://yoger.o-r.kr/api/price-offers/${this.productId}`,
    //       {
    //         priceByQuantities: this.proposals,
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //     console.log("가격 제안 성공:", response.data);
    //     this.$toast.success("가격 제안이 성공적으로 제출되었습니다.");
    //     this.closeModal();
    //     await this.fetchPriceOffers(); // 제안 후 새로고침
    //   } catch (error) {
    //     console.error("가격 제안 실패:", error);
    //     this.$toast.error("가격 제안 제출에 실패했습니다.");
    //   }
    // },
    async deleteOffer(offer) {
      try {
        const token = localStorage.getItem("access-token");
        await axios.delete(
          `https://yoger.o-r.kr/api/price-offers/${offer.productId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            data: { companyId: offer.companyId },
          }
        );
        this.$toast.success("제안이 삭제되었습니다.");
        await this.fetchPriceOffers();
      } catch (error) {
        console.error("제안 삭제 실패:", error);
        this.$toast.error("제안 삭제에 실패했습니다.");
      }
    },
    async submitPriceProposal() {
      try {
        const token = localStorage.getItem("access-token");
        const endpoint = this.editingOffer
          ? `https://yoger.o-r.kr/api/price-offers/${this.editingOffer.productId}`
          : `https://yoger.o-r.kr/api/price-offers/${this.productId}`;
        const method = this.editingOffer ? "patch" : "post";
        await axios({
          method,
          url: endpoint,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: { priceByQuantities: this.proposals },
        });
        this.$toast.success("가격 제안이 성공적으로 제출되었습니다.");
        this.closeModal();
        this.fetchPriceOffers();
      } catch (error) {
        console.error("가격 제안 실패:", error);
        this.$toast.error("가격 제안 제출에 실패했습니다.");
      }
    },
    editOffer(offer) {
      this.editingOffer = offer;
      this.proposals = [...offer.priceByQuantities]; // 현재 제안 복사
      this.openProposalModal();
    },
    openProposalModal() {
      this.showPriceProposalModal = true;
    },

    closeModal() {
      this.showPriceProposalModal = false;
      this.proposals = [];
      this.editingOffer = null;
    },
    goToPatchPage() {
      this.$router.push(`/demo/${this.productId}/patch`);
    },
    parseJwt(token) {
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
    },
    decodeToken() {
      const token = localStorage.getItem("access-token");
      if (token) {
        const payloadObj = this.parseJwt(token);
        if (payloadObj) {
          console.log("Decoded Payload:", payloadObj); // 파싱된 JWT 페이로드 콘솔 출력
          this.userId = payloadObj.sub; // 예: payload에서 sub(사용자 ID) 추출
        }
      }
    },
  },

  created() {
    this.decodeToken();
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
  max-width: 100%; /* 이미지가 부모 컨테이너를 넘지 않도록 설정 */
  max-height: 100%; /* 이미지 높이도 부모 컨테이너를 넘지 않도록 설정 */
  object-fit: contain; /* 이미지를 비율 유지하며 축소 */
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

.patch-button {
  background-color: cornflowerblue; /* 삭제 버튼 색상 */
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.modal h2 {
  margin-bottom: 20px;
  font-size: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 16px;
  text-align: left;
  margin-right: 10px;
}

.form-group label {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.modal-actions button {
  width: 48%;
  padding: 10px;
}

.cancel-button {
  background-color: #ff4d4f;
}

.toggle-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f7f7f7;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.toggle-title {
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.toggle-icon img {
  width: 24px;
  height: 24px;
}

.form-group {
  margin-bottom: 16px;
  text-align: left;
  display: flex;
  flex-direction: column;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.big-button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.cancel-button {
  background-color: #ff4d4f;
  color: white;
}

.delete-button {
  background-color: #ff4d4f;
  color: white;
}

.offer-item h3,
.offer-item h4 {
  font-size: 1rem;
  margin-bottom: 8px;
}

.offer-item ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.offer-item ul li {
  display: flex;
  justify-content: space-between; /* 항목과 버튼 정렬 */
  align-items: center;
  margin-bottom: 8px;
}

.delete-button {
  background-color: #ff4d4f;
  color: white;
}
</style>
