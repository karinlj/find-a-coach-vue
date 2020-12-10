<template>
  <section class="not-found">
    <base-card>
      <h2>Page not found.</h2>
      <p>
        this page could not be found. Check out all our
        <router-link to="/coaches">coaches.</router-link>
      </p>
    </base-card>
  </section>
</template>

<script>
export default {
  name: "NotFound",
  props: [],
};
</script>

<style></style>
