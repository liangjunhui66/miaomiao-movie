<template>
    <div class="movie_body" ref='movie_body'>
        <Loading v-if='isLoading'/>
        <Scroller :handleToScroll='handleToScroll' :handleToTouchEnd='handleToTouchEnd' v-else>
        <ul>
            <li class="pullDM">{{ pullDownMessage }}</li>
            <li v-for='item in movieList' :key="item.id">
                <!-- 
                    在这里，引入图片的url，但是由于图片的url中需要我们自己设置图片的宽高，所以
                    我们可以在全局设置一个过滤器，来修改
                 -->
                <div class="pic_show" @tap='handleToDetail(item.id)'><img :src="item.img | setWH() "></div>
                <div class="info_list">
                    <h2 @tap='handleToDetail(item.id)'>{{ item.nm }}<img v-if='item.version' src='@/assets/maxs.png' alt='' ></h2>
                    <p>观众评 <span class="grade">{{ item.sc }}</span></p>
                    <p>主演: {{ item.star }}</p>
                    <p>{{ item.showInfo }}</p>
                </div>
                <div class="btn_mall">
                    购票
                </div>
            </li>
        </ul>
        </Scroller>
    </div>
</template>

<script>
// 为了解决滑动生硬，没有弹出的效果，我们下载了better-scroll 包
// 所以可以为所有的二级路由加上这个效果
// import BScroll from 'better-scroll'

export default {
    name: 'NowPlaying',
    data() {
        return {
            movieList : [],
            pullDownMessage: '',
            isLoading : true,
            prevCityId : -1,
        }
    },
    activated() {
        // 注意：这里我们需要要选择城市之后来触发钩子函数，而不是希望切换路由来触发
        
        var cityId = this.$store.state.city.id;
        if( this.prevCityId === cityId ){return;}
        this.isLoading = true;
        this.axios.get('/api/movieOnInfoList?cityId=' + cityId).then((res) => {
            if( res.data.msg === 'ok'){
                this.movieList = res.data.data.movieList;
                this.isLoading = false;
                this.prevCityId = cityId;
                // 注意：使用组件来代替，下面的内容就需要写到组件中去

                // this.$nextTick()保证里面的语句会在dom更新后执行，可以看案例
                // this.$nextTick(()=>{
                //     // 使用better-scroll，第一个参数是容器,其次是配置对象
                //     var scroll = new BScroll(this.$refs.movie_body, {
                //         tap: true,
                //         probeType: 1,
                //     });
                //     // 现在需求是：下拉显示刷新
                //     scroll.on('scroll', (pos) => {
                //         // 没有配置之前也不会触发
                //         // console.log('截流滑动');
                //         if(pos.y > 30){//拖拽大于30的时候触发
                //             this.pullDownMessage = 'Loading...'
                //         }
                        
                //     })
                //     // 滑动结束出发事件
                //     scroll.on('touchEnd', (pos) => {
                //         // console.log('滑动结束')
                //         if(pos.y > 30) {
                //             this.axios.get('/api/movieOnInfoList?cityId=10').then((res) => {
                //                 if( res.data.msg === 'ok'){
                //                     this.pullDownMessage = 'OK',
                //                     setTimeout(() => {
                //                     this.movieList = res.data.data.movieList;
                //                     this.pullDownMessage = ''; 
                //                     }, 1000);
                                    
                //                 }
                //             }) 
                //         }
                //     })
                // })
            }
        })
    },
    methods: {
        handleToDetail(movieId) {//用来查看电影信息
            // 这样效果出不来，需要在new BScroll中的配置对象中开启服务
            this.$router.push('/movie/detail/1/' + movieId);
        },
        handleToScroll (pos) {
            if(pos.y > 30){//拖拽大于30的时候触发
                this.pullDownMessage = 'Loading...'
            }
        },
        handleToTouchEnd(pos) {
            if(pos.y > 30) {
                this.axios.get('/api/movieOnInfoList?cityId='+ this.cityId).then((res) => {
                    if( res.data.msg === 'ok'){
                        this.pullDownMessage = 'OK',
                        setTimeout(() => {
                        this.movieList = res.data.data.movieList;
                        this.pullDownMessage = ''; 
                        }, 1000);
                    }
                }); 
            }
        }
    }

}
</script>
<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.movie_body .pullDM { margin: 0; padding:0; border: none; text-align: center;}
</style>


