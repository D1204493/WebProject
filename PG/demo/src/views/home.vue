<template>
    <!-- 導航列 -->
    <navbar @topic-changed="handleTopicChange"/>

    <!-- 旋轉木馬 -->
    <carousel />

    <!-- Card 圖 -->
    <div class="row justify-content-center" id="medalTable">
            <div v-for="set in setList" :key="set.name" class="country-card col-lg-2 col-md-3 col-sm-4 col-6">
                <card :setName="set.name" :setImg="set.img" />
            </div> 

        <!-- 頁碼 -->
        <pagination />
    </div>

    <!-- footer -->
    <webFooter />
</template>
  

<script>
  export default {
    data() {
        return {
            name: 'home',
            currentPage: 'home', // 預設為首頁
            currentTopic: 'Friends', // 預設主題
            set: [],
            img_url: {
              Friends: {
                Episode_1: "friends1.jpg",
                Episode_2: "friends2.jpg",
                Episode_3: "friends3.jpeg",
                Episode_4: "friends4.jpg",
                Episode_5: "friends5.jpg",
                Episode_6: "friends6.jpg",
              },
              "The Bear": {
                Episode_1: "bear1.webp",
                Episode_2: "bear2.jpg",
                Episode_3: "bear3.jpg",
                Episode_4: "bear4.webp",
                Episode_5: "bear5.webp",
                Episode_6: "bear6.jpg",
              },
            },
            setList: [],
        };
    },
    async created() {
        await this.fetch_sets();
        console.log('Fetched sets:', this.set); // 檢查 this.set 是否已正確加載
        this.build_set_list();
        console.log(this.setList);
    },
    methods: {
        async fetch_sets() {
          try{
            const response = await fetch("set.json");
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.set = data.set;
            console.log('Sets loaded:', this.set);
          } catch (error) {
              console.error('Failed to load sets:', error);
          }
        },
        //選擇主題，傳資料給card
        handleTopicChange(topic) {
          this.currentTopic = topic;
          this.build_set_list();
        },
        build_set_list() {
          console.log('Building set list with:', this.set); // 檢查 this.set 的值
            if (!this.set) {
                console.log('set is not built');
                return;
            }
            this.setList = this.set.map(m => {
                return {
                    name: m,
                    img: this.img_url[this.currentTopic][m],
                };
            });
        },
        goToLogin() {
          this.currentPage = 'logIn'; // 設定為 'logIn'，顯示 logIn 畫面
        },
        goToHome() {
          this.currentPage = 'home'; // 設定為 'home'，顯示原本內容
        }
    }
  }
  </script>


<style>
</style>