<template>
  <div class="monitored-user-card p-4 rounded-lg shadow-md bg-white">
    <h3 class="text-xl font-bold">
      Monitored User #{{ monitoredUser.userId }}
    </h3>
    <p>
      <strong>Monitored Since:</strong>
      {{ new Date(monitoredUser.monitoredSince).toLocaleDateString() }}
    </p>
    <div class="user-info mt-2">
      <h4 class="text-lg font-semibold">User Info</h4>
      <p><strong>Name:</strong> {{ monitoredUser.user.username }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MonitoredUserCard",
  props: {
    monitoredUser: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.monitored-user-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
}
.user-info {
  margin-top: 0.5rem;
}
</style>
