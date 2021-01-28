<template>
  <q-card class="edit-user-modal">
    <modal-header>Edit User</modal-header>

    <form @submit.prevent="submitForm">
      <q-card-section>
        <modal-user-name :name.sync="user.name" ref="modalUserName" />

        <modal-user-email :email.sync="user.email" ref="modalUserEmail" />

        <div class="row q-mb-sm justify-start">
          <modal-user-permission
            :isAdmin.sync="user.role"
            ref="modalUserPermission"
          />

          <q-space />

          <modal-user-status
            :isActive.sync="user.status"
            ref="modalUserStatus"
          />
        </div>

        <modal-user-reset-password @resetPassword="resetPassword = $event" />

        <modal-user-form-error :error="resetPassword">
          default user Password is (Password)
        </modal-user-form-error>
      </q-card-section>

      <modal-buttons></modal-buttons>
    </form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["user"],
  data() {
    return {
      resetPassword: false
    };
  },
  components: {
    "modal-header": require("components/Settings/UsersSettings/Modals/Shared/ModalHeader")
      .default,
    "modal-user-name": require("components/Settings/UsersSettings/Modals/Shared/ModalUserName")
      .default,
    "modal-user-email": require("components/Settings/UsersSettings/Modals/Shared/ModalUserEmail")
      .default,
    "modal-user-permission": require("components/Settings/UsersSettings/Modals/Shared/ModalUserPermission")
      .default,
    "modal-user-status": require("components/Settings/UsersSettings/Modals/Shared/ModalUserStatus")
      .default,
    "modal-user-reset-password": require("components/Settings/UsersSettings/Modals/Shared/ModalUserResetPassword")
      .default,
    "modal-user-form-error": require("components/Settings/UsersSettings/Modals/Shared/ModalUserFormError")
      .default,
    "modal-buttons": require("components/Settings/UsersSettings/Modals/Shared/ModalButtons")
      .default
  },
  methods: {
    // ...mapActions('users', ['updateUser']),

    submitForm() {
      // 	let nameValidation = this.$refs.modalUserName.$refs.name
      // 		nameValidation.validate()
      // 	let emailValidation = this.$refs.modalUserEmail.$refs.email
      // 		emailValidation.validate()
      // 	if (!nameValidation.hasError && !emailValidation.hasError) {
      // 		if(this.resetPassword) {
      // 			this.user.resetPassword = true
      // 		}
      // 		this.updateUser(this.user)
      // 	}
    }
  },
  mounted() {
    // console.log("role", this.user.role);
  }
};
</script>
<style scoped>
.edit-user-modal {
  min-width: 400px;
}
</style>
