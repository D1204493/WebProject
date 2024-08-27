<script>
import { createSpeechRecognition } from "/src/scripts/audioRecognition.js";

export default {
  ///所有中英句子存在一個名為chapt1Data的陣列中
  data() {
    return {
      activeIndex: null,
      correctIndex: null
    };
  },
  props:{
    chapt1Data:{
      type:Array,
      required:true
    }
  },
  //closePgn()為關閉時產生淡化的過度效果,並調用關閉頁面的方法,拋給父vue元件處理
  methods:{
    closePgn(){
      const dialContainer = document.getElementById("dialContainer");
      setTimeout(function() {
        dialContainer.style.opacity = 0;
      }, 50);
      dialContainer.addEventListener('transitionend',()=>{this.$emit("closePgn");})
    },
    //以下代碼提供開始語音辨識的功能, 並且一併執行將選取區塊擴張的程式,和顯示錄音中提示字樣
    startRecognition(index) {
      this.expandSection(index, true);
      const targetSentence = this.chapt1Data[index].english;
      this.showRecordingMessage(index);
      const checkSpeech = createSpeechRecognition(targetSentence, (isCorrect) => {
        this.expandSection(index, false);
        if (isCorrect) {
          this.correctIndex = index;
          this.showSuccessIcon(index);
          console.log("Test info");
        } else {
          this.correctIndex = null;
          this.showFailIcon(index);
          console.log("Test info")
        }
      });
      checkSpeech();

    },
    showSuccessIcon(index) {
      const resultIcon = document.querySelectorAll('.result_icon')[index];
      if (resultIcon) {
        resultIcon.style.transform = 'scale(1)';
      }
    },
    showFailIcon(index){
      const resultIcon = document.querySelectorAll('.result_icon')[index];
      if (resultIcon) {
        resultIcon.src= "/public/img2/failIcon.png";
        resultIcon.style.transform = 'scale(1)';
      }
    },
    showRecordingMessage(index) {
      const recordingMessage = document.querySelectorAll('.recording')[index];
      recordingMessage.style.opacity = '1';
      recordingMessage.style.marginTop = '200px';
      setTimeout((index) => {
        recordingMessage.style.opacity = '0';
      },6500)
    },
    expandSection (index, expand) {
      const dialogueSection = document.querySelectorAll('.dialogue')[index];
      const startBtn = document.querySelectorAll('.startBtn')[index];
      if (dialogueSection) {
        dialogueSection.style.height = expand ? '400px' : '200px';
        startBtn.classList.remove('btn-primary');
        startBtn.classList.add('btn-success');
        startBtn.innerText = "錄音中..";
      }
      setTimeout(() => {
        dialogueSection.style.height = '200px';
        startBtn.classList.remove('btn-success');
        startBtn.classList.add('btn-primary');
        startBtn.innerText = "開始！";
      },7000)

    }
  },



  mounted() {
    const dialContainer = document.getElementById("dialContainer");
    setTimeout(function() {
      dialContainer.style.opacity = 1;
    }, 50);
  }
}
</script>
<template>
  <div class="container border dialogue-container" id="dialContainer">
    <div class="dialogue shadow-sm m-5 p-4" v-for="(dialogue, index) in chapt1Data" :key="index">
      <div class="d-flex justify-content-between">
        <p class="h2">請念出</p>
        <span>
          <img class="result_icon" src="/public/img2/successIcon.png" alt="success">
        </span>
      </div>
      <div class="h3 eng mb-4">{{dialogue.english}}</div>
      <div class="d-flex justify-content-between">
        <small class="cn mt-2 font-italic">中譯:{{dialogue.chinese}}</small>
        <button class="btn btn-primary startBtn" @click="startRecognition(index)">開始!</button>
      </div>
      <div class="d-flex justify-content-center recording   ">錄音中....</div>
    </div>
  </div>
  <div class="d-flex justify-content-center m-4">
    <button class="btn btn-success w-25" @click.stop="closePgn">返回</button>
  </div>
</template>

<style scoped>
.container{
  height: 800px;
  background: #f9f9f9 ;
  border-radius: 25px;
  box-shadow: 5px 5px 5px lightgrey;
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
  overflow: scroll;
}
.dialogue{
  background: #ffffff;
  border-radius: 15px;
}
.result_icon {
  height: 35px;
  transform: scale(0);
  transition: transform 0.5s ease-in-out;
}
.recording{
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  margin-top: 20px;
}
.dialogue {
   background: #ffffff;
   border-radius: 15px;
   transition: height 0.5s ease-in-out; /* 增加动画效果 */
   height: 200px;
   overflow: hidden;
 }
.cn{
  font-style: italic
}


</style>