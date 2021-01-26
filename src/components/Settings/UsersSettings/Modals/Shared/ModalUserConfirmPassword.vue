<template>
	<div class="row q-mb-sm">
		<q-input
			outlined
			:value="confirmPassword"
			@input="$emit('update:confirmPassword', $event)"
			:rules="[ val => val.length >= 6 || 'Repeat Password!']"
			lazy-rules
			ref="confirmPassword"
			label="Confirm Password"
			stack-label
			class="col"
			:type="isPwd ? 'password' : 'text'">
			<template v-slot:append>
			<q-icon
				:name="isPwd ? 'visibility_off' : 'visibility'"
				class="cursor-pointer"
				@click="isPwd = !isPwd"
			/>
			</template>
		</q-input>
	</div>

</template>

<script>

	export default {
		props: ['confirmPassword'],
		data() {
			return {
				isPwd: true,
			}
		},
		methods: {

		}
	}
</script>