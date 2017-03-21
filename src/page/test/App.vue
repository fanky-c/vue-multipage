<template>
   <div class="wrap">
     <h1 v-text="title"></h1>
     <input type="text" class="ipt" v-model="newItem" v-on:keyup.enter="addNewList"/>
     <ul>
         <li v-for="item in items" v-bind:class="{isFinshed:item.isFinished}" v-on:click="toggleFinish(item)">
             {{item.label}}
         </li>
     </ul>

     <div class="componts">
        <p>child tell me：{{childWords}}</p>
        <child msgfromfather="i am father" v-on:child-tell-father-something="listenerToMyBoy"></child>
     </div>


     <div class="componts">
       <p>child1 tell me：{{child1Words}}</p>
       <child1 msgfromfather="i am too father"></child1>
     </div>

   </div>     
</template>

<script>
import child from '../../components/child/child.vue';
import child1 from '../../components/child1/child1.vue';
import Stroge from '../../assets/js/lib/localStorage/localStorage';


//new Vue({});
export default {
	data(){
      return {
         title: 'this is todo list',
         items: Stroge.get() || [],
         newItem: '',
         childWords:'',
         child1Words:''              
      }
  },
  methods:{
     toggleFinish: function(item){
         item.isFinished = !item.isFinished;
     },
     addNewList: function(){
         if(!this.newItem) {
           alert('请输入有效文字');
           return;
         };
         this.items.push({
             label: this.newItem,
             isFinished: false  
         });
         this.newItem = '';
         this.$broadcast('onAddnews',this.items); //广播给子组件             
     },
     listenerToMyBoy: function(msg){
          this.childWords = msg;
     },          
  },
  events:{
     'child-tell-father-something1': function(msg){  //接收子组件的消息
         this.child1Words = msg; 
     }
  },
  watch:{
     'items':{
         handler:function(items){
            Stroge.set(items);
         },
         deep:true //内部属性对象
     }   
  },
  components: {
      child,
      child1
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
p{
    margin: 0;
    padding: 0;
}
.componts{
     margin-top: 40px;
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
