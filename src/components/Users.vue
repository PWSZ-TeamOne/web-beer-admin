<template>
  <v-container>
    <v-row>
      <v-card class="w-100">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="users" :search="search">
          <template v-slot:[`item.active`]="{ item }">
            <v-simple-checkbox
              @click="setActive(item)"
              v-model="item.active"
            ></v-simple-checkbox>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import store from "../store";
export default {
  name: "Users",
  data() {
    return {
      users: [],
      search: "",
      headers: [
        { text: "Email", value: "email" },
        { text: "Active", value: "active" },
      ],
    };
  },
  methods: {
    getUsers() {
      db.collection("users").onSnapshot((querySnapshot) => {
        let allUsers = [];
        querySnapshot.forEach((doc) => {
          allUsers.push(doc.data());
        });

        this.users = allUsers;
      });
    },
    setActive(item) {
      db.collection("users")
        .where("email", "==", item.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            db.collection("users").doc(doc.id).update({
              active: item.active,
            });
          });
        });
    },
  },
  created() {
    this.getUsers();
  },
};
</script>

<style scoped>
</style>
