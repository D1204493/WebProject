
<template>

  <!-- 首頁條 -->
    <navbar />
  
    <!-- 旋轉木馬 -->
    <carousel />
  
    <div class="container mt-3">
  
        <!-- Card 圖 -->
        <div class="row justify-content-center" id="medalTable">
            <div v-for="set in setList" :key="set.name" class="country-card col-lg-2 col-md-3 col-sm-4 col-6">
                <card :setName="set.name" :setImg="set.img" />
            </div> 
        </div>
  
        <!-- 頁碼 -->
        <pagination />
        
    </div>
  

    <!-- <div>
        <router-view></router-view>
    </div> -->

    <!-- footer -->
    <webFooter />
    
  </template>
  
  <script>
  
  export default {
    data() {
        return {
            set: null,
            img2_url: {
              Episode_1: "friends1.jpg",
              Episode_2: "friends2.jpg",
              Episode_3: "friends3.jpeg",
              Episode_4: "friends4.jpg",
              Episode_5: "friends5.jpg",
              Episode_6: "friends6.jpg",
            },
            setList: [
            ],
            selectedCountry: "",
            goldMedals: 0,
            silverMedals: 0,
            bronzeMedals: 0,
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
        build_set_list() {
          console.log('Building set list with:', this.set); // 檢查 this.set 的值
            if (!this.set) {
                console.log('set is not built');
                return;
            }
            this.setList = this.set.map(m => {
                return {
                    name: m,
                    img: this.img2_url[m],
                };
            });
          
        },
    }
  }
  </script>
  
  
<style>
</style>  