<template>
   <div class="wrap">
     <h1 v-text="title"></h1>
     <input type="text" class="ipt" v-model="newItem" v-on:keyup.enter="addNewList"/>
     <ul>
         <li v-for="item in items" v-bind:class="{isFinshed:item.isFinished}" v-on:click="toggleFinish(item)">
             {{item.label}}
         </li>
     </ul>
     <child></child>
   </div>     
</template>

<script>
import child from '../../components/child/child.vue';

//new Vue({});
export default {
	data(){
      return {
         title: 'this is todo list',
         items: [],
         newItem: ''              
      }
  },
  methods:{
     toggleFinish: function(item){
         item.isFinished = !item.isFinished;
     },
     addNewList: function(){
         this.items.push({
             label: this.newItem,
             isFinished: false  
         });
         this.newItem = '';    
     }  
  },
  components: {
      child,
  },
  ready(){

  }
}
</script>


<!-- 组件样式 -->
<style lang="scss" scoped>
html,body{
     font-size: 12px;
}
.wrap{
    width: 800px;
    margin: 0 auto;
}
.ipt{     
     height: 30px;
     width: 300px;
     padding: 5px;
     margin: 0;
     border:1px solid #ccc;
}
.isFinshed{
    text-decoration:underline;
}
</style>
