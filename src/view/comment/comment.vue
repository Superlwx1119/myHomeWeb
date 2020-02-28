<template>
  <div class="container">
      <div class="input">
        <h4>作品集</h4>
        <div class="workList">
            <div class="workEg" style="float:left" @mousemove="changeColor(index)" @mouseleave="backColor(index)" :style="{backgroundImage: 'url('+require('../../assets/image/'+item.img)+')',backgroundSize:'cover',backgroundRepeat:'no-repeat'}" v-for="(item,index) of workList" @click="showWork(item.name)" :key="index">
            <transition name="fade">
              <div v-if="changeC&&current==index">
                <p >
                  <!-- <i class="el-icon-search"></i> -->
                  {{item.label}}
                </p>
              </div>
            </transition>
              
            </div>
        </div>
        <!-- <p>留言踩楼噢! <span>登录</span></p>
        <div class="textarea">
          <el-input maxlength="150"  show-word-limit type="textarea" :autosize="{ minRows: 3, maxRows: 4}" v-model="noteCon"></el-input>
        </div>
        <el-button class="btn" size="small" type="primary">发 表</el-button> -->
      </div>
  </div>
</template>

<script>
import { getComments,getValue} from '@/api/api.js'
export default {
    name:'comment',
    data(){
      return{
        current:null,
        changeC:false,
        noteCon:'',
        workList:[{
          name:'map',
          label:'百度地图应用',
          img:'map.jpg'
        },{
          name:'market',
          label:'商城应用',
          img:'shopping.jpg'
        },{
          name:'ChatRoom',
          label:'聊天应用',
          img:'chat.jpg'
        }]
      }
    },
    methods:{
      changeColor(val){
        this.current=val
        this.changeC=true
      },
      backColor(val){
        this.current=null
        this.changeC=false
      },
      showWork(val){
        this.$router.push(val)
      }
    },
    mounted(){
    }
}
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .container{
    height: 100%;
    .input{
      padding: 0 .2rem;
      .workList{
        padding: .2rem .4rem;
        .workEg{
          cursor: pointer;
          width: 2rem;
          margin: .1rem;
          height: 2rem;
          position: relative;
          div{
            p{
              background:rgba($color: #000000, $alpha: 0.5);
              height: 100%;
              padding-top:50%;
              box-sizing: border-box;
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              color:white;
              width: 100%;
              text-align: center;
            }
          }
          
          .hoverColor{
            color: red !important;
          }
        }
      }
      .workList:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
        content: "";
        display: block;
        height: 0;
        clear:both;
        visibility: hidden;
        }
    }
  }
</style>