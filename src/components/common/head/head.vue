<template>
	<div id="m-top">
		 <div class="ui-toggle">
		 	<a href="//web.yy.com/group_act/2017headline1/rule.html" class="ruleBtn {{ruleActive}}"></a>
		 	<a href="//web.yy.com/group_act/2017headline1/news.html" class="newsBtn {{newsActive}}"></a>
		 	<a href="//web.yy.com/group_act/2017headline1/list.html" class="listBtn {{listActive}}"></a>
		 </div>
	</div>
</template>

<script>
   import store from '../../../vuex/store.js';
   export default {
	 data(){
			return {
          ruleActive:'',
          newsActive:'',
          listActive:''
			}
	  },
    store:store,
	  vuex: {
	      getters:{
	          indexActive: function(state){
	              return state.indexActive;
	          }
	      }
	  },       	  
	  components: {

	  },
	  ready:function(){
        setActive(this);
	  }
   }
   
   //设置activ状态
   function setActive(obj){
       var url = window.location.href;
       var she = obj;
       if(url.indexOf('rule') != -1){
           she.ruleActive ='active'; 
       }else if(url.indexOf('news') != -1){
           she.newsActive ='active'; 
       }else if(url.indexOf('list') != -1){
           she.listActive ='active';
       }
   }
</script>
<style scoped lang="scss">
 @import '../../../assets/sass/base/_mobile.scss';
 @import '../../../assets/sass/base/_mixin.scss';
 @import '../../../assets/sass/base/commons.scss';	 
</style>

<style lang="scss">

</style>