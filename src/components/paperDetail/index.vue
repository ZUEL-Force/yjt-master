<template>

    <a-card class="question-card" bordered :hoverable="true">
      <div class="card-header">
       <div class="id">
         <a-tag :color="colorTagMap[question.label]">
           {{getTags(question.label)}}
         </a-tag>
       </div>
        <h3 class="card-title">{{ question.title }}</h3>
        <p class="card-author">作者：{{ question.author }}</p>
      </div>
      <div class="card-body">
        <p class="card-content">{{ question.content }}</p>
        <p class="card-answer">{{ question.answer }}</p>
      </div>
      <div class="card-footer">
        <p class="card-time" v-text="`-----发布于${DateToString(question.createTime)}`"></p>
      </div>
    </a-card>



</template>

<script>
import { defineComponent } from 'vue';
import { Card } from 'ant-design-vue';
import {DateToString} from "@/utils/date";
import {getTags,colorTagMap} from "@/view/pageConfig";
export default defineComponent({
  name: 'pageDetail',
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  components: {
    'a-card': Card,
  },
  setup(){
    return{
      DateToString:(date)=>{
        return DateToString(date)
      },
      getTags:(tag)=>{
        return getTags(tag)
      },
      colorTagMap
    }
  }
})
</script>

<style scoped>
.question-card {
  font-size: 16px;
  background-color: #f9f9f9;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}
.question-card .id{
  float: right;
}

.question-card .card-header {
  padding: 12px;
  font-weight: bold;
  border-bottom: 1px solid #ebedf0;
  background-color: #fafafa;
}

.question-card .card-title {
  margin: 0;
  font-size: 18px;
  color: rgba(137, 178, 109, 0.9);
}

.question-card .card-author {
  margin: 6px 0 0;
  color: #999;
}

.question-card .card-body {
  padding: 12px;
}


.question-card .card-content, .question-card .card-answer {
  margin: 0;
  color: #333;
}
.card-content{
  font-size: 18px;
  text-align: center;

  /*color: #42b983;*/
  font-weight: bold;
}

.question-card .card-answer {
  margin-top: 12px;
  text-indent: 2em;
  line-height: 2em;
}

.question-card .card-footer {
  padding: 12px;
  border-top: 1px solid #ebedf0;
  background-color: #fafafa;
}

.question-card .card-time {
  margin: 0;
  color: rgba(112, 112, 112, 0.9);
  width: 100%;
  text-align: right;
}
</style>

