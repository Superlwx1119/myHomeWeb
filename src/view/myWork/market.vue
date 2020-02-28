<template>
  <div class="market">
      <el-row>
        <el-col :span="12">
          <div class="imgContainer">
            <div class="img" >
              <!-- <div class="box">
                  <img  @mousemove="showBigImg" @mouseleave="hiddemBigImg" :src="goodsList[imgIndex]" >
                  <pic-zoom :url="goodsList[imgIndex]" :scale="3"></pic-zoom>
              </div> -->
              <!-- <img src="../../assets/image/goodsImg1.jpg"> -->
              <div class="bigImg"  v-if="showBig" :style="{left:imgRectNow.width+'px',top:0,width:imgRectNow.width,height:imgRectNow.heigh}">
                <img  class="big-box" :style="{left:-transform.left+'px',top:-transform.top+'px',width:imgRectNow.width*2+'px',height:imgRectNow.heigh*2+'px'}" :src="bigUrl"  >
              </div>
              <div >
                  <img class="small-box" @mouseenter="enter" @mousemove="showBigImg" @mouseleave="hiddemBigImg" :src="goodsList[imgIndex]" >
                <p v-if="showRect" class="blackRect" @mouseenter="enter" @mousemove="showBigImg" @mouseleave="hiddemBigImg" :style="{left:rectMsg.left+'px',top:rectMsg.top+'px',background:rectMsg.background,height:rectMsg.height,width:rectMsg.width}"></p>
              </div>
            </div>
            <div class="imgTab">
              <img :src="item" @mouseover="selectCard(index)" :class="index==imgIndex?'border':''" v-for="(item,index) of goodsList" :key="index" >
            </div>
          </div>
        </el-col>
        <el-col :span="12">

        </el-col>
      </el-row>
  </div>
</template>

<script>
import PicZoom from "vue-piczoom"
export default {
    name:"Market",
    components:{
      PicZoom
    },
    data(){
      return{
        goodsList:[require('../../../static/image/goodsImg4.jpg'),require('../../../static/image/goodsImg2.jpg'),require('../../../static/image/goodsImg3.jpg'),require('../../../static/image/goodsImg1.jpg'),require('../../../static/image/goodsImg5.jpg')],
        imgIndex:0,
        bigUrl:'',
        showBig:false,
        showRect:false,
        imgObj:{},
        imgRectNow:{},
        transform:{left:`0px`,top:`0px`},
        backgroundPosition:`0px 0px`,
        rectMsg:{
          width:1.5+'rem',
          height:1.5+'rem',
          left:0,
          top:0,
          background:'rgba(0,0,0,0.5)'
        },
      }
    },
    methods:{
      selectCard(val){
        this.imgIndex=val
      },
      enter(){
        this.showRect=true
        this.showBig=true
      },
      showBigImg(e){
        
        this.imgObj = this.$el.getElementsByClassName('small-box')[0];
        let imgRectNow = this.imgObj.getBoundingClientRect();//小图
        this.imgRectNow=imgRectNow
        let rect=this.$el.getElementsByClassName('blackRect')[0];
        let rectMsg=rect.getBoundingClientRect()//蒙层
        let objX = e.clientX - imgRectNow.left;
        let objY = e.clientY - imgRectNow.top;
        // 计算初始的遮罩左上角的坐标
        let maskX = objX - (rectMsg.width)/2;
        let maskY = objY - (rectMsg.height)/2;

        // 判断是否超出界限,并纠正
        maskY = maskY < 0 ? 0 : maskY; 
        maskX = maskX < 0 ? 0 : maskX; 
        if(e.clientX-imgRectNow.left-(rectMsg.width)/2>=0&&maskX<=imgRectNow.width-rectMsg.width){
          this.rectMsg.left=e.clientX-imgRectNow.left-(rectMsg.width)/2
        }else{
          if(maskX<=0){
            this.rectMsg.left=0
          }else{
            this.rectMsg.left=imgRectNow.width-rectMsg.width
          }
        }

        if(e.clientY-imgRectNow.top-(rectMsg.height)/2>=0&&maskY<=imgRectNow.height-rectMsg.height){
          this.rectMsg.top=e.clientY-imgRectNow.top-(rectMsg.height)/2
        }else{
          if(maskY<=0){
            this.rectMsg.top=0
          }else{
            this.rectMsg.top=imgRectNow.height-rectMsg.height
          }
        }
        let bigImg=this.$el.getElementsByClassName('big-box')[0]
        let bigMsg=bigImg.getBoundingClientRect()
        
        let moveLeft =  this.rectMsg.left;
        let moveTop =  this.rectMsg.top;
        this.transform = {left:moveLeft*2,top:moveTop*2}
        this.backgroundPosition=`${moveLeft} ${moveTop}`
        console.log(bigMsg,this.transform)
        this.bigUrl=this.goodsList[this.imgIndex]
      },
      hiddemBigImg(){
        // this.showBig=false
        this.showRect=false
      }

    },
    mounted(){

    }
}
</script>

<style lang="scss" scoped>
  .market{
    margin:.1rem;
    .imgContainer{
      .img{
        position: relative;
        
        div{
          position: relative;
          img{
            position: relative;
            width: 100%;
            height: auto;
            cursor: move;
          }
          p{
            position: absolute;
            cursor: move;
          }
        }
        .bigImg{
          position: absolute;
          border: 1px solid #fff;
          width: 100%;
          height: 100%;
          overflow: hidden;
          img{
            // position: absolute;
            // width: 1.5rem;
            // height: 1.5rem;
          }
        }
      }
      .imgTab{
        display: flex;
        width: 100%;
        // height: 1rem;
        img{
          display: block;
          box-sizing: border-box;
          flex-wrap:nowrap;
          flex-grow:1;
          width: 20%;
          cursor: pointer;
          height: 20%;
        }
        .border{
          border: 2px solid black;
        }
      }
    }
  }
</style>