<template>
  <div class="vertical-center">
      <h4>聊天室 <span style="font-weight: normal;float:right">{{personNum}}人在线</span></h4>
        <div class="container">
          <div class="recordList">
              <ul>
                <li v-for="(item,index) of recordList" :key="index">
                    <div class="chatContainer" :class="item.mySelf?'right':'left'">
                        <div class="people" :class="item.mySelf?'right':'left'" >
                            <p class="name" :style="item.mySelf?'right:.1rem':'left:0'">{{myUser.newName==item.newName?myUser.newName:item.newName}}</p>
                            <p class="firstName" :style="item.mySelf?'right:0 !important':'left:0'">{{myUser.newName==item.newName?(myUser.newName).substring(0,1):(item.newName).substring(0,1)}}</p>
                        </div>
                        <div class="chatContent" :class="item.mySelf?'right':'left'" :style="item.mySelf?'margin-right:.5rem;background:#98e746 !important':''">
                            {{item.text?item.text:item.newName+'进入聊天室.'}}
                        </div>
                    </div>
                </li>
            </ul>
          </div>
          <div class="dealType">
              <el-input size="small" type="textarea" v-model="message.text" placeholder="请输入聊天内容"></el-input>
              <el-button size="small" type="primary" @click="websocketsend(message)">发送</el-button>
          </div>
        </div>
        <!-- <transition name="fade"> -->
            <el-dialog title="设置用户名" width="30%" :show-close="false" :visible.sync="updUserid" :close-on-click-modal="false">
                <el-input v-model="myUser.newName" size="small"></el-input>
                <el-button size="small" @click="websocketsend(myUser)">确定</el-button>
            </el-dialog>
        <!-- </transition> -->
    </div>
</template>

<script>
export default {
    name:'ChatRoom',
    data(){
        return{
            myUser:{
                changeUserId:true,
                newName:''
            },
            updUserid:false,
            websock: null,
            message:{
                newName:'',
                text:''
            },
            recordList:[],
            personNum:0
        }
    },
    destroyed() {
　　　　//页面销毁时关闭长连接
　　　　this.websocketclose();
　　},
    methods:{
        initWebSocket(){ //初始化weosocket 
　　　　　　　
                let  wsuri;//ws地址
                if(process.env.NODE_ENV=='development'){
                wsuri="ws://localhost:8090"
                }else{
                wsuri='ws://148.70.94.32:8090' 
                }
　　　　　　　　this.websock = new WebSocket(wsuri); 
　　　　　　　　this.websock.onopen = this.websocketonopen;

　　　　　　　　this.websock.onerror = this.websocketonerror;

　　　　　　　　this.websock.onmessage = this.websocketonmessage; 
　　　　　　　　this.websock.onclose = this.websocketclose;
　　　　   }, 

　　　　　　websocketonopen(e) {
　　　　　　　　console.log("WebSocket连接成功",e);
                // this.message.id=e
　　　　　　},
　　　　　　websocketonerror(e) { //错误
 　　　　　　 console.log("WebSocket连接发生错误");
　　　　　　},
　　　　　　websocketonmessage(e){ //数据接收 
　　　　　　　　const redata = JSON.parse(e.data);
                console.log(redata)
                this.personNum=redata.person
                // if(redata.message=='')this.message.id=redata.id
　　　　　　　　　//注意：长连接我们是后台直接1秒推送一条数据， 
          //但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
      //这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
                if(redata.message.newName==this.myUser.newName){redata.message.mySelf=true}
                // if(redata.message.changeUserId)this.message.userName=redata.message.newName
                this.recordList.push(redata.message)
                this.$nextTick(() => {
                let el = document.querySelector('.recordList');
                let offsetHeight = el.offsetHeight;
                el.scrollTop=el.scrollHeight
                });
// 　　　　　　　　console.log(this.recordList); 
　　　　　　}, 
            websocketsend(agentData){//数据发送 
            if(agentData.changeUserId){
                if(agentData.newName==''){
                   this.$message.error('内容不能为空哦!') 
                   return
                }
                this.myUser.newName=agentData.newName
                this.websock.send(JSON.stringify(agentData));
                this.updUserid=false
            }else{
                if(this.message.text==''){
                this.$message.error('发送内容不能为空!')
                }else{
                agentData.newName=this.myUser.newName
                this.websock.send(JSON.stringify(agentData)); 
                this.message.text=''
                }
            }
                
            }, 

　　　　　 websocketclose(e){ //关闭 
　　　　　　　　console.log("connection closed (" + e.code + ")"); 
　　　　　},
    },
    mounted(){
        this.updUserid=true
        this.initWebSocket()
        window.addEventListener('beforeunload', e => {
            this.websocketclose();
        });
    }
}
</script>

<style lang="scss" scoped>
    .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    }
    .left{
        float:left;
        clear: both;
    }
    .right{
        float:right;
        clear: both;
    }
    .vertical-center{
        margin: .2rem;
        
        border: 1px solid #000;
        .container{
            .recordList{
                border: 1px solid #c5c5c5;
                margin: 0 .1rem .1rem .1rem;
                border-radius: 5px;
                height: 2.4rem;
                overflow-y: auto;
                ul{
                    list-style: none;
                    padding:0 .1rem;
                    li{
                        
                        .chatContainer{
                            margin-left: .1rem;
                            display:flex;
                            position: relative;
                            .people{
                                
                            }
                            .name{
                                font-size: .12rem;
                                color: #adadad;
                                // width: .6rem;
                                position: absolute;
                            }
                            .firstName{
                                position: absolute;
                                top: .12rem;
                                // left: 0;
                                width: .4rem;
                                height: .4rem;
                                text-align: center;
                                border-radius:50%;
                                line-height: .4rem;
                                color: white;
                                font-size: .2rem;
                                background: #ff6400;
                            }
                        }
                        .chatContent{
                            margin-top: .12rem;
                            margin-left: .5rem;
                            background: #e5e5e5;
                            border-radius: 5px;
                            box-shadow: 2px 2px rgba(0, 0, 0, .5);
                            font-size: .14rem;
                            padding: .1rem;
                            max-width: 3rem;
                        }
                    }
                }
                
            }
            .dealType{
                margin: 0 .1rem .1rem .1rem;
            }
        }
        h4{
            margin: .1rem;

        }
        
        
    }
</style>