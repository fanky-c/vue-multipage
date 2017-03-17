<template>
  
  <!-- 头部 -->
  <div id="m-top">
     <div class="ui-toggle">
      <a v-on:click="goWebPage('//web.yy.com/group_act/vue-multipage/rule.html')" class="ruleBtn"></a>
      <a v-on:click="goWebPage('//web.yy.com/group_act/vue-multipage/news.html')" class="newsBtn active"></a>
      <a v-on:click="goWebPage('//web.yy.com/group_act/vue-multipage/list.html')" class="listBtn"></a>
     </div>
  </div>

	<!-- 轮次榜单 -->
  <div id="m-dateWrap">
		<div class="wrap">
			<a href="javascript:;" class="leftDir" id="leftDir">左</a>
			<a href="javascript:;" class="rightDir" id="rightDir">右</a>
			<div class="showDateSection" id="showDateSection">
				<div class="scrollWrap">
					 <ul>
					 	<li><div>3月11日<br>1-24轮</div></li>
					 	<li><div>3月12日<br>1-24轮</div></li>
					 	<li><div>3月18日<br>1-24轮</div></li>
					 	<li><div>3月19日<br>1-24轮</div></li>
            <li><div>3月25日<br>1-24轮</div></li>
            <li><div>3月26日<br>1-24轮</div></li>  
            <li><div>4月1日<br>1-24轮</div></li>
            <li><div>4月2日<br>1-24轮</div></li>                        
					 </ul>
				</div>
			</div>
		</div>
	</div>
	<div id="m-showRound">
	    <div class="wrap">
	    	<ul>
	    		<li v-for="item in roundList.topchid">
	    		    <strong class="roundTxt">第{{$index+1}}轮</strong>	
	    		    <dl class="detail">
                
                <div v-if="roundList.curround == $index+1&&roundList.selectday==roundList.curDiyday">  <!-- 特殊处理 -->
                   <dd v-for="list in item[0].anchor" >
                     <div class="topImgWrap" v-if="$index == 0">
                      <img class="headimg" v-bind:src="roundList.defaultImg" />
                      <i class="duanwei"></i>
                     </div>
                     <div class="showList">
                          <h4 class="name"><strong>虚位以待</strong><i class="call{{$index+1}}"></i></h4>
                          <h5 class="nums">闪耀值：<span>0</span></h5>
                          <i class="star star1" v-if="roundList.curday <= 6 && $index < 1"></i>
                          <i class="star star1" v-if="roundList.curday > 6"></i> 
                          <a href="javascript:;" class="personBtn" data-uid="{{list.uid}}" data-topchid="{{list.topchid}}" data-subchid="{{list.subchid}}" data-islive="{{list.islive}}" v-on:click="openAnchorMask('虚位以待',roundList.defaultImg,0,0,0,0,0,0)"></a> 
                     </div>
                   <dd>
                   <dt v-for="list in item[1].friend">
                        <img v-bind:src="roundList.defaultImg"  class="headimg"/>
                        <div class="userInfo">
                            <h3 class="name">虚位以待</h3>
                            <div class="nums">影响力：<span>0</span></div>
                        </div>
                   </dt>
                </div>                 
                <div  v-else>
                   <dd v-for="list in item[0].anchor">
                     <div class="topImgWrap" v-if="$index == 0">
                     	<img class="headimg" v-bind:src="list.headurl | initValue roundList.defaultImg" onerror="this.src='{{roundList.defaultImg}}'" />
                     	<i class="duanwei dw{{list.hlphase}}"></i>
                     </div>
                     <div class="showList">
                          <h4 class="name">
                            <strong>{{list.nick | initValue '虚位以待' | decode}}</strong>
                            <i class="call{{$index+1}}"></i>
                          </h4>
                          <h5 class="nums">闪耀值：<span>{{list.ticket | milliFormat}}</span></h5>
                          <i class="star star{{list.ticket | getStar}}" v-if="roundList.curday <= 6 && $index < 1"></i>
                          <i class="star star{{list.ticket | getStar}}" v-if="roundList.curday > 6"></i>                          
                          <a href="javascript:;" class="personBtn" data-uid="{{list.uid}}" data-topchid="{{list.topchid}}" data-subchid="{{list.subchid}}" data-islive="{{list.islive}}" v-on:click="openAnchorMask(list.nick,list.headurl,list.hlphase,list.ticket,list.uid,list.topchid,list.subchid,list.islive)"></a> 
                     </div>
  	    		    	 <dd>

                   <dt v-for="list in item[1].friend">
                        <img v-bind:src="list.headurl | initValue roundList.defaultImg" onerror="this.src='{{roundList.defaultImg}}'" class="headimg"/>
                        <div class="userInfo">
                            <h3 class="name">{{list.nick | initValue '虚位以待' | decode}}</h3>
                            <div class="nums">影响力：<span>{{list.power | milliFormat}}</span></div>
                        </div>
                   </dt>
                </div> 
                
                <div v-if="(totleCurround==25||totleCurround==75||totleCurround==125||totleCurround==175)&& $index+1==24 && roundList.selectday+1==roundList.curDiyday">
                   <a href="javascript:;" v-if="box_status==0" class="grabGift_active" v-on:click=" grabGift()">抢礼物</a>
                   <a href="javascript:;" v-if="box_status!=0" class="grabGift_gray" v-on:click="grabGiftGray()">抢礼物</a>                    
                </div>
                <div v-else>           
                   <a href="javascript:;" v-if="roundList.curround-1 == $index+1 && roundList.selectday==roundList.curDiyday && box_status==0 && roundList.selectday==roundList.curDiyday" class="grabGift_active" v-on:click=" grabGift()">抢礼物</a>
                   <a href="javascript:;" v-if="roundList.curround-1 == $index+1 && box_status!=0 &&roundList.selectday==roundList.curDiyday" class="grabGift_gray" v-on:click="grabGiftGray()">抢礼物</a>
                </div>                                    
	    		    </dl> 
	    		</li>                            
	    	</ul>
	    </div>
      <a href="javascript:;" class="lookMoreBtn" v-if="roundList.curShowSize <= 4" v-on:click="lookMore"><i></i></a>	
	</div>

  <!-- 我的头条 -->
  <div class="yellowBlank"></div>
  <div id="m-myheadline">
      <div class="title"></div>
      <div class="wrap">
          <div class="myInfluence">{{myInfoList.extendInfo.power | initValue '--'}}</div>
          <ul class="myPackage">
               <li class="li1">勋章碎片：<span>{{myInfoList.extendInfo.medal_piece | initValue '--'}}/5</span></li>
               <li class="li2">已兑换头条勋章（{{myInfoList.extendInfo.medal_day | initValue '--'}}天）</li>
          </ul>
          <ul class="myPackage myPackage1">
               <li class="li1">座驾碎片：<span>{{myInfoList.extendInfo.car_piece | initValue '--'}}/5</span></li>
               <li class="li2">已兑换头条座驾（{{myInfoList.extendInfo.car_day | initValue '--'}}天）</li>
          </ul>        
      </div>      
  </div>

  <!-- 头条擂主 -->
  <div class="yellowBlank"></div>
  <div id="m-headLeizhu">
     <h3 class="title"></h3>
     <div class="wrap">
       <table cellspacing="0" cellpadding="0" class="tab1">
           <tr v-for="item in leizhuList.topchid">
               <td data-uid="{{item.uid}}" data-topchid="{{item.topchid}}" data-subchid="{{item.subchid}}" data-islive="{{item.islive}}">
                   <i class="rank{{$index+1}}"></i>
                   <div class="imgWrap">
                            <img class="headimg" v-bind:src="item.headurl | initValue dwList.defaultImg" onerror="this.src='{{leizhuList.defaultImg}}'" />
                            <i class="duanwei dw{{item.hlphase}}"></i>                   
                   </div>
                   <ul class="showNumAndTxt">
                       <li class="txt">{{item.nick | initValue '虚位以待' | decode}}</li>
                       <li class="nums">闪耀值：<span>{{ item.ticket | milliFormat }}<span></li>
                   </ul>
                   <i class="personBtn" v-on:click="openAnchorMask(item.nick,item.headurl,item.hlphase,item.ticket,item.uid,item.topchid,item.subchid,item.islive)"></i>
               </td>
           </tr>                     
       </table>
     </div>  
  </div>

  <!-- 头条段位 -->
  <div class="yellowBlank"></div>
  <div id="m-headlineDw">
    <div class="title"></div>
    <ul class="wrap">
         <li v-for="item in dwList.topchid">
           <table cellspacing="0" cellpadding="0" class="tab">
                <tr data-topchid="{{item.topchid}}" data-uid="{{item.uid}}" data-subchid="{{item.subchid}}" data-islive="{{item.islive}}">
                     <td>
                         <i class="rank{{$index+1}}" v-if="$index<3"></i>
                         <i class="rankNums" v-else>{{$index+1}}</i>
                         <div class="imgWrap" v-if="$index<3">
                                  <img class="headimg" v-bind:src="item.headurl | initValue dwList.defaultImg" onerror="this.src='{{dwList.defaultImg}}'"/>
                                  <i class="duanwei dw{{item.hlphase}}"></i>                   
                         </div>
                         <ul class="showNumAndTxt" v-if="$index<3">
                             <li class="txt">{{item.nick | initValue '虚位以待' | decode}}</li>
                             <li class="nums">星星数：<span>{{item.ticket | milliFormat}}<span></li>
                         </ul>
                         <ul class="showNumAndTxt" v-else>
                             <li class="txt">{{item.nick | initValue '虚位以待' | decode}}</li>
                             <li class="nums">段位：<i class="smallDw dw{{item.hlphase}}"></i>星星数：<span>{{item.ticket | milliFormat}}<span></li>
                         </ul>                         
                         <i class="personBtn" v-on:click="openAnchorMask(item.nick,item.headurl,item.hlphase,item.ticket,item.uid,item.topchid,item.subchid,item.islive,1)"></i>
                     </td>                    
                </tr>             
           </table>           
         </li>
         <!-- 
         <li>
           <table cellspacing="0" cellpadding="0" class="tab tab1">
                <tr>
                     <td>
                         <i class="rankNums">10</i>
                         <ul class="showNumAndTxt">
                             <li class="txt">浅蓝浅蓝浅蓝浅蓝浅蓝浅蓝</li>
                             <li class="nums">段位：<i class="smallDw"></i>星星数：<span>88,000,000<span></li>
                         </ul>
                         <i class="personBtn"></i>
                     </td>                    
                </tr>             
           </table>           
         </li> -->                                                                                 
    </ul>
  </div>
  
  <!-- 新闻 -->
  <div class="yellowBlank"></div>
	<div id="m-news">
		 <h3 class="title"></h3>
     <div class="newWrap">
        <dl>
            <dd v-for="item in newsList.topchid" v-on:click="gotoPage(item.messageUrl)">
                 <div class="dd1">
                  <img class="leftImg" v-bind:src="item.msgListImg | initValue dwList.defaultImg" onerror="this.src='{{dwList.defaultImg}}'"  />
                  <div class="right">
                      <h3 class="titleTxt">{{item.popupTitle | initValue '虚位以待' | decode }}</h3>
                      <div class="bottom">
                            <span class="data">{{item.sendDate | dateFormat 'yy-mm-ss'}}</span>
                            <span class="type">{{item.publisherName | initValue '虚位以待' | decode}}</span>                        
                      </div>
                  </div>                    
                 </div>              
            </dd>                                   
        </dl>
     </div>
	</div>
  <div class="blank30"></div>
   
  <!-- 主播新闻弹窗 -->
  <div id="m-newsMask" v-if="roundList.isOpenAnchor">
       <div class="wrap">
            <div class="headInfo" v-on:click="goLiveRoom(anchorMaskList.topchid,anchorMaskList.subchid,anchorMaskList.uid,anchorMaskList.islive)">
                <table cellspacing="0" cellpadding="0" width="100%">
                    <tr>
                       <td>
                           <div class="topImgWrap">
                                <img class="headimg" v-bind:src="anchorMaskList.headurl | initValue dwList.defaultImg" onerror="this.src='{{dwList.defaultImg}}'" />
                                <i class="duanwei dw{{anchorMaskList.hlphase}}"></i>
                            </div>
                            <ul class="userInfo">
                                <li class="names">{{anchorMaskList.nick | initValue '虚位以待' | decode}}</li>
                                <li class="nums" v-if="anchorMaskList.isStar == 1">星星数：<span>{{anchorMaskList.ticket | milliFormat}}</span></li>
                                 <li class="nums" v-else>闪耀值：<span>{{anchorMaskList.ticket | milliFormat}}</span></li>                               
                            </ul>
                            <i class="liveBtn" v-if="anchorMaskList.islive == 1"></i>                              
                       </td>  
                    </tr>
                </table>
            </div>
            <dl class="newsList">
                <dt>
                    <h3 class="title">头条新闻</h3>
                    <a href="javascript:;" class="lookMoreBtn" v-on:click="gotoPage('http://yue.yy.com')">查看更多<i></i></a>
                </dt>
                <dd v-for="item in anchorMaskList.list" v-on:click="gotoPage(item.messageUrl)">{{item.msgTitle | initValue '虚位以待' | decode}}</dd>
            </dl>
            <a href="javascript:;" class="closeBtn" v-on:click="closeAnchorMask(this)"></a>
       </div>
  </div>

  <!-- 豪友礼包弹窗 -->
  <div id="m-giftMask" v-if="roundList.isGift">
       <div class="wrap">
          <div v-if="myGiftList.draw_result == 0">
              <p class="showTxt" v-if="myGiftList.gift_type == 0">
                     未知类型！
              </p>
              <p class="showTxt" v-if="myGiftList.gift_type == 1">
                恭喜抢得壕友礼包! <br>
                获得<span class="c-yellow">闪耀相机1个!</span> <br>
                请到包裹中查看
              </p>
              <p class="showTxt" v-if="myGiftList.gift_type == 2">
                恭喜抢得壕友礼包! <br>
                获得<span class="c-yellow">头条勋章碎片1个!</span> <br>
                集满5个自动兑换勋章哦
              </p>
              <p class="showTxt" v-if="myGiftList.gift_type == 3">
                恭喜抢得壕友礼包! <br>
                获得<span class="c-yellow">座驾碎片1个!</span> <br>
                集满5个自动兑换座驾哦
              </p>
          </div>
          <div v-if="myGiftList.draw_result == 1">
              <p class="showTxt">
                      手慢了...<br>
                      下个时段继续抢吧！
              </p>              
          </div>
          <div v-if="myGiftList.draw_result == 2">
              <p class="showTxt">
                     您已领过本时段的壕友礼包啦<br>
                     下个时段再来吧！
              </p>              
          </div>
          <div v-if="myGiftList.draw_result == 3">
              <p class="showTxt">
                     今天抢礼包次数太多啦...<br>
                     下个头条日再来吧

              </p>              
          </div>
          <div v-if="myGiftList.draw_result == 4">
              <p class="showTxt">
                     礼包已经失效！
              </p>              
          </div>
          <div v-if="myGiftList.draw_result == 5">
              <p class="showTxt">
                     礼包不存在！
              </p>              
          </div> 
          <div v-if="myGiftList.draw_result == 255">
              <p class="showTxt">
                     系统错误！
              </p>              
          </div>                                                                                      
          <a href="javascript:;" class="closeBtn" v-on:click="closeGrabGift(this)"></a>
       </div> 
  </div>

  <!-- 错误提醒弹窗 -->
  <div id="m-errorMask" v-if="isError==1">
       <div class="wrap">
           <div>
              <p class="showTxt">
                     {{box_status_txt}}
              </p>                 
           </div>
          <a href="javascript:;" class="closeBtn" v-on:click="closeGrabGift(this)"></a>            
       </div>
  </div>
</template>

<style scoped lang="scss">
  @import './news.scss';
</style>

<script>
  import Vue from 'vue';  
  //import vueJsonp from 'vue-jsonp';
  import FastClick from 'fastclick';
  import {getDayAndRound,getCurRound} from './roundConfig.js';
  import _U from '../../assets/js/lib/underscore/underscore.js';
  import '../../assets/js/lib/jquery/jquery-1.8.0.min';
  import '../../assets/js/lib/YYMobileBridge/YYMobileBridge';
  import '../../assets/js/lib/yyBridge/WAJavascriptBridge';
  import '../../assets/js/lib/yymobile/yymobile_api_v1.2.12';  
  
  // use
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
  
  Vue.filter('dateFormat', function(date,format){
            if(!date) return '00:00'; 
            var date = new Date(date);
            var map = {
              "M": date.getMonth() + 1, //月份 
              "d": date.getDate(), //日 
              "h": date.getHours(), //小时 
              "m": date.getMinutes(), //分 
              "s": date.getSeconds(), //秒 
              "q": Math.floor((date.getMonth() + 3) / 3), //季度 
              "S": date.getMilliseconds() //毫秒 
            };
            format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
              var v = map[t];
              if (v !== undefined) {
                if (all.length > 1) {
                  v = '0' + v;
                  v = v.substr(v.length - 2);
                }
                return v;
              } else if (t === 'y') {
                return (date.getFullYear() + '').substr(4 - all.length);
              }
              return all;
            });
            return format;       
  })

  Vue.filter('getStar',function(num){
        var num = num *1;
        var star = 1;
        if(num < 500000){
              star = 1; 
        }else if(num >= 500000 && num<1000000){
              star = 2;
        }else if(num >= 1000000 && num<1700000){
              star = 3;
        }else if(num >= 1700000 && num<3500000){
              star = 4;
        }else if(num>=3500000){
              star = 5;
        }
        return star;
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
  
  //export
  export default {
     data(){
         return {
             indexActive:'2',
             globalCurround:1,
             totleCurround:1,
             roundList:{  //轮次信息                
                curShowSize:4,
                curday:1,
                curDiyday:0,
                selectday:1,
                curround:1,
                isOpenAnchor:false,
                isGift:false,
                anchorData:[],
                friendData:[],
                topchid:[{"anchor":[],'friend':[]}],
                defaultImg:'//act.m.yystatic.com/act/images/default_grey_yy.png'
             },
             dwList:{  //头条段位
                topchid:[],
                defaultImg:'//act.m.yystatic.com/act/images/default_grey_yy.png'
              },
              leizhuList:{   //头条擂主
                 topchid:[],
                 defaultImg:'//act.m.yystatic.com/act/images/default_grey_yy.png' 
              },
              myInfoList:{  //我的头条信息
                  extendInfo:{}
              },
              newsList:{    //Y阅
                 topchid:[] 
              },
              anchorMaskList:{  //主播弹窗
                  nick:'虚位以待',
                  headurl:'//act.m.yystatic.com/act/images/default_grey_yy.png',
                  hlphase:'0',
                  ticket:'0',
                  islive:'0',
                  topchid:'0',
                  subchid:'0',
                  uid:'0',
                  isStar:'0',
                  list:[]
              },
              myGiftList:{  //抢红包
                  draw_result:'0', //,//抢礼包的结果，0：抢到礼物了，1：礼包被抢完了，2：本时段已经抢过，3：今天抢礼包次数太多了，4:礼包已经失效，5:礼包不存在,255:系统错误 
                  gift_type:'0'  //抢到礼物的类型，0:未知类型，1：抢到闪耀相机一个，2：抢到勋章碎片一个，3：抢到座驾碎片一个
              },
              // //红包状态  0：礼包可以抢，1：礼物被抢光，2：当前用户已经抢过，不可以抢，3：当前用户今天抢礼包次数太多了，4:礼包已经失效，5:礼包不存在
              isError:0,
              box_status:'0',
              box_status_txt:'' 
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
          //查询红包按钮状态 
          queryGiftBtn: function(){
              let she = this;
               checkTicketStatus(function(ticket) {
                if (ticket && ticket != 0 && ticket != "null") {
                  $.ajax({  
                      url:'//ysapi.yy.com/api/internal/headline2017/qButton.json?data={"num":"12","extendInfo":{}}&ticket='+getTickete1()+'&callback=queryGiftBtn',  
                      dataType:'jsonp',    
                      jsonpCallback:'queryGiftBtn',  
                      success:function(response) {  
                            var data = response.extendinfo;
                            she.box_status = data.box_status;
                      },
                      error:function(err){
                           console.log('请求红包状态出错',err)
                      }  
                  });
                  function getTickete1() {
                    try {
                      var ticket = window.YYApiCore.invokeClientMethod('data', 'webTicket');
                      return ticket;
                    } catch (err) {
                      return 0;
                    }
                  }
                }
              }, false, function() {
                  showLoginBox();
              });
                
          },
          //提示不能抢红包
          grabGiftGray:function(){
               let she = this;
               let status = she.box_status;
               let res = '暂时不能抢';
               if(status == 1){
                  res = '礼物被抢光';
               }else if(status == 2){
                  res = '已经抢过，不可以抢';
               }else if(status == 3){
                 res = '今天抢礼包次数太多了'; 
               }else if(status == 4){
                 res = '礼包已经失效'; 
               }else if(status == 5){
                 res = '礼包不存在';
               }
               she.box_status_txt = res;
               she.isError = 1;
          },         
          //抢红包弹窗
          grabGift: function(){
              var she = this;              
              if (!window.YYApiCore.invokeClientMethod('data', 'isLogined')) {
                   YYMobile.gotoLogin();
              } else {
                checkTicketStatus(function(ticket) {
                  if (ticket && ticket != 0 && ticket != "null") {
                        var uid = window.YYApiCore.invokeClientMethod('data', 'myUid') || 0;  //我的Uid
                        var curround = she.globalCurround;
                        $.ajax({  
                            url:'//ysapi.yy.com/api/internal/headline2017/luckyBag.json?data={"num":"12","extendInfo":{uid:'+ uid +',curround:'+ curround +'}}&ticket='+ getTickete2() +'&callback=grabgift',  
                            dataType:'jsonp',    
                            jsonpCallback:'grabgift',
                            cache:true,  
                            success:function(response) {  
                                  var data = response.extendinfo;
                                  she.myGiftList.draw_result = data.draw_result;
                                  she.myGiftList.gift_type = data.gift_type;
                                  she.roundList.isGift = true;  
                                  she.box_status = 2;                           
                            },
                            error:function(err){
                                 console.log('抢红包请求出错',err);
                                 alert('抢红包请求出错'+err)
                            }  
                        }); 
                        function getTickete2() {
                          try {
                            var ticket = window.YYApiCore.invokeClientMethod('data', 'webTicket');
                            return ticket;
                          } catch (err) {
                            return 0;
                          }
                        }
                  }
                }, false, function() {
                    showLoginBox();
                    YYMobile.gotoLogin();
                }); 
               }                
          },

          //关闭红包弹窗
          closeGrabGift: function(){
              this.roundList.isGift = false;
              this.isError = 0;
          },

          //打开主播详情弹窗
          openAnchorMask: function(nick,headurl,hlphase,ticket,uid,topchid,subchid,islive,isStar){
               let she = this;
               this.roundList.isOpenAnchor = true;
               this.anchorMaskList.nick = nick;
               this.anchorMaskList.headurl = headurl;
               this.anchorMaskList.hlphase = hlphase;
               this.anchorMaskList.ticket = ticket;               
               this.anchorMaskList.uid = uid || 0;
               this.anchorMaskList.topchid = topchid || 0;
               this.anchorMaskList.subchid = subchid || 0;
               this.anchorMaskList.islive = islive || 0;
               this.anchorMaskList.isStar = isStar || 0;

                //获取当前主播新闻
                 $.ajax({  
                        url:'//yue.yy.com/yyue/anchorMsg/queryWithCount?from=niandu2&anchorUid=' + this.anchorMaskList.uid + '&pageNo=0&pageSize=3&callback=news', 
                        dataType:'jsonp',    
                        jsonpCallback:'news',  
                        success:function(response) {
                              var data = response; 
                              var list = data.list || [];
                              var maxLen = 3; 

                              if(list.length < maxLen){
                                  let len = list.length;
                                  for(let i=0;i<maxLen-len;++i){
                                        list.push({});
                                  }
                              }

                              she.anchorMaskList.list = list;
                        },
                        error:function(err){
                             console.log('新闻请求出错',err)
                        }  
                  });

          },
          //关闭详情弹窗 
          closeAnchorMask: function(){
               this.roundList.isOpenAnchor = false;
          },
          
          //选择日期
          selectDate: function(day){
                var day = day;
                let she = this;                
                
                $('#showDateSection').off('click','li')
                $('#showDateSection').on('click','li',function(){

                       if($(this).hasClass('gray')) return;

                       var idx = $(this).index();
                       she.roundList.selectday = idx+1;
                       she.roundList.curday = idx+1;
                       she.roundList.curShowSize = 4;
                       $('#showDateSection li').eq(idx).addClass('active').siblings('li').removeClass('active');

                       //渲染
                       she.roundsList(she.roundList.selectday, she.roundList.anchorData, she.roundList.friendData);
                })

          },

          //查看更多
          lookMore:function(){
                this.roundList.curShowSize = 24;
                this.roundsList(this.roundList.curday, this.roundList.anchorData, this.roundList.friendData);
          },
          //轮次榜单
          renderRoundList: function(){
                      let she = this;
                      $.ajax({  
                          url:'//act1.m.yystatic.com/act/file/headline2017/headlineHour.txt',  
                          dataType:'jsonp',
                          cache:true,    
                          jsonpCallback:'headlineHour',  
                          success:function(response) {  
                              var anchorData = response.listInfo;                         
                              var curround = anchorData.extendinfo.curround;  //当前轮次（1-200）
                              var curday = anchorData.extendinfo.curday;
                               
                              var curday = getDayAndRound(curround).curday; //当前的天数（1-8）
                              
                              she.totleCurround = anchorData.extendinfo.curround;
                              she.globalCurround = curround;
                              she.roundList.curday = curday;  //同步当前天数（1-8）
                              she.roundList.selectday = curday; 
                              she.roundList.curDiyday = curday;
                              she.roundList.curround = getDayAndRound(curround).curround;//同步当前轮次（1-24）


                              

                              $('#showDateSection li').eq(curday-1).addClass('active').siblings('li').removeClass('active');


                               for(let i=0;i<$('#showDateSection li').size();++i){
                                     if(curday-1 < i){
                                         $('#showDateSection li').eq(i).addClass('gray');
                                     }
                               }


                                //控制滚动条
                                let divDom = document.getElementById('showDateSection');
                                if(she.roundList.curday <= 4){
                                    $('#leftDir').addClass('visibilityHide');
                                    $('#rightDir').addClass('visibilityShow');
                                }else{
                                      if(she.roundList.curday < 8){
                                            $('#leftDir').addClass('visibilityShow');
                                            $('#rightDir').addClass('visibilityShow');
                                            divDom.scrollLeft = $(divDom).width() *1;
                                      }else{
                                            $('#leftDir').addClass('visibilityShow');
                                            $('#rightDir').addClass('visibilityHide');
                                            divDom.scrollLeft = $(divDom).width() *1 + 80;                                           
                                      }
                                }
                                
                                $(divDom).off('scroll');
                                $(divDom).on('scroll',function(){
                                      let scrollLeft = $(this).scrollLeft();
                                      let width = $(divDom).width() *1;
                                      $('#leftDir,#rightDir').addClass('visibilityShow').removeClass('visibilityHide');
                                      if(scrollLeft > 0){
                                          $('#leftDir').addClass('visibilityShow');
                                      }

                                      if(scrollLeft <= 0){
                                          $('#leftDir').addClass('visibilityHide');
                                      }                                      

                                      if(scrollLeft > width){
                                          $('#rightDir').addClass('visibilityHide');
                                       }  
                                })
      

                              $.ajax({
                                    url:'//act1.m.yystatic.com/act/file/headline2017/friend.txt',  
                                    dataType:'jsonp',    
                                    jsonpCallback:'friend',
                                    cache:true,
                                    success: function(response){
                                      var friendData = response.listInfo;

                                      she.roundList.anchorData = anchorData.topchid;
                                      she.roundList.friendData = friendData.topchid;

                                      //渲染
                                      she.roundsList(she.roundList.curday, she.roundList.anchorData, she.roundList.friendData);

                                        $('#loader').remove();                                           
                                    },
                                    error: function(err){
                                        console.log('壕友请求出错',err);
                                        $('#loader').remove(); 
                                    }                                   
                              })

                          },
                          error:function(err){
                               console.log('主播请求出错',err)
                          }  
                      });              
          },
          
          //渲染轮次列表
          roundsList: function(_curDay,_anchorData,_friendData){
                    let she = this;
                    let myData = [];
                    let rounds = she.roundList.curShowSize;
                    let curday = _curDay;
                    let anchorData = _anchorData;
                    let friendData = _friendData;


                    //创建需要的数据
                    for(let i=0;i<rounds;++i){
                         //分类主播
                         let arr = getSortData(anchorData,{
                                       key:'rday',
                                       val: curday*1,
                                       key1:'round',
                                       val1: getCurRound(curday,i+1)
                                  });

                         //分类壕友
                         let arr1 = getSortData(friendData,{
                                       key:'rday',
                                       val: curday*1,
                                       key1:'round',
                                       val1: getCurRound(curday,i+1)
                                  });                           
                         
          
                          //排序
                          arr = _U.sortBy(arr,function(item){
                               return item.rank * 1;
                          });

                          arr1 = _U.sortBy(arr1,function(item){
                               return item.rank * 1;
                          });

                          
                          //容错
                          if(arr.length < 3){
                               let len = arr.length;
                               for(let j=0;j<3-len;++j){
                                     arr.push([]) 
                               }                           
                          }
                          if(arr.length > 3){
                               arr = arr.slice(0,3);
                          }

                          if(arr1.length < 1){
                               let len = arr1.length;
                               for(let j=0;j<1-len;++j){
                                     arr1.push([]) 
                               }                           
                          }
                          if(arr1.length > 1){
                               arr1 = arr1.slice(0,1);
                          }                            

                          myData.push([]);
                          myData[i].push({anchor:arr});
                          myData[i].push({friend:arr1});  
                    }  
                    
                    //赋值
                    she.roundList.topchid = myData;
             
          },
          //我的头条信息
          renderMyInfoList: function(){
              let she = this;
              checkTicketStatus(function(ticket) {
                if (ticket && ticket != 0 && ticket != "null") {
                  $.ajax({  
                      url:'//ysapi.yy.com/api/internal/headline2017/myInfo.json?data={"num":12,"extendInfo":{}}&ticket='+ getTickete3() +'&callback=myInfo',  
                      dataType:'jsonp',    
                      jsonpCallback:'myInfo',
                      cache:true,  
                      success:function(response) {  
                            var data = response.extendinfo;
                            she.myInfoList.extendInfo = data;
                      },
                      error:function(err){
                           console.log('我的头条信息请求出错',err);
                      }  
                  }); 
                  function getTickete3() {
                    try {
                      var ticket = window.YYApiCore.invokeClientMethod('data', 'webTicket');
                      return ticket;
                    } catch (err) {
                      return 0;
                    }
                  }
                }
              }, false, function() {
                  showLoginBox();
              });                                             
          },
          
          //头条擂主
          renderLzList: function(){
                let she = this;
                $.ajax({  
                    url:"//act1.m.yystatic.com/act/file/headline2017/anchorChampion.txt",  
                    dataType:'jsonp',    
                    jsonpCallback:'anchorChampion',
                    cache:true,  
                    success:function(response) {  
                        var data = response.listInfo;
                        var maxLen = 3;
                        she.leizhuList.topchid = data.topchid;

                        //排序
                        she.leizhuList.topchid = _U.sortBy(she.leizhuList.topchid,function(item){
                             return item.rank * 1;
                        });

                        //容错
                        if(she.leizhuList.topchid.length < maxLen){
                               let len = she.leizhuList.topchid.length;
                               for(let i=0;i<maxLen-len;++i){
                                   she.leizhuList.topchid.push({});  
                               }
                        }

                        if(she.leizhuList.topchid.length > 3){
                              she.leizhuList.topchid = she.leizhuList.topchid.slice(0,3);
                        } 
                    },
                    error:function(err){
                         console.log('头条擂主请求出错',err)
                    }  
                });                              
          },
          
          //头条段位
          renderDwList: function(){
                let she = this;
                $.ajax({  
                    url:"//act1.m.yystatic.com/act/file/headline2017/star.txt",  
                    dataType:'jsonp',    
                    jsonpCallback:'star',
                    cache:true,  
                    success:function(response) {  
                        var data = response.listInfo;
                        var maxLen = 10;
                        she.dwList.topchid = data.topchid;

                        //排序
                        she.dwList.topchid = _U.sortBy(she.dwList.topchid,function(item){
                             return item.rank * 1;
                        });

                        //容错
                        if(she.dwList.topchid.length < maxLen){
                               let len = she.dwList.topchid.length;
                               for(let i=0;i<maxLen-len;++i){
                                   she.dwList.topchid.push({});  
                               }
                        }  
                    },
                    error:function(err){
                         console.log('头条段位请求出错',err)
                    }  
                });                               
          },
          
          //Y阅
          renderNewsList: function(){
             let she = this;
              $.ajax({  
                   type: 'GET',
                  url:"//yue.yy.com/yyue/topicMsg/queryWithCount?topicId=306&count=4&from=toutiaodz1",  
                  dataType:'jsonp',    
                  callback: 'jsonp1',
                  cache:true, 
                  success:function(response) {  
                      var data = response.list || [];
                      var maxLen = 4;

                      if(data.length < maxLen){
                          let len = data.length;
                          for(let i=0;i<maxLen-len;i++){
                              data.push({}) 
                          } 
                      }
                      
                      if(data.length > maxLen){
                              data.slice(0,maxLen)
                      }

                      she.newsList.topchid = data;   
                  },
                  error:function(err){
                       console.log('Y阅请求出错',err)
                  }  
              });             
          }

     },   
     ready(){
          let she = this; 
          this.renderRoundList();
          this.selectDate(this.roundList.curday);                   
          this.renderLzList();
          this.renderDwList();
          this.renderNewsList();
          setTimeout(function(){
              she.queryGiftBtn(); 
              she.renderMyInfoList();                         
            },1000);             
          $(function(){
               FastClick.attach(document.body);                 
          })                                                              
     }
  }


</script>