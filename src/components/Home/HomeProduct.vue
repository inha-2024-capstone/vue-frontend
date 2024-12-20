<!--<template>-->
<!--  <div class="container">-->
<!--    <button class="arrow left-arrow" @click="prevSlide">‹</button>-->
<!--    <div class="card">-->
<!--      <div class="image-section">-->
<!--        <img :src="currentSlide.image" alt="Solar Image" class="image" />-->
<!--      </div>-->
<!--      <div class="text-section">-->
<!--        <h2>{{ currentSlide.title }}</h2>-->
<!--        <p>{{ currentSlide.description }}</p>-->
<!--      </div>-->
<!--    </div>-->
<!--    <button class="arrow right-arrow" @click="nextSlide">›</button>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      slides: [-->
<!--        {-->
<!--          image: require("@/assets/goods1.jpg"),-->
<!--          title: "상품1",-->
<!--          description: "누르면 상품으로 넘어갈 예정",-->
<!--        },-->
<!--        {-->
<!--          image: require("@/assets/goods4.jpg"),-->
<!--          title: "상품2",-->
<!--          description: "누르면 상품으로 넘어갈 예정",-->
<!--        },-->
<!--        {-->
<!--          image: require("@/assets/goods3.jpg"),-->
<!--          title: "상품3",-->
<!--          description: "누르면 상품으로 넘어갈 예정",-->
<!--        },-->
<!--      ],-->
<!--      currentIndex: 0,-->
<!--    };-->
<!--  },-->
<!--  computed: {-->
<!--    currentSlide() {-->
<!--      return this.slides[this.currentIndex];-->
<!--    },-->
<!--  },-->
<!--  mounted() {-->
<!--    this.startSlideShow();-->
<!--  },-->
<!--  methods: {-->
<!--    startSlideShow() {-->
<!--      setInterval(() => {-->
<!--        this.nextSlide();-->
<!--      }, 5000); // 5초마다 자동 슬라이드-->
<!--    },-->
<!--    nextSlide() {-->
<!--      this.currentIndex = (this.currentIndex + 1) % this.slides.length;-->
<!--    },-->
<!--    prevSlide() {-->
<!--      this.currentIndex =-->
<!--        (this.currentIndex - 1 + this.slides.length) % this.slides.length;-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.container {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  width: 100%;-->
<!--  height: 100%; /* 전체 높이를 더 높게 설정 */-->
<!--  position: relative;-->
<!--}-->

<!--.card {-->
<!--  display: flex;-->
<!--  flex-direction: column; /* 상하로 배치 */-->
<!--  width: 75%;-->
<!--  height: 100%;-->
<!--  background-color: white;-->
<!--  border-radius: 24px;-->
<!--  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.08);-->
<!--  overflow: hidden;-->
<!--  padding: 20px;-->
<!--  transition: transform 0.5s ease-in-out;-->
<!--}-->

<!--.image-section {-->
<!--  flex: 7; /* 비율을 더 크게 조정 */-->
<!--  background-color: #c4c4c4;-->
<!--  border-radius: 16px;-->
<!--  height: 80%; /* 세로를 더 길게 */-->
<!--  overflow: hidden;-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--}-->

<!--.image {-->
<!--  width: 100%;-->
<!--  height: 100%; /* 이미지 영역을 세로에 맞춤 */-->
<!--  object-fit: cover;-->
<!--}-->

<!--.text-section {-->
<!--  flex: 2;-->
<!--  padding: 20px;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  justify-content: center;-->
<!--  color: #284b80;-->
<!--  text-align: center; /* 텍스트 가운데 정렬 */-->
<!--}-->

<!--h2 {-->
<!--  font-family: "Nunito Sans", sans-serif;-->
<!--  font-size: 24px;-->
<!--  font-weight: 600;-->
<!--}-->

<!--p {-->
<!--  font-family: "Inter", sans-serif;-->
<!--  font-size: 16px;-->
<!--  font-weight: 300;-->
<!--  color: #8d98aa;-->
<!--  line-height: 1.4;-->
<!--}-->

<!--.arrow {-->
<!--  background-color: transparent;-->
<!--  border: none;-->
<!--  font-size: 50px;-->
<!--  color: #284b80;-->
<!--  cursor: pointer;-->
<!--  position: absolute;-->
<!--  top: 50%;-->
<!--  transform: translateY(-50%);-->
<!--  z-index: 10;-->
<!--}-->

<!--.left-arrow {-->
<!--  left: 10px;-->
<!--}-->

<!--.right-arrow {-->
<!--  right: 10px;-->
<!--}-->

<!--.arrow:focus {-->
<!--  outline: none;-->
<!--}-->
<!--</style>-->

<!--<template>-->
<!--  <div class="container">-->
<!--    <button class="arrow left-arrow" @click="prevSlide">‹</button>-->
<!--    <div class="card">-->
<!--      <div class="image-section">-->
<!--        <img :src="currentSlide.image" alt="Product Image" class="image" />-->
<!--      </div>-->
<!--      <div class="text-section">-->
<!--        <h2>{{ currentSlide.title }}</h2>-->
<!--        <p>{{ currentSlide.description }}</p>-->
<!--      </div>-->
<!--    </div>-->
<!--    <button class="arrow right-arrow" @click="nextSlide">›</button>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from "axios";-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      slides: [], // 슬라이드 데이터를 저장할 배열-->
<!--      currentIndex: 0,-->
<!--    };-->
<!--  },-->
<!--  computed: {-->
<!--    currentSlide() {-->
<!--      return this.slides[this.currentIndex];-->
<!--    },-->
<!--  },-->
<!--  mounted() {-->
<!--    this.fetchProducts(); // 컴포넌트가 마운트되면 데이터 가져오기-->
<!--  },-->
<!--  methods: {-->
<!--    async fetchProducts() {-->
<!--      try {-->
<!--        const url = "https://yoger.o-r.kr/api/products";-->

<!--        const response = await axios.get(url, {-->
<!--          headers: {},-->
<!--        });-->

<!--        const products = response.data;-->
<!--        console.log(products);-->

<!--        // 데이터를 슬라이드 형식에 맞게 가공-->
<!--        this.slides = products.map((product) => ({-->
<!--          image:-->
<!--            product.thumbnailImageUrl || require("@/assets/goods-demo.webp"),-->
<!--          title: product.name || "상품명 없음",-->
<!--          description: product.description || "상품 설명 없음",-->
<!--        }));-->

<!--        // 슬라이드를 랜덤하게 섞음-->
<!--        this.shuffleSlides();-->

<!--        // 슬라이드 쇼 시작-->
<!--        this.startSlideShow();-->
<!--      } catch (error) {-->
<!--        console.error("Failed to fetch products:", error);-->
<!--      }-->
<!--    },-->
<!--    shuffleSlides() {-->
<!--      this.slides = this.slides.sort(() => Math.random() - 0.5);-->
<!--    },-->
<!--    startSlideShow() {-->
<!--      setInterval(() => {-->
<!--        this.nextSlide();-->
<!--      }, 5000); // 5초마다 자동 슬라이드-->
<!--    },-->
<!--    nextSlide() {-->
<!--      this.currentIndex = (this.currentIndex + 1) % this.slides.length;-->
<!--    },-->
<!--    prevSlide() {-->
<!--      this.currentIndex =-->
<!--        (this.currentIndex - 1 + this.slides.length) % this.slides.length;-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.container {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  position: relative;-->
<!--}-->

<!--.card {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  width: 75%;-->
<!--  height: 100%;-->
<!--  background-color: white;-->
<!--  border-radius: 24px;-->
<!--  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.08);-->
<!--  overflow: hidden;-->
<!--  padding: 20px;-->
<!--  transition: transform 0.5s ease-in-out;-->
<!--}-->

<!--.image-section {-->
<!--  flex: 7;-->
<!--  background-color: #c4c4c4;-->
<!--  border-radius: 16px;-->
<!--  height: 80%;-->
<!--  overflow: hidden;-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--}-->

<!--.image {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  object-fit: cover;-->
<!--}-->

<!--.text-section {-->
<!--  flex: 2;-->
<!--  padding: 20px;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  justify-content: center;-->
<!--  color: #284b80;-->
<!--  text-align: center;-->
<!--}-->

<!--h2 {-->
<!--  font-family: "Nunito Sans", sans-serif;-->
<!--  font-size: 24px;-->
<!--  font-weight: 600;-->
<!--}-->

<!--p {-->
<!--  font-family: "Inter", sans-serif;-->
<!--  font-size: 16px;-->
<!--  font-weight: 300;-->
<!--  color: #8d98aa;-->
<!--  line-height: 1.4;-->
<!--}-->

<!--.arrow {-->
<!--  background-color: transparent;-->
<!--  border: none;-->
<!--  font-size: 50px;-->
<!--  color: #284b80;-->
<!--  cursor: pointer;-->
<!--  position: absolute;-->
<!--  top: 50%;-->
<!--  transform: translateY(-50%);-->
<!--  z-index: 10;-->
<!--}-->

<!--.left-arrow {-->
<!--  left: 10px;-->
<!--}-->

<!--.right-arrow {-->
<!--  right: 10px;-->
<!--}-->

<!--.arrow:focus {-->
<!--  outline: none;-->
<!--}-->
<!--</style>-->

<template>
  <div class="container">
    <button class="arrow left-arrow" @click="prevSlide">‹</button>
    <div
      class="card"
      v-if="currentSlide"
      @click="navigateToProduct(currentSlide.id)"
    >
      <div class="image-section">
        <img
          :src="currentSlide.thumbnailImageUrl"
          alt="Product Image"
          class="image"
        />
      </div>
      <div class="text-section">
        <h2>{{ currentSlide.name }}</h2>
        <p>{{ currentSlide.description }}</p>
      </div>
    </div>
    <button class="arrow right-arrow" @click="nextSlide">›</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      slides: [], // 슬라이드 데이터를 저장할 배열
      currentIndex: 0,
    };
  },
  computed: {
    currentSlide() {
      return this.slides[this.currentIndex];
    },
  },
  mounted() {
    this.fetchProducts(); // 컴포넌트가 마운트되면 데이터 가져오기
  },
  methods: {
    async fetchProducts() {
      try {
        const url = "https://yoger.o-r.kr/api/products/demo"; // 데이터 가져올 URL

        const response = await axios.get(url, {
          headers: {},
        });

        const products = response.data;
        console.log(products);

        // 데이터를 슬라이드 형식에 맞게 가공
        this.slides = products.map((product) => ({
          thumbnailImageUrl:
            product.thumbnailImageUrl || require("@/assets/goods-demo.webp"),
          name: product.name || "상품명 없음",
          description: product.creatorName,
          id: product.id,
        }));

        // 슬라이드를 랜덤하게 섞음
        this.shuffleSlides();

        // 슬라이드 쇼 시작
        this.startSlideShow();
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    },
    shuffleSlides() {
      this.slides = this.slides.sort(() => Math.random() - 0.5);
    },
    startSlideShow() {
      setInterval(() => {
        this.nextSlide();
      }, 5000); // 5초마다 자동 슬라이드
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    },
    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    },
    navigateToProduct(productId) {
      // 상품 ID로 이동
      this.$router.push(`/demo/${productId}`);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
}

.card {
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 100%;
  background-color: white;
  border-radius: 24px;
  //box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 20px;
  transition: transform 0.5s ease-in-out;
}

.image-section {
  flex: 7;
  background-color: #ffffff;
  border-radius: 16px;
  height: 80%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  max-width: 100%;
  max-height: 100%;
}

.text-section {
  flex: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #284b80;
  text-align: center;
}

h2 {
  font-family: "Nunito Sans", sans-serif;
  font-size: 24px;
  font-weight: 600;
}

p {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 300;
  color: #8d98aa;
  line-height: 1.4;
  white-space: pre-line; /* 줄바꿈 적용 */
}

.arrow {
  background-color: transparent;
  border: none;
  font-size: 50px;
  color: #284b80;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.left-arrow {
  left: 10px;
}

.right-arrow {
  right: 10px;
}

.arrow:focus {
  outline: none;
}
</style>
