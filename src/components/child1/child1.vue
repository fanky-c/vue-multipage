<template>
	  <h1>{{msg}}</h1>
	  <div class="div1">father tell me： {{msgfromfather}}</div>
	  <button class="btn" v-on:click="clickMe">click child button</button>
</template>


<script>
import './child1.js';

//导出
export default {
   data(){
   	  return {
           msg: 'hello from component B'
   	  }
   },
   props:['msgfromfather'],
   methods:{
     clickMe: function(){
        console.log(this.msgfromfather);
        //debugger;
        this.$emit('child-tell-father-something',this.msg)
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
