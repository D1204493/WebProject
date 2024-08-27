<template>
    <!-- 導航列 -->
    <navbar />
  
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-4 mb-5">
          <div class="card">
            <div class="card-header text-center">
              會員資訊
            </div>
            <div class="card-body text-center">
              <img src="/img_logo/otto.jpeg" alt="會員大頭照" class="img-fluid rounded-circle mb-3">
              <p><strong>會員名稱：</strong>OTTO</p>
              <p><strong>電子郵件：</strong>otto@example.com</p>
              <p><strong>加入日期：</strong>2024年8月25日</p>
              <button type="button" class="btn btn-primary mb-3">更新會員資料</button>
              <button type="button" class="btn btn-secondary mb-3">查看歷史成績</button>
              <button type="button" class="btn btn-warning mb-3">變更密碼</button>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card">
            <div class="card-header text-center">
              會員成績歷史紀錄
            </div>
            <div class="card-body d-flex flex-column align-items-center">
              <!-- 圓餅圖容器 -->
              <div class="chart-container">
                <canvas id="pieChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!--footer-->
    <web-footer />
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  
  export default {
    name: 'MemberDashboard',
    mounted() {
      // 圓餅圖資料
      const data = {
        labels: ['正確率', '錯誤率'],
        datasets: [{
          label: '比率％',
          data: [80, 20],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',  
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 0.8)',  
            'rgba(255, 99, 132, 0.8)'
          ],
          borderWidth: 1
        }]
      };
  
      // 圓餅圖設定
      const config = {
        type: 'pie',
        data: data,
      };
  
      // 渲染圖表
      Chart.register(...registerables);
      new Chart(
        document.getElementById('pieChart'),
        config
      );
    }
  };
  </script>
  
  <style>
  .chart-container {
    width: 300px; /* 設定容器寬度 */
    height: 300px; /* 設定容器高度 */
    position: relative; /* 設定為相對定位 */
  }
  #pieChart {
    position: absolute; /* 設定為絕對定位 */
    top: 0;
    left: 0;
    width: 100%; /* 使圖表填滿容器 */
    height: 100%; /* 使圖表填滿容器 */
  }
  </style>
  