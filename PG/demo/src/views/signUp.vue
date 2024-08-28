
<template>
    <div class="html1">
      <div class="body1">
       <main>
            <div class="wrapper">
                <div class="content">
                    <div class="ig-img">
                        <router-link to="/" class="nav-link">
                            <img class="img-ig" src="/img_logo/logo.png" alt="logo">
                        </router-link>
                    </div>
                    <form @submit.prevent="handleSubmit" autocomplete="off" id="signupForm" action="">
                        <div class="input-group">
                            <label>
                                <input v-model="form.username" type="text" id="username" required>
                                <span>Username</span>
                            </label>
                            <label>
                                <input v-model="form.phonenumber" type="text" id="phonenumber" required>
                                <span>Phone Number</span>
                            </label>
                            <label>
                                <input v-model="form.email" type="text" id="email" required>
                                <span>Email</span>
                            </label>
                            <label class="label">
                                <input v-model="form.password" :type="passwordType" id="password" required>
                                <span>Password</span>
                                <button type="button" @click="togglePassword" id="togglePassword" class="showhide">
                                    {{ passwordType === 'password' ? 'Show' : 'Hide' }}
                                </button>
                            </label>
                        </div>
                        <button id="signupButton" :disabled="!isFormValid">Sign up</button>
                      <div v-if="errorMessage" style="color: red; margin-top: 10px;">{{ errorMessage }}</div>
                    </form>
                </div>
            </div>
        </main>
      </div>
    </div>
    </template>
      
    
    
    <script>
    export default {
      name: 'signUp',
      data() {
        return {
          form: {
            username: '',
            phonenumber: '',
            email: '',
            password: ''
          },
          passwordType: 'password',
          errorMessage: ''
        };
      },
      computed: {
        isFormValid() {
          return Object.values(this.form).every(value => value.trim() !== '');
        }
      },
      methods: {
        handleSubmit() {
          if (!this.isFormValid) {
            this.errorMessage = '請填寫所有必填欄位';
            return;
          }
    
          const userData = {
            username: this.form.username,
            phonenumber: this.form.phonenumber,
            email: this.form.email,
            password: this.form.password
          };
    
          localStorage.setItem('userData', JSON.stringify(userData));
    
          console.log('Stored user data:', JSON.parse(localStorage.getItem('userData')));
    
          this.$router.push('/logIn');
        },
        togglePassword() {
          this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
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