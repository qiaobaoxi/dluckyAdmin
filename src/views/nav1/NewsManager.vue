<template>
    <section>
        <el-button class="add" @click="addNews">添加新闻</el-button>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="id"
                label="id"
                width="180">
            </el-table-column>
            <el-table-column
                prop="headline"
                label="大标题"
               >
            </el-table-column>
            <el-table-column
                prop="subtitle"
                label="副标题">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="medify(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="添加新闻"
            :visible.sync="dialogVisible"
            width="60%"
            :before-close="handleClose">
            <div class="news">
              <h1>大标题</h1> 
              <el-input v-model="headline" placeholder="请输入内容"></el-input>
            </div>
            <div class="news">
              <h3>副标题</h3> 
              <el-input v-model="subtitle" placeholder="请输入内容"></el-input>
            </div>
            <div class="news">
              <h3>作者</h3> 
              <el-input v-model="author" placeholder="请输入内容"></el-input>
            </div>
            <div class="news">
              <h5>新闻内容</h5> 
              <vue-editor v-model="content"></vue-editor>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </span>
        </el-dialog>    
    </section>    
</template>
<script>
import { VueEditor } from 'vue2-editor'
import { saveNews,getNewsList ,getNewsDes,updateNews} from '../../api/api';
export default {
    data() {
        return {
            tableData: [],
            dialogVisible: false,
            headline:"",
            subtitle:"",
            author:"",
            content:"",
            id:0
        }
    },
    mounted(){
       this.init();
    },
    methods:{
        init(){
            getNewsList().then((res)=>{
               if(res.code){
                  this.tableData=res.result; 
               }
            })
        },
        addNews(){
            this.dialogVisible=true;
        },
        handleClose(){

        },
        medify(obj){
            this.dialogVisible=true;
            getNewsDes({
                id:obj.id
            }).then((res)=>{
                    if(res.code){
                        let data=res.result
                        this.id=  data.id
                        this.headline=  data.headline   
                        this.subtitle=  data.subtitle   
                        this.author=  data.author     
                        this.content=  data.content   
                    }
            })
        },
        save(){
            if(this.headline===""||this.headline===null){
               return this.$message({
                        message: '大标题不能为空',
                        type: 'warning'
                    });
            }
            if(this.subtitle===""||this.subtitle===null){
               return this.$message({
                        message: '副标题不能为空',
                        type: 'warning'
                    });
            } 
            if(this.author===""||this.author===null){
               return this.$message({
                        message: '副标题不能为空',
                        type: 'warning'
                    });
            } 
            if(this.content===""||this.content===null){
               return this.$message({
                        message: '内容不能为空',
                        type: 'warning'
                    });
            }
            if(this.id>0){
                updateNews({
                    id:this.id,
                    headline:this.headline,
                    subtitle:this.subtitle,
                    author:this.author,
                    content:this.content
                }).then((result)=>{
                    if(result.code){
                            this.$message({
                                message: '更新成功',
                                type: 'success'
                            });
                            this.init();
                            this.dialogVisible=false;
                    }else{
                            this.$message({
                                message: '更新失败',
                                type: 'warning'
                            });
                    }
                })
            }else{
                saveNews({
                    headline:this.headline,
                    subtitle:this.subtitle,
                    author:this.author,
                    content:this.content
                }).then((result)=>{
                    if(result.code){
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.init();
                            this.dialogVisible=false;
                    }else{
                            this.$message({
                                message: '添加失败',
                                type: 'warning'
                            });
                    }
                })
            }
        }
    },
    components: {
      VueEditor
    },
}
</script>
<style lang="less" scoped>
  section{
      .add{
          margin: 10px;
      }
  }
</style>
