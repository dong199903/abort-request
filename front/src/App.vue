<template>
  <div>
    <!--取消重复请求例子-->
    <h2>测试取消重复请求案例</h2>
    <div @click="getData()">点击请求数据</div>

    <!--取消上一次请求例子-->
    <h2>测试取消上一次请求案例</h2>
    <div class="box">
      <div class="title">
        <div @click="getInfo(1)">请求接口1</div>
        <div @click="getInfo(2)">请求接口2</div>
      </div>
      <div class="content">
        {{show}}
      </div>
    </div>
  </div>
</template>

<script setup>
  import instance from './services/index';
  import instance2 from './services/index2';
  import {ref} from "vue"
  /**模拟取消重复请求 */
  const getData = async() => {
    const controll = new AbortController()
    try{
        let info = await instance({
        method:"get",
        url:"/",
        signal:controll.signal,
        controll
      })
      console.log(info)
    }catch(e){
      console.log(e)
    }
  }



  /**模拟取消上一次请求 */
  let pre = null//标记前一次的请求控制器
  const show = ref()
  const getInfo = async(data) => {
    const controll = new AbortController()
    if(!pre) pre = controll
    else {
      console.log("取消")
      pre.abort()
      pre = controll
    }
    try{
        let info = await instance2({
        method:"get",
        url:"/",
        signal:controll.signal
      })
      console.log(info)
      if(data==1) show.value = 1
      else show.value = 2
    }catch(e){
      console.log(e)
    }
  }
</script>

<style>
  .box{
    border:1px solid red;
    width: 300px;
    height: 300px;
  }
  .title{
    display: flex;
    justify-content: space-around;
  }
</style>
