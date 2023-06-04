<template>
  <div class="add-button-wrapper">
    <a-tooltip placement="bottom">
      <a-button
          type="primary"
          shape="circle"
          size="large"
          @click="showModal"
      >
        <template #icon>
          <plus-outlined></plus-outlined>
        </template>
      </a-button>

      <template #title>
        添加面试题
      </template>
    </a-tooltip>
    <a-modal
        title="新增题目"
        :visible="visible"
        @ok="handleOk"
        ok-text="提交"
        cancel-text="取消"
        @cancel="handleCancel"
        :confirm-loading="loading"
    >
      <form ref="form" :model="formValues">
        <a-form-item label="标题" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input v-model:value="formValues.title" placeholder="请输入标题"/>
        </a-form-item>
        <!--        <a-form-item label="出题者" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">-->
        <!--          <a-input v-model="formValues.author" placeholder="请输入出题者" />-->
        <!--        </a-form-item>-->
        <a-form-item label="问题" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-textarea :rows="4" v-model:value="formValues.content" placeholder="请输入面试题"/>
        </a-form-item>
        <a-form-item label="答案" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-textarea :rows="8" v-model:value="formValues.answer" placeholder="请输入答案"/>
        </a-form-item>
        <a-form-item label="标签" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-select v-model:value="formValues.label" style="width: 200px;">
            <a-select-option v-for="option in labels" :key="option.value" :value="option.value">
              {{ option.text }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </form>
    </a-modal>
  </div>
  <div class="problems">
    <a-row>
      <a-col class="card my-flex-center" :span="8" v-for="question in questions" :key="question.id">
        <a-card
            :style="{ marginBottom: '1rem',width:'25vw'}"
        >
          <template #title>
            {{ question.title }}
          </template>
          <template #extra>
            <a-tag :color="labelColors[question.label]" v-text="getTags(question.label)"></a-tag>
          </template>
          <div class="content text-overflow-5">
            <p>{{ question.content }}</p>
            <a-popover title="答案详情" trigger="click">
              <template #content>
                <p style="max-height: 40vh;max-width: 50vw;overflow-x: scroll">
                  {{ question.answer }}
                </p>
              </template>
              <p class="question">{{ question.answer }}</p>

            </a-popover>
          </div>
          <template #actions>
            <!--            <div class="actions">-->
            <p class="from">{{ question.author }} · <span v-text="DateToString(question.createTime)"></span></p>
            <a-space class="delete">
              <a-tooltip>
                <a-popconfirm
                    title="请确认删除此题目?"
                    placement="topRight"
                    ok-text="我确认"
                    cancel-text="取消"
                    @confirm="() => handleDelete(question.id)"
                >
<!--                  <a-button type="link" danger>-->
                    <delete-outlined></delete-outlined>
<!--                    删除用户-->
<!--                  </a-button>-->
                </a-popconfirm>
                <template #title>{{ deleteTip }}</template>
              </a-tooltip>
            </a-space>
          </template>
        </a-card>
      </a-col>
    </a-row>
  </div>

  <div class="pageDiv flex-col-space-around">
    <page-div :current-page="params.current" :page-size="params.pageSize" :total="total" @updateCurrent="updateCurrent"
              @updatePageSize="updatePageSize">
    </page-div>
  </div>
</template>

<script>
import {onMounted, reactive, ref} from "vue";
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons-vue'
import pageDiv from "@/components/pageDiv";
import {pageProblem, addProblem,deleteProblem} from "@/api/api";
import {DateToString} from "@/utils/date";
import {tags, getTags, colorTagMap} from "@/view/pageConfig";
import {message} from "ant-design-vue";

export default {
  name: "problem",
  components: {
    DeleteOutlined,
    PlusOutlined,
    pageDiv
  },
  setup() {
    // 模拟题目数据
    const questions = ref([]);

    // 标签颜色
    const labelColors = ref(colorTagMap);

    const params = reactive({
      current: 1,
      pageSize: 6
    })
    //标签内容
    const labels = reactive(tags)

    let total = ref(undefined)
    //add模块
    const visible = ref(false);
    const loading = ref(false);
    const formValues = reactive({
      title: '',
      author: '系统推荐',
      content: '',
      answer: '',
      label: '请选择试题分类',
    });

    function fetchData() {
      pageProblem(params)
          .then(res => {
            questions.value = res.data.data.problems
            total.value = res.data.data.total
          })
    }

    const showModal = () => {
      visible.value = true;
    };
    const updateCurrent = (newCurrent) => {
      params.current = newCurrent
      fetchData()
    }
    const handleOk = () => {
      loading.value = true;
      addProblem(formValues).then(() => {
        setTimeout(() => {
          loading.value = false;
          visible.value = false;
          fetchData()
        }, 200);
      })

    };
    const handleCancel = () => {
      visible.value = false;
    };
    const handleDelete=(id)=>{
      deleteProblem({problemId:id}).then((res)=>{
        if(res.data.code===0){
          message.success('删除成功')
          fetchData()
        }
      })
    }
    onMounted(() => {
      fetchData()
    })
    return {
      questions,
      labelColors,
      total,
      showModal,
      handleCancel,
      handleOk,
      formValues,
      loading,
      handleDelete,
      visible,
      getTags: (tag) => {
        return getTags(tag)
      },
      labels,
      deleteTip: '删除题目',
      DateToString: (date) => {
        return DateToString(date)
      },
      params,
      updateCurrent
    };
  }
}
</script>

<style scoped>
.problems {
  padding: 2vw;
}

.card {
  /*margin: 10px;*/
  width: 100%;
}

.content {
  height: 7.5em;
}

.from:hover {
  color: #333333;
}

.delete {
  margin-left: 4em;
}

.delete:hover {
  color: #f56a00;
}

.add-button-wrapper {
  margin: 10px;
  float: right;
}

.add-button-wrapper .ant-btn-circle {
  width: 60px;
  height: 60px;
  font-size: 28px;
  border-radius: 50%;
}

.question:hover {
  /*font-weight: bold;*/
  position: relative;
  left: 1px;
  bottom: 1px;
  cursor: pointer;
}

.pageDiv {
  width: 100%;
}
</style>
