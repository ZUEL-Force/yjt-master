<template>
  <div class="draggable-component" :style="{ top: top + 'px', left: left + 'px' }" ref="component" @mousedown="onMouseDown">
    <div class="header" @mouseup="onMouseUp" @mousemove="onMouseMove">助手</div>
    <div class="content">
      <iframe :src="url"></iframe>
    </div>
  </div>
</template>

<script>
import {onBeforeUnmount, onMounted, reactive} from "vue";
import {getCurrentInstance} from "vue";
export default {
  name:'index',
  props:['url'],
  setup(){
    const state=reactive({
      isDragging: false, // 是否正在拖拽
      startX: 0, // 拖拽开始时鼠标的x坐标
      startY: 0, // 拖拽开始时鼠标的y坐标
      left: 0, // 组件左边距离父容器的距离
      top: 0, // 组件上边距离父容器的距离
    })
    const {proxy}=getCurrentInstance()
   function onMouseDown(e) {
      // 记录鼠标的起始位置和组件的位置
      state.isDragging = true
      state.startX = e.clientX
      state.startY = e.clientY
      const rect = proxy.$refs.component.getBoundingClientRect()
      state.left = rect.left
      state.top = rect.top
    }
   function onMouseUp() {
      state.isDragging = false
    }
    function onMouseMove(e) {
      if (state.isDragging) {
        // 计算鼠标移动的距离，并更新组件的位置
        const deltaX = e.clientX - state.startX
        const deltaY = e.clientY - state.startY
        state.left += deltaX
        state.top += deltaY
        state.startX = e.clientX
        state.startY = e.clientY
        // 如果组件超出了父容器的范围，则贴边隐藏
        const containerRect = proxy.$refs.component.parentNode.getBoundingClientRect()
        if (state.left < 0) {
          state.left = 0
        } else if (state.left + proxy.$refs.component.offsetWidth > containerRect.width) {
          state.left = containerRect.width - proxy.$refs.component.offsetWidth
        }
        if (state.top < 0) {
          state.top = 0
        } else if (state.top + proxy.$refs.component.offsetHeight > containerRect.height) {
          state.top = containerRect.height - proxy.$refs.component.offsetHeight
        }
      }
    }
    function resetPosition() {
      // 窗口大小变化时重新计算组件的位置
      const rect = proxy.$refs.component.getBoundingClientRect()
      const containerRect = proxy.$refs.component.parentNode.getBoundingClientRect()
      if (rect.left + rect.width > containerRect.width) {
        // 组件右边超出了父容器的宽度，贴边隐藏
        state.left = containerRect.width - rect.width
      }
      if (rect.top + rect.height > containerRect.height) {
        // 组件下边超出了父容器的高度，贴边隐藏
        state.top = containerRect.height - rect.height
      }
    }

    onMounted(()=>{
      // 监听窗口大小变化，重新计算组件的位置
      window.addEventListener('resize', resetPosition)
      resetPosition()
    })

    onBeforeUnmount(()=>{
      window.removeEventListener('resize', resetPosition)

    })



    return{
      ...state,
      onMouseDown,
      onMouseUp,
      onMouseMove

    }
  },
}
</script>

<style>
.draggable-component {
  position: absolute;
  border: 1px solid #ccc;
  z-index: 999;
  transition: all 0.3s;
}

.header {
  height: 24px;
  line-height: 24px;
  padding: 4px;
  background-color: #eee;
  cursor: move;
}

.content {
  width: 100%;
  height: calc(100% - 24px);
  overflow: auto;
}

iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
