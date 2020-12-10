<template>
  <div>
    <!--base-dialog teleported to the body -->
    <!-- if error is truthy, it's converted to a real boolean -->
    <base-dialog :show="!!error" title="An error occurred." @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section class="list">
      <CoachFilter @change-filter="setFilters"></CoachFilter>
    </section>
    <section class="">
      <base-card>
        <div class="controls">
          <!-- force refresh -->
          <base-btn mode="outline" @click="loadCoaches(true)">Refresh</base-btn>
          <!-- <base-btn mode="outline" :handleClick="loadCoaches">Refresh</base-btn> -->
          <!-- link=true therefore button is a link -->
          <base-btn v-if="!isLoading && !isCoach" link to="register">Register as Coach</base-btn>
        </div>
        <div v-if="isLoading">
          <!-- render spinner if loading -->
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="haveCoaches">
          <CoachItem
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstname="coach.firstname"
            :lastname="coach.lastname"
            :areas="coach.areas"
            :rate="coach.hourlyRate"
          ></CoachItem>
        </ul>
        <h3 v-else>No Coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem";
import CoachFilter from "../../components/coaches/CoachFilter";

export default {
  name: "CoachesList",
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isCoach() {
      //control if showing register btn
      // console.log("isCoach", this.$store.getters["coaches/isCoach"]);
      return this.$store.getters["coaches/isCoach"];
    },
    filteredCoaches() {
      //Knepigt här...
      //namespace-key and getter-name
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter((coach) => {
        //if I want to show frontend-coaches && the specific coach has frontend
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    haveCoaches() {
      //if not loading
      return !this.isLoading && this.$store.getters["coaches/haveCoaches"];
    },
  },
  methods: {
    setFilters(updatedFilters) {
      //when new filters are emitted the activeFilters should be overwritten
      this.activeFilters = updatedFilters;
    },

    //async/await to wait for promise to complete
    async loadCoaches(refresh = false) {
      console.log("refreshing");
      this.isLoading = true;
      //loadCoaches from db
      //dispatch returns a promise
      //listen to when promise is completed = finished loading
      try {
        await this.$store.dispatch("coaches/loadCoaches", { forceRefresh: refresh });
      } catch (error) {
        //do something if error
        this.error = error.message || "Something went wrong!";
        console.log("error_loadCoaches: ", error);
      }

      //isLoading finished
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
