<template>
  <div class="influencer-container">
    <button class="arrow left-arrow" @click="prevSlide">‹</button>
    <div class="carousel">
      <div class="influencer-cards" :style="slideStyle">
        <div
          class="influencer-card"
          v-for="(influencer, index) in visibleInfluencers"
          :key="index"
        >
          <div class="top">
            <div class="user">
              <div class="avatar">
                <img :src="influencer.avatar" alt="Influencer Avatar" />
              </div>
              <div class="name-username">
                <strong>{{ influencer.name }}</strong>
                <span>{{ influencer.username }}</span>
              </div>
            </div>
            <div class="more">
              <span>⋮</span>
            </div>
          </div>
          <div class="img">
            <img :src="influencer.image" alt="Influencer Image" />
          </div>
          <div class="caption">
            <strong>{{ influencer.name }}</strong>
            <p>{{ influencer.caption }}</p>
          </div>
          <div class="actions">
            <div class="likes">
              <div class="heart">❤️</div>
              <span>{{ influencer.likes }}</span>
            </div>
            <div class="comments">
              <div class="comment">💬</div>
              <span>{{ influencer.comments }}</span>
            </div>
            <div class="bookmark">🔖</div>
          </div>
        </div>
      </div>
    </div>
    <button class="arrow right-arrow" @click="nextSlide">›</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      influencers: [
        {
          avatar: "https://via.placeholder.com/40",
          name: "Creator 1",
          username: "@Creator 1",
          image: "https://via.placeholder.com/416x550",
          caption: "Creator 1's latest post",
          likes: 120,
          comments: 30,
        },
        {
          avatar: "https://via.placeholder.com/40",
          name: "Creator 2",
          username: "@Creator2",
          image: "https://via.placeholder.com/416x550",
          caption: "Creator 2's latest post",
          likes: 250,
          comments: 45,
        },
        {
          avatar: "https://via.placeholder.com/40",
          name: "Creator 3",
          username: "@Creator3",
          image: "https://via.placeholder.com/416x550",
          caption: "Creator 3's latest post",
          likes: 190,
          comments: 22,
        },
        {
          avatar: "https://via.placeholder.com/40",
          name: "Creator 4",
          username: "@Creator4",
          image: "https://via.placeholder.com/416x550",
          caption: "Creatorr 4's latest post",
          likes: 300,
          comments: 60,
        },
        {
          avatar: "https://via.placeholder.com/40",
          name: "Creator 5",
          username: "@Creator5",
          image: "https://via.placeholder.com/416x550",
          caption: "Creator 5's latest post",
          likes: 130,
          comments: 15,
        },
        {
          avatar: "https://via.placeholder.com/40",
          name: "Creator 6",
          username: "@Creator6",
          image: "https://via.placeholder.com/416x550",
          caption: "Creator 6's latest post",
          likes: 280,
          comments: 50,
        },
        {
          avatar: "https://via.placeholder.com/40",
          name: "Creator 7",
          username: "@Creator7",
          image: "https://via.placeholder.com/416x550",
          caption: "Creator 7's latest post",
          likes: 350,
          comments: 70,
        },
        {
          avatar: "https://via.placeholder.com/40",
          name: "Creator 8",
          username: "@Creator8",
          image: "https://via.placeholder.com/416x550",
          caption: "Creator 8's latest post",
          likes: 400,
          comments: 80,
        },
      ],
      currentIndex: 0,
    };
  },
  computed: {
    visibleInfluencers() {
      return this.influencers.slice(this.currentIndex, this.currentIndex + 4);
    },
    slideStyle() {
      const offset = this.currentIndex * -25; // 25%씩 이동
      return {
        transform: `translateX(${offset}%)`,
        transition: "transform 0.5s ease-in-out",
      };
    },
  },
  methods: {
    nextSlide() {
      if (this.currentIndex + 4 < this.influencers.length) {
        this.currentIndex += 4;
      }
    },
    prevSlide() {
      if (this.currentIndex - 4 >= 0) {
        this.currentIndex -= 4;
      }
    },
  },
};
</script>

<style scoped>
.influencer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  margin-top: 100px;
  overflow: hidden;

  padding-top: 7%;
}

.carousel {
  overflow: hidden;
  width: 100%;
}

.influencer-cards {
  display: flex;
  justify-content: center; /* 중앙 정렬 */
}

.influencer-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  border-radius: 16px;
  width: 20%;
  height: auto; /* 높이 비율을 자동으로 조정 */
  margin: 0 10px; /* 카드 간 동일한 간격을 부여 */
}

.top {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
  width: 100%;
}

.user {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
}

.name-username {
  display: flex;
  flex-direction: column;
}

.img {
  width: 100%;
  height: auto;
  background-color: #f0f0f0;
  border-radius: 16px;
  overflow: hidden;
}

.img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.caption {
  padding: 8px 16px;
}

.actions {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  width: 100%;
  border-top: 1px solid #eff3f4;
}

.likes,
.comments,
.bookmark {
  display: flex;
  align-items: center;
  gap: 8px;
}

.arrow {
  background-color: transparent;
  border: none;
  font-size: 50px;
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
