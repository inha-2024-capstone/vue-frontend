<template>
  <div class="process-container">
    <h2 class="process-title">등록 프로세스 안내</h2>
    <div class="process-steps">
      <div class="step">
        <div class="icon-container">
          <font-awesome-icon icon="upload" class="step-icon" />
        </div>
        <div class="step-content">
          <h3 class="step-title">1. 상품을 등록하세요</h3>
          <p class="step-description">
            당신만의 특별한 굿즈를 등록하고 판매 준비를 시작하세요.
          </p>
        </div>
      </div>

      <div class="step">
        <div class="icon-container">
          <font-awesome-icon icon="exchange-alt" class="step-icon" />
        </div>
        <div class="step-content">
          <h3 class="step-title">2. 제안을 비교하고 수락하세요</h3>
          <p class="step-description">
            업체에서 제공된 여러 제안들을 비교하고 최적의 제안을 선택하세요.
          </p>
        </div>
      </div>

      <div class="step">
        <div class="icon-container">
          <font-awesome-icon icon="shopping-cart" class="step-icon" />
        </div>
        <div class="step-content">
          <h3 class="step-title">3. 판매 시작!</h3>
          <p class="step-description">
            선택한 제안으로 생산을 시작하고 상품 판매를 시작하세요.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "ProcessGuide",
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style scoped>
.process-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8fafc;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.process-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #2d3748;
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.step:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.icon-container {
  flex: 0 0 50px;
  height: 50px;
  background-color: #edf2f7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.step-icon {
  font-size: 24px;
  color: #4a5568;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 18px;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 5px;
}

.step-description {
  font-size: 14px;
  color: #4a5568;
  line-height: 1.6;
}
</style>
