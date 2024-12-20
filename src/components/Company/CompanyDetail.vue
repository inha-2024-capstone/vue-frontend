<template>
  <div class="container">
    <div class="detail-card">
      <!-- 이미지 -->
      <div class="image-container">
        <img
          v-if="company.imageUrl"
          :src="company.imageUrl"
          :alt="company.name"
          class="company-image"
        />
        <div v-else class="image-placeholder">No Image</div>
      </div>

      <!-- 텍스트 정보 -->
      <div class="content">
        <h1 class="company-name">{{ company.name }}</h1>
        <p class="company-address">📍 {{ company.address }}</p>
        <p class="company-phone">📞 {{ company.phone }}</p>
        <p class="company-description">{{ company.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyDetail",
  props: ["companyId"], // 동적 경로에서 companyId를 prop으로 받음
  data() {
    return {
      company: null, // 업체 데이터
    };
  },
  created() {
    this.fetchCompanyDetail(); // 컴포넌트 생성 시 데이터 로드
  },
  methods: {
    fetchCompanyDetail() {
      // 더미 데이터
      const dummyCompanies = [
        {
          id: 1,
          name: "김시우섹스",
          imageUrl: "https://via.placeholder.com/300",
          address: "서울특별시 강남구",
          phone: "010-5877-4485",
          description: "최고의 섹스용품 제조 업체",
        },
        {
          id: 2,
          name: "해운대",
          imageUrl: "https://via.placeholder.com/300",
          address: "부산광역시 해운대구",
          phone: "010-8765-4321",
          description: "해운대 지역 최고의 해산물 유통 업체",
        },
        {
          id: 3,
          name: "수원역",
          imageUrl: "",
          address: "경기도 수원시",
          phone: "010-5678-1234",
          description: "수원역 주변 카페 및 디저트 판매점",
        },
      ];

      // companyId에 해당하는 데이터 검색
      const company = dummyCompanies.find(
        (item) => item.id === parseInt(this.companyId)
      );

      if (company) {
        this.company = company;
      } else {
        console.error("Company not found");
      }
    },
  },
};
</script>

<style scoped>
/* 컨테이너 스타일 */
.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
}

/* 카드 스타일 */
.detail-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 이미지 스타일 */
.image-container {
  width: 100%;
  height: 300px;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.company-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  color: #888;
  font-size: 14px;
}

/* 텍스트 정보 */
.content {
  padding: 20px;
}

.company-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
}

.company-address,
.company-phone {
  font-size: 16px;
  margin-bottom: 8px;
  color: #555;
}

.company-description {
  font-size: 16px;
  margin-top: 16px;
  color: #666;
}
</style>
