<template>
  <q-card class="edit-user-modal">
    <!-- Modal Header -->
    <modal-header>Edit User</modal-header>

    <form @submit.prevent="submitForm">
      <q-card-section>
        <!-- UserName -->
        <modal-user-name :name.sync="user.name" ref="modalUserName" />

        <!-- Email -->
        <modal-user-email :email.sync="user.email" ref="modalUserEmail" />

        <div class="row q-mb-sm justify-start">
          <!-- Permission/Role -->
          <modal-user-permission
            :role.sync="user.role"
            ref="modalUserPermission"
          />

          <q-space />

          <!-- Status -->
          <modal-user-status :status.sync="user.status" ref="modalUserStatus" />
        </div>

        <!-- Reset Password -->
        <modal-user-reset-password @resetPassword="resetPassword = $event" />

        <!-- Reset Password Warning -->
        <modal-user-form-error :error="resetPassword">
          default user Password is (Password)
        </modal-user-form-error>
      </q-card-section>

      <!-- Button Save -->
      <modal-buttons :loading="loading" />
    </form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["user"],
  data() {
    return {
      resetPassword: false,
      loading: false
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
    ...mapActions("users", ["updateUser"]),

    submitForm() {
      // FrontEnd Validation
      let nameValidation = this.$refs.modalUserName.$refs.name;
      nameValidation.validate();
      let emailValidation = this.$refs.modalUserEmail.$refs.email;
      emailValidation.validate();

      if (!nameValidation.hasError && !emailValidation.hasError) {
        this.loading = true;
        if (this.resetPassword) {
          this.user.resetPassword = true;
        }
        //todo: filter payload before send
        this.updateUser(this.user).finally(() => {
          this.loading = false;
        });
      }
    }
  },
  mounted() {}
};
</script>
<style scoped>
.edit-user-modal {
  min-width: 400px;
}
</style>
