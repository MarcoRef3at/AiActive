<template>
	<div class="row q-mb-sm">
		<q-toggle
			:value="resetPassword"
			@input="confirm"
			class="col"
			checked-icon="check"
			color="green"
			label="Reset User Password"
			unchecked-icon="clear" />
	</div>
</template>

<script>

	export default {
		data() {
			return {
				resetPassword: false
			}
		},
		methods: {
			confirm () {
				if(this.resetPassword) {
					this.resetPassword = false
					this.$emit('resetPassword', this.resetPassword)
				}
				else{

					this.$q.dialog({
						title: 'Confirm',
						message: 'Would you like to reset user Password?',
						cancel: true,
						persistent: true
					}).onOk(() => {
						// console.log('>>>> OK')
						this.resetPassword = true
						this.$emit('resetPassword', this.resetPassword)
					}).onCancel(() => {
						// console.log('>>>> Cancel')
						this.resetPassword = false
						
					})
				}
			}
		}
	}
</script>