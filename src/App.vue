<template>
  <div id="app" :class="$store.state.ws" :style="{backgroundImage: 'url('+require('./assets/image/background.jpg')+')'}">
    <div class="root">
        <div class="header">
            <div class="myPhoto">
                <div>
                    <img class="my" src="./assets/image/my.png" >
                    <img  :class="showStar?'showStar':'star'" @animationend="showStar = false" ref="star" src="./assets/image/star.png">
                </div>
                <p>Fight for Us !</p>
            </div>
            <div class="someNav">
                <el-row type="flex"  :gutter="20" justify="center">
                    <el-col v-for="(item,index) of router" :key="index" ><p @click="jamp(item.value)">{{item.label}}</p></el-col>
                </el-row>
            </div>
        </div>
        <div class="content">
            <keep-alive><router-view/></keep-alive>
        </div>
        
    </div>
    <p class="beian"><a href="http://beian.miit.gov.cn" target="_blank" >湘ICP备19011440号-1</a></p>
    
  </div>
</template>

<script>
    (function (doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                if(clientWidth>=750){
                    // $('.qrCode').css('font-size','100px')
                    docEl.style.fontSize = '100px';
                }else{
                    // $('.qrCode').css('font-size',100 * (clientWidth / 375) + 'px')
                    docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
                }
            };
  
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
export default {
  name: 'App',
  data(){
      return{
          router:[
              {label:'简历',value:'/index'},
              {label:'笔记',value:'/myRecord'},
              {label:'作品',value:'/comment'}
          ],
          showStar:true
      }
  },
  watch:{
      $route(to,from){
          this.showStar=true
      }
  },
  methods:{
      jamp(val){
          this.$router.push(val)
          this.showStar=false
      }
  },
  mounted(){
  }
}
</script>

<style lang="scss" >
  *{
    padding: 0;
    margin:0;
    list-style: none !important;
  }
  
  .beian{
      font-size: .12rem;
      text-align: center;
      color: #eee;
    //   position: absolute;
    //   bottom: 0;
    //   left: 50%;
    //   transform: translateX(-50%)
  }
  .showStar{
        position: absolute;
        left: .2rem;
        top: 0;
        width: 50%;
        height: auto;
        opacity: 0;
        animation: opacity-change 1.5s linear ;
        -webkit-animation: opacity-change 1.5s linear ;
        -moz-animation: opacity-change 1.5s linear ;
        -o-animation: opacity-change 1.5s linear ;
    }
  @keyframes opacity-change {
        0% {
            opacity: 0;
            transform:scale(.7); 
            left: 0;
            top:.1rem;
        }
        25%{
            opacity: .6;
            transform:scale(1.3); 
            left: 20%;
            top:-.06rem;
        }
        50% {
            opacity: 1;
            transform:scale(1.3); 
            left: 35%;
            top:-.1rem;
        }
        100% {
            opacity: 0;
            left: 50%;
            top:.1rem;
            transform:scale(1); 
        }
    }
  #app{
    overflow-y: auto;
    overflow-x: hidden;
    width: 100vw;
    height: 100vh;
    width: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .big{
    font-size: .18rem;
    
  }
  .small{
    font-size: .14rem;
    .content{
        width: 100vw !important;
    }
  }
  
  .root{
        position: relative;
        .header{
            margin:0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-top:.5rem;
            .myPhoto{
                margin: 0 auto;
                position: relative;
                p{
                    line-height: .4rem;
                    font-size: .3rem;
                    color: #bc8cf7;
                    text-align: center;
                }
                div{
                    width: 2.2rem;
                    height: 2.2rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50%;
                    background: white;
                    overflow: hidden;
                    margin: 0 auto;
                }
                .star{
                    position: absolute;
                    left: .2rem;
                    top: 0;
                    width: 50%;
                    height: auto;
                    opacity: 0;
                }
                .my{
                    width: 80%;
                    height: auto;
                }
            }
            .someNav{
                margin: 0 auto;
                padding: .1rem 0;
                p{
                    cursor: pointer;
                }
            }
        }
        .content{
            width: 65vw;
            padding: .2rem 0;
            margin:.1rem auto;
            // border: 1px solid #eee;
            background: white;
            box-shadow: 0 0 8px rgba(0,0,0,.4);
        }
    }
    .el-message{
        font-size: .16rem !important
    }
    .el-message--error{
        font-size: .16rem !important
    }
</style>
