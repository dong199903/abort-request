<template>
  <div>

    <!--取消重复请求例子-->
    <h2>测试取消重复请求案例</h2>
    <div @click="getData()">点击请求数据</div>

    <!--取消上一次请求例子-->
    <h2>测试取消上一次请求案例</h2>
  </div>
</template>

<script setup>
  import instance from './services';
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
</script>

<style>

</style>
