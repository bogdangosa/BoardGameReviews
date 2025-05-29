<template>
  <main class="home-page flex flex-col justify-center items-center">
    <div class="container p-6">
      <h1>Account page</h1>
      <div v-if="!userData?.userId">
        <p>You are not logged in.</p>
        <NuxtLink to="/">
          <button class="back-home-button">Back to Home</button>
        </NuxtLink>
      </div>
      <div v-else class="user-info-container">
        <h2>User Info:</h2>
        <div class="user-info">
          <p>Username: {{ userData?.username }}</p>
          <Button>Change Password</Button>
        </div>
      </div>
      <div v-if="userData.isAdmin" class="monitored-users-container">
        <h3>Monitored Users:</h3>
        <div class="monitored-users-list">
          <div class="logs-card-list">
            <div v-for="user in monitoredUsers" class="logs-card-container">
              <CardMonitoredUser :key="user.userId" :monitoredUser="user" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="userData.isAdmin" class="monitored-users-container">
        <h3>Logs:</h3>
        <Button @click="deleteAllLogsAsync">Delete All Logs</Button>
        <div class="logs-card-list">
          <div v-for="log in allLogs" class="logs-card-container">
            <CardLog :key="log.logId" :log="log" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { getAllLogs } from "~/api/Log";
import deleteAllLogs from "~/api/Log/deleteAllLogs";
import { getMonitoredUsers } from "~/api/User";

const { userData } = inject<{ userData: any }>("userData") || {};

const allLogs = ref([] as ILog[]);

const monitoredUsers = ref([] as IMonitoredUser[]);

async function getAllLogsAsync() {
  const response = await getAllLogs(userData.value.accessToken);
  if (response) {
    allLogs.value = response.slice(0, 16);
  }
}
getAllLogsAsync();

async function getMonitoredUsersAsync() {
  const response = await getMonitoredUsers(userData.value.accessToken);
  if (response) {
    monitoredUsers.value = response;
  }
}
getMonitoredUsersAsync();

async function fetchMonitoredUsers() {}

async function deleteAllLogsAsync() {
  deleteAllLogs(userData.value.accessToken)
    .then(() => {
      allLogs.value = [];
      getAllLogsAsync();
    })
    .catch((error) => {
      console.error("Error deleting logs:", error);
    });
}
</script>

<style>
.logs-card-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
