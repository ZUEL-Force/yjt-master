<template>
  <div>
<!--    <a-input-->
<!--        v-model:value="searchValue"-->
<!--        placeholder="Search users"-->
<!--        style="width: 200px"-->
<!--        @change="handleSearch"-->
<!--    />-->
<!--    <a-divider />-->
    <a-table :loading="loading" :columns="columns" :dataSource="dataSource" :pagination="pagination">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'avatarUrl'">
          <a-avatar :src="record.avatarUrl||getAvatar(record.id)" />
        </template>
        <template v-else-if="column.key === 'createTime'">
          {{ DateToString(record.createTime) }}
        </template>
        <template v-else-if="column.key === 'username'">
          <span v-if="record.username" class="username">{{record.username}}</span>
          <span v-else class="noname">未命名用户</span>

        </template>
        <template  v-else-if="column.key === 'operation'">
          <a-popconfirm
              title="请确认删除此用户?"
              placement="topRight"
              ok-text="我确认"
              cancel-text="取消"
              @confirm="() => handleDelete(record.id)"
          >
            <a-button type="link" danger>删除用户</a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import {defineComponent, onMounted, ref} from 'vue';
import { deleteUser, getUserList, searchUser } from '@/api/api';
import {DateToString} from "@/utils/date";
import {userAvatar} from "@/view/pageConfig";
export default defineComponent({
  data() {
  },
  setup(){
    // let state={
      let dataSource=ref([])
    // }
    let searchValue=ref(undefined)
    let loading=ref(true)
    function fetchData() {
      getUserList().then((response) => {
        // loading.value=true
        dataSource.value = response.data.data;
      }).catch(err=>{
        console.log('userErr',err)
      }).finally(()=>{
        // loading.value=false
        setTimeout(() => {
          loading.value = false
          console.log('dataSource', dataSource)
        }, 100)
      })
    }
    function getAvatar(id){
       return  userAvatar[id%userAvatar.length]
    }
    function  handleSearch() {
      if (searchValue.value) {
        searchUser(searchValue).then((response) => {
          dataSource.value = response.data.data;
        });
      } else {
        fetchData();
      }
    }


    function handleDelete(id) {
      deleteUser(id).then(() => {
        fetchData();
      });
    }
    onMounted(()=>{
      fetchData();
    })


    return {
      searchValue,
      dataSource,
      loading,
      pagination:{
        pageSize:8
      },
      getAvatar,
      DateToString:(date)=>{
        return DateToString(date)
      },
      statusColorMap: {
        0: 'default',
        1: 'success',
        2: 'warning',
        3: 'error',
      },
      columns: [
        {key: 'id',  dataIndex: 'id', title: 'ID', },
        {key: 'avatarUrl', dataIndex: 'avatarUrl', title: '头像'},
        {key: 'username',  dataIndex: 'username', title: '用户名' },
        {key: 'phone', dataIndex: 'phone', title: '电话号码' },
        {key: 'email',  dataIndex: 'email', title: '邮箱' },
        {key: 'userAccount', dataIndex: 'userAccount', title: '用户账号' },
        {key: 'gender',  dataIndex: 'gender', title: '性别' },
        {key: 'inviteCode',  dataIndex: 'inviteCode', title: '邀请码' },
        {key: 'createTime',  dataIndex: 'createTime', title: '创建时间' },
        {key: 'operation',  dataIndex: 'operation', title: '操作' },
      ],
      handleDelete,
      handleSearch
    };

  },

});
</script>

<style>
.username{
  color: #42b983;
  font-weight: bold;
}
.noname{
  color: #999999;
  font-weight: bold;
}
</style>
