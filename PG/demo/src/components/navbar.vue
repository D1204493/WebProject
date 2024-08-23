<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container-fluid">

        <!-- 三條線，按下時側邊展開(drawer) -->
        <button class="btn btn-outline-light me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
          </svg>
        </button>

        <!-- <navbar> 按下 logo 跳轉到 home page -->
        <a class="navbar-brand" style="margin-left: 10px; margin-right: 20px;">
          <!-- <div class="logo_content" @click="goToHome"> -->
          <div class="logo_content" >
            <router-link to="/" class="nav-link"> 
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
              <a class="nav-link" href="https://www.fcu.edu.tw">Information</a>
            </li>
            <li class="nav-item">
              <!-- LogIn要跳轉到 logIn.vue的設計畫面 -->
              <a class="nav-link" href="https://www.taichung.gov.tw">LogIn
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" focusable="false" role="presentation" aria-hidden="true">
                  <path fill="currentColor" d="M20 3c.5 0 .9.4 1 .9V20c0 .5-.4.9-.9 1H7c-.5 0-.9-.4-1-.9v-3.5c0-.6.4-1 1-1 .5 0 .9.4 1 .9V18c0 .6.4 1 1 1h9c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H9c-.6 0-1 .4-1 1v1.5c0 .5-.4.9-.9 1H7c-.5 0-.9-.4-1-.9V4c0-.5.4-.9.9-1H20zm-9.3 5.7c0-.4.5-.7.9-.4l3.3 3.3c.2.2.2.5 0 .7l-3.3 3.3c-.3.3-.9.1-.9-.4V13H4c-.5 0-1-.4-1-1s.5-1 1-1h6.7V8.7z">
                  </path>
                </svg>
              </a>
            </li>
          </ul>
          <!-- Search 搜尋的位置 -->
          <form class="d-flex">
            <input class="form-control me-2" type="text" placeholder="Search  Season/Episode">
            <button class="btn btn-primary" type="button">Search</button>
          </form>
        </div>
      </div>
    </nav>

    <!-- Offcanvas (Drawer) 抽屜展開後會出現的list -->
    <div class="offcanvas offcanvas-start drawer_view" tabindex="-1" id="offcanvasNavbar">
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
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Contact</a>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
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
        ]
      }
    },
    // methods: {
    //   goToHome() {
    //     this.$router.push('/App');
    //   }
    // }
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
