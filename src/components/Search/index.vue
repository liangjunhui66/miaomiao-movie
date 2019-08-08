<template>
    <div class="search_body">
        <div class="search_input">
            <div class="search_input_wrapper">
                <i class="iconfont icon-sousuo"></i>
                <input type="text" v-model='message'>
            </div>					
        </div>
        <div class="search_result">
            <h3>电影/电视剧/综艺</h3>
            <ul>
                <li v-for="item in moviesList" :key='item.id'>
                    <div class="img"><img :src="item.img | setWH()"></div>
                    <div class="info">
                        <p><span>{{ item.nm }}</span><span>{{ item.sc }}</span></p>
                        <p>{{ item.enm }}</p>
                        <p>{{ item.cat }}</p>
                        <p>{{ item.rt }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Search',
    data() {
        return {
            message: '',
            moviesList : [],
        }
    },
    methods: {
        //copy1
        cancelRequest() {//这个方法用来配合axios来取消输入信息的时候多次请求，而是只请求最后一次
            if( typeof this.source === 'function'){
                this.source('终止请求你')
            }
        }
    },
    watch:{//由于computed属性不是和监视异步操作，所以使用watch
        message(newValue) {
            this.cancelRequest();
            var cityId = this.$store.state.city.id;
            this.axios.get('/api/searchList?cityId=' + cityId +'&kw=' + newValue, {//copy1
                cancelToken: new this.axios.CancelToken((c) => {
                    this.source = c;
                })
            }).then((res) => {
                if(res.data.data.movies && res.data.msg){
                    this.moviesList = res.data.data.movies.list;
                }
                console.log(res.data.data.movies.list);
            }).catch((err) => {//copy1
                if(this.axios.isCancel(err)){
                    console.log('Request Canceled', err.message);
                }else{
                    console.log(err);
                }
            })
        }
    }
}
</script>
<style>
#content .search_body{ flex:1; overflow:auto;}
.search_body .search_input{ padding: 8px 10px; background-color: #f5f5f5; border-bottom: 1px solid #e5e5e5;}
.search_body .search_input_wrapper{ padding: 0 10px; border: 1px solid #e6e6e6; border-radius: 5px; background-color: #fff; display: flex; line-height: 20px;}
.search_body .search_input_wrapper i{font-size: 16px; padding: 4px 0;}
.search_body .search_input_wrapper input{ border: none; font-size: 13px; color: #333; padding: 4px 0; outline: none; margin-left: 5px; width:100%;}
.search_body .search_result h3{ font-size: 15px; color: #999; padding: 9px 15px; border-bottom: 1px solid #e6e6e6;}
.search_body .search_result li{ border-bottom:1px #c9c9c9 dashed; padding: 10px 15px; box-sizing:border-box; display: flex;}
.search_body .search_result .img{ width: 60px; float:left; }
.search_body .search_result .img img{ width: 100%; }
.search_body .search_result .info{ float:left; margin-left: 15px; flex:1;}
.search_body .search_result .info p{ height: 22px; display: flex; line-height: 22px; font-size: 12px;}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1){ font-size: 18px; flex:1; }
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2){ font-size: 16px; color:#fc7103;}
</style>


