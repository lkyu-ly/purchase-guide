<script setup lang="ts">
import { ref } from "vue";
const visible = ref(true);

// Function to close the bulletin
function closeBulletin() {
  visible.value = false;
}

// Automatically hide the bulletin after 20 seconds
setTimeout(function () {
  visible.value = false;
}, 20000); // Disappearance time is set here
</script>

<template>
  <div v-if="visible" class="bulletin-wrapper">
    <!-- Bulletin Title Bar -->
    <div class="bulletin-title">
      <span class="bulletin-icon left">
        <svg
          class="bulletin-icon"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 32 32"
          style="width: 20px; height: 20px; font-size: 20px; color: rgb(255, 255, 255)"
        >
          <path
            d="M27.16 8.08l-1.53 1.29a10 10 0 0 1-.29 13.23l1.47 1.4a12 12 0 0 0 .35-15.88z"
            fill="currentColor"
          ></path>
          <path
            d="M21.58 12a6 6 0 0 1-.18 7.94l1.47 1.36a8 8 0 0 0 .23-10.59z"
            fill="currentColor"
          ></path>
          <path
            d="M18 30a1 1 0 0 1-.71-.3L9.67 22H3a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h6.67l7.62-7.7a1 1 0 0 1 1.41 0a1 1 0 0 1 .3.7v26a1 1 0 0 1-1 1zM4 20h6.08a1 1 0 0 1 .71.3L17 26.57V5.43l-6.21 6.27a1 1 0 0 1-.71.3H4z"
            fill="currentColor"
          ></path>
        </svg>
        <span><b>网站公告</b></span>
      </span>
      <svg
        class="btn-close"
        @click="closeBulletin"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
      >
        <path
          d="M512 34.133333a486.4 486.4 0 1 0 486.4 486.4A486.4 486.4 0 0 0 512 34.133333z m209.4848 632.8064l-55.6032 55.466667-151.517867-151.125333-151.517866 151.1168-55.6032-55.466667 151.517866-151.108267L307.242667 364.714667l55.6032-55.466667 151.517866 151.125333 151.517867-151.1168 55.6032 55.466667-151.517867 151.099733z m0 0"
          fill="currentColor"
        ></path>
      </svg>
    </div>

    <!-- Bulletin Content -->
    <div class="bulletin-content">
      <p class="bulletin-p">
        记住！买电脑一定要用<b style="color: #d90429">国补</b>！！！
      </p>
      <p class="bulletin-p">
        如果您所在的地区不支持国补，那我们<b style="color: #d90429">不推荐</b>您买任何笔记本电脑，直至购机价格与其他有国补的地区保持一致。
      </p>
      <div class="btn-group">
        <a class="btn" href="/introduction/购买#国补">查看详情</a>
      </div>
    </div>
  </div>
</template>

<style>
/* Main wrapper for the bulletin card */
.bulletin-wrapper {
  position: fixed;
  top: 5rem;
  right: 1rem;
  z-index: 30;
  width: 320px; /* Increased width slightly for better spacing */
  box-sizing: border-box;
  border-radius: 12px; /* Slightly smaller radius for a sharper look */
  overflow: hidden; /* Ensures content respects the border-radius */
  background-color: #ffffff;
  box-shadow: 0 8px 25px 0 rgba(0, 0, 0, 0.15); /* Softer, more modern shadow */
  border: 1px solid #f0f0f0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

/* Title bar of the bulletin */
.bulletin-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 0.8rem 1.2rem;
  /* New gradient background for a vibrant look */
  background: linear-gradient(45deg, #ff6b6b, #f09819);
}

.bulletin-icon {
  display: inline-flex;
  align-items: center;
  font-weight: 600;
}

.bulletin-icon.left > svg {
  margin-right: 0.5rem;
}

/* Close button styling */
.btn-close {
  cursor: pointer;
  fill: rgba(255, 255, 255, 0.8);
  transition: fill 0.2s ease;
}

.btn-close:hover {
  fill: white;
}

/* Content area of the bulletin */
.bulletin-content {
  padding: 1.5rem;
  background-color: #ffffff;
}

/* Paragraph styling */
.bulletin-p {
  margin: 0 0 1rem 0;
  color: #333333;
  font-size: 16px;
  line-height: 1.6;
}

.bulletin-p:last-of-type {
  margin-bottom: 1.5rem;
}

/* Container for the button */
.btn-group {
  text-align: center;
}

/* New button style: rounded rectangle, auto-width */
.btn {
  display: inline-block;
  cursor: pointer;
  padding: 0.6rem 1.5rem; /* Vertical and horizontal padding */
  border-radius: 8px; /* Rounded corners */
  background-color: #ff6b6b;
  text-align: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  border: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn:hover {
  background-color: #f09819; /* Corresponds to the gradient end color */
  transform: translateY(-2px); /* Slight lift effect on hover */
}
</style>
