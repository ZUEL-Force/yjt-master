<template>
  <a-layout style="height: 100vh">
    <a-layout-header class="header" style="height: 10vh">
      <div class="logo" @click="collapseNav">
        <logo color="#000" bg-color="#ee6058"></logo>
      </div>

      <div class="right flex-row-space-around">
        <div class="gpt">
                        <gpt-box url="http://43.142.142.39:65071/"></gpt-box>
<!--          <gpt-box url="https://www.huaban.com"></gpt-box>-->
        </div>
        <div class="user">

          <a-dropdown :trigger="['contextmenu']">
            <div>
              <a-avatar style="color: #f56a00; background-color: #fde3cf">{{ user.name.substring(0, 1) }}</a-avatar>
            </div>
            <template #overlay>
              <div style="margin: 2px">
                <a-button shape="round" @click="Logout">
                  退出登录
                  <template #icon>
                    <import-outlined/>
                  </template>
                </a-button>

              </div>
              <!--            <a-menu>-->
              <!--              <a-menu-item key="1"><a-button @click="loginout">退出登录</a-button></a-menu-item>-->
              <!--            </a-menu>-->
            </template>
          </a-dropdown>
        </div>

      </div>
      <div class="head-title">{{ title }}</div>
    </a-layout-header>
    <a-layout-content style="height: 90vh">
      <a-layout style=" background: #fff">
        <a-layout-sider v-model:collapsed="collapsed" width="200" style="height:90vh;background: #fff">
          <a-menu
              @select="navTo"
              v-model:openKeys="openKeys"
              v-model:selectedKeys="selectedKeys"
              mode="inline"
              theme="dark"
              :style="{ height: '100%', borderRight: 0 }">
            <a-menu-item :key="route.problem.key">
              <template #icon>
                <read-outlined/>
              </template>
              <span class="navName">{{ route.problem.title }}</span>
            </a-menu-item>
            <a-menu-item :key="route.paper.key">
              <template #icon>
                <file-text-outlined />

              </template>
              <span class="navName">{{ route.paper.title }}</span>
            </a-menu-item>
            <a-menu-item :key="route.user.key">
              <template #icon>
                <team-outlined></team-outlined>
              </template>
              <span class="navName">{{ route.user.title }}</span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{   backgroundColor: '#eee',padding: '0 24px', maxHeight: '90vh',height: 'auto',overflowY:'scroll' }">
          <div class="body">
            <router-view></router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>

<script>
import router from "../router";
import {reactive, toRefs} from "vue";
import {route} from "@/view/pageConfig";
import gptBox from "@/components/gpt/pop-box";
// import {logout} from "@/api/api";
import {ReadOutlined,TeamOutlined,FileTextOutlined, ImportOutlined} from '@ant-design/icons-vue'
import Logo from "@/components/logo/logo.vue";
import {user} from "@/view/pageConfig";
import {HAS_LOGIN} from "@/store/constant";
import storage from "@/store/store";
import {message} from "ant-design-vue";
export default {
  name: "index",
  components: {
    Logo,
    ReadOutlined,

    gptBox,
    ImportOutlined,
    FileTextOutlined,
    TeamOutlined
  },
  setup() {
    const state = reactive({
      collapsed: true,
      selectedKeys: ['1'],
      openKeys: ['problem'],
      preOpenKeys: ['problem'],
      route: route,
      user,
    });
    const info = () => {
      message.info('退出登录成功');
    };
    const Logout = () => {
      // TODO:清除测试
      // if (!state.collapsed) {
      //   logout().then(() => {
      //     storage.remove(HAS_LOGIN)
      //     router.go(-1)
      //   })
      // }
      setTimeout(()=>{
        info()
        storage.remove(HAS_LOGIN)
        router.go(-1)
      },100)

    }


    const navTo = (item) => {
      router.push({path: `/${item.key}`})
      // console.log('route',item)
    }
    const collapseNav = () => {
      state.collapsed = !state.collapsed
      // console.log('collapseNav',state.collapsed)
    }


    return {
      ...toRefs(state),
      navTo,
      collapseNav,
      Logout,
      title: '一卷通管理后台',

    }
  }
}
</script>

<style scoped>
.body {
  overflow: scroll;
  height: 100%;
}

.header {
  position: relative;
  background-size: 100% 100%;
  /*filter: blur(1px);*/
  display: flex;
  justify-content: space-between;
}

.logo {
  width: 40px;
  cursor: pointer;
  position: relative;
  right: 10px;
}
</style>
<style>

.head-title {
  color: #FFFFFF;
  position: absolute;
  top: 0px;
  /*color: #333;*/
  font-weight: 550;
  width: 90vw;
  text-align: center;
  font-size: 23px;
}

.time span {
  color: #333;
  font-size: 11px;
  padding-right: 6px;
}

.body {
  margin: 0;
  overflow:scroll;
}
.right{
  position: relative;
z-index: 111;
}
.gpt{
  margin: 0 100px;
}
</style>
