<template>
  <div class="pagination">
    <h1>{{startNumAndEndNum}}------当前的页码{{pageNo}}</h1>
    <button :disabled="pageNo===1"
            @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNum.start>1"
            @click="$emit('getPageNo',1)">1</button>

    <button v-if="startNumAndEndNum.start>2">···</button>
<!--中间部分-->
    <button v-for="(page,index) in startNumAndEndNum.end"
            :key="index"
            v-if="page>=startNumAndEndNum.start"
            @click="$emit('getPageNo',page)"
            :class="{active:pageNo==page}"

    >{{page}}</button>

<!--下-->
    <button v-if="startNumAndEndNum.end<totalPage-1">···</button>
    <button v-if="startNumAndEndNum.end<totalPage"
            @click="$emit('getPageNo',totalPage)"
            :class="{active:pageNo=totalPage}"
    >{{totalPage}}</button>
    <button :disabled="pageNo===totalPage"
            @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 60 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:['pageNo','tatol','pageSize','continues'],
  computed:{
    totalPage(){
      return Math.ceil(this.total/this.pageSize)
    },
    startNumAndEndNum(){
      let start = 0 , end = 0;
      //规定连续页码数字5（totalPage至少5页）
      //不正常现象
      if(this.continues > this.totalPage){
        start = 1
        end = this.totalPage
      }else{
        //正常现象      Math.floor:想下取整
        start = this.pageNo - Math.floor(this.continues/2)
        end = this.pageNo + Math.floor(this.continues/2)
        //start出现不正常现象纠正
        if(start < 1){
          start = 1
          end = this.continues
        }
        //end出现不正常现象纠正
        if(end > this.totalPage){
          end = this.totalPage
          start = this.totalPage - this.continues + 1
        }
      }
      return {start,end}

    }
  }
}
</script>

<style scoped lang="less">
.pagination {
 text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
  background-color: skyblue;
}
</style>