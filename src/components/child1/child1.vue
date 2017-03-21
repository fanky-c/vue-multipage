<template>
	  <h1>{{msg}}</h1>
	  <div class="div1">father tell me： {{msgfromfather}}</div>
	  <div>以下列表是从父组件那边传递过来的：</div>
	  <ul>
	  	  <li v-for="item in formFaterList">
	  	  	   {{item.label}}
	  	  </li>
	  </ul>
	  <button class="btn" v-on:click="clickMe">click child button</button>
</template>


<script>
import './child1.js';

//导出
export default {
   data(){
   	  return {
           msg: 'hello from component B',
           formFaterList:[],
   	  }
   },
   props:['msgfromfather'],
   events:{
   	   'onAddnews': function(msg){   //接收父组件的事件
   	   	    console.log(msg);
   	   	    this.formFaterList = msg;
   	   }
   },
   methods:{
     clickMe: function(){
        console.log(this.msgfromfather);
        this.$dispatch('child-tell-father-something1', this.msg)
     }
   } 
}
</script>


<!-- 样式 -->
<style scoped lang="scss">
	h1{
		 color:#42b983;
		 margin: 0;
		 padding: 0; 
	}
	.div1{
		padding: 5px;
	}
	.btn{
		 padding: 4px;
	}  
</style>
