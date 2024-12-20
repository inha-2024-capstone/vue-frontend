<template>
  <div class="sidebar-container">
    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Logo or brand -->
      <div class="logo">
        <a
          :href="'/products'"
          class="text-black flex items-center space-x-2 px-4"
        >
          <span class="brand-name">{{ project.name }}</span>
        </a>
      </div>

      <!-- Navigation -->
      <nav class="nav">
        <div v-for="item in navigationItems" :key="item.name" class="nav-item">
          <a :href="item.href" class="nav-link">
            <span>{{ item.name }}</span>
          </a>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      project: {
        _id: "1", // 프로젝트 ID (임시 데이터)
        name: "Yogger", // 프로젝트 이름 (임시 데이터)
      },
      navigationItems: [
        {
          name: "판매중인 상품",
          href: "/products",
        },

        {
          name: "업체",
          href: "/company",
        },

        {
          name: "상품등록",
          href: "/products/register",
        },
        {
          name: "마이페이지",
          href: "/products/manage",
        },
      ],
    };
  },
};
</script>

<style scoped>
.sidebar-container {
  display: flex;
}

/* Sidebar 기본 스타일 */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 150px;
  height: 100vh;
  background-color: white; /* 배경을 흰색으로 변경 */
  color: black;
  padding: 10px;
  z-index: 20;
}

/* 로고 스타일 */
.logo {
  padding: 20px;
}

.brand-name {
  font-size: 24px;
  font-weight: bold;
  color: black; /* 로고 텍스트 색을 검정색으로 변경 */
}

/* 네비게이션 스타일 */
.nav {
  margin-top: 20px;
}

.nav-item {
  margin-bottom: 15px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 10px;
  color: black;
  text-decoration: none;
  transition: color 0.3s;
  position: relative;
  font-size: 1.2rem;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: black;
  transition: width 0.5s; /* 0.5초 동안 밑줄 애니메이션 */
}

.nav-link:hover::after {
  width: 100%; /* hover 시 밑줄이 전체 너비로 확장 */
}

.nav-link:hover {
  color: black; /* hover 시 텍스트 색 변경 */
}
</style>
