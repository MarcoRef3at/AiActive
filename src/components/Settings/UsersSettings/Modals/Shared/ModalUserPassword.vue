<template>
	<div class="row q-mb-sm">
		<q-input
			outlined
			:value="password"
			@input="$emit('update:password', $event)"
			:rules="[ val => val.length >= 6 || 'Please enter at least 6 characters.']"
			lazy-rules
			ref="password"
			label="User Password"
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
		props: ['password'],
		data() {
			return {
				isPwd: true,
			}
		},
		methods: {

		}
	}
</script>