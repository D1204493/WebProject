
<template>
  <main>
    <!-- <div id="userDataDisplay"></div> -->

    <div class="wrapper">
        <div class="content">
            <div class="ig-img">
                <img class="img-ig" src="/PG/demo/public/img_logo/logo.png" alt="logo">
            </div>
            <form autocomplete="off" action="">
                <div class="input-group">
                    <label>
                        <input type="text" id="username" required>
                        <span>Phone number, username, or email</span>
                    </label>
                    <label class="label">
                        <input type="password" id="password" required>
                        <span>Password</span>
                        <button type="button" id="togglePassword" class="showhide">Show</button>
                    </label>
                </div>
                <button id="loginButton" disabled>Log in</button>
            </form>
            <div class="or-text">
                <span></span>
                <span>OR</span>
                <span></span>
            </div>
            <div class="btns">
                <button onclick="window.location.href='https://www.facebook.com/?locale=zh_TW';">
                    <span><img class="fb-logo" src="/PG/demo/public/img_logo/fbLogo.png" alt="FB Logo"></span>
                    <span id="loginFB">Log in with Facebook</span>
                </button>
                <button onclick="window.location.href='https://www.instagram.com/';">
                    <span><img class="ig-logo" src="/PG/demo/public/img_logo/igLogo.jpeg" alt="IG Logo"></span>
                    <span id="loginIG">Log in with Instagram</span>
                </button>

                <button id="forget">Forget password?</button>
            </div>
        </div>
    </div>
    <div class="sign-up">
        <p>Don't have an account? <a href="test_signUp.html">Sign up</a></p>
    </div>
  </main>
</template>
  


<script>
document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const loginButton = document.getElementById("loginButton");

    // 顯示或隱藏密碼
    togglePassword.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.innerHTML = "Hide";
        } else {
            passwordInput.type = "password";
            togglePassword.innerHTML = "Show";
        }
    });

    // 更新密碼可見性切換按鈕
    const updateToggleButtonVisibility = () => {
        togglePassword.style.visibility = passwordInput.value.trim() === "" ? "hidden" : "visible";
    }

    updateToggleButtonVisibility();

    // 當用戶輸入密碼時，更新按鈕狀態和切換按鈕可見性
    passwordInput.addEventListener("input", () => {
        updateToggleButtonVisibility();
        loginButton.disabled = !(usernameInput.value.trim() !== "" && passwordInput.value.trim() !== "");
    });

    // 當用戶輸入帳號時，更新按鈕狀態
    usernameInput.addEventListener("input", () => {
        loginButton.disabled = !(usernameInput.value.trim() !== "" && passwordInput.value.trim() !== "");
    });

    // 處理登入邏輯
    loginButton.addEventListener("click", async (e) => {
        e.preventDefault();

        const inputUsername = usernameInput.value.trim();
        const inputPassword = passwordInput.value.trim();

        // 先檢查 localStorage
        const storedUserData = JSON.parse(localStorage.getItem("userData"));

        if (storedUserData) {
            // 使用 localStorage 中的數據進行驗證
            if (validateUser(inputUsername, inputPassword, storedUserData)) {
                alert('Login successful!');
                // 可以在這裡進行登入成功後的操作
            } else {
                // 如果 localStorage 驗證失敗，嘗試從 JSON 檔案驗證
                const jsonUserData = await fetchJsonUserData();
                if (validateUser(inputUsername, inputPassword, jsonUserData)) {
                    alert('Login successful!');
                    // 可以在這裡進行登入成功後的操作
                } else {
                    alert('Invalid username or password.');
                }
            }
        } else {
            // 如果 localStorage 中沒有數據，直接從 JSON 檔案驗證
            const jsonUserData = await fetchJsonUserData();
            if (validateUser(inputUsername, inputPassword, jsonUserData)) {
                alert('Login successful!');
                // 可以在這裡進行登入成功後的操作
            } else {
                alert('Invalid username or password.');
            }
        }
    });

    /*
    // 顯示從 SignUp 返回的資料
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (storedUserData) {
        document.getElementById("userDataDisplay").textContent = 
            `Username: ${storedUserData.username}, 
            Phone Number: ${storedUserData.phonenumber}, 
            Email: ${storedUserData.email}`;
    } else {
        document.getElementById("userDataDisplay").textContent = "No user data found.";
    }

    console.log("Retrieved user data:", storedUserData);
    */

});

// 驗證用戶函數
function validateUser(inputUsername, inputPassword, userData) {
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
}

// 從 JSON 檔案獲取用戶數據
async function fetchJsonUserData() {
    try {
        const response = await fetch('user.json');
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

</script>
  


<style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: sans-serif;
        }

        body {
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
            width: 70%;
            height: 70%;
        }

        .ig-logo {
            width: 24px;
            height: 24px;
            margin-right: 15px;
            margin-left: 20px;
            object-fit: cover;
        }

        .a {
            display: flex;
            flex-direction: column;
        }

        .b {
            border: 0;
            font: inherit;
            font-size: 15px;
            line-height: 18px;
            margin: 10px 20px;
            padding: 0;
            text-align: center;
            vertical-align: baseline;
        }

        .d {
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin: 10px 0;
        }

        .download-logo {
            height: 40px;
        }

        .words {
            color: rgb(115, 115, 115);
        }

        .lang {
            display: flex;
            flex-direction: row;
            justify-content: center;
        }

        .lang-1 {
            display: flex;
            flex-direction: column;
            line-height: 18px;
            margin-bottom: 12px;
            margin-left: 8px;
            margin-right: 8px;
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