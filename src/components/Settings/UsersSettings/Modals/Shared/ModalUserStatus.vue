<template>
	<div class="column status">
		<q-select
		  outlined
		  @input="$emit('update:isActive', $event.value)"
		  v-model="model"
		  :options="options"
		  label="User Status"
		  stack-label
		  class="col" />

	</div>
</template>

<script>

	export default {
		props: ['isActive'],
		data() {
			return {
				options: [
					{
						label: 'Enable',
						value: 1
					},
					{
						label: 'Disable',
						value: 0
					}
				]
			}
		},
		methods: {

		},
		mounted() {
			this.model = this.isActive
		},
		computed: {
			model: {
				get() {
					if(this.isActive)
						return {
							label: 'Enable',
							value: 1
						}
					else return {
						label: 'Disable',
						value: 0
					}
				},
				set(value) {
					//console.log(value);
				}
			}			
		}
	}
</script>
<style scoped>
.status {
	min-width: 170px;
}
</style>