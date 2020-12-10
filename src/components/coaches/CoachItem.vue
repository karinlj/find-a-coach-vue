<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <!-- no slot in base-badge -->
      <base-badge
        v-for="(area, index) in areas"
        :key="index"
        :type="area"
        :title="area"
      ></base-badge>
      <!-- <span v-for="(area, index) in areas" :key="index"> {{ area }}</span> -->
    </div>
    <div class="actions">
      <!-- link=true therefore button is a link -->
      <base-btn link :to="contactLink" mode="outline">Contact</base-btn>
      <base-btn link :to="detailsLink">View Details</base-btn>
    </div>
  </li>
</template>

<script>
import BaseBtn from "../ui/BaseBtn.vue";
export default {
  name: "CoachItem",
  components: { BaseBtn },
  //ej bindestreck i props här
  props: ["id", "firstname", "lastname", "areas", "rate"],
  computed: {
    fullName() {
      //firstname+lastname
      return this.firstname + " " + this.lastname;
    },
    contactLink() {
      //contactLink
      //this.$route.path if I'd change the coaches path
      //   return this.$route.path + "/" + this.id + "/contact";
      return "/coaches/" + this.id + "/contact";
      // coaches/c1/contact
    },
    detailsLink() {
      //detailsLink
      return "/coaches/" + this.id;
      // coaches/c1

      // return this.$route.params.id;
    },
  },
  //   created() {
  //     console.log("coaches-getter", this.$store.getters["coaches/coaches"]);
  //   },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
