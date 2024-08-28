<template>
  <!-- 導航列 -->
  <navbar />
  <div style="padding-top: 20px">
    <div class="container content">
      <h2>隱私政策</h2>
      <p>
        本隱私政策（以下簡稱“政策”）說明了我們如何收集、使用、分享及保護您的個人信息。當您使用本網站（“<span
          class="highlight"
          >Voice Mastery</span
        >
        英文學習網站”）時，即表示您同意本政策中的做法。
      </p>
      <h3>1. 我們收集的信息</h3>
      <p>我們可能會收集以下類型的信息：</p>
      <ul>
        <li>
          <strong>您提供的個人信息：</strong
          >當您註冊帳戶、訂閱我們的服務、或與我們聯繫時，我們可能會收集您的姓名、電子郵件地址、電話號碼、生日等個人信息。
        </li>
        <li>
          <strong>自動收集的信息：</strong
          >我們可能會自動收集您的IP地址、瀏覽器類型、操作系統、訪問時間、訪問的頁面以及其他技術信息。
        </li>
        <li>
          <strong>Cookies和追踪技術：</strong
          >我們可能會使用Cookies和類似技術來改善您的用戶體驗，並為您提供個性化的服務。
        </li>
      </ul>
      <h3>2. 我們如何使用您的信息</h3>
      <p>我們可能將收集的個人信息用於以下目的：</p>
      <ul>
        <li>提供、維護和改進我們的服務；</li>
        <li>處理您的訂單和交易；</li>
        <li>與您溝通，包括發送服務相關的更新和促銷信息；</li>
        <li>優化和個性化您的使用體驗；</li>
        <li>符合法律、法規及監管要求。</li>
      </ul>
    </div>
  </div>
  <!--footer-->

  <web-footer />
</template>

<script>
export default {
  // 此處無需特別邏輯
};
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
