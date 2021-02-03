<template>
  <div class="q-pa-md">
    <q-table
      title="Users"
      row-key="id"
      class="users-table"
      :data="users"
      :columns="columns"
      :loading="loading"
      bordered
      flat
      :filter="filter"
      :pagination.sync="pagination"
      @request="onRequest"
    >
      <template v-slot:top>
        <!-- Button ADD -->
        <q-btn
          outline
          rounded
          :label="$t('AddUser')"
          :disable="loading"
          icon="add"
          @click="addUserModal = true"
        />

        <q-space />

        <!-- Search bar -->
        <q-input
          bordered
          dense
          debounce="300"
          color="primary"
          :placeholder="$t('Search')"
          v-model="filter"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <!-- Column ID -->
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>

          <!-- Column NAME -->
          <q-td key="name" :props="props" class="text-subtitle2">
            {{ props.row.name }}
          </q-td>

          <!-- Column EMAIL -->
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>

          <!-- Column ROLE -->
          <q-td key="roles" :props="props">
            <q-badge :color="props.row.role == 'admin' ? 'primary' : 'green-5'">
              {{ props.row.role | capitalizeLetter }}
            </q-badge>
          </q-td>

          <!-- Column STATUS  -->
          <q-td key="status" :props="props">
            <q-badge :color="props.row.status ? 'primary' : 'accent'">
              {{ props.row.status | isActive }}
            </q-badge>
          </q-td>

          <!-- Button EDIT -->
          <q-td auto-width>
            <q-btn
              class="q-ma-sm"
              flat
              size="sm"
              color="primary"
              round
              dense
              @click="editUser(props.row.id)"
              icon="edit"
            />

            <!-- Button REMOVE -->
            <q-btn
              class="q-ma-sm"
              size="sm"
              color="accent"
              round
              dense
              @click="removeUser(props.row.id)"
              icon="remove"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!-- Modal Add User -->
    <q-dialog v-model="addUserModal">
      <add-user @close="addUserModal = false" />
    </q-dialog>

    <!-- Modal Edit User -->
    <q-dialog v-model="editUserModal" @hide="closeEditUser">
      <edit-user @close="closeEditUser" :user="modals.editUserData" />
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      modals: {
        editUserData: {}
      },
      loading: false,
      filter: "",
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 5
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "id",
          required: true,
          label: this.$t("ID"),
          align: "left",
          field: row => row.id,
          sortable: true
        },
        {
          name: "name",
          align: "center",
          label: this.$t("Name"),
          field: "name",
          sortable: true
        },
        {
          name: "email",
          align: "center",
          label: this.$t("Email"),
          field: "email",
          sortable: true
        },
        {
          name: "roles",
          align: "center",
          label: this.$t("Permission"),
          field: "role"
        },
        {
          name: "status",
          align: "center",
          label: this.$t("Status"),
          field: "isActive"
        },
        { name: "actions", align: "center", label: this.$t("Actions") }
      ],
      data: []
    };
  },
  components: {
    "add-user": require("components/Settings/UsersSettings/Modals/AddUser")
      .default,
    "edit-user": require("components/Settings/UsersSettings/Modals/EditUser")
      .default
  },
  methods: {
    ...mapActions("users", [
      "getUsers",
      "deleteUser",
      "setAddUserModal",
      "setEditUserModal",
      "setPagination"
    ]),
    onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      console.log("props:", props);

      this.setPagination({
        page: page,
        limit: rowsPerPage
      });
    },
    editUser(userId) {
      let selectedUser = this.users.find(x => x.id === userId);
      this.modals.editUserData = Object.assign({}, selectedUser);
      this.editUserModal = true;
    },
    removeUser(userId) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to Delete this User?",
          cancel: true
          //persistent: true
        })
        .onOk(() => {
          this.deleteUser(userId);
        });
    },
    closeEditUser() {
      this.editUserModal = false;
      this.modals.editUserData = {};
    }
  },
  mounted() {
    this.onRequest({
      pagination: this.pagination
    });
    this.getUsers();
  },

  computed: {
    ...mapState("users", ["users"]),
    ...mapGetters("users", ["showAddUserModal", "showEditUserModal"]),

    addUserModal: {
      get() {
        return this.showAddUserModal;
      },
      set(value) {
        this.setAddUserModal(value);
      }
    },

    editUserModal: {
      get() {
        return this.showEditUserModal;
      },
      set(value) {
        this.setEditUserModal(value);
      }
    }
  },
  watch: {
    pagination: function() {
      this.onRequest({
        pagination: this.pagination
      });
      this.getUsers();
    }
  },
  filters: {
    capitalizeLetter(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    // isAdmin(value) {
    //   if (value) return "admin";
    //   else return "user";
    // },
    isActive(value) {
      if (value) return "Enabled";
      else return "Disabled";
    }
  }
};
</script>
<style lang="scss">
.users-table thead,
tr {
  background-color: #adadad2b;
}
</style>
