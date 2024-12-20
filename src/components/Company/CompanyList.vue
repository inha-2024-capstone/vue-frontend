<!--&lt;!&ndash;<template>&ndash;&gt;-->
<!--&lt;!&ndash;  <div class="container">&ndash;&gt;-->
<!--&lt;!&ndash;    <h1 class="title">업체목록</h1>&ndash;&gt;-->
<!--&lt;!&ndash;    <div class="grid">&ndash;&gt;-->
<!--&lt;!&ndash;      <div&ndash;&gt;-->
<!--&lt;!&ndash;        v-for="company in companies"&ndash;&gt;-->
<!--&lt;!&ndash;        :key="company.id"&ndash;&gt;-->
<!--&lt;!&ndash;        class="card"&ndash;&gt;-->
<!--&lt;!&ndash;        @click="goToDetail(company.id)"&ndash;&gt;-->
<!--&lt;!&ndash;      >&ndash;&gt;-->
<!--&lt;!&ndash;        &lt;!&ndash; 사진 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="image-container">&ndash;&gt;-->
<!--&lt;!&ndash;          <img&ndash;&gt;-->
<!--&lt;!&ndash;            v-if="company.imageUrl"&ndash;&gt;-->
<!--&lt;!&ndash;            :src="company.imageUrl"&ndash;&gt;-->
<!--&lt;!&ndash;            :alt="company.name"&ndash;&gt;-->
<!--&lt;!&ndash;            class="company-image"&ndash;&gt;-->
<!--&lt;!&ndash;          />&ndash;&gt;-->
<!--&lt;!&ndash;          <div v-else class="placeholder">No Image</div>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;        &lt;!&ndash; 정보 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="card-content">&ndash;&gt;-->
<!--&lt;!&ndash;          <h2 class="company-name">{{ company.name }}</h2>&ndash;&gt;-->
<!--&lt;!&ndash;          <p class="company-phone">📞 {{ company.phone }}</p>&ndash;&gt;-->
<!--&lt;!&ndash;          <p class="company-description">{{ company.description }}</p>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;  </div>&ndash;&gt;-->
<!--&lt;!&ndash;</template>&ndash;&gt;-->

<!--&lt;!&ndash;<script>&ndash;&gt;-->
<!--&lt;!&ndash;export default {&ndash;&gt;-->
<!--&lt;!&ndash;  name: "CompanyList",&ndash;&gt;-->
<!--&lt;!&ndash;  data() {&ndash;&gt;-->
<!--&lt;!&ndash;    return {&ndash;&gt;-->
<!--&lt;!&ndash;      // 더미 데이터&ndash;&gt;-->
<!--&lt;!&ndash;      companies: [&ndash;&gt;-->
<!--&lt;!&ndash;        {&ndash;&gt;-->
<!--&lt;!&ndash;          id: 1,&ndash;&gt;-->
<!--&lt;!&ndash;          name: "김시우섹스",&ndash;&gt;-->
<!--&lt;!&ndash;          imageUrl: "https://via.placeholder.com/150",&ndash;&gt;-->
<!--&lt;!&ndash;          phone: "010-5877-4485",&ndash;&gt;-->
<!--&lt;!&ndash;          description: "최고의 섹스용품 제조 업체",&ndash;&gt;-->
<!--&lt;!&ndash;        },&ndash;&gt;-->
<!--&lt;!&ndash;        {&ndash;&gt;-->
<!--&lt;!&ndash;          id: 2,&ndash;&gt;-->
<!--&lt;!&ndash;          name: "해운대",&ndash;&gt;-->
<!--&lt;!&ndash;          imageUrl: "https://via.placeholder.com/150",&ndash;&gt;-->
<!--&lt;!&ndash;          phone: "010-8765-4321",&ndash;&gt;-->
<!--&lt;!&ndash;          description: "해운대 지역 최고의 해산물 유통 업체",&ndash;&gt;-->
<!--&lt;!&ndash;        },&ndash;&gt;-->
<!--&lt;!&ndash;        {&ndash;&gt;-->
<!--&lt;!&ndash;          id: 3,&ndash;&gt;-->
<!--&lt;!&ndash;          name: "수원역",&ndash;&gt;-->
<!--&lt;!&ndash;          imageUrl: "",&ndash;&gt;-->
<!--&lt;!&ndash;          phone: "010-5678-1234",&ndash;&gt;-->
<!--&lt;!&ndash;          description: "수원역 주변 카페 및 디저트 판매점",&ndash;&gt;-->
<!--&lt;!&ndash;        },&ndash;&gt;-->
<!--&lt;!&ndash;      ],&ndash;&gt;-->
<!--&lt;!&ndash;    };&ndash;&gt;-->
<!--&lt;!&ndash;  },&ndash;&gt;-->
<!--&lt;!&ndash;  methods: {&ndash;&gt;-->
<!--&lt;!&ndash;    goToDetail(companyId) {&ndash;&gt;-->
<!--&lt;!&ndash;      // 상세 페이지로 이동&ndash;&gt;-->
<!--&lt;!&ndash;      this.$router.push(`/company/${companyId}`);&ndash;&gt;-->
<!--&lt;!&ndash;    },&ndash;&gt;-->
<!--&lt;!&ndash;  },&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->
<!--&lt;!&ndash;</script>&ndash;&gt;-->

<!--&lt;!&ndash;<style scoped>&ndash;&gt;-->
<!--&lt;!&ndash;/* 컨테이너 스타일 */&ndash;&gt;-->
<!--&lt;!&ndash;.container {&ndash;&gt;-->
<!--&lt;!&ndash;  max-width: 1200px;&ndash;&gt;-->
<!--&lt;!&ndash;  margin: 20px auto;&ndash;&gt;-->
<!--&lt;!&ndash;  padding: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;  background-color: #f9f9f9;&ndash;&gt;-->
<!--&lt;!&ndash;  border: 1px solid #ddd;&ndash;&gt;-->
<!--&lt;!&ndash;  border-radius: 8px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;/* 제목 스타일 */&ndash;&gt;-->
<!--&lt;!&ndash;.title {&ndash;&gt;-->
<!--&lt;!&ndash;  font-size: 24px;&ndash;&gt;-->
<!--&lt;!&ndash;  font-weight: bold;&ndash;&gt;-->
<!--&lt;!&ndash;  margin-bottom: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;  text-align: center;&ndash;&gt;-->
<!--&lt;!&ndash;  color: #333;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;/* 그리드 레이아웃 */&ndash;&gt;-->
<!--&lt;!&ndash;.grid {&ndash;&gt;-->
<!--&lt;!&ndash;  display: grid;&ndash;&gt;-->
<!--&lt;!&ndash;  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));&ndash;&gt;-->
<!--&lt;!&ndash;  gap: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;/* 카드 스타일 */&ndash;&gt;-->
<!--&lt;!&ndash;.card {&ndash;&gt;-->
<!--&lt;!&ndash;  background-color: #fff;&ndash;&gt;-->
<!--&lt;!&ndash;  border: 1px solid #ddd;&ndash;&gt;-->
<!--&lt;!&ndash;  border-radius: 8px;&ndash;&gt;-->
<!--&lt;!&ndash;  overflow: hidden;&ndash;&gt;-->
<!--&lt;!&ndash;  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;/* 이미지 컨테이너 */&ndash;&gt;-->
<!--&lt;!&ndash;.image-container {&ndash;&gt;-->
<!--&lt;!&ndash;  width: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;  height: 150px;&ndash;&gt;-->
<!--&lt;!&ndash;  overflow: hidden;&ndash;&gt;-->
<!--&lt;!&ndash;  background-color: #f0f0f0;&ndash;&gt;-->
<!--&lt;!&ndash;  display: flex;&ndash;&gt;-->
<!--&lt;!&ndash;  align-items: center;&ndash;&gt;-->
<!--&lt;!&ndash;  justify-content: center;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.company-image {&ndash;&gt;-->
<!--&lt;!&ndash;  width: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;  height: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;  object-fit: cover;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.placeholder {&ndash;&gt;-->
<!--&lt;!&ndash;  color: #888;&ndash;&gt;-->
<!--&lt;!&ndash;  font-size: 14px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;/* 카드 내용 */&ndash;&gt;-->
<!--&lt;!&ndash;.card-content {&ndash;&gt;-->
<!--&lt;!&ndash;  padding: 16px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.company-name {&ndash;&gt;-->
<!--&lt;!&ndash;  font-size: 18px;&ndash;&gt;-->
<!--&lt;!&ndash;  font-weight: bold;&ndash;&gt;-->
<!--&lt;!&ndash;  margin-bottom: 8px;&ndash;&gt;-->
<!--&lt;!&ndash;  color: #333;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.company-phone {&ndash;&gt;-->
<!--&lt;!&ndash;  font-size: 14px;&ndash;&gt;-->
<!--&lt;!&ndash;  margin-bottom: 8px;&ndash;&gt;-->
<!--&lt;!&ndash;  color: #555;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.company-description {&ndash;&gt;-->
<!--&lt;!&ndash;  font-size: 14px;&ndash;&gt;-->
<!--&lt;!&ndash;  color: #666;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;</style>&ndash;&gt;-->

<!--&lt;!&ndash;<template>&ndash;&gt;-->
<!--&lt;!&ndash;  <div class="container">&ndash;&gt;-->
<!--&lt;!&ndash;    <h1 class="title">업체 목록</h1>&ndash;&gt;-->
<!--&lt;!&ndash;    <div class="list">&ndash;&gt;-->
<!--&lt;!&ndash;      <div&ndash;&gt;-->
<!--&lt;!&ndash;        v-for="company in companies"&ndash;&gt;-->
<!--&lt;!&ndash;        :key="company.email"&ndash;&gt;-->
<!--&lt;!&ndash;        class="list-item"&ndash;&gt;-->
<!--&lt;!&ndash;        @click="goToDetail(company.email)"&ndash;&gt;-->
<!--&lt;!&ndash;      >&ndash;&gt;-->
<!--&lt;!&ndash;        &lt;!&ndash; 이미지 섹션 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="image-section">&ndash;&gt;-->
<!--&lt;!&ndash;          <img&ndash;&gt;-->
<!--&lt;!&ndash;            v-if="company.imageUrl"&ndash;&gt;-->
<!--&lt;!&ndash;            :src="company.imageUrl"&ndash;&gt;-->
<!--&lt;!&ndash;            :alt="company.companyName"&ndash;&gt;-->
<!--&lt;!&ndash;            class="company-image"&ndash;&gt;-->
<!--&lt;!&ndash;          />&ndash;&gt;-->
<!--&lt;!&ndash;          <div v-else class="placeholder">No Image</div>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->

<!--&lt;!&ndash;        &lt;!&ndash; 정보 섹션 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="info-section">&ndash;&gt;-->
<!--&lt;!&ndash;          <h2 class="company-name">{{ company.companyName }}</h2>&ndash;&gt;-->
<!--&lt;!&ndash;          <p class="company-description">{{ company.description }}</p>&ndash;&gt;-->
<!--&lt;!&ndash;          <div class="details">&ndash;&gt;-->
<!--&lt;!&ndash;            <p><strong>전화번호:</strong> {{ company.phoneNumber }}</p>&ndash;&gt;-->
<!--&lt;!&ndash;            <p><strong>주소:</strong> {{ company.address }}</p>&ndash;&gt;-->
<!--&lt;!&ndash;            <p><strong>소개:</strong> {{ company.shortDescription }}</p>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;  </div>&ndash;&gt;-->
<!--&lt;!&ndash;</template>&ndash;&gt;-->

<!--&lt;!&ndash;<script>&ndash;&gt;-->
<!--&lt;!&ndash;export default {&ndash;&gt;-->
<!--&lt;!&ndash;  name: "CompanyList",&ndash;&gt;-->
<!--&lt;!&ndash;  data() {&ndash;&gt;-->
<!--&lt;!&ndash;    return {&ndash;&gt;-->
<!--&lt;!&ndash;      companies: [&ndash;&gt;-->
<!--&lt;!&ndash;        {&ndash;&gt;-->
<!--&lt;!&ndash;          email: "company1@example.com",&ndash;&gt;-->
<!--&lt;!&ndash;          companyName: "TechCorp",&ndash;&gt;-->
<!--&lt;!&ndash;          phoneNumber: "010-1234-5678",&ndash;&gt;-->
<!--&lt;!&ndash;          address: "Seoul, South Korea",&ndash;&gt;-->
<!--&lt;!&ndash;          description: "Innovating the future of technology.",&ndash;&gt;-->
<!--&lt;!&ndash;          shortDescription: "Tech for tomorrow",&ndash;&gt;-->
<!--&lt;!&ndash;          imageUrl: "https://via.placeholder.com/150",&ndash;&gt;-->
<!--&lt;!&ndash;        },&ndash;&gt;-->
<!--&lt;!&ndash;        {&ndash;&gt;-->
<!--&lt;!&ndash;          email: "company2@example.com",&ndash;&gt;-->
<!--&lt;!&ndash;          companyName: "Foodies",&ndash;&gt;-->
<!--&lt;!&ndash;          phoneNumber: "010-8765-4321",&ndash;&gt;-->
<!--&lt;!&ndash;          address: "Busan, South Korea",&ndash;&gt;-->
<!--&lt;!&ndash;          description: "Delivering delicious meals to your doorstep.",&ndash;&gt;-->
<!--&lt;!&ndash;          shortDescription: "Best food delivery service",&ndash;&gt;-->
<!--&lt;!&ndash;          imageUrl: "https://via.placeholder.com/150",&ndash;&gt;-->
<!--&lt;!&ndash;        },&ndash;&gt;-->
<!--&lt;!&ndash;        {&ndash;&gt;-->
<!--&lt;!&ndash;          email: "company3@example.com",&ndash;&gt;-->
<!--&lt;!&ndash;          companyName: "CleanGreen",&ndash;&gt;-->
<!--&lt;!&ndash;          phoneNumber: "010-5678-1234",&ndash;&gt;-->
<!--&lt;!&ndash;          address: "Incheon, South Korea",&ndash;&gt;-->
<!--&lt;!&ndash;          description: "Providing eco-friendly cleaning products.",&ndash;&gt;-->
<!--&lt;!&ndash;          shortDescription: "Eco-friendly cleaning",&ndash;&gt;-->
<!--&lt;!&ndash;          imageUrl: "",&ndash;&gt;-->
<!--&lt;!&ndash;        },&ndash;&gt;-->
<!--&lt;!&ndash;      ],&ndash;&gt;-->
<!--&lt;!&ndash;    };&ndash;&gt;-->
<!--&lt;!&ndash;  },&ndash;&gt;-->
<!--&lt;!&ndash;  methods: {&ndash;&gt;-->
<!--&lt;!&ndash;    goToDetail(companyEmail) {&ndash;&gt;-->
<!--&lt;!&ndash;      this.$router.push(`/company/${encodeURIComponent(companyEmail)}`);&ndash;&gt;-->
<!--&lt;!&ndash;    },&ndash;&gt;-->
<!--&lt;!&ndash;  },&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->
<!--&lt;!&ndash;</script>&ndash;&gt;-->

<!--&lt;!&ndash;<style scoped>&ndash;&gt;-->
<!--&lt;!&ndash;/* 컨테이너 스타일 */&ndash;&gt;-->
<!--&lt;!&ndash;.container {&ndash;&gt;-->
<!--&lt;!&ndash;  max-width: 1200px;&ndash;&gt;-->
<!--&lt;!&ndash;  margin: 20px auto;&ndash;&gt;-->
<!--&lt;!&ndash;  padding: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;  background-color: #f8fafc;&ndash;&gt;-->
<!--&lt;!&ndash;  border: 1px solid #e2e8f0;&ndash;&gt;-->
<!--&lt;!&ndash;  border-radius: 12px;&ndash;&gt;-->
<!--&lt;!&ndash;  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;/* 제목 스타일 */&ndash;&gt;-->
<!--&lt;!&ndash;.title {&ndash;&gt;-->
<!--&lt;!&ndash;  font-size: 28px;&ndash;&gt;-->
<!--&lt;!&ndash;  font-weight: bold;&ndash;&gt;-->
<!--&lt;!&ndash;  margin-bottom: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;  text-align: center;&ndash;&gt;-->
<!--&lt;!&ndash;  color: #2d3748;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;/* 리스트 레이아웃 */&ndash;&gt;-->
<!--&lt;!&ndash;.list {&ndash;&gt;-->
<!--&lt;!&ndash;  display: flex;&ndash;&gt;-->
<!--&lt;!&ndash;  flex-direction: column;&ndash;&gt;-->
<!--&lt;!&ndash;  gap: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;/* 리스트 아이템 스타일 */&ndash;&gt;-->
<!--&lt;!&ndash;.list-item {&ndash;&gt;-->
<!--&lt;!&ndash;  display: flex;&ndash;&gt;-->
<!--&lt;!&ndash;  align-items: center;&ndash;&gt;-->
<!--&lt;!&ndash;  background-color: #ffffff;&ndash;&gt;-->
<!--&lt;!&ndash;  border-radius: 12px;&ndash;&gt;-->
<!--&lt;!&ndash;  overflow: hidden;&ndash;&gt;-->
<!--&lt;!&ndash;  transition: transform 0.3s ease, box-shadow 0.3s ease;&ndash;&gt;-->
<!--&lt;!&ndash;  cursor: pointer;&ndash;&gt;-->
<!--&lt;!&ndash;  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);&ndash;&gt;-->
<!--&lt;!&ndash;  padding: 15px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.list-item:hover {&ndash;&gt;-->
<!--&lt;!&ndash;  transform: translateY(-5px);&ndash;&gt;-->
<!--&lt;!&ndash;  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;/* 이미지 섹션 */&ndash;&gt;-->
<!--&lt;!&ndash;.image-section {&ndash;&gt;-->
<!--&lt;!&ndash;  flex: 0 0 150px;&ndash;&gt;-->
<!--&lt;!&ndash;  height: 150px;&ndash;&gt;-->
<!--&lt;!&ndash;  overflow: hidden;&ndash;&gt;-->
<!--&lt;!&ndash;  display: flex;&ndash;&gt;-->
<!--&lt;!&ndash;  align-items: center;&ndash;&gt;-->
<!--&lt;!&ndash;  justify-content: center;&ndash;&gt;-->
<!--&lt;!&ndash;  background-color: #e2e8f0;&ndash;&gt;-->
<!--&lt;!&ndash;  border-radius: 8px;&ndash;&gt;-->
<!--&lt;!&ndash;  margin-right: 15px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.company-image {&ndash;&gt;-->
<!--&lt;!&ndash;  width: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;  height: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;  object-fit: cover;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.placeholder {&ndash;&gt;-->
<!--&lt;!&ndash;  color: #a0aec0;&ndash;&gt;-->
<!--&lt;!&ndash;  font-size: 16px;&ndash;&gt;-->
<!--&lt;!&ndash;  font-weight: bold;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;/* 정보 섹션 */&ndash;&gt;-->
<!--&lt;!&ndash;.info-section {&ndash;&gt;-->
<!--&lt;!&ndash;  flex: 1;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.company-name {&ndash;&gt;-->
<!--&lt;!&ndash;  font-size: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;  font-weight: bold;&ndash;&gt;-->
<!--&lt;!&ndash;  margin-bottom: 8px;&ndash;&gt;-->
<!--&lt;!&ndash;  color: #2d3748;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.company-description {&ndash;&gt;-->
<!--&lt;!&ndash;  font-size: 16px;&ndash;&gt;-->
<!--&lt;!&ndash;  color: #718096;&ndash;&gt;-->
<!--&lt;!&ndash;  margin-bottom: 10px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.details {&ndash;&gt;-->
<!--&lt;!&ndash;  font-size: 14px;&ndash;&gt;-->
<!--&lt;!&ndash;  color: #4a5568;&ndash;&gt;-->
<!--&lt;!&ndash;  line-height: 1.6;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.details p {&ndash;&gt;-->
<!--&lt;!&ndash;  margin-bottom: 5px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;</style>&ndash;&gt;-->
<!--<template>-->
<!--  <div class="container">-->
<!--    <h1 class="title">업체 목록</h1>-->
<!--    <div class="list">-->
<!--      <div-->
<!--        v-for="(company, index) in companies"-->
<!--        :key="company.email"-->
<!--        class="list-item"-->
<!--      >-->
<!--        &lt;!&ndash; 리스트 아이템 &ndash;&gt;-->
<!--        <div class="item-header" @click="toggleDropdown(index)">-->
<!--          &lt;!&ndash; 이미지 &ndash;&gt;-->
<!--          <div class="image-container">-->
<!--            <img-->
<!--              v-if="company.imageUrl"-->
<!--              :src="company.imageUrl"-->
<!--              :alt="company.companyName"-->
<!--              class="company-image"-->
<!--            />-->
<!--            <div v-else class="placeholder">No Image</div>-->
<!--          </div>-->

<!--          &lt;!&ndash; 간단 정보 &ndash;&gt;-->
<!--          <div class="info-section">-->
<!--            <h2 class="company-name">{{ company.companyName }}</h2>-->
<!--            <p class="company-description">{{ company.shortDescription }}</p>-->
<!--          </div>-->

<!--          &lt;!&ndash; 화살표 아이콘 &ndash;&gt;-->
<!--          <font-awesome-icon-->
<!--            :icon="selectedIndex === index ? 'chevron-up' : 'chevron-down'"-->
<!--            class="dropdown-icon"-->
<!--          />-->
<!--        </div>-->

<!--        &lt;!&ndash; 드롭다운 세부 정보 &ndash;&gt;-->
<!--        <transition name="dropdown">-->
<!--          <div v-if="selectedIndex === index" class="dropdown">-->
<!--            <p><strong>이메일:</strong> {{ company.email }}</p>-->
<!--            <p><strong>전화번호:</strong> {{ company.phoneNumber }}</p>-->
<!--            <p><strong>주소:</strong> {{ company.address }}</p>-->
<!--            <p><strong>소개:</strong> {{ company.description }}</p>-->
<!--          </div>-->
<!--        </transition>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";-->

<!--export default {-->
<!--  name: "CompanyList",-->
<!--  components: {-->
<!--    FontAwesomeIcon,-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      companies: [-->
<!--        {-->
<!--          email: "company1@example.com",-->
<!--          companyName: "TechCorp",-->
<!--          phoneNumber: "010-1234-5678",-->
<!--          address: "Seoul, South Korea",-->
<!--          description: "Innovating the future of technology.",-->
<!--          shortDescription: "Tech for tomorrow",-->
<!--          imageUrl: "https://via.placeholder.com/200",-->
<!--        },-->
<!--        {-->
<!--          email: "company2@example.com",-->
<!--          companyName: "Foodies",-->
<!--          phoneNumber: "010-8765-4321",-->
<!--          address: "Busan, South Korea",-->
<!--          description: "Delivering delicious meals to your doorstep.",-->
<!--          shortDescription: "Best food delivery service",-->
<!--          imageUrl: "https://via.placeholder.com/200",-->
<!--        },-->
<!--        {-->
<!--          email: "company3@example.com",-->
<!--          companyName: "CleanGreen",-->
<!--          phoneNumber: "010-5678-1234",-->
<!--          address: "Incheon, South Korea",-->
<!--          description: "Providing eco-friendly cleaning products.",-->
<!--          shortDescription: "Eco-friendly cleaning",-->
<!--          imageUrl: "",-->
<!--        },-->
<!--      ],-->
<!--      selectedIndex: null,-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    toggleDropdown(index) {-->
<!--      this.selectedIndex = this.selectedIndex === index ? null : index;-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--/* 컨테이너 스타일 */-->
<!--.container {-->
<!--  max-width: 1200px;-->
<!--  margin: 20px auto;-->
<!--  padding: 20px;-->
<!--  background-color: #f8fafc;-->
<!--  border: 1px solid #e2e8f0;-->
<!--  border-radius: 12px;-->
<!--  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);-->
<!--}-->

<!--/* 제목 스타일 */-->
<!--.title {-->
<!--  font-size: 28px;-->
<!--  font-weight: bold;-->
<!--  margin-bottom: 20px;-->
<!--  text-align: center;-->
<!--  color: #2d3748;-->
<!--}-->

<!--/* 리스트 스타일 */-->
<!--.list {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  gap: 30px;-->
<!--}-->

<!--/* 리스트 아이템 */-->
<!--.list-item {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  background-color: #ffffff;-->
<!--  border-radius: 12px;-->
<!--  overflow: hidden;-->
<!--  transition: transform 0.3s ease, box-shadow 0.3s ease;-->
<!--  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);-->
<!--}-->

<!--/* 헤더 스타일 */-->
<!--.item-header {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  padding: 20px;-->
<!--  gap: 20px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.item-header:hover {-->
<!--  background-color: #f1f5f9;-->
<!--}-->

<!--/* 이미지 섹션 */-->
<!--.image-container {-->
<!--  flex: 0 0 150px;-->
<!--  height: 150px;-->
<!--  overflow: hidden;-->
<!--  background-color: #e2e8f0;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  border-radius: 8px;-->
<!--}-->

<!--.company-image {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  object-fit: cover;-->
<!--  border-radius: 8px;-->
<!--}-->

<!--.placeholder {-->
<!--  color: #a0aec0;-->
<!--  font-size: 14px;-->
<!--  font-weight: bold;-->
<!--}-->

<!--/* 정보 섹션 */-->
<!--.info-section {-->
<!--  flex: 1;-->
<!--}-->

<!--.company-name {-->
<!--  font-size: 22px;-->
<!--  font-weight: bold;-->
<!--  color: #2d3748;-->
<!--}-->

<!--.company-description {-->
<!--  font-size: 16px;-->
<!--  color: #718096;-->
<!--}-->

<!--/* 화살표 아이콘 */-->
<!--.dropdown-icon {-->
<!--  font-size: 24px;-->
<!--  color: #718096;-->
<!--  transition: transform 0.3s ease;-->
<!--}-->

<!--/* 드롭다운 내용 */-->
<!--.dropdown {-->
<!--  background-color: #f8f9fa;-->
<!--  border-top: 1px solid #e9ecef;-->
<!--  padding: 20px;-->
<!--  font-size: 14px;-->
<!--  color: #495057;-->
<!--  line-height: 1.6;-->
<!--}-->

<!--/* 드롭다운 애니메이션 */-->
<!--.dropdown-enter-active,-->
<!--.dropdown-leave-active {-->
<!--  transition: max-height 0.2s ease, opacity 0.2s ease;-->
<!--}-->

<!--.dropdown-enter-from,-->
<!--.dropdown-leave-to {-->
<!--  max-height: 0;-->
<!--  opacity: 0;-->
<!--}-->

<!--.dropdown-enter-to,-->
<!--.dropdown-leave-from {-->
<!--  max-height: 200px;-->
<!--  opacity: 1;-->
<!--}-->
<!--</style>-->

<template>
  <div class="container">
    <h1 class="title">업체 목록</h1>
    <div class="list">
      <div
        v-for="(company, index) in companies"
        :key="company.email"
        class="list-item"
      >
        <!-- 리스트 아이템 -->
        <div class="item-header" @click="toggleDropdown(index)">
          <!-- 이미지 -->
          <div class="image-container">
            <img
              v-if="company.imageUrl"
              :src="company.imageUrl"
              :alt="company.companyName"
              class="company-image"
            />
            <div v-else class="placeholder">No Image</div>
          </div>

          <!-- 간단 정보 -->
          <div class="info-section">
            <h2 class="company-name">{{ company.companyName }}</h2>
            <p class="company-description">{{ company.shortDescription }}</p>
          </div>

          <!-- 화살표 아이콘 -->
          <font-awesome-icon
            :icon="selectedIndex === index ? 'chevron-up' : 'chevron-down'"
            class="dropdown-icon"
          />
        </div>

        <!-- 드롭다운 세부 정보 -->
        <transition name="dropdown">
          <div v-if="selectedIndex === index" class="dropdown">
            <p><strong>이메일:</strong> {{ company.email }}</p>
            <p><strong>전화번호:</strong> {{ company.phoneNumber }}</p>
            <p><strong>주소:</strong> {{ company.address }}</p>
            <p><strong>소개:</strong> {{ company.description }}</p>
          </div>
        </transition>
      </div>
    </div>
    <!-- 페이지네이션 버튼 -->
    <div class="pagination">
      <button
        :disabled="currentPage === 0"
        @click="prevPage"
        class="pagination-btn"
      >
        이전
      </button>
      <span>현재 페이지: {{ currentPage + 1 }}</span>
      <button :disabled="!hasMore" @click="nextPage" class="pagination-btn">
        다음
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "CompanyList",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      companies: [],
      selectedIndex: null,
      currentPage: 0, // 현재 페이지
      size: 8, // 고정된 페이지 크기
      hasMore: true, // 더 많은 데이터 여부
    };
  },
  methods: {
    async fetchCompanies() {
      try {
        const response = await axios.get(
          `https://yoger.o-r.kr/api/company/infos?page=${this.currentPage}&size=${this.size}`
        );
        console.log("API Response:", response.data); // 응답 콘솔 출력
        this.companies = response.data.result.content; // 응답 데이터를 companies에 저장
        this.hasMore = !response.data.result.last; // 마지막 페이지 여부 확인
      } catch (error) {
        console.error("Error fetching company infos:", error);
      }
    },
    toggleDropdown(index) {
      this.selectedIndex = this.selectedIndex === index ? null : index;
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.fetchCompanies();
      }
    },
    nextPage() {
      if (this.hasMore) {
        this.currentPage++;
        this.fetchCompanies();
      }
    },
  },
  created() {
    this.fetchCompanies(); // 컴포넌트 생성 시 데이터 가져오기
  },
};
</script>

<style scoped>
/* 기존 스타일 유지 */
.container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #2d3748;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.list-item {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-header {
  display: flex;
  align-items: center;
  padding: 20px;
  gap: 20px;
  cursor: pointer;
}

.item-header:hover {
  background-color: #f1f5f9;
}

.image-container {
  flex: 0 0 150px;
  height: 150px;
  overflow: hidden;
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.company-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.placeholder {
  color: #a0aec0;
  font-size: 14px;
  font-weight: bold;
}

.info-section {
  flex: 1;
}

.company-name {
  font-size: 22px;
  font-weight: bold;
  color: #2d3748;
}

.company-description {
  font-size: 16px;
  color: #718096;
}

.dropdown-icon {
  font-size: 24px;
  color: #718096;
  transition: transform 0.3s ease;
}

.dropdown {
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 20px;
  font-size: 14px;
  color: #495057;
  line-height: 1.6;
}

/* 페이지네이션 스타일 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 20px;
}

.pagination-btn {
  padding: 10px 20px;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination-btn:disabled {
  background-color: #e2e8f0;
  cursor: not-allowed;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #2b6cb0;
}
</style>
