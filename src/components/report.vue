<template>
    <div>
      <div class="">

      </div>
      <div>
        <div class="admin-right-content" style="margin-left: 10px">
          <div class="container-fluid">
            <div class="tool-heard">
              <i class="fa fa-bullhorn"></i>
              <span>舆情日报</span>
             <!-- <el-button type="danger"  @click="toImage()" style="float: right">图片</el-button>-->
            </div>
            <div class="edit-content">
              <div style="float: left;width: 400px;margin-right: 50px;">
                <el-form ref="form" :model="form" label-width="80px">


                  <el-form-item label="舆情类型" disabled>
                    <el-select v-model="form.type" placeholder="请选择"  @change="typeChange">
                      <el-option
                        v-for="item in type_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="国家">
                    <el-select v-model="form.country" @change="countryChange" placeholder="请选择">
                      <el-option
                        v-for="item in country_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="舆情作者">
                    <el-input v-model="form.author" style="width: 220px"></el-input>
                  </el-form-item>
                  <el-form-item label="水印">
                    <el-switch
                      v-model="waterMark"
                      active-text="水印"
                      inactive-text="无水印">
                    </el-switch>
                  </el-form-item>
                  <el-form-item label="舆情日期">
                    <el-date-picker
                      v-model="form.date"
                      v-show="form.type == 'day'"
                      type="date"
                      @change="dateChange"
                      placeholder="选择日期">
                    </el-date-picker>
                    <el-date-picker
                      v-model="form.date"
                      type="week"
                      @change="dateChange"
                      v-show="form.type == 'week'"
                      format="yyyy 第 WW 周"
                      placeholder="选择周">
                    </el-date-picker>
                    <el-date-picker
                      v-model="form.date"
                      type="month"
                      v-show="form.type == 'month'"
                      @change="dateChange"
                      placeholder="选择月">
                    </el-date-picker>
                  </el-form-item>
                 <!-- <el-form-item label="舆情标题">
                    <el-input v-model="form.name" v-bind:disabled="true" style="width: 250px"></el-input>
                  </el-form-item>-->
                  <el-form-item
                    v-for="(list, index) in form.list"
                    :label="'新闻' + (index+1)"
                    :key="list.key"
                    :prop="'list.' + index + '.value'"
                  >
                    <div>

                      <el-select v-model="list.type" style="width: 130px">
                        <el-option v-for="item in newsType"  :label="item.name" :key="item.name" :value="item.name">

                        </el-option>
                      </el-select>
                      <el-button @click.prevent="additem(index)">添加</el-button>
                      <el-button @click.prevent="remove(index)">删除</el-button>
                    </div>
                    <div style="padding: 20px 0">

                      <el-input v-model="list.title"  style="width: 300px"   placeholder="标题"></el-input>
                    </div>
                    <div>

                      <el-input  type="textarea"
                                 :rows="3"
                                 v-model="list.content" style="width: 300px" placeholder="内容"></el-input>
                    </div>
                    <div style="padding: 20px 0">

                      <el-input v-model="list.link" style="width: 300px" placeholder="来源"></el-input>
                    </div>
                    <div style="">
                      <span>评论类型</span>
                    <el-select v-model="list.commentType">
                      <el-option v-for="item in commentType" :label="item.name" :key="item.name" :value="item.name"></el-option>
                    </el-select>
                    </div>
                    <div style="padding: 20px 0">

                      <el-input  type="textarea"
                                 :rows="2"
                                 v-model="list.comment" style="width: 300px" :placeholder="list.commentType"></el-input>
                    </div>


                  </el-form-item>
                </el-form>
                <div class="bottom-btn">
                  <el-button type="danger"  @click="addList">添加新闻</el-button>
                  <el-button type="danger"  @click="add()">生成报告</el-button>


                </div>
              </div>
              <div style="float: left;width: 800px;border-left: 1px #ccc solid" class="imageWrapper" ref="imageWrapper">

               <div class="reportHeard" >
                  <img :src="country_image" width="100%">
                  <div class="reportDate">{{reportDate}}</div>

               </div>
                <div style="width: 100%; padding: 0 0 50px 0">
                  <div class="waterfall-container">
                    <div  class="watermark" v-if="waterMark">

                    </div>
                    <div class="waterfall-item" v-for="i in reportNewsType">
                      <div style="overflow: auto; background:#FEFBF2;">
                        <div class="all-content" style="position: relative;padding-right: 10px">
                          <div class="right_b" style="position: absolute;width: 10px;height:100%;right: 0">
                              <div class="right_b1">

                              </div>
                            <div class="right_b2">

                            </div>
                          </div>
                          <div class="item-news" v-for="item in i.news">
                            <div class="title" v-if="item.title">
                              <div style="color: red;padding: 10px 10px;">
                                <span style="display: inline-block;height: 10px;width: 10px;background:red;border-radius: 50%;position: relative;z-index: 12;"></span>
                                {{item.title}}
                                <span class="list-link" style="color: red;font-style: oblique;position: relative;z-index: 12;" v-if="item.content==''">({{item.link}})</span>
                              </div>
                            </div>
                            <div class="list-content" style="color: #514F4D;padding: 10px 10px;padding-top: 0" v-if="item.content">

                              <span style="display: inline-block;height: 10px;width: 10px;background:#6B6A69;border-radius: 50%"></span>
                              <span style="position: relative;z-index: 12;text-align: left">{{item.content}}</span>

                              <span class="list-link" style="color: #6B6A69;font-style: oblique;position: relative;z-index: 12;">({{item.link}})</span>
                            </div>

                            <div class="list-comment" v-if="item.comment" style="padding: 20px 10px;margin: 5px;background: #0D41A7;border-radius: 10px;min-height: 40px;position: relative">
                              <div class="jp-arrow" style="">

                              </div>
                              <div   :class="{'jp-img':item.commentType=='简评','ysyd-img':item.commentType=='延伸阅读'}">

                              </div>
                              <div style="position: relative;z-index: 12;">{{item.comment}}</div>
                            </div>
                          </div>

                          <div style="position: relative;overflow: hidden;">
                            <img :src="i.img"  width="100%" >
                            <img :src="bottom_img"    width="100%;" style="display: block;">
                          </div>

                        </div>
                      </div>


                    </div>

                  </div>
                  <div style="width: 350px;float: right;margin-top: 20px">
                    <span style="display: inline-block;background: red;padding: 0 10px;border-radius: 5px;color:#fff">撰写</span>
                    <span style="display: inline-block;background: #0D41A7;padding:0 10px;border-radius: 5px;color:#fff">{{this.form.author}}</span>
                    <div style="margin-top: 10px">
                      <span style="color:#0D41A7;">文章评论仅代表作者个人观点，不代表本刊立场</span>
                    </div>
                  </div>
                </div>

              </div>



              <div style="padding-left: 450px">
                <img v-bind:src="dataURL"  style="width: 800px">
              </div>

            </div>


          </div>
        </div>
      </div>

    </div>
</template>

<script>

  import html2canvas from 'html2canvas'

  export default({
    name:"report",
    data(){
      return {
        bottom_img:require('../assets/image/report/bottom_b.png'),
        editor:'',
        waterMark:true,
        reportDate:'',
        dataURL:'',
        hasIMG:false,
        Image:'',
        loading:'',
        relationName:'中越',
        reportNewsType:[],
        newsType:[
          {name:'经济',img:require('../assets/image/report/经济.png')},
          {name:'政治',img:require('../assets/image/report/政治.png')},
          {name:'社会',img:require('../assets/image/report/社会.png')},
          {name:'焦点',img:require('../assets/image/report/焦点.png')},
          {name:'关系',img:require('../assets/image/report/关系.png')}
        ],
        commentType:[
          {name:'简评',img:require('../assets/image/report/简评.png')},
          {name:'延伸阅读',img:require('../assets/image/report/延伸阅读.png')}
        ],
        cropper:'',
        form:{
          type:'day',
          name:'',
          date:'',
          author:'苑君',
          list:[
            {type:'政治',title:'',content:'',comment:'',link:'',commentType:'简评'}

          ],
          country:'VNM'
        },
        type_options:[
          {label:'日报',value:'day'}
        ],
        country_options:[
          {label:'越南',value:'VNM',name:'苑君'},
          {label:'老挝',value:'LAO',name:'杨卓娟'},
          {label:'柬埔寨',value:'KHM',name:'陈园园'},
          {label:'缅甸',value:'MMR',name:'陈艳阳'},
          {label:'泰国',value:'THA',name:'蓝襄云'},
          {label:'马来西亚',value:'MYS',name:'李希瑞'},
          {label:'新加坡',value:'SGP',name:'余俊杰'},
          {label:'印度尼西亚',value:'IDN',name:'蓝心辰'},
          {label:'菲律宾',value:'PHL',name:'范新婧'},
          {label:'文莱',value:'BRN',name:'李阳阳'},
          {label:'东盟',value:'ASEAN',name:'林凤玲'}
        ]
      }
    },
    created(){
      this.form.date = new Date();
      this.reportDate = new Date().Format('YYYY年MM月DD日');
    },
    mounted(){
      var _this = this;


    },
    computed: {
      country_image:function () {
        if(this.form.country == ''){
          return '';
        }else{
          return  require("../assets/image/report/"+this.form.country+".jpg")
        }

      }
    },
    methods:{
      convert2canvas() {

        var cntElem = $('#j-sec-end')[0];


      },
      toImage() {
        window.scrollTo(0,0);
          var shareContent = this.$refs.imageWrapper;//需要截图的包裹的（原生的）DOM 对象
          var width = shareContent.offsetWidth; //获取dom 宽度
          var height = shareContent.offsetHeight; //获取dom 高度
          var canvas = document.createElement("canvas"); //创建一个canvas节点
          var scale = 1; //定义任意放大倍数 支持小数
          canvas.width = width * scale; //定义canvas 宽度 * 缩放
          canvas.height = height * scale; //定义canvas高度 *缩放
          canvas.style.width = width + "px";
          canvas.style.height = height + "px";
          canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
          var opts = {
            scale: scale, // 添加的scale 参数
            canvas: canvas, //自定义 canvas
            // logging: true, //日志开关，便于查看html2canvas的内部执行流程
            width: width, //dom 原始宽度
            height: height//,
            //useCORS: true // 【重要】开启跨域配置
          }
        html2canvas(this.$refs.imageWrapper,opts).then((canvas) => {
          var context = canvas.getContext('2d');
          // 【重要】关闭抗锯齿
          context.mozImageSmoothingEnabled = false;
          context.webkitImageSmoothingEnabled = false;
          context.msImageSmoothingEnabled = false;
          context.imageSmoothingEnabled = false;

          // 【重要】默认转化的格式为png,也可设置为其他格式
         // var img = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height);
          let dataURL = canvas.toDataURL("image/png");
          this.dataURL = dataURL;
          this.loading.close()
        });
      },
      additem(index){
        var obj = {
          type:'政治',
          title:'',
          content:'',
          link:'',
          comment:'',
          commentType:'简评'
        };
        this.form.list.splice(index+1,0,obj)
      },
      addList(){
        this.form.list.push({
          type:'政治',
          title:'',
          content:'',
          link:'',
          comment:'',
          commentType:'简评'
        })
      },
      remove(index){
        this.form.list.splice(index,1);
      },
      typeChange(){
        this.titleChange();
      },
      countryChange(){
        var that = this;
        this.country_options.map( (item) =>{
           if(item.value == that.form.country){
             this.form.author = item.name;
             this.relationName = '中'+ item.label.substr(0, 1);
             if(item.label =='东盟'){
               this.relationName = '东盟';
             }
           }

        });

        this.titleChange();
      },
      dateChange(){
        this.titleChange();
        this.reportDate = this.form.date.Format('YYYY年MM月DD日');

      },
      titleChange(){
        var title = "";
        var country = this.form.country;
        this.country_options.map((item)=>{
          if(item.value == country){
            country = item.label;
          }
        });
        var type = this.form.type;
        this.type_options.map((item) =>{
          if(item.value == type){
            type = item.label;
          }
        });

        var time = '';
        switch (type) {
          case '日报':
            time = this.form.date.Format('YYYY-MM-DD');
            break;
          case '周报':
            time = this.form.date.Format('WW  WS - WE');

            break;
          case '月报':
            time = this.form.date.Format('YYYY-MM');
            break;
          default:
            break;
        }

        this.form.name = country + '舆情'+  type +"（" + time +"）";




      },
       ToDBC(txtstring) {
    var tmp = "";
    for(var i=0;i<txtstring.length;i++){

       if(txtstring.charCodeAt(i) == "34" ){
         tmp=tmp+String.fromCharCode(txtstring.charCodeAt(i)+65248);
       }
     /* if(txtstring.charCodeAt(i)==32){
        tmp= tmp+ String.fromCharCode(12288);
      }else if(txtstring.charCodeAt(i)<127){
        tmp=tmp+String.fromCharCode(txtstring.charCodeAt(i)+65248);
      }*/else{
        tmp=tmp+txtstring[i]
      }

    }
    return tmp;
  },

      add(){
        this.form.author;
        var list = this.form.list;
        var newList = {};
        var  obj={};
        var that = this;
        list.map(function(item){
          if(typeof obj[item.type] === 'undefined'){
           var match = item.content.match(/[\u0000-\u00ff]/g);


            newList[item.type] = [
                {
                  title:item.title,
                  content:that.ToDBC(item.content),
                  link:item.link,
                  comment:item.comment,
                  commentType:item.commentType
                }
              ]
            obj[item.type] = 1
          }else{
            newList[item.type].push({
              title:item.title,
              content:item.content,
              link:item.link,
              comment:item.comment,
              commentType:item.commentType
            })
          }
        });

        this.reportNewsType = [] ;
        var that = this;

        for(var i in newList){
          if(i == '关系'){
            that.reportNewsType.push({
              name:i,img:require('../assets/image/report/c_'+that.form.country+'.png'),news:newList[i]
            })
          }else{
            that.reportNewsType.push({
              name:i,img:require('../assets/image/report/'+i+'.png'),news:newList[i]
            })
          }

        }
        /*this.loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)'
        });*/
        setTimeout(()=>{
/*          var length = $('.waterfall-item').length;
          for(var i=0;i<length;i++){
            $('.waterfall-item').eq(i).height()
          }*/

          this.toImage()
        },2000)




      }
    }

  })
</script>

<style scoped>
  .right_b{

    right: 0;
    background: #ffffff;
  }
  .right_b1{
    background: url("../assets/image/report/right_b.png") repeat-y;
    height: calc( 100% - 16px);

  }
  .right_b2{
    background: url("../assets/image/report/jiao_b.png") no-repeat;
    height: 16px;

  }
  .watermark{
    background: url("../assets/image/report/watermark.png");
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    background-size: 100%;
  }
  .jp-arrow{
    position: absolute;left: 20px;top: -10px;
    height: 20px;
    width: 30px;
    background: url("../assets/image/report/arrow.png");
    background-size: 100% 100%;
  }
  .jp-img{
    position: absolute;
    top: -12px;
    right: -2px;
    height: 30px;
    width: 60px;
    background: url("../assets/image/report/简评.png");
    background-size: 100% 100%;
  }
  .ysyd-img{
    position: absolute;
    top: -12px;
    right: -2px;
    height: 30px;
    width: 110px;
    background: url("../assets/image/report/延伸阅读.png");
    background-size: 100% 100%;
  }
  .reportHeard{
    background-size: 100% 100%;
    width: 100%;
    position: relative;
  }
  .reportHeard .PHL{
    background-image: url("../assets/image/report/PHL.png");
  }
  .reportHeard .PHL{
    background-image: url("../assets/image/report/PHL.png");
  }
  .reportDate{
    position: absolute;
    right: 40px;
    top: 30px;
    color: #ffffff;
    font-size: 18px;
  }

  .waterfall-container {
    /*分几列*/
    column-count: 2;
    width: 740px;
    margin-left: 40px;
    -moz-column-count: 2;
    -webkit-column-count: 2;
    position: relative;

  }

  .waterfall-item {
    /*不留白，不知道什么意思可以取消这个样式试试*/
    break-inside: avoid;
    page-break-inside: avoid;
    color:#fff;
    margin-bottom:20px;
    overflow: auto;

  }

</style>
