<template>
    <div class="cinema_body">
        <Loading v-if='isLoading'></Loading>
        <Scroller>
        <ul>
            <li v-for='item in cinemasList' :key="item.id">
                <div>
                    <span>{{ item.nm }}</span>
                    <span class="q"><span class="price">{{ item.sellPrice}}</span> 元起</span>
                </div>
                <div class="address">
                    <span>{{ item.addr }}</span>
                    <span>{{ item.distance }}</span>
                </div>
                <div class="card">
                <!-- 
                    这里通过遍历对象，item是value值。
                    在异步请求的数据之后有关选项卡的描述，我们需要判断这个选项卡是有还是没有，
                    所以需要对key值使过滤器，并且先要判断v-if显示这个选项卡。
                    从而定义过滤器（过滤器中定义一个面描述数组，看看从而渲染key值对应的数据
                    其次，为选项卡绑定样式，也是通过过滤器的方式，为当前选项卡添加样式
                    {
                        v-if已经判断出该因公安的选项卡的个数，过滤器就是找到 定义的卡的数组data 特定的key值，把value值赋值给他
                    }
                -->
                    <div v-for='(value, key) in item.tag' :key='key' v-if='value === 1' :class='key | formatClass'>
                        {{ key | formatValue }}
                    </div>
                </div>
            </li>
            
        </ul>
        </Scroller>
    </div>
</template>
<script>
export default {
    name: 'CiList',
    data() {
        return {
            cinemasList : [],
            isLoading: true,
            prevCityId: -1,
        }
    },
    mounted() {
        var cityId = this.$store.state.city.id;
        if( this.prevCityId === cityId ){return;}
        this.isLoading = true;
        this.axios.get('/api/cinemaList?cityId=' + cityId).then((res) => {
            console.log(res);
            if( res.data.msg === 'ok'){
                this.cinemasList = res.data.data.cinemas;
                this.isLoading = false;
                this.prevCityId = cityId;
            }
        })
    },
    filters: {
        formatValue(msg) {
            var data = [
                {key: 'allowRefund', value : '减免'},
                {key: 'endorse', value : '可退'},
                {key: 'sell', value : '折扣卡'},
                {key: 'snack', value : '小吃'},
            ];
            for(var i = 0 ; i < data.length; i ++){
                if(data[i].key === msg){
                    return data[i].value;
                }
            }
            return 'hehe';
        },
        formatClass(msg){
            var data = [
                {key: 'allowRefund', value : 'bl'},
                {key: 'endorse', value : 'bl'},
                {key: 'sell', value : 'or'},
                {key: 'snack', value : 'or'},
            ];
            for(var i = 0 ; i < data.length; i ++){
                if(data[i].key === msg){
                    return data[i].value;
                }
            }
            return 'hehe';
        }
    }
}
</script>
<style scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>


