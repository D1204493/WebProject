
<template>
    <!-- <div id="userDataDisplay"></div> -->
<div class="html1">
 <div class="body1">
  <main>
    <div class="wrapper">
        <div class="content">
            <div class="ig-img">
                <!-- 連結到主頁面 -->
                <router-link to="/" class="nav-link">
                    <img class="img-ig" src="/img_logo/logo.png" alt="logo">
                </router-link>
            </div>
            <form autocomplete="off" action="" @submit.prevent="handleLogin">
                <div class="input-group">
                    <label>
                        <input type="text" id="username" v-model="username" required>
                        <span>Phone number, username, or email</span>
                    </label>
                    <label class="label">
                        <input type="password" id="password" v-model="password" required>
                        <span>Password</span>
                        <button type="button" id="togglePassword" class="showhide" @click="togglePasswordVisibility">Show</button>
                    </label>
                </div>
                <button id="loginButton" :disabled="isLoginButtonDisabled">Log in</button>
            </form>
            <div class="or-text">
                <span></span>
                <span>OR</span>
                <span></span>
            </div>
            <div class="btns">
                <button @click="redirectToFacebook">
                    <span><img class="fb-logo" src="/img_logo/fbLogo.png" alt="FB Logo"></span>
                    <span id="loginFB">Log in with Facebook</span>
                </button>
                <button @click="redirectToInstagram">
                    <span><img class="ig-logo" src="/img_logo/igLogo.jpeg" alt="IG Logo"></span>
                    <span id="loginIG">Log in with Instagram</span>
                </button>

                <button id="forget" @click="handleForgetPassword">Forget password?</button>
            </div>
        </div>
    </div>
    <div class="sign-up">
        <!-- 連結到 signUp.vue -->
        <router-link to="/signUp" class="nav-link">
            <p>Don't have an account? <a href="test_signUp.html">Sign up</a></p>
        </router-link>
    </div>

  </main>
 </div>
</div>
</template>
  


<script>
export default {
  name: 'logIn',
  data() {
    return {
      username: '',
      password: '',
      passwordVisible: false
    };
  },
  computed: {
    isLoginButtonDisabled() {
      return this.username.trim() === '' || this.password.trim() === '';
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
      const passwordInput = document.getElementById("password");
      passwordInput.type = this.passwordVisible ? 'text' : 'password';
      const togglePasswordButton = document.getElementById("togglePassword");
      togglePasswordButton.innerHTML = this.passwordVisible ? 'Hide' : 'Show';
    },
    async handleLogin() {
      console.log("Input username:", this.username.trim());
      console.log("Input password:", this.password.trim());

      // 先檢查 localStorage
      const storedUserData = JSON.parse(localStorage.getItem("userData"));
      console.log("Stored user data:", storedUserData);

      if (storedUserData) {
        // 使用 localStorage 中的數據進行驗證
        if (this.validateUser(this.username.trim(), this.password.trim(), storedUserData)) {
            this.handleLoginSuccess();

        } else {
          // 如果 localStorage 驗證失敗，嘗試從 JSON 檔案驗證
          const jsonUserData = await this.fetchJsonUserData();
          if (this.validateUser(this.username.trim(), this.password.trim(), jsonUserData)) {
            this.handleLoginSuccess();
          } else {
            alert('Invalid username or password.');
          }
        }
      } else {
        // 如果 localStorage 中沒有數據，直接從 JSON 檔案驗證
        const jsonUserData = await this.fetchJsonUserData();
        if (this.validateUser(this.username.trim(), this.password.trim(), jsonUserData)) {
            this.handleLoginSuccess();
        } else {
          alert('Invalid username or password.');
        }
      }
    },

    handleLoginSuccess() {
      // 更新 localStorage 或 Vuex 中的登錄狀態
      localStorage.setItem('authToken', 'your-auth-token'); // 儲存 token
      alert('Login successful!');
      this.username = '';
      this.password = '';
      this.$router.push('/'); // 跳轉至主頁
    },

    validateUser(inputUsername, inputPassword, userData) {
      console.log("Validating:", inputUsername, inputPassword, userData);
      if (Array.isArray(userData)) {
        return userData.some(user => 
          (inputUsername === user.username || 
           inputUsername === user.phonenumber || 
           inputUsername === user.email) && 
          inputPassword === user.password
        );
      } else {
        const { username, phonenumber, email, password } = userData;
        return (inputUsername === username || 
                inputUsername === phonenumber || 
                inputUsername === email) && 
               inputPassword === password;
      }
    },
    async fetchJsonUserData() {
      try {
        const response = await fetch('/user.json');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        console.log("Fetched user data:", data);
        return data;
      } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
      }
    },
    redirectToFacebook() {
      window.location.href = 'https://www.facebook.com/?locale=zh_TW';
    },
    redirectToInstagram() {
      window.location.href = 'https://www.instagram.com/';
    },
    handleForgetPassword() {
      // 忘記密碼的處理方式
      window.location.href = 'https://account.voicetube.com/reset-password?service=voicetube&next=https%3A%2F%2Ftw.voicetube.com%2F';
    }
  }
};
</script>
  


<style scoped>
        .html1 {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: sans-serif;
        }

        .body1 {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-color: #f0f0f0;
        }

        .wrapper {
            width: 350px;
            border-radius: 8px;
            padding: 50px 40px 20px 40px;
            color: #737373;
            border: 1px solid #dbdbdb;
            text-align: center;
            background: #fff;
            margin-bottom: 10px;
        }

        .ig-img {
            display: flex;
            justify-content: center;
            padding-bottom: 20px;
        }

        .img-ig {
            max-width: 70%;
            height: auto;
        }

        
        .fb-logo {
            width: 40px; /* 調整大小 */
            height: 40px;
            object-fit: contain;
        }

        .ig-logo {
            width: 24px;
            height: 24px;
            margin-right: 7px;
            margin-left: 12px;
            object-fit: cover;
        }

        form {
            display: flex;
            flex-direction: column;
            row-gap: 14px;
        }

        form .input-group {
            display: flex;
            flex-direction: column;
            row-gap: 8px;
        }

        form label {
            border: 1px solid #dbdbdb;
            display: flex;
            align-items: center;
            position: relative;
            min-width: 268px;
            height: 38px;
            background: #fafafa;
            border-radius: 3px;
            overflow: hidden;
        }

        form span {
            position: absolute;
            text-overflow: ellipsis;
            transform-origin: left;
            font-size: 12px;
            left: 8px;
            pointer-events: none;
            transition: transform ease-out .1s;
        }

        form input {
            width: 100%;
            background: inherit;
            border: 0;
            outline: none;
            padding: 9px 8px 7px 8px;
            text-overflow: ellipsis;
            font-size: 16px;
            vertical-align: middle;
        }

        form input:valid + span {
            transform: scale(calc(10/12)) translateY(-10px);
        }

        form input:valid {
            padding: 14px 0 2px 8px;
            font-size: 12px;
        }

        .or-text {
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-transform: uppercase;
            font-size: 12px;
            color: #737373;
            font-weight: 600;
            column-gap: 18px;
            margin-top: 18px;
        }

        .or-text span:nth-child(3),
        .or-text span:nth-child(1) {
            display: block;
            width: 100%;
            height: 1px;
            background: #dbdbdb;
        }

        form .label .showhide {
            position: relative;
            top: 0;
            left: 0;
            width: 60px;
            color: #262626;
            font-weight: 600;
            cursor: pointer;
            background: none;
            border: 0;
            outline: none;
            padding: 0;
            font-size: 13px;
            visibility: hidden;
        }

        form .label input:valid ~ .showhide {
            visibility: visible;
        }

        form button {
            background: #0095f6;
            color: #fff;
            border: 0;
            border-radius: 8px;
            font-weight: 700;
            font-size: 14px;
            padding: 8px 16px;
            cursor: pointer;
        }

        form button:hover {
            background: #1877f2;
        }

        form button:disabled {
            background: #0095f6;
            opacity: .7;
            cursor: auto;
        }

        .btns {
            display: flex;
            flex-direction: column;
            margin-top: 28px;
            row-gap: 21px;
        }

        .btns button {
            display: flex;
            justify-content: center;
            align-items: center;
            column-gap: 8px;
            background: none;
            border: 0;
            cursor: pointer;
            font-size: 12px;
            color: #00376b;
        }

        .btns button:first-child,
        .btns button:nth-child(2) {
            color: #385185;
            font-size: 14px;
            font-weight: 600;
        }

        .sign-up {
            background: #fff;
            border: 1px solid #dbdbdb;
            text-align: center;
            padding: 10px 0;
        }

        .sign-up p {
            margin: 15px;
            font-size: 14px;
        }

        .sign-up p a {
            text-decoration: none;
            color: #0095f6;
            font-weight: 600;
            cursor: pointer;
        }

</style>  