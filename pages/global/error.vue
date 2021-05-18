<template>
	<view>
		<image class="logo" src="/static/logo.png"></image>
		404
		{{currentUser}}
	</view>
</template>

<script>
	import * as vh from "../../plugins/vuehelper"
	import * as module from '../../store/modules/index.js'
	export default {		
		onLoad() {
			
		},
		computed:{
			//vh.help.getProps(type.statesType)
			...vh.mapFields('globalerror',vh.help.getStates(module.globalerror.state))
		},
		methods: {
			...vh.mapActions('globalerror',vh.help.getActions(module.globalerror.actions))
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
	}
</style>