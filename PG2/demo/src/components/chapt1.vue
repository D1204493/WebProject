<script>
import { createSpeechRecognition } from "/src/scripts/audioRecognition.js";


export default {
  ///所有中英句子存在一個名為chapt1Data的陣列中
  data() {
    return {
      answeredStatus:[],
      totalScore:0,
      activeIndex: null,  
      correctIndex: null  
    };
  },
  props:{
    chaptTitle:{
      type:String,
      required: true
    },
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

    startRecognition(index) {
      this.expandSection(index, true);
      const targetSentence = this.chapt1Data[index].english;
      this.showRecordingMessage(index);
      const checkSpeech = createSpeechRecognition(targetSentence, (isCorrect) => {
        this.expandSection(index, false);
        if (isCorrect) {
          this.correctIndex = index;
          this.showSuccessIcon(index); 
          console.log("correct");
        } else {
          this.correctIndex = null;
          this.showFailIcon(index);
          console.log("no luck")
        }
      });
      checkSpeech(); 
    },
    showSuccessIcon(index) {
      const resultIcon = document.querySelectorAll('.result_icon')[index];
      if (resultIcon) {
        resultIcon.style.transform = 'scale(1)';
      }
      this.answeredStatus[index] = 1;
      this.totalScore += 1;
      this.checkScore();

    },
    checkScore(){
      if(this.totalScore === 10) {
        const finalScore = document.querySelector('.currentScore');
        finalScore.classList.add('text-success');
        alert("恭喜! 你已經完成本章節所有題目!");
        this.sendCompleteChaptorMessage();
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
      const buttons = document.querySelectorAll('.startBtn');
      const recordingMessage = document.querySelectorAll('.recording')[index];
      const currentStartBtn = document.querySelectorAll('.startBtn')[index];
      recordingMessage.style.opacity = '1';
      buttons.forEach(button =>{
        button.disabled = true;
        button.classList.add('btn-secondary');
        button.classList.remove('btn-primary');
      })
      setTimeout((index) => {
        recordingMessage.style.opacity = '0';
        buttons.forEach(button => {
          button.disabled=false;
          button.classList.add('btn-primary');
          button.classList.remove('btn-secondary');
        })
      },6500)
    },
    expandSection (index, expand) {
      const dialogueSection = document.querySelectorAll('.dialogue')[index];
      const recordingMessage = document.querySelectorAll('.recording')[index];
      if (dialogueSection) {
        dialogueSection.style.height = expand ? '320px' : '200px';
        recordingMessage.style.marginTop = "300px";
      }
      setTimeout(() => {
        dialogueSection.style.height = '200px';
      },7000)
    },
    sendCompleteChaptorMessage() {
      this.$emit('sendCompleteChaptorMessage');
    },
    test(){
      this.totalScore = 10;
      this.checkScore();
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
  <div class="chaptTitle  mt-4 d-flex justify-content-center text-white">{{chaptTitle}}</div>
  <div class="d-flex justify-content-evenly">
    <h2 class="currentScore mt-2 h4 text-primary fst-italic">目前進度：{{totalScore}}/10</h2>
  </div>
  <div class="container dialogue-container" id="dialContainer">

    <div class="dialogue shadow-sm m-5 p-4" v-for="(dialogue, index) in chapt1Data" :key="index">
      <div class="d-flex">
        <p class="h2">請念出</p>
        <div>
          <img class="result_icon" src="/public/img2/successIcon.png" alt="success">
        </div>
      </div>
      <div class="h3 eng mb-4">{{dialogue.english}}</div>
      <div class="d-flex justify-content-between">
        <small class="cn mt-2 fst-italic">中譯:{{dialogue.chinese}}</small>
        <button class="btn btn-primary startBtn" @click="startRecognition(index)">開始!</button>
      </div>
      <div class="d-flex justify-content-center recording mt-5">錄音中....</div>
    </div>
  </div>
  <div class="d-flex justify-content-center m-4">
    <button class="btn btn-success w-25" @click.stop="closePgn">返回</button>
  </div>
   
</template>

<style scoped>

.chaptTitle{
  font-size: 50px;
  background: linear-gradient(90deg, transparent, black, transparent);
}
.container{
  height: 800px;
  background: #f9f9f9 ;
  border: solid lightgrey;
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
}
.dialogue {
   background: #ffffff;
   border-radius: 15px;
   transition: height 0.5s ease-in-out,transform 0.2s ease-in-out;
   height: 200px;
   overflow: hidden;
 }
.dialogue:hover{
  transform: scale(1.05);
}
.recording{
  margin-top: 100px;
}

</style>