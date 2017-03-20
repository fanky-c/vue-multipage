<template>
	  <h1>{{msg}}</h1>
	  <div class="div1">{{msgfromfather}}</div>
	  <button class="btn" v-on:click="clickMe">click child button</button>
</template>


<script>
//导出
export default {
   data(){
   	  return {
           msg: 'hello from component a'
   	  }
   },
   props:['msgfromfather'],
   methods:{
     clickMe: function(){
        console.log(this.msgfromfather)
     }
   } 
}
</script>


<!-- 样式 -->
<style scoped lang="scss">
	h1{
		 color:#42b983; 
	}
	.btn{
		 padding: 4px;
	}  
</style>
