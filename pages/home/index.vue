<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{test}}</text>	
			<button @click="go($Router,'/error')"></button>
		</view>
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
			...vh.mapFields('homeindex',vh.help.getStates(module.homeindex.state))
		},
		methods: {
			...vh.mapActions('homeindex',vh.help.getActions(module.homeindex.actions))
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
