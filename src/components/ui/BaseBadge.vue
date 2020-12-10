<template>
  <span class="badge" :class="type">
    <!-- no slot here -->
    {{ text }}
  </span>
</template>

<script>
export default {
  name: "BaseBadge",
  props: ["type", "title"],
  computed: {
    text() {
      return this.title.toUpperCase();
    },
  },
};
</script>

<style>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.3rem 1rem;
  display: inline-block;
  margin-right: 0.5rem;
  font-size: 80%;
}

.frontend {
  background-color: #3d008d;
  color: white;
}

.backend {
  background-color: #71008d;
  color: white;
}

.career {
  background-color: #8d006e;
  color: white;
}
</style>
