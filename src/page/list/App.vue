<template>
	<vlist></vlist>
</template>

<script>
import vlist from '../../components/list/list.vue'

export default {
	data(){
  },  
  components: {
      vlist
    }
}
</script>


<!-- 样式 -->
<style lang="scss">
 @import '../../assets/sass/base/_mobile.scss';
 @import '../../assets/sass/base/_mixin.scss';
 @import '../../assets/sass/base/commons.scss';
  html,body{
         background: #ffe36b url('../../assets/images/bg.gif') repeat center center;
  }
</style>
