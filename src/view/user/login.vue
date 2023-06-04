<template>
  <div class="login-container">
    <a-row class="login-main">
      <a-col :span="12" class="login-carousel">
        <img :src="require('@/assets/carouse_login.png')"/>
      </a-col>
      <a-col :span="12" class="login-form-container">
        <div class="title">一卷通后台</div>
        <a-form ref="form" :model="formData" class="form">
          <a-form-item
              label="账号"
              name="userAccount"
              :rules="[{required: true,  message: '请输入用户名'}]"
          >
            <a-input
                v-model:value="formData.userAccount"
                size="large"
                clearable
                autocomplete="false"
                tabindex="1"
                placeholder="请输入账号"
            >
              <a-icon type="user" class="gray"/>
            </a-input>
          </a-form-item>
          <a-form-item
              label="密码"
              name="userPassword"
              :rules="[{required: true, message: '请输入密码'}]"
          >
            <a-input
                v-model:value="formData.userPassword"
                type="password"
                size="large"
                clearable
                autocomplete="false"
                tabindex="1"
                placeholder="请输入密码"
            >
              <a-icon type="lock" class="gray"/>
            </a-input>
          </a-form-item>
        </a-form>
        <a-row type="flex" justify="space-between">
          <a-checkbox  size="large">自动登录</a-checkbox>
          <a>忘记密码</a>
        </a-row>
        <a-row>
          <a-button
              size="large"
              type="primary"
              class="login-btn"
              tabindex="5"
              @click="handleLogin"
              block
          >
            <span>登录</span>
          </a-button>
        </a-row>
      </a-col>
    </a-row>

    <a-row class="foot">
      <a-row type="flex" justify="center">
        Copyright © 2023 - Present
        <a href="javascript:void(0);" target="_blank" style="margin:0 5px;">一卷通</a>
        版权所有
      </a-row>
    </a-row>
  </div>
</template>

<script>
import router from "@/router";
import {login} from '@/api/api'
import {reactive, ref} from "vue";
import storage from "@/store/store";
import {message} from "ant-design-vue";
import {HAS_LOGIN, USER_INFO} from "@/store/constant";
import {user} from "@/view/pageConfig";
export default {
  name: 'Login',
  setup() {
    let loading=ref(false)
    const form=ref(null)
    const formData=reactive({
      userAccount: '',
      userPassword: '',
    })
    const Login=(data)=>{
      return new Promise((resolve)=>{
        login(data).then(res=>{
          resolve(res)
        })
      })
    }
    const handleLogin = ()=> {
            loading.value = true
            form.value.validate().then(valid => {
              if (valid) {
                loading.value = true
                Login(formData).then(res => {
                  console.log('返回的登录数据',res)
                  if(res.data.code===0)
                  {
                    storage.set(HAS_LOGIN,true)
                    user.name=res.data.data.username||'null'
                    user.id=res.data.data.id
                    user.userInfo=res.data.data
                    storage.set(USER_INFO,res.data.data)
                    // console.log('登录返回的数据',res)
                    message.success('登录成功')
                    router.push({ path:  '/' })
                  }
                  else {
                    message.error('登录信息出错，请重新填写')
                  }

                }).finally(() => {
                  loading.value = false
                })
              }
            })
          }
    return {
      redirect: undefined,
      loading,
      msgLoading: false,
      formData,
      form,
      handleLogin,
      // rules: {
      //   account: [{required: true, trigger: 'blur', message: '请输入用户名'}],
      //   password: [{required: true, trigger: 'blur', message: '请输入密码'}]
      // }
    }
  },

  // watch: {
  //   $route: {
  //     handler: function (route) {
  //       this.redirect = route.query && route.query.redirect
  //     },
  //     immediate: true
  //   }
  // },
}
</script>

<style lang='less' scoped>
.login-container {
  height: 100vh;
  background:linear-gradient(to bottom, rgba(255,255,255,0.2),  rgba(0,0,0,0.3)), url("../../assets/carouse.png") no-repeat;
  background-size: cover;

  .login-main {
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 8px 19px 2px rgba(0, 0, 0, 0.16);
    border-radius: 20px;
    background: #FFFFFF;
    width: 800px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    .login-carousel {
      height: 500px;

      img {
        border-radius: 18px 0 0 18px;
        display: inline-block;
        height: 100%;
        width: 100%;
        background-size: cover;
      }
    }

    .login-form-container {
      margin-top: 30px;
      padding: 0 50px;

      .title {
        padding: 36px 0 20px 0;
        font-size: 30px;
        text-align: center;
        color: #333333;
      }

      /deep/ .ant-form-item {
        margin-bottom: 14px;
      }

      .forget-pass,
      .other-way {
        font-size: 14px;
      }

      .login-btn,
      .other-login {
        margin-top: 5vh;
      }
    }
  }

  .foot {
    position: absolute;
    left: 50%;
    bottom: 10px;
    //color: rgba(0, 0, 0, 0.45);
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);

    .help {
      margin: 0 auto 2vh;
      width: 60%;

      .item {
        color: rgba(0, 0, 0, 0.45);
      }

      :hover {
        color: rgba(0, 0, 0, 0.65);
      }
    }

    a {
      color: #2d8cf0;
      background: 0 0;
      text-decoration: none;
      outline: 0;
      cursor: pointer;
      transition: color 0.2s ease;
      font-size: 14px;
    }
  }
}
</style>
