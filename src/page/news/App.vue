<template>
	<vnews></vnews>
</template>

<script>
import vnews from '../../components/news/news.vue';
export default {
	components: {
      vnews
    }
}
</script>


<style lang="scss">
 @import '../../assets/sass/base/_mobile.scss';
 @import '../../assets/sass/base/_mixin.scss';
 @import '../../assets/sass/base/commons.scss';
	html,body{
         background: #ffe36b url('../../assets/images/bg.gif') repeat center center;
	}
</style>
<style scoped lang="scss">
</style>