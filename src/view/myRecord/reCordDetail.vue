<template>
    <div class="detail">
        <h4 class="title">{{result.title}}</h4>
        <div class="content">
            {{result.content}}
        </div>
        <pre class="pre" v-if="result.code">
            {{result.code}}
        </pre>
        <div class="foottext">
            {{result.foottext}}
        </div>
        <div class="instime">
            {{result.instime}}
        </div>
    </div>
</template>

<script>
import { getDetail , BaseUrl } from '@/api/api.js'
export default {
    name:'reCordDetail',
    data(){
        return{
            id:'',
            result:{
                title:'',
                content:'',
                imgUrl:'',
                instime:'',
                foottext:''
            },
        }
    },
    methods:{

    },
    watch:{
        $route(to,from){
            if(to.name=='reCordDetail'){
                getDetail({id:this.$route.params.id}).then(res=>{
                    console.log(res)
                    this.result=res.data[0]
                })
            }
        }
    },
    mounted(){

    },
}
</script>

<style lang="scss" scoped>
    .detail{
        .title{
            text-align: center;
            font-weight: normal; 
            font-size: .18rem;
            margin: .1rem 0;
        }
        .content{
            font-size: .16rem;
            padding: .1rem .2rem;
        }
        .pre{
            background: #2d2d2d;
            color: #ccc;
            margin: .1rem;
            padding: .1rem;
        }
        .foottext{
            font-size: .13rem;
            padding: .1rem .2rem;
        }
        .instime{
            font-size: .13rem;
            padding: .1rem .2rem;
        }
    }
</style>