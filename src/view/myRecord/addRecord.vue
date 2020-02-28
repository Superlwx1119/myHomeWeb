<template>
  <div>
      <el-form>
          <el-form-item label="标题">
              <el-input v-model="title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
              <el-input  v-model="content"></el-input>
          </el-form-item>
          <el-form-item label="代码">
              <el-input type="textarea" v-model="code"></el-input>
          </el-form-item>
          <el-form-item label="配图">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request="beforeAvatarUpload">
                <img v-if="imgUrl" :src="imgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
          </el-form-item>
          <el-form-item label="尾本">
              <el-input v-model="footText"></el-input>
          </el-form-item>
          <el-button @click="addRecord">添加</el-button>
      </el-form>
  </div>
</template>

<script>
import { fileUpload  } from '@/api/api.js'
export default {
    name:'addRecord',
    data(){
        return{
            title:'',
            content:'',
            footText:'',
            imgUrl:'',
            code:''
        }
    },
    methods:{
        addRecord(){
            let data={
                imgUrl:this.imgUrl,
                title:this.title,
                content:this.content,
                foottext:this.footText,
                code:this.code
            }
            fileUpload(data).then(res=>{
                console.log(res)
                if(res.data.status==1){
                    alert('添加成功')
                    this.$router.push('/myRecord')
                }else{
                    alert('添加失败')
                }
            })
        },
        beforeAvatarUpload(file) {
            console.log(file)
            const isJPG = file.file.type === 'image/jpeg';
            const isPNG = file.file.type === 'image/png';
            if (!isJPG&&!isPNG) {
            this.$message.error('上传图片只能是 JPG 或 PNG 格式!');
            return isJPG||isPNG
            }
            
            let formData = new FormData()
            formData.append('image',file.file)
            let reader1 = new FileReader();   //html5读文件
            reader1.readAsDataURL(file.file); //转BASE64
            // this.imgUrl=file.file
            reader1.onload =  ( event ) =>{ 
                var txt = event.target.result;
                this.imgUrl=txt
            }
            
            // let type=file.data.type
            // let image=file.file
            // let formData=new FormData()
        }
    }
}
</script>

<style lang='scss' scpoed>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: .28rem;
        color: #8c939d;
        width: 1.78rem;
        height: 1.78rem;
        line-height: 1.78rem;
        text-align: center;
    }
    .avatar {
        width: 1.78rem;
        height: 1.78rem;
        display: block;
    }
</style>