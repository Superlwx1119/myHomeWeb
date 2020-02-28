<template>
    <div class="container" :class="$store.state.ws">
        <ul>
            <li>
                <h4>联系方式</h4>
                <div class="msg">
                    <p><span>●</span>手机 : 18684812504</p>
                    <p><span>●</span>Email : 250491376@qq.com</p>
                    <p><span>●</span>网站 : www.lwxandhmm66.com</p>
                </div>
            </li>
            <li>
                <h4>个人信息</h4>
                <div class="msg">
                    <p><span>●</span>刘炜翔 | 男 | 1994</p>
                    <p><span>●</span>本科 | 桂林航天工业学院</p>
                    <p><span>●</span>前端开发 | 2 年工作经验</p>
                </div>
                <div class="msg">
                    <p><span>●</span>期望职位 : Web前端开发</p>
                    <p><span>●</span>期望城市 : 湖南长沙</p>
                    <p style="padding:0"></p>
                </div>
                <div class="msg">
                    <p><span>●</span>Github : <a target="_blank" href="https://github.com/Superlwx1119">https://github.com/Superlwx1119</a></p>
                </div>
            </li>
            <li>
                <h4>开源项目</h4>
                <div class="msg">
                    <p><span>●</span>个人首页 : <a target="_blank" href="http://www.lwxandhmm66.com/#/index">使用Vue+vuex+nodeJs等技术构建的个人网站,用于个人学习记录,个人简历展示等</a></p>
                </div>
                <div class="msg">
                    <p><span>●</span>个人微信小程序 :<a href="javascript:;"  @click="qrCode=!qrCode"> PigPigMan(个人使用)</a></p>
                </div>
            </li>
            <li>
                <h4>技能掌握</h4>
                <div class="msg">
                    <p><span>●</span>前端框架 : Vue/微信小程序</p>
                    <p><span>●</span>前端工具 : Webpack/Scss</p>
                    <p><span>●</span>后端框架：NodeJs/Express</p>
                </div>
                <div class="msg">
                    <p><span>●</span>数据库 : mySQL</p>
                    <p><span>●</span>版本管理工具 : git/SVN</p>
                    <p></p>
                </div>
            </li>
            <li>
                <h4>工作经历</h4>
                <div class="msg">
                    <p><span>●</span>长沙公信诚丰信息技术服务有限公司 (2018年11月~至今)</p>
                </div>
                <div class="resume">
                    <b>开发服务于公司业务的多个后台管理系统</b>
                    <p>主要运用vue+vue-router+vuex+axios等满足业务需求</p>
                    <p>-管理页面搭建、公众号展示</p>
                    <p>-列表数据展示、表单验证、关系图示、接口对接</p>
                    <p>-用户权限管理、全局状态与路由管理、树状数据管理</p>
                </div>
                <div class="msg">
                    <p><span>●</span>湖南跃美动力文化传播有限公司 (2017年8月~2018年10月)</p>
                </div>
                <div class="resume">
                    <b>官网静态页面搭建与维护</b>
                    <p>主要运用JQuery+CSS3+bootstrap</p>
                    <p>-多为外包业务,甲方官网静态页面搭建及交互</p>
                    <p>-样式及兼容处理</p>
                </div>
            </li>
        </ul>
        <el-dialog
        title="二维码"
        :visible.sync="qrCode"
        :show-close="false"
        width="40%">
            <img class="qrCode" src="../../assets/image/qrCode.jpg" >
        </el-dialog>
    </div>
</template>


<script>
export default {
    name:"Index",
    data(){
        return{
            qrCode:false
        }
    },
    methods:{
    }
}
</script>

<style lang="scss" scoped>
    .qrCode{
        width: 100%;
        height: auto;
    }
    .container{
        // height: 100vh;
        ul{
            list-style: none;
            li{
                h4{
                    border-left: 5px solid #e38fa9;
                    text-indent: .2rem;
                    padding: .05rem 0;
                    margin: .2rem 0;
                }
                .resume{
                    margin: 0 .2rem;
                    background: #eee;
                    padding: 0 .2rem;
                    font-size: .14rem;
                    p{
                        text-indent: .1rem;
                        line-height: .36rem; 
                    }
                    b{
                        padding-left: .1rem;
                        font-size: .14rem;
                        text-indent: 1rem;
                    };
                }
                .msg{
                    display: flex;
                    margin: 0 .2rem;
                    background: #eee;
                    font-size: .14rem;
                    // padding: .2rem 0;
                    p{
                        flex: 1;
                        text-indent: 1em;
                        line-height: .36rem;
                    }
                    span{
                        display: inline-block;
                        padding-right: .1rem;
                    }
                    a{
                        color: black;
                        // text-decoration: none;
                    }
                }
            }
        }
    }
    .small{
        li{
            .msg{
                display: flex;
                flex-direction: column !important;
                
            }
            p{
                padding: .1rem .1rem;
            }
        }
    }
</style>


