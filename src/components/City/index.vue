<template>
    <div class="city_body">
        <div class="city_list">
            <Loading v-if='isLoading'></Loading>
            <Scroller ref='city_list'>
                <!-- 默认情况下，scroller下面只能有一个子元素，所以需要包上一层 -->
                <div>
                     <!-- 热门城市 -->
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix">
                            <li v-for='item in hotList' :key="item.id" @tap='handleToCity(item.nm, item.id)'>
                                {{item.nm}}
                            </li>
                        </ul>
                    </div>
                    <!-- 分类城市 -->
                    <div class="city_sort" ref='city_sort'>
                        <div v-for='item in cityList' :key="item.index">
                            <h2>{{item.index}}</h2>
                            <ul>
                                <li v-for='ele in item.list' :key="ele.id"  @tap='handleToCity(ele.nm, ele.id)'>
                                    {{ ele.nm }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Scroller>
           
        </div>
            <!-- 城市索引 -->
        <div class="city_index">
            <ul>
                <!--这小括号里面的index是数组的索引 -->
                <li v-for="(item,index) in cityList" :key="item.index" @touchstart='getIndex(index)'>
                    {{ item.index }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'City',
    data(){
        return {
            cityList: [],
            hotList: [],
            isLoading: true,
        }
    },
    mounted () {
        // main.js中全局引入axios这里用this引用
        
        var cityList = window.localStorage.getItem('cityList');
        var hotList = window.localStorage.getItem('hotList');
        if(cityList && hotList){
            this.cityList = JSON.parse(cityList);
            this.hotList = JSON.parse(hotList);
            this.isLoading = false;
        }else{
            this.axios.get('/api/cityList').then((res) => {
                if(res.data.msg == 'ok'){
                    var cities = res.data.data.cities;
                    var {cityList,hotList} = this.formatCityList(cities);
                    this.cityList = cityList;
                    this.hotList = hotList;
                    this.isLoading = false;
                    window.localStorage.setItem('cityList', JSON.stringify(cityList));
                    window.localStorage.setItem('hotList', JSON.stringify(hotList));
                }
            })
        }
    },
    methods: {

        formatCityList(cities) {//返回对象里面有按字母排序的城市的数组和热门城市的数组
            var cityList = [];
            var hotList = [];
            for(var m = 0; m < cities.length; m ++){
                if(cities[m].isHot === 1){
                    hotList.push(cities[m]);
                }
            }

            for(var i = 0; i < cities.length; i ++){
                var firstLetter = cities[i].py.substring(0,1).toUpperCase();
                if(toCom(firstLetter)){ //新的首字母
                    cityList.push({ index: firstLetter, list : [{nm: cities[i].nm, id: cities[i].id}]});
                }else{//已经有的字母
                    for(var j = 0; j < cityList.length; j ++){
                        if(cityList[j].index === firstLetter){
                            cityList[j].list.push( {nm: cities[i].nm, id : cities[i].id} )
                        }
                    }
                }
            }
            // 不支持sort????
            paixu(cityList);
            function paixu(arr){
                for(var i = 0; i < arr.length; i ++ ){
                    for(var j = 0; j < arr.length -1; j ++){
                        if(arr[i].index > arr[j].index){
                            var temp = arr[i];
                            arr[i] = arr[j];
                            arr[j] = temp;
                        }
                    }
                }
                return arr.reverse();
            }
            function toCom(firstLetter){
                for(var i = 0; i < cityList.length; i ++ ){
                    if(cityList[i].index === firstLetter){
                        return false;
                    }
                }
                return true;
            }

           return {
               cityList,
               hotList,
           }
        },
        getIndex(index) {//点击字母获取字母对应的城市
            console.log(index);
            // 注释: 这里的index的作用是：
            // 首先根据ref获取dom节点，在从而获取所用的装有字母索引的标签h2，
            // 根据索引我们可以查到可以对应h2dom数组中的索引，所以点击右侧index的时候，就可以设置他们的父元素的滚动距离
            // 这样才可以把你点击的索引的距离赋值g给这个父元素，让他正好显示现在你点击的索引的位置
            var h2 = this.$refs.city_sort.getElementsByTagName('h2');
            // 当添加了Scroll组件，点击索引会失效
            // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
            this.$refs.city_list.toScrollTop(-h2[index].offsetTop);
        },
        handleToCity(nm, id) {
            this.$store.commit('city/CITY_INFO', {
                nm,
                id,
            });
            window.localStorage.setItem('nowNm',nm);
            window.localStorage.setItem('nowId',id);
            this.$router.push('@/components/NowPlaying')
        }
    },
}
</script>
<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>


