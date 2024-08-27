<template>

    <!-- 導航列 -->
    <navbar />
    <div style="padding-top: 20px;">
        <div class="container content">
            <h2>聯絡我們</h2>
            <p>如果您有任何問題、建議或需要幫助，請通過以下表格與我們聯繫。我們將盡快回覆您的訊息。</p>
            
            <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                    <label for="name" class="form-label">姓名</label>
                    <input type="text" class="form-control" id="name" v-model="name" placeholder="請輸入您的姓名">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">電子郵件</label>
                    <input type="email" class="form-control" id="email" v-model="email" placeholder="請輸入您的電子郵件">
                </div>
                <div class="mb-3">
                    <label for="subject" class="form-label">主題</label>
                    <input type="text" class="form-control" id="subject" v-model="subject" placeholder="請輸入聯繫主題">
                </div>
                <div class="mb-3">
                    <label for="message" class="form-label">訊息</label>
                    <textarea class="form-control" id="message" v-model="message" rows="5" placeholder="請輸入您的訊息"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">提交</button>
            </form>
        </div>
    </div>
   <!--footer-->

   <web-footer />
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            subject: '',
            message: ''
        };
    },
    methods: {
        handleSubmit() {
            // 提交表單邏輯
            console.log("姓名:", this.name);
            console.log("電子郵件:", this.email);
            console.log("主題:", this.subject);
            console.log("訊息:", this.message);
            alert("您的訊息已提交！");
        }
    }
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  color: #333;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  
}

.container {
  width: auto;
  margin: auto;
  overflow: hidden;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-height: 80vh;
}

.content {
    padding: 20px;
    flex: 1;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

p {
  margin-bottom: 20px;
  text-align: justify;
}

ul {
  list-style-type: disc;
  margin-left: 20px;
}

ul li {
  margin-bottom: 10px;
}

.highlight {
  color: #007bff;
  font-weight: bold;
}
</style>
