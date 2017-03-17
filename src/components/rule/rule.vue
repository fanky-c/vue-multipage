<template>
	  <!-- 头部 -->
	  <div id="m-top">
	     <div class="ui-toggle">
      <a v-on:click="goWebPage('//web.yy.com/group_act/vue-multipage/rule.html')" class="ruleBtn active"></a>
      <a v-on:click="goWebPage('//web.yy.com/group_act/vue-multipage/news.html')" class="newsBtn "></a>
      <a v-on:click="goWebPage('//web.yy.com/group_act/vue-multipage/list.html')" class="listBtn"></a>
	     </div>
	  </div>


    <!-- 规则正文 -->
    <div id="m-rule" v-on:click="goLiveRoom(95726854,95726854,1153639139,1)">
        <img src="./images/transparent.gif" v-lazyload:opt.fadein="imgList.img1" class="img1 lazy" /> 
        <img src="./images/transparent.gif" v-lazyload:opt.fadein="imgList.img2" class="img2 lazy" />
                <div class="yellowBlank"></div> 
        <img src="./images/transparent.gif" v-lazyload:opt.fadein="imgList.img3" class="img3 lazy" />
        <img src="./images/transparent.gif" v-lazyload:opt.fadein="imgList.img4" class="img4 lazy" />
                <div class="yellowBlank"></div> 
        <img src="./images/transparent.gif" v-lazyload:opt.fadein="imgList.img5" class="img5 lazy" />
        <img src="./images/transparent.gif" v-lazyload:opt.fadein="imgList.img6" class="img6 lazy" />
                <div class="yellowBlank"></div> 
        <img src="./images/transparent.gif" v-lazyload:opt.fadein="imgList.img7" class="img7 lazy" />
                <div class="yellowBlank"></div> 
        <img src="./images/transparent.gif" v-lazyload:opt.fadein="imgList.img8" class="img8 lazy" />
        <div class="img9Wrap">
          <img src="./images/transparent.gif" v-lazyload:opt.fadein="imgList.img9" class="img9 lazy" />
        </div>
                <div class="yellowBlank"></div>         
        <img src="./images/transparent.gif" v-lazyload:opt.fadein="imgList.img10" class="img10 lazy" />
                <div class="yellowBlank"></div>  
        <img src="./images/transparent.gif" v-lazyload:opt.fadein="imgList.img11" class="img11 lazy" /> 
        <img src="./images/transparent.gif" v-lazyload:opt.fadein="imgList.img12" class="img12 lazy" /> 
        <img src="./images/transparent.gif" v-lazyload:opt.fadein="imgList.img13" class="img13 lazy" /> 
        <img src="./images/transparent.gif" v-lazyload:opt.fadein="imgList.img14" class="img14 lazy" />
        <img src="./images/transparent.gif" v-lazyload:opt.fadein="imgList.img15" class="img15 lazy" /> 
    </div>  
</template>

<script>

import Vue from 'vue'; 
import "vue-lazyload-img";
import FastClick from 'fastclick';

import img1 from './images/rule-img1.jpg';
import img2 from './images/rule-img2.jpg';
import img3 from './images/rule-img3.jpg';
import img4 from './images/rule-img4.jpg';
import img5 from './images/rule-img5.jpg';
import img6 from './images/rule-img6.jpg';
import img7 from './images/rule-img7.jpg';
import img8 from './images/rule-img8.jpg';
import img9 from './images/rule-img9.jpg';
import img10 from './images/rule-img10.jpg';
import img11 from './images/rule-img11.jpg';
import img12 from './images/rule-img12.jpg';
import img13 from './images/rule-img13.jpg';
import img14 from './images/rule-img14.jpg';
import img15 from './images/rule-img15.jpg';

import Test from './test';
import '../../assets/js/lib/jquery/jquery-1.8.0.min';
import '../../assets/js/lib/YYMobileBridge/YYMobileBridge';
import '../../assets/js/lib/yyBridge/WAJavascriptBridge';
import '../../assets/js/lib/yymobile/yymobile_api_v1.2.12';


//use
Vue.use(Vue.lazyimg,{
    fade: true,
    nohori: true,
    speed: 20,   
})

//导出
export default {
        methods:{
          goLiveRoom:function(topchid,subchid,uid,islive){
                 var topchid = topchid || 0;
                 var subchid = subchid || 0;
                 var uid = uid || 0;
                 var islive = islive || 0;
                 this.gotoLivingRoom(islive, topchid, subchid, uid);
          },
          gotoLivingRoom:function(live,topCid,subCid,uid){
                    alert(live+'||'+topCid+'||'+subCid+'||'+uid)
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
         },
         data:function(){
            return {
                 imgList:{
                     img1:img1,
                     img2:img2,
                     img3:img3,
                     img4:img4,
                     img5:img5,
                     img6:img6,
                     img7:img7,
                     img8:img8,
                     img9:img9,
                     img10:img10,
                     img11:img11,
                     img12:img12,
                     img13:img13,
                     img14:img14,
                     img15:img15,
                 }
            }
         },
         ready:function(){             
               
         }    
}


</script>

<style scoped lang="scss">
    @import './rule.scss';
	h1{
		color: rgb(5, 110, 234);
	}
	.div{
           height: 90px;
           width: 100%;
           overflow: hidden;
           position: relative;
	}
</style>