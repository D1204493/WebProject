
<template>
  <main>
        <div class="wrapper">
            <div class="content">
                <div class="ig-img">
                    <img class="img-ig" src="/PG/demo/public/img_logo/logo.png" alt="logo">
                </div>
                <form autocomplete="off" id="signupForm" action="">
                    <div class="input-group">
                        <label>
                            <input type="text" id="username" required>
                            <span>Username</span>
                        </label>
                        <label>
                            <input type="text" id="phonenumber" required>
                            <span>Phone Number</span>
                        </label>
                        <label>
                            <input type="text" id="email" required>
                            <span>Email</span>
                        </label>
                        <label class="label">
                            <input type="password" id="password" required>
                            <span>Password</span>
                            <button type="button" id="togglePassword" class="showhide">Show</button>
                        </label>
                    </div>
                    <button id="signupButton" disabled>Sign up</button>
                </form>
                
            </div>
        </div>
        
    </main>
</template>
  


<script>
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signupForm");
    const signupButton = document.getElementById("signupButton");
    const inputs = form.querySelectorAll("input");
    const errorMessage = document.createElement("div");
    errorMessage.style.color = "red";
    errorMessage.style.marginTop = "10px";
    form.appendChild(errorMessage);

    // 檢查所有輸入欄位是否已填寫
    function checkInputs() {
        let allFilled = true;
        let emptyFields = [];

        inputs.forEach(input => {
            if (input.value.trim() === "") {
                allFilled = false;
                emptyFields.push(input.previousElementSibling.textContent.trim());
            }
        });

        if (allFilled) {
            signupButton.removeAttribute("disabled");
            errorMessage.textContent = "";
        } else {
            signupButton.setAttribute("disabled", "true");
            errorMessage.textContent = `請填寫以下欄位：${emptyFields.join(", ")}`;
        }
    }

    // 為每個輸入欄位添加事件監聽器
    inputs.forEach(input => {
        input.addEventListener("input", checkInputs);
    });

    // 切換密碼可見性
    document.getElementById("togglePassword").addEventListener("click", function () {
        const passwordInput = document.getElementById("password");
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        this.textContent = type === "password" ? "Show" : "Hide";
    });

    // 處理表單提交
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            errorMessage.textContent = "請填寫所有必填欄位";
            return;
        }

        const username = document.getElementById("username").value;
        const phonenumber = document.getElementById("phonenumber").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // 創建 JSON 對象
        const userData = {
            username: username,
            phonenumber: phonenumber,
            email: email,
            password: password
        };

        // 將 JSON 對象存儲到 localStorage
        localStorage.setItem("userData", JSON.stringify(userData));

        // 在控制台中記錄存儲的數據
        console.log("Stored user data:", JSON.parse(localStorage.getItem("userData")));

        // 重定向到另一個頁面
        window.location.href = "test_logIn.html";
    });
});
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

        /* 背景浮水印 */
        body::after {
            content: "";
            background-image: url('wall2.png');
            background-repeat: no-repeat;
            background-position: left center;
            background-size: contain;
            opacity: 0.2;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            position: fixed;
            z-index: -1;
            pointer-events: none;
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
            /* 下面兩個是背景浮水印用 */
            position: relative;
            z-index: 1;
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

</style>  