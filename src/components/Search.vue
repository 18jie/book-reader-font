<template>
  <div class="search">
    <!-- <input id="search-input" class="search-input" type="search" placeholder="搜索书名或作者"> -->
    <el-select v-model="value"
               multiple
               filterable
               remote
               reserve-keyword
               placeholder="请输入关键词"
               :remote-method="remoteMethod"
               :loading="loading">
      <el-option v-for="item in options"
                 :key="item.id"
                 :label="item.lable"
                 :value="item.id">
      </el-option>
    </el-select>
    <a id="search-btn"
       class="search-btn"
       @click="toSearch">
      <faicon icon="search"></faicon>
    </a>
  </div>
</template>



<script>
export default {
  data() {
    return {
      options: [],
      selectOne: {},
      loading: false,
      value: [],
    };
  },
  methods: {
    remoteMethod(query) {
      if (query != "") {
        this.loading = true;
        this.$axios.get(`/book/searchBookByName?name=${query}`).then((res) => {
          if (res.data.code == 0) {
            if (res.data.data.length == 0) {
              this.options = [];
            }
            for (let item of res.data.data) {
              let tep = {};
              tep.id = item.id;
              tep.value = item.bookName;
              tep.lable = item.bookName;
              this.options.push(tep);
            }
            this.loading = false;
            console.log(this.options);
          } else {
            this.options = [];
          }
        });
      }
    },
    toSearch() {
      console.log(this.value);
      this.goToBook(this.value[0]);
    },
    goToBook(bid) {
      console.log("going to book:", bid);
      this.$router.push({
        path: "/book/" + bid + "/",
      });
      this.$router.go(0);
    },
  },
};
</script>


<style lang="stylus">
.search {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 300px;
  height: 40px;
  border: 1px solid #cab389;

  .search-input {
    width: 240px;
    height: 100%;
    line-height: 40px;
    padding-left: 10px;
    color: #666;
    border: 0 none;
    background-color: #f2f2f2;
    box-sizing: border-box;
  }

  .search-btn {
    float: right;
    width: 60px;
    height: 40px;
    line-height: 40px;
    background-color: #cab389;
    background-repeat: no-repeat;
    background-position: center center;
    cursor: pointer;
    text-align: center;
    color: #f2f2f2;
  }
}
</style>
