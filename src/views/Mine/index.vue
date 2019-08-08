<template>
    <div id="main" >
        <Header title='我的喵喵'></Header>
        <Login />
        <TabBar></TabBar>
    </div>
</template>
<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import Login from '@/components/Login'
export default {
    name: 'Mine',
    components : {
        Header,
        TabBar,
        Login,
    }
}
</script scoped>
<style>
#content .cinema_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-around; align-items:center; background:white;}
</style>

