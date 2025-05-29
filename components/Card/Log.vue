<template>
  <div class="log-card">
    <div class="log-card-header">
      <span>Action Performed</span>
      <span class="log-date">{{ log.date }}</span>
    </div>
    <div class="log-card-body">
      <p><strong>Action:</strong> {{ log.action }}</p>
      <p><strong>Details:</strong> A user has performed an action.</p>
    </div>
    <div class="log-card-footer">
      <span
        >User ID: <span class="user-id">{{ log.userId }}</span></span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "LogCard",
  props: {
    log: {
      type: Object,
      required: true,
      default: () => ({
        logId: 0,
        date: "",
        action: "",
        userId: 0,
      }),
    },
  },
};
</script>

<style scoped>
.log-card {
  width: 300px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.log-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.log-card-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 10px;
}

.log-card-header .log-date {
  color: #777;
  font-size: 12px;
}

.log-card-body {
  margin-bottom: 10px;
  color: #333;
}

.log-card-footer {
  font-size: 12px;
  color: #555;
}

.log-card-footer .user-id {
  color: #007bff;
  font-weight: bold;
}
</style>
