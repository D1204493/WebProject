<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
      <div class="container-fluid align-items-center">

        <!-- 三條線，按下時側邊展開(drawer) -->
        <button class="btn btn-outline-light me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
          </svg>
        </button>

        <!-- <navbar> 按下 logo 跳轉到 home page -->
        <a class="navbar-brand" style="margin-left: 10px; margin-right: 20px;">
          <div class="logo_content" >
            <router-link to="/home" class="nav-link"> 
              <img src="/img_logo/logo2.png" class="logo" style="width: auto; height: 100px; max-height: 50px; object-fit: contain;">
            </router-link>
          </div>
        </a>

        <!-- 當縮小頁面時，會出現的按鈕，往下展開的樣式(collapse) -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- navbar 的 item -->
        <div class="collapse navbar-collapse" id="mynavbar">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <select class="form-select" id="topic-select">
                      <option disabled value="">請選擇主題</option>
                      <option v-for="s in topicList" :key="s" :value="s">
                          {{ s }}
                      </option>
              </select>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about" @click="$refs.offcanvas.hide()">About</router-link>//Zoe修改
            </li>

     <!-- v-if -->
            <li class="nav-item" v-if="!isLoggedIn">
              <!-- LogIn要跳轉到 logIn.vue的設計畫面 -->
                <router-link to="/logIn" class="nav-link">
                  LogIn
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" focusable="false" role="presentation" aria-hidden="true">
                  <path fill="currentColor" d="M20 3c.5 0 .9.4 1 .9V20c0 .5-.4.9-.9 1H7c-.5 0-.9-.4-1-.9v-3.5c0-.6.4-1 1-1 .5 0 .9.4 1 .9V18c0 .6.4 1 1 1h9c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H9c-.6 0-1 .4-1 1v1.5c0 .5-.4.9-.9 1H7c-.5 0-.9-.4-1-.9V4c0-.5.4-.9.9-1H20zm-9.3 5.7c0-.4.5-.7.9-.4l3.3 3.3c.2.2.2.5 0 .7l-3.3 3.3c-.3.3-.9.1-.9-.4V13H4c-.5 0-1-.4-1-1s.5-1 1-1h6.7V8.7z">
                  </path>
                </svg>
              </router-link>
            </li>

    <!-- v-if -->
            <li class="nav-item" v-if="isLoggedIn">
            <router-link to="/" class="nav-link">
              <img src="/img_logo/cat.png" style="width: 30px; height: 30px;">
            </router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <a class="nav-link" href="#" @click="logout">
              Logout
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
              <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
              </svg>
            </a>
          </li>
          </ul>

          <!-- Search 搜尋的位置 -->
          <form class="d-flex my-auto">
            <input class="form-control me-2" type="text" placeholder="Search  Season/Episode">
            <button class="btn btn-primary" type="button">Search</button>
          </form>
        </div>
      </div>
    </nav>

    <!-- 在 navbar 下面的內容需要加上適當的 padding-top -->
    <div style="padding-top: 70px;">
      <!-- 其他頁面內容 -->
    </div>

    <!-- Offcanvas (Drawer) 抽屜展開後會出現的list -->
    <div class="offcanvas offcanvas-start drawer_view" tabindex="-1" id="offcanvasNavbar" ref="offcanvas">//
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
          <router-link to="/" class="nav-link">
            <img src="/img_logo/logo2.png" class="logo" style="width: auto; height: 100px; max-height: 50px; object-fit: contain; cursor: pointer;">
          </router-link>         
        </h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/home">Home</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: 'navbar',
  data() {
      return {
        topicList: [
          "Friends",
          "The Bear",
          "Under the Bridge",
          "Ted",
          "One Day",
          "The Regime",
          "Young Sheldon"
        ],
        isLoggedIn: false, // 預設為未登錄
      };
    },
    methods: {
    logout() {
      // 清除 localStorage 中的 token
      localStorage.removeItem('authToken');
      
      // 更新 isLoggedIn 狀態
      this.isLoggedIn = false;

      // 重定向到主頁
      this.$router.push('/');
    }
  },
  watch: {
    '$route'(to, from) {
      // 當路由變化時，根據狀態更新 isLoggedIn
      this.isLoggedIn = !!localStorage.getItem('authToken'); // 檢查 token 是否存在
    }
  },
  mounted() {
    // 初始化時檢查登錄狀態
    this.isLoggedIn = !!localStorage.getItem('authToken'); // 檢查 token 是否存在
  }
};
</script>



<style>
.nav-item {
  margin-right: 10px;
}

/* 自訂 drawer 背景顏色和文字顏色 */
.drawer_view {
  background-color: #343a40; /* 自訂背景顏色 */
  color: #ffffff; /* 自訂文字顏色 */
}

/* 自訂關閉按鈕的顏色 */
.drawer_view .btn-close {
  filter: invert(1); /* 反轉顏色，使按鈕顯示為白色 */
}

/* 自訂 drawer 內的連結樣式 */
.drawer_view .nav-link {
  color: #adb5bd; /* 自訂連結顏色 */
}

.drawer_view .nav-link:hover {
  color: #f8f9fa; /* 自訂連結懸停顏色 */
}

.logo_content {
  display: flex;
  align-items: center;
  cursor: pointer;
}

</style>
