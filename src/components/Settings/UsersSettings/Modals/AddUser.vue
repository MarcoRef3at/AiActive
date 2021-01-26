<template>
  <q-card class="add-user-modal">
    <modal-header>Add User</modal-header>

    <!-- <form @submit.prevent="submitForm">
      <q-card-section>
        <modal-user-name :name.sync="userData.userName" ref="modalUserName" />

        <modal-user-email :email.sync="userData.email" ref="modalUserEmail" />

        <div class="row q-mb-sm justify-start">
          <modal-user-permission
            :isAdmin.sync="userData.isAdmin"
            ref="modalUserPermission"
          />

          <q-space />

          <modal-user-status
            :isActive.sync="userData.isActive"
            ref="modalUserStatus"
          />
        </div>

        <modal-user-password
          :password.sync="userData.userPassword"
          ref="modalUserPassword"
        />

        <modal-user-confirm-password
          :confirmPassword.sync="userData.userConfirmPassword"
          ref="modalUserConfirmPassword"
        />

        <modal-user-form-error :error="form.error">
          {{ form.message }}
        </modal-user-form-error>
      </q-card-section>

      <modal-buttons></modal-buttons>
    </form> -->
  </q-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      userData: {
        userName: "",
        email: "",
        isAdmin: false,
        isActive: true,
        userPassword: "",
        userConfirmPassword: ""
      }
      //   form: {
      //     error: false,
      //     message: "Password Fields must be identical!"
      //   }
    };
  },
  watch: {
    // "userData.userPassword": function(newVal, oldVal) {
    //   if (newVal) this.form.error = false;
    // },
    // "userData.userConfirmPassword": function(newVal, oldVal) {
    //   if (newVal) this.isMatched();
    // }
  },
  components: {
    // "modal-header": require("components/Settings/UsersSettings/Modals/Shared/ModalHeader")
    //   .default,
    // "modal-user-name": require("components/Settings/UsersSettings/Modals/Shared/ModalUserName")
    //   .default,
    // "modal-user-email": require("components/Settings/UsersSettings/Modals/Shared/ModalUserEmail")
    //   .default,
    // "modal-user-permission": require("components/Settings/UsersSettings/Modals/Shared/ModalUserPermission")
    //   .default,
    // "modal-user-status": require("components/Settings/UsersSettings/Modals/Shared/ModalUserStatus")
    //   .default,
    // "modal-user-password": require("components/Settings/UsersSettings/Modals/Shared/ModalUserPassword")
    //   .default,
    // "modal-user-confirm-password": require("components/Settings/UsersSettings/Modals/Shared/ModalUserConfirmPassword")
    //   .default,
    // "modal-user-form-error": require("components/Settings/UsersSettings/Modals/Shared/ModalUserFormError")
    //   .default,
    // "modal-buttons": require("components/Settings/UsersSettings/Modals/Shared/ModalButtons")
    //   .default
  },
  methods: {
    // ...mapActions("users", ["addUser"]),
    // submitForm() {
    //   let nameValidation = this.$refs.modalUserName.$refs.name;
    //   let emailValidation = this.$refs.modalUserEmail.$refs.email;
    //   let passwordValidation = this.$refs.modalUserPassword.$refs.password;
    //   let confirmPasswordValidation = this.$refs.modalUserConfirmPassword.$refs
    //     .confirmPassword;
    //   nameValidation.validate();
    //   emailValidation.validate();
    //   passwordValidation.validate();
    //   confirmPasswordValidation.validate();
    //   if (
    //     !nameValidation.hasError &&
    //     !emailValidation.hasError &&
    //     !passwordValidation.hasError &&
    //     !confirmPasswordValidation.hasError
    //   ) {
    //     if (this.isMatched()) {
    //       // check if password field is identical
    //       console.log("adding user");
    //       this.addUser(this.userData);
    //     }
    //   }
    // },
    // isMatched() {
    //   if (this.userData.userPassword == this.userData.userConfirmPassword) {
    //     this.form.error = false;
    //     return true;
    //   } else {
    //     this.form.error = true;
    //     return false;
    //   }
    // }
  },
  mounted() {
    //console.log('userr::', this.userrr);
  }
};
</script>
<style scoped>
.add-user-modal {
  min-width: 400px;
}
</style>
