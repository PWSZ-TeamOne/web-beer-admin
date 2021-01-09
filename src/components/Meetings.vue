<template>
  <v-container>
    <v-row>
      <v-card class="w-100 px-5">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="meetings" :search="search">
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
  name: "Meetings",
  data() {
    return {
      meetings: [],
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          filterable: false,
          value: "name",
        },
        { text: "Code", value: "code" },
        { text: "Address", value: "address" },
        { text: "Aktywny", value: "active" },
      ],
    };
  },
  methods: {
    getMettings() {
      db.collection("events").onSnapshot((querySnapshot) => {
        let allMeetings = [];
        querySnapshot.forEach((doc) => {
          allMeetings.push(doc.data());
        });
        this.meetings = allMeetings;
      });
    },
    setActive(item) {
      db.collection("events")
        .where("id", "==", item.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            db.collection("events").doc(doc.id).update({
              active: item.active,
            });
          });
        });
    },
  },
  created() {
    this.getMettings();
  },
};
</script>

<style scoped>
</style>
