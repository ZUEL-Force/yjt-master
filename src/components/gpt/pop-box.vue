<template>
<div class="box">
  <a-tooltip>
    <a-avatar style="color: #f56a00; background-color: #fde3cf"  @click="showGpt" :src="require('@/assets/boy.png')"></a-avatar>
    <template #title>
      面试助手
    </template>
    <a-popover v-model:visible="visible" placement="bottom" title="面试小助手" trigger="click">
      <template #content>
        <iframe class="iframe" :src="url">
        </iframe>
      </template>
    </a-popover>
  </a-tooltip>



<!--  <a-button type="primary" @click="showGpt">面试助手</a-button>-->
</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
// import
export default defineComponent({
  name:'gpt-box',
  props:['url'],
  setup() {
    const visible = ref(false);
    const hide = () => {
      visible.value = false;
    };
    const showGpt=()=>{
      visible.value=true
    }
    return {
      visible,
      hide,
      showGpt
    };
  },
});
</script>

<style scoped>
.iframe{
  width: 400px;height: 600px;
}
iframe {
  width: 100%;
  /*height: 500px;*/
}

/* 去掉边框 */
iframe {
  border: none;
}

/* 添加阴影效果 */
iframe {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* 调整内边距 */
iframe {
  padding: 5px;
}

/* 设置背景色 */
iframe {
  background-color: #f5f5f5;
}

/* 设置滚动条颜色 */
iframe::-webkit-scrollbar {
  width: 10px;
}
iframe::-webkit-scrollbar-thumb {
  background-color: #dcdcdc;
}
iframe::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}
</style>
