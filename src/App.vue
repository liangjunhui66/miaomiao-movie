<template>
    <!-- App.vue 用来渲染整个单页面 -->
    <!-- 用来显示Mine 或者 Cinema 或者 Movie等组件 -->
    <!-- 使用<keep-alive> 标签可以在第一次加载的时候就缓存标签里面的内容 -->
    <keep-alive>
      <router-view/>
    </keep-alive>
</template>
<style>
</style>




