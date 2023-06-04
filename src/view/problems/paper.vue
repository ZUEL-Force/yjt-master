<template>
  <div class="paper-list">
    <a-table :columns="columns" :scroll="{x:1500}" :loading="loading" :dataSource="dataSource" :pagination="pagination">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>
        <template v-else-if="column.key === 'questions'">

          <span :key="type" v-for="type in record.questions.split(',')">
          <a-tag
              :color="(parseInt(type)) % 2===0 ? 'geekblue' : 'green'"
          >
            {{ type }}
          </a-tag>
        </span>
        </template>
        <template v-else-if="column.key === 'author'">
        <span>
          <a-tag
              :color="record.author ===  record.author.length > 5 ? 'geekblue' : 'green'"
          >
            {{ record.author }}
          </a-tag>
        </span>
        </template>
        <template v-else-if="column.key === 'createTime'">
          <span class="time" v-text="DateToString(record.createTime)"></span>
        </template>
        <template v-else-if="column.key==='updateTime'">
          <span class="time" v-text="DateToString(record.updateTime)"></span>
        </template>
        <template v-else-if="column.key==='actions'">
          <div class="tab-actions flex-row-space-around">
            <a-button @click="fetchCurrentPaper(record)">详情</a-button>
            <a-button type="danger" @click="deletePaper(record)">删除</a-button>
          </div>

        </template>
      </template>
    </a-table>
    <a-drawer :visible="showDetail"
              @close="onConcel"
              :width="detailWidth"
    >

      <div class="title">
        {{currentPaper.value.name}}
      </div>
      <div class="paper-author">
        组卷人：{{currentPaper.value.author}}
      </div>

      <div :key="q.id" class="card-box" v-for="q in currentPaper.value.questions">
        <page-detail :question="q"></page-detail>
      </div>
      <div class="actions">
        <a-button type="danger" @click="deletePaper(currentPaper.value)">删除试卷</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import {onMounted, reactive, ref} from "vue";
import {DateToString} from "@/utils/date";
import pageDetail  from '@/components/paperDetail'
import {getPaper,getPaperProblem,delPaper} from "@/api/api";
import {message} from "ant-design-vue";
import {user} from "@/view/pageConfig";
export default {
  name: "paper",
  components:{
    pageDetail
  },
  setup() {
    // const params=reactive({
    //   pageNumber:1,
    //   pageSize:10
    // })
    let pagination = {
      total: 0,
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50'],
      onChange: fetchData,
      onShowSizeChange: fetchData
    }
    // eslint-disable-next-line no-unused-vars
    let dataSource = ref([])
    let showDetail = ref(false)

    // eslint-disable-next-line no-unused-vars
    let currentPaper=reactive({value:{},key:'current'})
    let loading = ref(true)

    function fetchData(current, pageSize) {
      //根据page和pageSize发起后台请求，获取返回的试卷数据
      getPaper(pagination).then(res=>{
        dataSource.value = res.data.data.papers
        pagination.total = res.data.data.total;
        pagination.current = current;
        pagination.pageSize = pageSize
        // console.log('拿到的试卷数据',res.data.papers,res.data.total)

        setTimeout(() => {
          loading.value = false
          console.log('dataSource', dataSource)
        }, 100)
      })
    }

    function fetchCurrentPaper(page) {
      // console.log('page',page)
      getPaperProblem({paperId:page.id}).then(res=>{
        currentPaper.value={
          ...page,
          questions:res.data.data,
        }
        showDetail.value=true
      })
    }
    function  onConcel(){
      showDetail.value=false
    }

    function deletePaper(paper){
      delPaper({paperId:paper.id,userId:user.id}).then(()=>{
        console.log('成功删除paper',paper)
        onConcel()
        fetchData(pagination.current,pagination.pageSize)
        message.info('删除试卷成功')
      })
      // const res={code:0,data:1,message:"ok",description:""}


    }

    onMounted(() => {
      fetchData(pagination.current, pagination.pageSize)
    })
    return {
      loading,
      showDetail,
      detailWidth:900,
      onConcel,
      deletePaper,
      currentPaper,
      columns: [
        {
          title: '试卷id',
          dataIndex: 'id',
          align:'center',
          width: 80,
          key: 'id',
          fixed: 'left'
        },
        {
          title: '试卷名称',
          dataIndex: 'name',
          key: 'name',
          fixed: 'left'
        },
        {
          title: '试卷作者',
          dataIndex: 'author',
          key: 'author'
        },
        {
          title: '试卷简介',
          dataIndex: 'description',
          key: 'description'
        },
        {
          title: '试题ID列表',
          dataIndex: 'questions',
          key: 'questions'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime'
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
          key: 'updateTime'
        },
        {
          title: '操作',
          key: 'actions',
          fixed: 'right',
          width: 240
        }
      ],
      fetchCurrentPaper,
      dataSource,
      pagination,
      DateToString: (date) => DateToString(date)
    };
  }
}
</script>

<style scoped>
.title{
  width: 100%;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: #4b4a4a;
}
.time {
  color: #333333;
  font-weight: bold;
}
.paper-author{
  width: 100%;
  text-align: right;
  color: #999999;
  font-weight: bold;
  margin: 0.5em;
  font-size: 18px;
}
.actions{
  margin: 10px;
  float: right;
}
.tab-actions{
  width: 100%;
}
</style>
