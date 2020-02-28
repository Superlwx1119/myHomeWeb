<template>
  <div>
      <p>账号<el-input v-model="user"></el-input></p>
      <p>密码<el-input type="password" v-model="psd"></el-input></p>
      <el-button @click="mylogin">登录</el-button>
  </div>
</template>

<script>
import { getUser } from '@/api/api.js'
export default {
    name:'Mylogin',
    data(){
      return{
        user:'',
        psd:''
      }
    },
    methods:{
      mylogin(){
        let data={
          user:this.user,
          psd:this.psd
        }
        getUser(data).then(res=>{//自己添加笔记用
          if(res.data.status==1){
            this.$store.dispatch('getMySelf',true)
            this.$router.push('/addRecord')
          }else{
            this.$message.error('别乱试咯!')
          }
        })
      }
    }
}
</script>

<style>

</style>