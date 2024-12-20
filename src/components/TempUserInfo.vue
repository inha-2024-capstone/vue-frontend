<template>
  <div class="relative" ref="buttonRef">
    <!-- 드롭다운 토글 버튼 -->
    <button @click="toggleDropdown" class="dropdown-toggle">
      <PencilAltIcon />
    </button>

    <!-- 드롭다운 -->
    <div
        v-if="showDropdown && userData"
        class="dropdown-menu"
        :style="{ width: dropdownWidth * 3.5 + 'px' }"
    >
      <div class="dropdown-header">
        <img
            v-if="imageSrc"
            :src="imageSrc"
            alt="Profile"
            class="profile-image"
        />
        <FaUserCircle v-else class="default-profile-icon" />
        <span class="username">{{ userData.user.name }}</span>
      </div>
      <div class="divider"></div>
      <ul class="dropdown-content">
        <li>{{ userData.user.email }}</li>
      </ul>
      <div class="divider"></div>
      <div class="edit-link">
        <router-link :to="`/editUser/${userId}`">Edit</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';

import { FaUserCircle } from 'vue-icons/fa'; // replace with the actual icon package
import PencilAltIcon from './PencilAltIcon.vue'; // replace with the actual icon component

export default {
  components: {
    FaUserCircle,
    PencilAltIcon,
  },
  setup() {
    const buttonRef = ref(null);
    const dropdownWidth = ref(null);
    const showDropdown = ref(false);
    const userData = ref(null);

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(
    //         'https://zzigda-proto-dot-helloworld-app-410701.du.r.appspot.com/settings/editUser',
    //         {
    //           headers: {
    //             Authorization: 'Bearer ' + token,
    //           },
    //         }
    //     );
    //
    //     if (!response.ok) {
    //       const error = await response.json();
    //       throw new Error(error.message);
    //     }
    //
    //     const data = await response.json();
    //     userData.value = data;
    //   } catch (error) {
    //     console.error('Error fetch', error);
    //   }
    // };

    //const imageSrc = computed(() => (userData.value && userData.value.user.imageUrl ? userData.value.user.imageUrl : null));

    onMounted(() => {
      fetchData();
      if (buttonRef.value) {
        dropdownWidth.value = buttonRef.value.offsetWidth;
      }
    });

    return {
      buttonRef,
      dropdownWidth,
      showDropdown,
      toggleDropdown,
      userData,
      userId,
    };
  },
};
</script>

<style>
/* 기본 스타일 설정 */
.dropdown-toggle {
  background-color: orange;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  cursor: pointer;
  margin-right: 10px;
}

.dropdown-toggle:hover {
  background-color: darkorange;
}

.dropdown-menu {
  position: absolute;
  z-index: 50;
  margin-top: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dropdown-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.profile-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.default-profile-icon {
  width: 48px;
  height: 48px;
  color: gray;
}

.username {
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
  color: black;
}

.divider {
  border-top: 1px solid #ccc;
  margin: 10px 0;
}

.dropdown-content {
  font-size: 14px;
  color: gray;
}

.edit-link {
  padding-top: 5px;
}

.edit-link a {
  font-size: 14px;
  color: blue;
  text-decoration: none;
}

.edit-link a:hover {
  text-decoration: underline;
}
</style>
