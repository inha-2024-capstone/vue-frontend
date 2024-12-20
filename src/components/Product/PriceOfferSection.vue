<!--<template>-->
<!--  <div class="big-f">-->
<!--    <div class="section-actions">-->
<!--      <button class="big-button proposal-button" @click="openProposalModal">-->
<!--        가격 제안-->
<!--      </button>-->
<!--    </div>-->

<!--    <div v-if="priceOffers.length > 0" class="price-offers-list">-->
<!--      <div-->
<!--        v-for="(offer, index) in priceOffers"-->
<!--        :key="index"-->
<!--        class="offer-item"-->
<!--      >-->
<!--        <div class="offer-header">-->
<!--          <h3>회사 ID: {{ offer.companyId }}</h3>-->
<!--          <h4>상품 ID: {{ offer.productId }}</h4>-->
<!--        </div>-->
<!--        <ul class="offer-entries">-->
<!--          <li-->
<!--            v-for="(entry, i) in offer.priceByQuantities"-->
<!--            :key="i"-->
<!--            class="offer-entry"-->
<!--          >-->
<!--            <span class="offer-details">-->
<!--              수량: {{ entry.quantity }}, 가격: {{ entry.price }}-->
<!--            </span>-->
<!--          </li>-->
<!--        </ul>-->
<!--        <p class="offer-status">상태: {{ offer.state }}</p>-->
<!--        <div class="offer-due-date">-->
<!--          <label for="dueDate-{{ index }}" class="due-date-label"-->
<!--            >상품 기한:</label-->
<!--          >-->
<!--          <input-->
<!--            id="dueDate-{{ index }}"-->
<!--            type="date"-->
<!--            v-model="offer.dueDate"-->
<!--            class="due-date-input"-->
<!--          />-->
<!--        </div>-->
<!--        <div class="offer-actions">-->
<!--          <button class="big-button accept-button" @click="acceptOffer(offer)">-->
<!--            제안 수락-->
<!--          </button>-->
<!--          <button-->
<!--            class="big-button edit-button"-->
<!--            @click="$emit('edit-offer', offer)"-->
<!--          >-->
<!--            수정-->
<!--          </button>-->
<!--          <button-->
<!--            class="big-button delete-button"-->
<!--            @click="$emit('delete-offer', offer)"-->
<!--          >-->
<!--            삭제-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <p v-else class="no-offers-message">가격 제안이 없습니다.</p>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from "axios";-->

<!--export default {-->
<!--  props: {-->
<!--    priceOffers: {-->
<!--      type: Array,-->
<!--      required: true,-->
<!--    },-->
<!--  },-->
<!--  methods: {-->
<!--    parseJwt(token) {-->
<!--      try {-->
<!--        const base64Url = token.split(".")[1];-->
<!--        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");-->
<!--        const jsonPayload = decodeURIComponent(-->
<!--          atob(base64)-->
<!--            .split("")-->
<!--            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))-->
<!--            .join("")-->
<!--        );-->
<!--        return JSON.parse(jsonPayload);-->
<!--      } catch (error) {-->
<!--        console.error("Failed to parse JWT:", error);-->
<!--        return null;-->
<!--      }-->
<!--    },-->
<!--    openProposalModal() {-->
<!--      this.$emit("open-proposal-modal");-->
<!--    },-->
<!--    async acceptOffer(offer) {-->
<!--      const token = localStorage.getItem("access-token");-->
<!--      const userId = this.parseJwt(token)?.sub;-->
<!--      console.log(userId);-->
<!--      if (!userId) {-->
<!--        this.$toast.error("사용자 ID가 없습니다.");-->
<!--        return;-->
<!--      }-->
<!--      if (!offer.dueDate) {-->
<!--        this.$toast.error("상품 기한을 입력하세요.");-->
<!--        return;-->
<!--      }-->
<!--      try {-->
<!--        const response = await axios.patch(-->
<!--          `https://yoger.o-r.kr/api/price-offers/${offer.productId}/confirm`,-->
<!--          {-->
<!--            companyId: offer.companyId,-->
<!--            dueDate: offer.dueDate + "T23:59:59",-->
<!--          },-->
<!--          {-->
<!--            headers: {-->
<!--              Authorization: `Bearer ${token}`,-->
<!--              "Content-Type": "application/json",-->
<!--              "user-id": userId,-->
<!--            },-->
<!--          }-->
<!--        );-->
<!--        this.$toast.success("제안이 성공적으로 수락되었습니다.");-->
<!--        console.log("API 응답:", response.data);-->
<!--      } catch (error) {-->
<!--        console.error("제안 수락 실패:", error);-->
<!--        this.$toast.error("제안 수락에 실패했습니다.");-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.big-f {-->
<!--  width: 100%;-->
<!--}-->
<!--.section-actions {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.big-button {-->
<!--  width: 100px;-->
<!--  height: 40px;-->
<!--  background-color: #007bff;-->
<!--  color: white;-->
<!--  border: none;-->
<!--  border-radius: 8px;-->
<!--  cursor: pointer;-->
<!--  font-size: 14px;-->
<!--  font-weight: bold;-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--}-->

<!--.big-button:hover {-->
<!--  background-color: #0056b3;-->
<!--}-->

<!--.proposal-button {-->
<!--  background-color: #007bff;-->
<!--}-->

<!--.accept-button {-->
<!--  background-color: #28a745;-->
<!--}-->

<!--.accept-button:hover {-->
<!--  background-color: #218838;-->
<!--}-->

<!--.price-offers-list {-->
<!--  margin-top: 20px;-->
<!--  padding: 15px;-->
<!--  border: 1px solid #ddd;-->
<!--  border-radius: 10px;-->
<!--  background-color: #f9f9f9;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  gap: 15px;-->
<!--}-->

<!--.offer-item {-->
<!--  padding: 15px;-->
<!--  border: 1px solid #ccc;-->
<!--  border-radius: 8px;-->
<!--  background-color: #fff;-->
<!--  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);-->
<!--}-->

<!--.offer-header {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.offer-header h3,-->
<!--.offer-header h4 {-->
<!--  margin: 0;-->
<!--  font-size: 16px;-->
<!--  font-weight: bold;-->
<!--  color: #333;-->
<!--}-->

<!--.offer-entries {-->
<!--  list-style: none;-->
<!--  margin: 0;-->
<!--  padding: 0;-->
<!--}-->

<!--.offer-entry {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--  padding: 10px 0;-->
<!--  border-bottom: 1px solid #eee;-->
<!--}-->

<!--.offer-entry:last-child {-->
<!--  border-bottom: none;-->
<!--}-->

<!--.offer-details {-->
<!--  font-size: 14px;-->
<!--  color: #555;-->
<!--}-->

<!--.offer-status {-->
<!--  margin-top: 10px;-->
<!--  font-size: 14px;-->
<!--  color: #888;-->
<!--}-->

<!--.offer-due-date {-->
<!--  margin-top: 10px;-->
<!--}-->

<!--.due-date-label {-->
<!--  font-size: 14px;-->
<!--  font-weight: bold;-->
<!--  color: #555;-->
<!--  margin-right: 10px;-->
<!--}-->

<!--.due-date-input {-->
<!--  font-size: 14px;-->
<!--  padding: 5px;-->
<!--  border-radius: 4px;-->
<!--  border: 1px solid #ccc;-->
<!--}-->

<!--.offer-actions {-->
<!--  margin-top: 15px;-->
<!--  display: flex;-->
<!--  justify-content: flex-end;-->
<!--  gap: 10px;-->
<!--}-->

<!--.delete-button {-->
<!--  background-color: #ff4d4f;-->
<!--  color: white;-->
<!--}-->

<!--.delete-button:hover {-->
<!--  background-color: #d4001a;-->
<!--}-->

<!--.no-offers-message {-->
<!--  text-align: center;-->
<!--  font-size: 14px;-->
<!--  color: #999;-->
<!--  margin-top: 20px;-->
<!--}-->
<!--</style>-->

<!--<template>-->
<!--  <div class="big-f">-->
<!--    <div class="section-actions">-->
<!--      &lt;!&ndash; USER 권한이 아닌 경우에만 가격 제안 버튼 렌더링 &ndash;&gt;-->
<!--      <button-->
<!--        v-if="!isUser"-->
<!--        class="big-button proposal-button"-->
<!--        @click="openProposalModal"-->
<!--      >-->
<!--        가격 제안-->
<!--      </button>-->
<!--    </div>-->

<!--    <div v-if="priceOffers.length > 0" class="price-offers-list">-->
<!--      <div-->
<!--        v-for="(offer, index) in priceOffers"-->
<!--        :key="index"-->
<!--        class="offer-item"-->
<!--      >-->
<!--        <div class="offer-header">-->
<!--          <h3>회사 ID: {{ offer.companyId }}</h3>-->
<!--          &lt;!&ndash;          <h4>상품 ID: {{ offer.productId }}</h4>&ndash;&gt;-->
<!--        </div>-->
<!--        <ul class="offer-entries">-->
<!--          <li-->
<!--            v-for="(entry, i) in offer.priceByQuantities"-->
<!--            :key="i"-->
<!--            class="offer-entry"-->
<!--          >-->
<!--            <span class="offer-details">-->
<!--              수량: {{ entry.quantity }}, 가격: {{ entry.price }}-->
<!--            </span>-->
<!--          </li>-->
<!--        </ul>-->
<!--        <p class="offer-status">상태: {{ offer.state }}</p>-->
<!--        <div class="offer-due-date">-->
<!--          <label for="dueDate-{{ index }}" class="due-date-label"-->
<!--            >상품 기한:</label-->
<!--          >-->
<!--          <input-->
<!--            id="dueDate-{{ index }}"-->
<!--            type="date"-->
<!--            v-model="offer.dueDate"-->
<!--            class="due-date-input"-->
<!--          />-->
<!--        </div>-->
<!--        <div class="offer-actions">-->
<!--          &lt;!&ndash; USER 권한이 아닌 경우에만 수정 및 삭제 버튼 렌더링 &ndash;&gt;-->
<!--          <button-->
<!--            v-if="!isUser"-->
<!--            class="big-button accept-button"-->
<!--            @click="acceptOffer(offer)"-->
<!--          >-->
<!--            제안 수락-->
<!--          </button>-->
<!--          <button-->
<!--            v-if="!isUser"-->
<!--            class="big-button edit-button"-->
<!--            @click="$emit('edit-offer', offer)"-->
<!--          >-->
<!--            수정-->
<!--          </button>-->
<!--          <button-->
<!--            v-if="!isUser"-->
<!--            class="big-button delete-button"-->
<!--            @click="$emit('delete-offer', offer)"-->
<!--          >-->
<!--            삭제-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <p v-else class="no-offers-message">가격 제안이 없습니다.</p>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--import axios from "axios";-->
<!--import { mapState } from "vuex";-->

<!--export default {-->
<!--  props: {-->
<!--    priceOffers: {-->
<!--      type: Array,-->
<!--      required: true,-->
<!--    },-->
<!--  },-->
<!--  computed: {-->
<!--    // Vuex의 authorities 상태를 가져옴-->
<!--    ...mapState(["authorities"]),-->

<!--    // USER 권한 여부를 계산-->
<!--    isUser() {-->
<!--      return this.authorities.includes("USER");-->
<!--    },-->
<!--  },-->
<!--  methods: {-->
<!--    parseJwt(token) {-->
<!--      try {-->
<!--        const base64Url = token.split(".")[1];-->
<!--        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");-->
<!--        const jsonPayload = decodeURIComponent(-->
<!--          atob(base64)-->
<!--            .split("")-->
<!--            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))-->
<!--            .join("")-->
<!--        );-->
<!--        return JSON.parse(jsonPayload);-->
<!--      } catch (error) {-->
<!--        console.error("Failed to parse JWT:", error);-->
<!--        return null;-->
<!--      }-->
<!--    },-->
<!--    openProposalModal() {-->
<!--      this.$emit("open-proposal-modal");-->
<!--    },-->
<!--    async acceptOffer(offer) {-->
<!--      const token = localStorage.getItem("access-token");-->
<!--      const userId = this.parseJwt(token)?.sub;-->
<!--      console.log(userId);-->
<!--      if (!userId) {-->
<!--        this.$toast.error("사용자 ID가 없습니다.");-->
<!--        return;-->
<!--      }-->
<!--      if (!offer.dueDate) {-->
<!--        this.$toast.error("상품 기한을 입력하세요.");-->
<!--        return;-->
<!--      }-->
<!--      try {-->
<!--        const response = await axios.patch(-->
<!--          `https://yoger.o-r.kr/api/price-offers/${offer.productId}/confirm`,-->
<!--          {-->
<!--            companyId: offer.companyId,-->
<!--            dueDate: offer.dueDate + "T23:59:59",-->
<!--          },-->
<!--          {-->
<!--            headers: {-->
<!--              Authorization: `Bearer ${token}`,-->
<!--              "Content-Type": "application/json",-->
<!--              "user-id": userId,-->
<!--            },-->
<!--          }-->
<!--        );-->
<!--        this.$toast.success("제안이 성공적으로 수락되었습니다.");-->
<!--        console.log("API 응답:", response.data);-->
<!--      } catch (error) {-->
<!--        console.error("제안 수락 실패:", error);-->
<!--        this.$toast.error("제안 수락에 실패했습니다.");-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<style scoped>
.big-f {
  width: 100%;
}
.section-actions {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.big-button {
  width: 100px;
  height: 40px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}

.big-button:hover {
  background-color: #0056b3;
}

.proposal-button {
  background-color: #007bff;
}

.accept-button {
  background-color: #28a745;
}

.accept-button:hover {
  background-color: #218838;
}

.price-offers-list {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.offer-item {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.offer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.offer-header h3,
.offer-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.offer-entries {
  list-style: none;
  margin: 0;
  padding: 0;
}

.offer-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.offer-entry:last-child {
  border-bottom: none;
}

.offer-details {
  font-size: 14px;
  color: #555;
}

.offer-status {
  margin-top: 10px;
  font-size: 14px;
  color: #888;
}

.offer-due-date {
  margin-top: 10px;
}

.due-date-label {
  font-size: 14px;
  font-weight: bold;
  color: #555;
  margin-right: 10px;
}

.due-date-input {
  font-size: 14px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.offer-actions {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.delete-button {
  background-color: #ff4d4f;
  color: white;
}

.delete-button:hover {
  background-color: #d4001a;
}

.no-offers-message {
  text-align: center;
  font-size: 14px;
  color: #999;
  margin-top: 20px;
}
</style>

<template>
  <div class="big-f">
    <div class="section-actions">
      <!-- COMPANY 권한인 경우에만 가격 제안 버튼 렌더링 -->
      <button
        v-if="isCompany"
        class="big-button proposal-button"
        @click="openProposalModal"
      >
        가격 제안
      </button>
    </div>

    <div v-if="priceOffers.length > 0" class="price-offers-list">
      <div
        v-for="(offer, index) in filteredOffers"
        :key="index"
        class="offer-item"
      >
        <div class="offer-header">
          <h3>회사 : {{ offer.companyName }}</h3>
          <!--          <h4>상품 ID: {{ offer.productId }}</h4> -->
        </div>
        <ul class="offer-entries">
          <li
            v-for="(entry, i) in offer.priceByQuantities"
            :key="i"
            class="offer-entry"
          >
            <span class="offer-details">
              수량: {{ entry.quantity }}, 가격: {{ entry.price }}
            </span>
          </li>
        </ul>
        <p class="offer-status">상태: {{ offer.state }}</p>
        <div v-if="isUser" class="offer-due-date">
          <label for="dueDate-{{ index }}" class="due-date-label"
            >상품 기한:</label
          >
          <input
            id="dueDate-{{ index }}"
            type="date"
            v-model="offer.dueDate"
            class="due-date-input"
          />
        </div>
        <div class="offer-actions">
          <!-- USER 권한이 아닌 경우에만 수정 및 삭제 버튼 렌더링 -->
          <button
            v-if="isUser"
            class="big-button accept-button"
            @click="acceptOffer(offer)"
          >
            제안 수락
          </button>
          <button
            v-if="!isUser"
            class="big-button edit-button"
            @click="$emit('edit-offer', offer)"
          >
            수정
          </button>
          <button
            v-if="!isUser"
            class="big-button delete-button"
            @click="$emit('delete-offer', offer)"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
    <p v-else class="no-offers-message">가격 제안이 없습니다.</p>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  props: {
    priceOffers: {
      type: Array,
      required: true,
    },
  },
  computed: {
    // Vuex의 authorities 상태를 가져옴
    ...mapState(["authorities"]),

    // COMPANY 권한 여부를 계산
    isCompany() {
      return this.authorities.includes("COMPANY");
    },

    // 자신의 companyId와 일치하는 offer만 필터링
    filteredOffers() {
      const token = localStorage.getItem("access-token");
      if (!token) {
        console.warn("access-token이 없습니다.");
        return [];
      }

      const decodedToken = this.parseJwt(token);
      const myCompanyId = decodedToken?.sub;

      console.log("내 회사 ID:", myCompanyId); // 자신의 companyId 출력

      // offer의 companyId와 비교
      const filtered = this.authorities.includes("USER")
        ? this.priceOffers // USER 권한이면 그대로 반환
        : this.priceOffers.filter((offer) => {
            // 자료형을 통일 (문자열로 변환하여 비교)
            const offerCompanyId = String(offer.companyId);
            const myCompanyIdString = String(myCompanyId);

            console.log(
              `Offer의 companyId: ${offerCompanyId}, 내 회사 ID: ${myCompanyIdString}`
            ); // 디버깅용 로그

            return offerCompanyId === myCompanyIdString;
          });

      console.log("필터링된 결과:", filtered); // 결과 확인

      //console.log("필터링된 offer 목록:", filtered); // 필터링 결과 출력
      return filtered;
    },

    // USER 권한 여부를 계산
    isUser() {
      return this.authorities.includes("USER");
    },
  },
  methods: {
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
    openProposalModal() {
      this.$emit("open-proposal-modal");
    },
    async acceptOffer(offer) {
      const token = localStorage.getItem("access-token");
      const userId = this.parseJwt(token)?.sub;
      console.log(userId);
      if (!userId) {
        this.$toast.error("사용자 ID가 없습니다.");
        return;
      }
      if (!offer.dueDate) {
        this.$toast.error("상품 기한을 입력하세요.");
        return;
      }
      try {
        const response = await axios.patch(
          `https://yoger.o-r.kr/api/price-offers/${offer.productId}/confirm`,
          {
            companyId: offer.companyId,
            dueDate: offer.dueDate + "T23:59:59",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "user-id": userId,
            },
          }
        );
        this.$toast.success("제안이 성공적으로 수락되었습니다.");
        console.log("API 응답:", response.data);
      } catch (error) {
        console.error("제안 수락 실패:", error);
        this.$toast.error("제안 수락에 실패했습니다.");
      }
    },
  },
};
</script>
