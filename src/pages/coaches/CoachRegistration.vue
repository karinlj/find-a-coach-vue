<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <CoachForm @save-data="saveData"></CoachForm>
    </base-card>
  </section>
</template>

<script>
import CoachForm from "../../components/coaches/CoachForm";
export default {
  name: "CoachRegistration",
  components: {
    CoachForm,
  },

  methods: {
    saveData(formData) {
      //communicate with store - dispatch action
      this.$store.dispatch("coaches/registerCoach", formData);
      //redirect
      // this.$router.push("/coaches");
      //cannot go back with arrow
      this.$router.replace("/coaches");
    },
  },
};
</script>

<style></style>
