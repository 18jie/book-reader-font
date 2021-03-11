<template>
  <div>
    <el-container class="hotlist-container">
      <el-header height="30px">
        <el-row>
          <el-col :span="24">
            <p class="title">
              <faicon :icon="['far', 'bookmark']"></faicon>&nbsp;{{title}}
            </p>
          </el-col>
        </el-row>
      </el-header>
      <el-row v-for="item in booklist"
              :key="item.id">
        <el-col :span="12">
          <book-info v-bind="item[0]"></book-info>
        </el-col>
        <el-col :span="12">
          <div v-if="item.length == 2">
            <book-info v-bind="item[1]"></book-info>
          </div>
        </el-col>
      </el-row>
      <el-pagination layout="prev, pager, next"
                     :total="total"
                     :page-size="8"
                     :pager-count="5"
                     :current-page="current"
                     @current-change="currentChange"
                     @prev-click="preChange"
                     @next-click="nextChange">
      </el-pagination>
    </el-container>
  </div>
</template>



<script>
function makePair(list) {
  var res = [];
  for (let i = 0; i < list.length; i = i + 2) {
    var pair = [];
    pair[0] = list[i];
    if (i + 1 < list.length) {
      pair[1] = list[i + 1];
    }
    res.push(pair);
  }
  return res;
}

import BookInfo from "./BookInfo.vue";

export default {
  components: {
    BookInfo,
  },
  props: {
    title: {
      type: String,
      default: "书架",
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      booklist: [],
      // type: 3,
      current: 1,
      total: 0,
    };
  },
  created() {
    this.current = 1;
    this.getHotList(this.current);
  },

  methods: {
    nextChange() {
      let next = this.current + 1;
      if (next > this.pages) next = this.pages;
      this.getHotList(next);
    },
    preChange() {
      let pre = this.current - 1;
      if (pre < 1) pre = 1;
      this.getHotList(pre);
    },
    currentChange(val) {
      this.getHotList(val);
    },
    getHotList(pageNum) {
      console.log(this.id)
      this.$axios.get(`/favorite/listFavoriteBookVo/${pageNum}`).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          let tmp = res.data.data;
          this.total = tmp.total;
          this.current = tmp.current;
          this.booklist = tmp.records;
          // this.booklist = data.map(item => {
          //   return item.book;
          // });
          console.log(this.total);
          this.booklist = makePair(this.booklist);
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-header {
  border-bottom: 1px solid #eeeeee;
}

.hotlist-container {
  // height: 400px
  margin-top: 10px;
  border: 1px solid #cab389;
  border-radius: 10px;
  padding: 10px;

  .title {
    text-align: left;
    left: 5px;
    font-weight: bold;
  }
}

div.book-info:hover {
  border: 1px solid #cab389;
  border-radius: 5px;
  background-color: #fef1dc;
}
</style>

