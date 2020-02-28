<template>
    <div class="myrecord" :class="$store.state.ws">
        <p v-if="recordList.length==0">这个人有点懒,没有任何笔记...</p>
        <ul class="contentList">
            <li v-for="(item,index) of recordList" :key="index">
                <p class="column"></p>
                <div class="record">
                    <h4>
                        <span class="piont"></span>
                        <span class="triangle" :class="txtMoveLeft?'triangleBack':'triangleMoveLeft'" @mousemove="triangleMoveLeft=false" @mouseleave="triangleMoveLeft=true" ref="target"></span>
                        <span class="txt" :class="txtMoveLeft?'txtBack':'txtMoveLeft'" @click="showDetail(item.id)" @mousemove="txtMoveLeft=false" @mouseleave="txtMoveLeft=true"  ref="target">{{item.instime}}</span>
                    </h4>
                    <div class="content">
                        <p class="content_titel">{{item.title}}</p>
                        <p class="content_content">{{item.content}}</p>
                        <img :src="url+'/static/'+item.imgUrl+'.png'" >
                        <p class="content_foottext">{{item.foottext}}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { getMyRecord , getImages , BaseUrl } from '@/api/api.js'
export default {
    name:'myRecord',
    data(){
        return{
            url:'',
            recordList:[],
            host:'',
            txtMoveLeft:true,
            triangleMoveLeft:true
        }
    },
    computed:{
        
    },
    methods:{
        getMyRecord(){
            getMyRecord().then(res=>{
                this.recordList=res.data
            })
            
        },
        showDetail(id){
            console.log(id)
            this.$router.push({name:'reCordDetail',params:{id:id}})
        }
    },
    mounted(){
        console.log(BaseUrl)
        this.url=BaseUrl
        this.getMyRecord();
        this.host=window.location.protocol+window.location.host
    }
}
</script>

<style lang="scss" scoped>

    .txtMoveLeft{
        animation: txtMoveLeft .5s ease ;
        -webkit-animation: txtMoveLeft .5s ease ;
        -moz-animation: txtMoveLeft .5s ease ;
        -o-animation: txtMoveLeft .5s ease ;
        animation-fill-mode:forwards;
        -webkit-animation-fill-mode:forwards; /* Safari 和 Chrome */
    }
    .triangleMoveLeft{
        animation: triangleMoveLeft .5s ease ;
        -webkit-animation: triangleMoveLeft .5s ease ;
        -moz-animation: triangleMoveLeft .5s ease ;
        -o-animation: triangleMoveLeft .5s ease ;
        animation-fill-mode:forwards;
        -webkit-animation-fill-mode:forwards; /* Safari 和 Chrome */
    }
    .txtBack{
        
        animation: txtBack .5s ease ;
        -webkit-animation: txtBack .5s ease ;
        -moz-animation: txtBack .5s ease ;
        -o-animation: txtBack .5s ease ;
        animation-fill-mode:forwards;
        -webkit-animation-fill-mode:forwards; /* Safari 和 Chrome */
    }
    .triangleBack{
        animation: triangleBack .5s ease ;
        -webkit-animation: triangleBack .5s ease ;
        -moz-animation: triangleBack .5s ease ;
        -o-animation: triangleBack .5s ease ;
        animation-fill-mode:forwards;
        -webkit-animation-fill-mode:forwards; /* Safari 和 Chrome */
    }
    @keyframes txtBack {
        0% {
            left:-.1rem;
        }
        100% {
            left: 0;
        }
    }
    @keyframes triangleBack {
        0% {
            left:-.25rem;
        }
        100% {
            left: -.15rem;
        }
    }
    @keyframes triangleMoveLeft {
        0% {
            left:-.15rem;
        }
        100% {
            left: -.25rem;
        }
    }
    @keyframes txtMoveLeft {
        0% {
            left:0;
        }
        100% {
            left: -.1rem;
        }
    }
    .myrecord{
        height: 100%;
        
        >P{
            font-size: .16rem;
            text-align: center;
        }
        .contentList{
            list-style: none;
            margin: 0 auto;
            padding:0 .2rem;
            width: 100%;
            height: 100%;
            li{
                position: relative;
                .column{
                    width: 2px;
                    height: 100%;
                    background: #eee;
                    position: absolute;
                    top: .1rem;
                    left: .07rem;
                }
                .record{
                    padding-bottom: .2rem;
                    h4:hover{
                        .triangle{
                            border-right-color: #e7d9ba;
                            // transform: translateX(-.1rem);
                        }
                        .txt{
                            background: #e7d9ba;
                            // transform: translateX(-.1rem);
                        }
                    }
                    h4{
                        position: relative;
                        font-size: .12rem;
                        cursor: pointer;
                        font-weight: normal;
                        left: .6rem;
                        width: 1rem;
                        height: .3rem;
                        line-height: .3rem;
                        text-align: center;
                        top: 0;
                        .txt{
                            display: inline-block;
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            background: #eee;
                            border-bottom-right-radius: 5px;
                            border-top-right-radius: 5px;
                        }
                        .piont{
                            width: .1rem;
                            height: .1rem;
                            background: white;
                            border:3px solid #e5e5e5;
                            border-radius: 50%;
                            z-index: 99;
                            position: absolute;
                            top: .05rem;
                            left: -.6rem;
                            
                        }
                        .triangle{
                            position: absolute;
                            width: 0;
                            height: 0;
                            display: inline-block;
                            border-right: .15rem solid #eee;
                            border-top: .15rem dashed transparent;
                            border-bottom: .15rem  dashed transparent;
                            left: -.15rem;
                            top: 0;
                        }
                    }
                    .content{
                        margin: 0 .2rem;
                        padding:0 .2rem;
                        .content_titel{
                            font-size: .16rem;
                            font-weight: 700;
                            padding: .1rem .2rem;
                        }
                        img{
                            width: 2.2rem;
                            height: auto;
                            margin: .1rem .2rem;
                        }
                        .content_content{
                            width: 3rem;
                            font-size: .16rem;
                            padding: .1rem .2rem;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                        .content_foottext{
                            width: 3rem;
                            font-size: .14rem;
                            padding: .1rem .2rem;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
                
            }
        }
    }
    .small{
        li{
            position: relative;
            .column{
                width: 1px;
                height: 100%;
                background: #eee;
                position: absolute;
                top: .1rem;
                left: 1.3% !important;
            }
            .record{
                h4{
                    font-weight: normal;
                    position: relative;
                    font-size: .16rem;
                    // padding-left: .6rem;
                    left: .6rem;
                    top: 0;
                    .piont{
                        width: .1rem;
                        height: .1rem;
                        background: white;
                        border:2px solid #e5e5e5;
                        border-radius: 50%;
                        z-index: 99;
                        position: absolute;
                        top: .05rem;
                        left: -.6rem;
                    }
                }
                .content{
                    margin: 0 .2rem;
                    padding:0 .2rem;
                }
            }
            
        }
    }
</style>