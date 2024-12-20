<template>
  <div class="search-container">
    <div class="search-bar">
      <div class="icon-container">
        <font-awesome-icon :icon="['fas', 'search']" class="icon" />
      </div>
      <input
        ref="searchInput"
        class="search-input"
        type="text"
        placeholder="Search ..."
        :bind="searchQuery"
        @input="filterResults"
      />
      <div class="icon-container">
        <font-awesome-icon
          :icon="['fas', 'times']"
          class="icon"
          @click="clearSearch"
        />
      </div>
    </div>

    <!-- 자동완성 리스트 -->
    <ul v-if="filteredResults.length" class="autocomplete-list">
      <li v-for="(item, index) in filteredResults" :key="index">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchQuery: "",
      demoData: [
        { title: "김민수" },
        { title: "김지훈" },
        { title: "김예린" },
        { title: "김도현" },
        { title: "김서연" },

        { title: "이준영" },
        { title: "이수민" },
        { title: "이하은" },
        { title: "이승민" },
        { title: "이소율" },

        { title: "박주원" },
        { title: "박서현" },
        { title: "박지우" },
        { title: "박예은" },
        { title: "박현우" },

        { title: "최지환" },
        { title: "최유진" },
        { title: "최은서" },
        { title: "최다은" },
        { title: "최시우" },
        { title: "John Smith" },
        { title: "Emily Johnson" },
        { title: "Michael Brown" },
        { title: "Sarah Davis" },
        { title: "David Wilson" },
        { title: "Jessica Moore" },
        { title: "Daniel Taylor" },
        { title: "Sophia Anderson" },
        { title: "James Thomas" },
        { title: "Olivia Lee" },
      ],
      filteredResults: [],
    };
  },
  methods: {
    clearSearch() {
      this.searchQuery = "";
      this.filteredResults = [];
    },

    filterResults(event) {
      this.searchQuery = event.target.value;

      // 입력된 값이 영어인지 한글인지 판별
      const isEnglish = /^[A-Za-z]+$/.test(this.searchQuery);

      if (this.searchQuery) {
        this.filteredResults = this.demoData.filter((item) => {
          const query = isEnglish
            ? this.searchQuery.toLowerCase()
            : this.searchQuery;
          const title = isEnglish ? item.title.toLowerCase() : item.title;

          return title.startsWith(query);
        });
      } else {
        this.filteredResults = [];
      }
    },
  },
};
</script>

<style scoped>
/* 검색창 전체 컨테이너 */
.search-container {
  position: relative;
  width: 600px;
}

.search-bar {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 8px;
  gap: 6px;
  width: 100%;
  height: 40px;
  border: 2px solid #abb7c2;
  filter: drop-shadow(0px 4px 12px rgba(13, 10, 44, 0.06));
  border-radius: 32px;
}

/* 아이콘 컨테이너 */
.icon-container {
  display: flex;
  align-items: center;
  padding: 10px;
  width: 44px;
  height: 44px;
}

/* FontAwesome 아이콘 스타일 */
.icon {
  color: #abb7c2;
  cursor: pointer;
}

/* 인풋 필드 */
.search-input {
  flex-grow: 1;
  width: 100%;
  height: 27px;
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  color: #abb7c2;
  border: none;
  background-color: transparent;
  outline: none;
}

/* 자동완성 리스트 스타일 */
.autocomplete-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #abb7c2;
  border-radius: 8px;
  position: absolute;
  top: 50px; /* 검색창 하단 외부에 위치 */
  left: 0;
  z-index: 100;
}

.autocomplete-list li {
  padding: 10px;
  cursor: pointer;
}

.autocomplete-list li:hover {
  background-color: #f0f0f0;
}
</style>
