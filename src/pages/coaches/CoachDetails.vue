<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-btn link :to="contactLink">Contact</base-btn>
        </header>
        <!-- extra router-view for child route -->
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge v-for="(area, index) in areas" :key="index" :type="area" :title="area">
        </base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>

    <!-- <router-link to="/coaches/c1/contact">Contact</router-link> -->
  </div>
</template>

<script>
export default {
  name: "CoachDetails",
  //this prop is part of url in this component
  //the comp is loaded through routing - props:true in routing
  props: ["id"],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstname + " " + this.selectedCoach.lastname;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
    contactLink() {
      return "/coaches/" + this.id + "/contact";
      // return this.$route.path + "/" + this.id + "/contact";
    },
  },
  created() {
    //find the right coach.id that matches the url-id
    this.selectedCoach = this.$store.getters["coaches/coaches"].find((coach) => {
      return coach.id === this.id;
    });
  },
};
</script>

<style></style>
