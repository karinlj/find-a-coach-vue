<template>
  <div>
    <!-- if error is truthy, it's converted to a real boolean -->
    <base-dialog :show="!!error" title="An error occurred." @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests recieved</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>

        <ul v-else-if="hasRequests && !isLoading">
          <requestItem
            v-for="(req, index) in recievedRequests"
            :key="index"
            :email="req.userEmail"
            :message="req.message"
          ></requestItem>
        </ul>
        <h3 v-else>You have not recieved any requests yet...</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import requestItem from "../../components/requests/requestItem";
export default {
  name: "RequestsRecieved",
  components: {
    requestItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    //get access to requests to coach logged in in vuex via a getter
    recievedRequests() {
      return this.$store.getters["requests/getRequests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("requests/fetchRequests");
      } catch (error) {
        console.log("error_loadRequests: ", error.message);
        this.error = error.message || "Something failed.";
      }

      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadRequests();
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
