import Vue from 'vue';
import App from './App';
import '../../assets/js/lib/flexLayout/flexLayout-1.4.0';


/* eslint-disable no-new */
new Vue({
  el: 'body', 
  components: { App },
  method:{
  	  goPage:function(){
  	  	  alert(1)
  	  }
  },
  ready: function(){
           //埋点
           //reportPhoneEvent2('10010363','4','20170311',0);  	  
  }
})
