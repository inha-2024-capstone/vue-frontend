<!--<template>-->
<!--  <div class="product-list-container">-->
<!--    <div class="header">-->
<!--      <h1 class="title">Products</h1>-->
<!--      <div class="actions">-->
<!--        <button @click="deleteSelected" class="delete-button">-->
<!--          선택상품 삭제-->
<!--        </button>-->
<!--      </div>-->
<!--    </div>-->

<!--    &lt;!&ndash; 제작중인 상품 (DEMO) 섹션 &ndash;&gt;-->
<!--    <div class="product-category">-->
<!--      <h2 @click="showDemo = !showDemo" class="category-header">-->
<!--        제작중인 상품 (DEMO)-->
<!--      </h2>-->
<!--      <div v-if="showDemo" class="product-list">-->
<!--        <div-->
<!--          v-for="product in demoProducts"-->
<!--          :key="product.id"-->
<!--          class="product-item"-->
<!--        >-->
<!--          <img-->
<!--            :src="product.thumbnailImageUrl || defaultImage"-->
<!--            alt="Product Image"-->
<!--            class="product-image"-->
<!--          />-->
<!--          <h2 class="product-name">-->
<!--            <router-link :to="`/demo/${product.id}`">{{-->
<!--              product.name-->
<!--            }}</router-link>-->
<!--          </h2>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--    &lt;!&ndash; 판매중인 상품 (SELLABLE) 섹션 &ndash;&gt;-->
<!--    <div class="product-category">-->
<!--      <h2 @click="showSellable = !showSellable" class="category-header">-->
<!--        판매중인 상품 (SELLABLE)-->
<!--      </h2>-->
<!--      <div v-if="showSellable" class="product-list">-->
<!--        <div-->
<!--          v-for="product in sellableProducts"-->
<!--          :key="product.id"-->
<!--          class="product-item"-->
<!--        >-->
<!--          <img-->
<!--            :src="product.thumbnailImageUrl || defaultImage"-->
<!--            alt="Product Image"-->
<!--            class="product-image"-->
<!--          />-->
<!--          <h2 class="product-name">-->
<!--            <router-link :to="`/product/${product.id}`">{{-->
<!--              product.name-->
<!--            }}</router-link>-->
<!--          </h2>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from "axios";-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      products: [],-->
<!--      checkedItems: [],-->
<!--      userId: null,-->
<!--      defaultImage: "https://via.placeholder.com/150",-->
<!--      showDemo: false,-->
<!--      showSellable: false,-->
<!--    };-->
<!--  },-->
<!--  computed: {-->
<!--    demoProducts() {-->
<!--      return this.products.filter((p) => p.state === "DEMO");-->
<!--    },-->
<!--    sellableProducts() {-->
<!--      return this.products.filter((p) => p.state === "SELLABLE");-->
<!--    },-->
<!--  },-->
<!--  methods: {-->
<!--    decodeTokenForUserId() {-->
<!--      const token = localStorage.getItem("access-token");-->
<!--      if (token) {-->
<!--        const parts = token.split(".");-->
<!--        if (parts.length === 3) {-->
<!--          let payload = parts[1];-->
<!--          payload = payload.replace(/-/g, "+").replace(/_/g, "/");-->
<!--          const decoded = atob(payload); // base64 디코딩-->
<!--          const payloadObj = JSON.parse(decoded);-->
<!--          this.userId = payloadObj.sub; // 토큰 페이로드에서 userId 추출-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    async fetchProducts() {-->
<!--      try {-->
<!--        const response = await axios.get(-->
<!--          "https://yoger.o-r.kr/api/products/common/creator",-->
<!--          {-->
<!--            headers: {-->
<!--              Authorization: `Bearer ${localStorage.getItem("access-token")}`,-->
<!--            },-->
<!--          }-->
<!--        );-->
<!--        this.products = response.data;-->
<!--        console.log(this.products);-->
<!--      } catch (error) {-->
<!--        console.error("Error fetching products:", error);-->
<!--      }-->
<!--    },-->
<!--    deleteSelected() {-->
<!--      // 삭제 로직 (현재 checkedItems는 없으므로 필요 시 로직 변경)-->
<!--      console.log("선택상품 삭제 기능 구현 필요");-->
<!--    },-->
<!--  },-->
<!--  mounted() {-->
<!--    this.decodeTokenForUserId();-->
<!--    this.fetchProducts();-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.product-list-container {-->
<!--  width: 100%;-->
<!--  max-width: 800px;-->
<!--  margin: auto;-->
<!--}-->

<!--.header {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--  margin-bottom: 16px;-->
<!--}-->

<!--.title {-->
<!--  font-size: 24px;-->
<!--  font-weight: bold;-->
<!--}-->

<!--.actions {-->
<!--  display: flex;-->
<!--  gap: 8px;-->
<!--}-->

<!--.delete-button {-->
<!--  background-color: #888888;-->
<!--  color: white;-->
<!--  padding: 8px 16px;-->
<!--  border: none;-->
<!--  border-radius: 4px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.delete-button:hover {-->
<!--  background-color: #333333;-->
<!--}-->

<!--.product-category {-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.category-header {-->
<!--  font-size: 20px;-->
<!--  font-weight: bold;-->
<!--  cursor: pointer;-->
<!--  margin-bottom: 8px;-->
<!--}-->

<!--/* 세로 리스트 형태로 정렬. */-->
<!--.product-list {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  gap: 8px;-->
<!--}-->

<!--.product-item {-->
<!--  background-color: white;-->
<!--  border: 1px solid #ddd;-->
<!--  border-radius: 8px;-->
<!--  padding: 16px;-->
<!--  display: flex;-->
<!--  flex-direction: row;-->
<!--  align-items: center; /* 이미지와 텍스트 수직 중앙 정렬 */-->
<!--  gap: 16px; /* 이미지와 이름 사이 간격 */-->
<!--}-->

<!--.product-image {-->
<!--  width: 80px;-->
<!--  height: 80px;-->
<!--  object-fit: cover;-->
<!--  border-radius: 4px;-->
<!--}-->

<!--.product-name {-->
<!--  font-size: 18px;-->
<!--  font-weight: bold;-->
<!--  margin: 0; /* 상하 여백 제거 */-->
<!--}-->
<!--</style>-->

<template>
  <div v-if="isLoggedIn" class="product-list-container">
    <div v-if="isCompany" class="restricted-message">
      개인 사용자에게만 허락된 기능입니다
    </div>
    <div v-else>
      <div class="header">
        <h1 class="title">Products</h1>
      </div>

      <!-- 제작중인 상품 (DEMO) 섹션 -->
      <div class="product-category">
        <h2 @click="showDemo = !showDemo" class="category-header">
          나의 제작중인 상품
        </h2>
        <div v-if="showDemo" class="product-list">
          <div
            v-for="product in demoProducts"
            :key="product.id"
            class="product-item"
          >
            <img
              :src="product.thumbnailImageUrl || defaultImage"
              alt="Product Image"
              class="product-image"
            />
            <h2 class="product-name">
              <router-link :to="`/demo/${product.id}`">{{
                product.name
              }}</router-link>
            </h2>
          </div>
        </div>
      </div>

      <!-- 판매중인 상품 (SELLABLE) 섹션 -->
      <div class="product-category">
        <h2 @click="showSellable = !showSellable" class="category-header">
          나의 판매중인 상품
        </h2>
        <div v-if="showSellable" class="product-list">
          <div
            v-for="product in sellableProducts"
            :key="product.id"
            class="product-item"
          >
            <img
              :src="product.thumbnailImageUrl || defaultImage"
              alt="Product Image"
              class="product-image"
            />
            <h2 class="product-name">
              <router-link :to="`/product/${product.id}`">{{
                product.name
              }}</router-link>
            </h2>
          </div>
        </div>
      </div>
      <!-- 주문한 상품 조회 섹션 -->
      <div class="product-category">
        <h2 @click="showOrders = !showOrders" class="category-header">
          주문한 상품 조회
        </h2>
        <div v-if="showOrders" class="product-list">
          <div
            v-for="order in orderedProducts"
            :key="order.orderId"
            class="product-item"
          >
            <a :href="`/product/${order.productId}`">
              <img
                :src="order.imageUrl || defaultImage"
                alt="Product Image"
                class="product-image"
              />
            </a>
            <div>
              <h3 class="product-name">{{ order.name }}</h3>

              <p>주문 수량: {{ order.quantity }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="error-message">로그인이 필요합니다.</div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      products: [],
      orderedProducts: [],
      checkedItems: [],
      userId: null,
      defaultImage: "https://via.placeholder.com/150",
      showDemo: false,
      showSellable: false,
      showOrders: false,
    };
  },
  computed: {
    ...mapGetters(["userAuthorities"]), // vuex의 authorities 상태 가져오기
    ...mapState(["authorities", "isLoggedIn"]),
    isCompany() {
      return this.userAuthorities === "COMPANY";
    },
    demoProducts() {
      return this.products.filter((p) => p.state === "DEMO");
    },
    sellableProducts() {
      return this.products.filter((p) => p.state === "SELLABLE");
    },
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await axios.get("https://yoger.o-r.kr/api/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            "Content-Type": "application/json",
          },
        });
        const orders = response.data.orderResponseDTOs;
        console.log(orders);

        // Fetch product details for each order
        const productPromises = orders.map((order) =>
          this.fetchProductData(order)
        );
        const orderedProducts = await Promise.all(productPromises);
        this.orderedProducts = orderedProducts;
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
    async fetchProductData(order) {
      try {
        const response = await axios.get(
          `https://yoger.o-r.kr/api/products/${order.productId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return {
          ...response.data,
          productId: order.productId,
          orderId: order.orderId,
          quantity: order.quantity,
        };
      } catch (error) {
        console.error("Failed to fetch product data:", error);
        return {
          name: "상품 정보를 불러오지 못했습니다",
          thumbnailImageUrl: this.defaultImage,
          orderId: order.orderId,
          quantity: order.quantity,
        };
      }
    },
    decodeTokenForUserId() {
      const token = localStorage.getItem("access-token");
      if (token) {
        const parts = token.split(".");
        if (parts.length === 3) {
          let payload = parts[1];
          payload = payload.replace(/-/g, "+").replace(/_/g, "/");
          const decoded = atob(payload); // base64 디코딩
          const payloadObj = JSON.parse(decoded);
          this.userId = payloadObj.sub; // 토큰 페이로드에서 userId 추출
        }
      }
    },
    async fetchProducts() {
      if (this.isCompany) return; // COMPANY일 경우 요청 중단
      try {
        const response = await axios.get(
          "https://yoger.o-r.kr/api/products/common/creator",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        );
        this.products = response.data;
        console.log(this.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    deleteSelected() {
      console.log("선택상품 삭제 기능 구현 필요");
    },
  },
  mounted() {
    if (!this.isCompany) {
      this.decodeTokenForUserId();
      this.fetchProducts();
      this.fetchOrders();
    }
  },
};
</script>

<style scoped>
.product-list-container {
  width: 100%;
  max-width: 1000px;
  margin: auto;
}

.restricted-message {
  text-align: center;
  margin: 50px 0;
  font-size: 18px;
  color: black;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 8px;
}

.delete-button {
  background-color: #888888;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #333333;
}

.product-category {
  margin-bottom: 50px;
}

.category-header {
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 8px;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-item {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
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
</style>
