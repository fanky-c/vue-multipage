<template>
  <vrule></vrule>
</template>

<script>
import vfoot from '../../components/common/foot/foot.vue';
import vrule from '../../components/rule/rule.vue';

export default {
	data(){
      return {
           parent:'fancky144'
      }
  },
  components: {
      vrule
  },
  ready(){
  }
}
</script>


<!-- 组件样式 -->
<style lang="scss">
 @import '../../assets/sass/base/_mobile.scss';
 @import '../../assets/sass/base/_mixin.scss';
 @import '../../assets/sass/base/commons.scss';
  html,body{
         background: #ffe36b url('../../assets/images/bg.gif') repeat center center;
  }
</style>
