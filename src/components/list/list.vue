<template>

  <!-- 头部 -->
  <div id="m-top">
     <div class="ui-toggle">
      <a v-on:click="goWebPage('//web.yy.com/group_act/vue-multipage/rule.html')" class="ruleBtn"></a>
      <a v-on:click="goWebPage('//web.yy.com/group_act/vue-multipage/news.html')" class="newsBtn "></a>
      <a v-on:click="goWebPage('//web.yy.com/group_act/vue-multipage/list.html')" class="listBtn active"></a>
     </div>
  </div>


   <!-- 实时榜单 -->
   <div id="m-timelist">
      <h3 class="title"></h3>
      <div class="bigWrap">
          <div class="anchorList">
            <ul>
                <li v-for="item in anchorList.topchid">
                    <table cellspacing="0" cellpadding="0" class="tab" data-uid="{{item.uid}}" data-topchid="{{item.topchid}}" data-subchid="{{item.subchid}}" data-islive="{{item.islive}}" v-on:click="goLiveRoom(item.topchid,item.subchid,item.uid,item.islive)">
                        <tr>
                             <td>
                                 <i class="rank{{$index+1}}" v-if="$index<3"></i>
                                 <i class="rankNums" v-else>{{$index+1}}</i>
                                 <div class="imgWrap">
                                          <img class="headimg" v-bind:src="item.headurl | initValue anchorList.defaultImg" onerror="this.src='{{anchorList.defaultImg}}'" />
                                          <i class="duanwei dw{{item.hlphase}}"></i>                   
                                 </div>
                                 <dl class="showNumAndTxt">
                                     <dd class="smallTitle">主播名称</dd>
                                     <dd class="txt"><span>{{item.nick | initValue '虚位以待' | decode}}</span><i class="liveBtn" v-if="item.islive == 1"></i></dd>
                                     <dd class="smallTitle">闪耀值</dd>
                                     <dd class="nums">{{item.ticket | milliFormat}}</dd>
                                 </dl>
                             </td>                            
                        </tr>
                    </table>
                </li>                                                                               
            </ul>
            <div class="mask" v-if="isfltime == 1">
                    <div class="showLayout">
                         <!-- <span class="showLayouttimer">{{leftfltime | countdownTimer}}</span></strong> -->
                         <span class="showLayouttimer">{{leftMinute}} : {{leftSecond}}</span></strong>
                    </div>
                <a href="javascript:;" class="refreshBtn" v-on:click = "refreshBtn"></a>
            </div>
          </div>
          <div class="friendList">
              <ul>
                  <li v-for="item in friendList.topchid">
                    <table cellspacing="0" cellpadding="0" class="tab">
                        <tr>
                             <td>
                                 <dl class="showNumAndTxt">
                                     <dd class="smallTitle">壕友名称</dd>
                                     <dd class="txt"><span>{{item.nick | initValue '虚位以待' | decode}}</span></dd>
                                     <dd class="smallTitle">影响力</dd>
                                     <dd class="nums">{{item.power | milliFormat}}</dd>
                                 </dl>
                             </td>                            
                        </tr>
                    </table>                    
                  </li>                                                                              
              </ul>
          </div>
      </div>
   </div>
   
   <!-- 头条天梯榜 -->
   <div class="yellowBlank"></div>
   <div id="m-headlist">
   	  <h3 class="title"></h3>
   	  <ul class="wrap"> 
         <li  v-for="item in starList.topchid">
           <table cellspacing="0" cellpadding="0" class="tab">
                <tr data-topchid="{{item.topchid}}" data-subchid="{{item.subchid}}" data-uid="{{item.uid}}" data-islive="{{item.islive}}" v-on:click="goLiveRoom(item.topchid,item.subchid,item.uid,item.islive)">
                     <td>
                         <i class="rank{{$index+1}}" v-if="$index<3"></i>
                         <i class="rankNums" v-else>{{$index+1}}</i>
                         <div class="imgWrap">
                                  <img class="headimg" v-bind:src="item.headurl | initValue starList.defaultImg"  onerror="this.src='{{starList.defaultImg}}'"  />
                                  <i class="duanwei dw{{item.hlphase}}"></i>                   
                         </div>
                         <ul class="showNumAndTxt">
                             <li class="txt">{{ item.nick | initValue '虚位以待' | decode }}</li>
                             <li class="nums">星星数：<span>{{item.ticket | milliFormat}}<span></li>
                         </ul>
                         <i class="personBtn" v-if="item.islive == 1"></i>
                     </td>                    
                </tr>             
           </table>           
         </li>
         <!--     
         <li>
           <table cellspacing="0" cellpadding="0" class="tab">
                <tr>
                     <td>
                         <i class="rankNums">10</i>
                         <div class="imgWrap">
                                  <img class="headimg" src="http://act.m.yystatic.com/act/images/default_grey_yy.png" />
                                  <i class="duanwei dw1"></i>                   
                         </div>
                         <ul class="showNumAndTxt">
                             <li class="txt">浅蓝浅蓝浅蓝浅蓝浅蓝浅蓝</li>
                             <li class="nums">星星数：<span>88,000,000<span></li>
                         </ul>
                         <i class="personBtn"></i>
                     </td>                    
                </tr>             
           </table>           
         </li> -->                                                                 
   	  </ul>
   </div>

   <!-- 活动间隙结束 -->
   <div id="overMask" v-if="isMiddleOver == 1">
        <div class="showContent">本周活动尚未开始。<a href="//web.yy.com/group_act/2017headline1/news.html" class="btn">去看主播们的战绩吧!</a></div>       
   </div>

   <!-- 活动全部结束 -->	
   <div id="overMask" v-if="isOver == 1">
        <div class="showContent">2017第一季头条活动已经结束，敬请期待明年。<a href="//web.yy.com/group_act/2017headline1/news.html" class="btn">去看主播们的战绩吧!</a></div>       
   </div> 
</template>

<style scoped lang="scss">
  @import './list.scss';
</style>

<script>
  import Vue from 'vue';
  //import vueJsonp from 'vue-jsonp';
  import store from '../../vuex/store.js';
  import _U from '../../assets/js/lib/underscore/underscore.js';
  import FastClick from 'fastclick';
  import '../../assets/js/lib/jquery/jquery-1.8.0.min';
  import '../../assets/js/lib/YYMobileBridge/YYMobileBridge';
  import '../../assets/js/lib/yyBridge/WAJavascriptBridge';
  import '../../assets/js/lib/yymobile/yymobile_api_v1.2.12';  

  //use
  //Vue.use(vueJsonp);


  //filter
  Vue.filter('initValue', function (value, input) {
        return value ? value : input;
  })

  Vue.filter('decode',function(value){
      var value = _html(value);
      return String(value).replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec);
      });

      function _html(str){
          var tep = document.createElement('div');
          tep.innerHTML = str;
          str = tep.innerText || tep.textContent;
          tep = null;
          return str;
      }
  })
  
  Vue.filter('milliFormat',function(num){
        if(!num){
              return "0";
        }
        return num.toString().replace(/(?=(?!^)(\d{3})+$)/g, ',');
  })

  Vue.filter('countdownTimer',function(timers){
            var leftMinute = Math.floor(timers / 60);
            var leftSecond = Math.floor((timers - 60 * leftMinute));
            
            function padLeft(str, length) {
                if (String(str).length >= length)
                  return str;
                else
                  return "0" + str;
              }

            return padLeft(leftMinute,2)+':'+padLeft(leftSecond,2);  
  })

  //获取分类数据
  function getSortData(data, opts) {
        var arr = [];
        var obj = {}
        var opts = $.extend({
            key: '',
            val: '',
            key1: '',
            val1: ''
        }, opts || {});

        obj = _U.pick(data, function(value) {
            if (opts.key1 && opts.val1) {
                return (value[opts.key] * 1) == (opts.val * 1) && (value[opts.key1] * 1) == (opts.val1 * 1);
            }
            return (value[opts.key] * 1) == (opts.val * 1);
        });

        _U.each(obj, function(value) {
            arr.push(value)
        })

        return arr;
  }

  var __TIMER = null; //定时器

  //export
  export default {
        data(){
           return {
             indexActive:'3',
             isMiddleOver:0,
             isOver:0,
             starList:{  //头条天梯
                topchid:[],
                defaultImg:'//act.m.yystatic.com/act/images/default_grey_yy.png'
              },
              anchorList:{ //主播
                topchid:[],
                defaultImg:'//act.m.yystatic.com/act/images/default_grey_yy.png'
              },
              friendList:{   //壕友
                topchid:[]   
              },
              isfltime:'0', //是否整蛊
              leftfltime:'0', //整蛊剩余时间
              leftMinute:'00', //剩余分钟
              leftSecond:'00'  //剩余秒
           }
        },
        store:store,
        vuex:{
           actions: {
                update: function({dispatch}, value){
                        dispatch('UPDATE',value)
                }
           }
        },
        methods:{
            goWebPage:function(url){
                 window.location.href = url;
            },          
            gotoPage:function(url){
               if(url.indexOf("http") == -1 || url.indexOf("http") > 0){
                    url = window.location.protocol + url;
                }               
                //新版YY
                if(isUserNewAPI){
                  var encodeUrl = encodeURIComponent(encodeURIComponent(url));
                  window.YYApiCore.invokeClientMethod('ui', 'goto', {'uri' : 'yymobile://Web/Features/5/Url/'+encodeUrl});    
                //旧版YY  
                }else{
                  window.location.href = "objc://clientLoadUrl/" + url;
                }
            },          
            goLiveRoom:function(topchid,subchid,uid,islive){
                   var topchid = topchid || 0;
                   var subchid = subchid || 0;
                   var uid = uid || 0;
                   var islive = islive || 0;
                   this.gotoLivingRoom(islive, topchid, subchid, uid);
            },
            gotoLivingRoom:function(live,topCid,subCid,uid){
                      if(parseInt(live) == 1){
                             if(parseInt(topCid)!=0 && parseInt(subCid)!=0){
                                  YYMobile.joinLive(topCid,subCid);
                             }else if(uid && parseInt(uid) != 0){
                                  YYMobile.gotoPersonalCenter(uid);
                             }
                      }else{
                        if(uid && parseInt(uid) != 0){
                           YYMobile.gotoPersonalCenter(uid);
                        }
                      }                  
            },
            //头条天梯
            startRender:function(){
                    let she = this;
                    $.ajax({  
                        url:"//act1.m.yystatic.com/act/file/headline2017/star.txt",  
                        dataType:'jsonp',    
                        jsonpCallback:'star',
                        cache:true,  
                        success:function(response) {  
                           var data = response.listInfo;
                           var maxLen = 30;
                           she.starList.topchid = data.topchid;

                          //排序
                          she.starList.topchid = _U.sortBy(she.starList.topchid,function(item){
                               return item.rank * 1;
                          });

                          //容错
                          if(she.starList.topchid.length < maxLen){
                                 let len = she.starList.topchid.length;
                                 for(let i=0;i<maxLen-len;++i){
                                     she.starList.topchid.push({});  
                                 }
                          }    
                        },
                        error:function(err){
                             console.log('头条天梯请求出错',err)
                        }  
                    });                               
            },
            padLeft: function(str, length) {
                var length = length || 2;
                if (String(str).length >= length)
                  return str;
                else
                  return "0" + str;
              },
            //榜单倒计时
            countdownTimer: function(times){
                  var times = times;
                  var she = this;
                  __TIMER && clearInterval(__TIMER);
                  __TIMER = setInterval(function(){
                      --times; 
                      if(times < 0){
                           times = 0;
                           clearInterval(__TIMER);
                           window.location.reload();
                      }
                      she.leftMinute = she.padLeft(Math.floor(times / 60));
                      she.leftSecond = she.padLeft(Math.floor((times - 60 * she.leftMinute)));                    
                  },1000)                             
            },
            //主播榜单         
            anchorRender: function(){
                      let she = this;
                      $.ajax({  
                          url:"//act1.m.yystatic.com/act/file/headline2017/headlineHour.txt",  
                          dataType:'jsonp',    
                          jsonpCallback:'headlineHour',
                          cache:true,  
                          success:function(response) {  
                              var data = response.listInfo;
                              var maxLen = 10;
                              she.anchorList.topchid = data.topchid;

                              she.isfltime = data.extendinfo.isfltime;  //整蛊开关
                              she.leftfltime = data.extendinfo.leftfltime; //整蛊返回时间

                              she.leftMinute = she.padLeft(Math.floor(she.leftfltime / 60));
                              she.leftSecond = she.padLeft(Math.floor((she.leftfltime - 60 * she.leftMinute)));

                              //判断是整蛊
                              if(she.leftfltime > 0 && she.leftfltime>0){
                                    she.countdownTimer(she.leftfltime);
                              }

                              //判断活动是否结束
                              let _curRound = data.extendinfo.curround;
                              if(_curRound==49||_curRound ==50||_curRound==99||_curRound==100||_curRound==149||_curRound==150){
                                 she.isMiddleOver = 1;
                              }

                              if(_curRound==199||_curRound==200){
                                  she.isOver = 1;   
                              }


                              //分类
                              she.anchorList.topchid = getSortData(she.anchorList.topchid,{
                                  key: 'rday',
                                  val: data.extendinfo.curday*1,
                                  key1: 'round',
                                  val1: data.extendinfo.curround*1                           
                              })              

                              //排序
                              she.anchorList.topchid = _U.sortBy(she.anchorList.topchid,function(item){
                                   return item.rank * 1;
                              });

                              //容错
                              if(she.anchorList.topchid.length < maxLen){
                                     let len = she.anchorList.topchid.length;
                                     for(let i=0;i<maxLen-len;++i){
                                         she.anchorList.topchid.push({});  
                                     }
                              }
                              if(she.anchorList.topchid.length > maxLen){
                                      she.anchorList.topchid = she.anchorList.topchid.slice(0,maxLen);
                              }
                              $('#loader').remove();    
                          },
                          error:function(err){
                               console.log('主播请求出错',err);
                               $('#loader').remove(); 
                          }  
                      });                                                
            },
            //壕友榜单
            friendRender:function(){
                      let she = this;
                      $.ajax({  
                          url:"//act1.m.yystatic.com/act/file/headline2017/friend.txt",  
                          dataType:'jsonp',    
                          jsonpCallback:'friend',
                          cache:true,  
                          success:function(response) {  
                              var data = response.listInfo;
                              var maxLen = 10;
                              she.friendList.topchid = data.topchid;
                              
                              //分类
                              she.friendList.topchid = getSortData(she.friendList.topchid,{
                                  key: 'rday',
                                  val: data.extendinfo.dayround*1,
                                  key1: 'round',
                                  val1: data.extendinfo.curround*1                           
                              })

                              //排序
                              she.friendList.topchid = _U.sortBy(she.friendList.topchid,function(item){
                                   return item.rank * 1;
                              });

                              //容错
                              if(she.friendList.topchid.length < maxLen){
                                     let len = she.friendList.topchid.length;
                                     for(let i=0;i<maxLen-len;++i){
                                         she.friendList.topchid.push({});  
                                     }
                              }
                              if(she.friendList.topchid.length > maxLen){
                                      she.friendList.topchid = she.friendList.topchid.slice(0,maxLen);
                              }   
                          },
                          error:function(err){
                               console.log('壕友请求出错',err)
                          }  
                      });                                       
            },
            //刷新时间
            refreshBtn:function(){
               this.anchorRender();
            }  
        },                
        ready(){
           this.startRender();
           this.friendRender();
           this.anchorRender(); 
            $(function(){
                 FastClick.attach(document.body);  
            })             
        }
  }
</script>