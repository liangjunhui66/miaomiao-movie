export default{
    path: '/movie',
    component: () => import('@/views/Movie'),
    children: [
        {
            path: 'city',
            component: () => import('@/components/City'),
        },
        {
            path: 'nowplaying',
            component: () => import('@/components/NowPlaying'),
        },
        {
            path: 'comingsoon',
            component: () => import('@/components/ComingSoon'),
        },
        {
            path: 'search',
            component: () => import('@/components/Search'),
        },
        {
            path: 'detail/1/:movieId',
            components: {
                default: () => import('@/components/NowPlaying'),
                detail : () => import('@/views/Movie/Detail'),
            },
            props: {//在这里开启路由传参的接口，在电影详情页面可以获取
                detail : true,
            }
        },
        {
            path: 'detail/2/:movieId',
            components: {
                default: () => import('@/components/ComingSoon'),
                detail : () => import('@/views/Movie/Detail'),
            },
            props: {//在这里开启路由传参的接口，在电影详情页面可以获取
                detail : true,
            }
        },
        {
            path: '/movie',
            redirect: '/movie/nowpalying'
        },
    ]
}