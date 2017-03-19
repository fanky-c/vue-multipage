<template>
   <h1 v-text="title"></h1>
   <ul>
       <li v-for="item in items" v-bind:class="{isFinshed:item.isFinished}">
           {{item.label}}
       </li>
   </ul>
   <child></child>
</template>

<script>
import child from '../../components/child/child.vue';

//new Vue({});
export default {
	data(){
      return {
         title: 'this is todo list',
         items: [
                 {
                    label: 'coding',
                    isFinished: false
                 },
                 {
                     label: 'walking',
                     isFinished: true
                 }
              ]
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
.isFinshed{
    text-decoration:underline;
}
</style>
