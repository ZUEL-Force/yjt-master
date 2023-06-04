<template>
  <div>
    <a-pagination
        v-show="showPagination"
        :total="total"
        :current="currentPage"
        :pageSize="pageSize"
        :showTotal="showTotal"
        :showSizeChanger="showSizeChanger"
        :pageSizeOptions="pageSizeOptions"
        @change="handlePageChange"
        @showSizeChange="handlePageChange"
    />
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import { Pagination } from 'ant-design-vue';

export default defineComponent({
  name: 'Pager',
  components: {
    'a-pagination': Pagination,
  },
  props: {
    total: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    showTotal: {
      type: Function,
      default: (total) => `共 ${total} 条`,
    },
    showSizeChanger: {
      type: Boolean,
      default: true,
    },
    pageSizeOptions: {
      type: Array,
      default: () => [10, 20, 50, 100],
    },
  },
  setup(props,ctx){
   function handlePageChange(current, pageSize) {
      ctx.emit('updateCurrent', current);
      ctx.emit('updatePageSize', pageSize);
    }
    return{
     handlePageChange
    }
  },
  computed: {
    showPagination() {
      return this.total > this.pageSize;
    },
  },

});
</script>
