<template>
	<view>
		<my-login v-if="token"></my-login>
		<my-userInfo v-else></my-userInfo>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import { mapState } from 'vuex'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_user', ['token'])
		},
		methods: {

		}
	}
</script>

<style lang="scss">

</style>
