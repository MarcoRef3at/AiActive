<template>
	<div v-show="error" class="row">
		<div class="text-caption text-red"> <slot></slot> </div>
	</div>
</template>

<script>

	export default {
		props: ['error'],
		data() {
			return {

			}
		}
	}
</script>
<style scoped>

</style>