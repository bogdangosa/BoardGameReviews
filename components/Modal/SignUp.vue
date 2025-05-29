<template>
  <div class="modal">
    <div class="overlay z-0" @click="closeModal"></div>
    <div class="modal-content bg-neutral2 p-8 z-2">
      <span class="close" @click="closeModal">&times;</span>
      <h2 class="mb-4">Sign Up</h2>
      <form @submit.prevent="signUp">
        <div class="form-group">
          <p for="name">Username:</p>
          <input
            data-test="boardgame-title-input"
            class="bg-neutral1 w-full p-4"
            id="name"
            type="text"
            required
            v-model="username"
          />
        </div>
        <div class="form-group">
          <p for="name">email:</p>
          <input
            data-test="boardgame-title-input"
            class="bg-neutral1 w-full p-4"
            id="name"
            type="text"
            required
            v-model="email"
          />
        </div>
        <div class="form-group">
          <p for="name">Password:</p>
          <input
            data-test="boardgame-title-input"
            class="bg-neutral1 w-full p-4"
            id="name"
            type="password"
            required
            v-model="password"
          />
        </div>
        <p class="text-sm text-neutral3">
          you already have an account?
          <span class="login-link font-semibold" v-on:click="openLogin"
            >login</span
          >
        </p>
        <div class="flex justify-end gap-2">
          <Button
            data-test="submit-boardgame-button"
            color="accent1"
            type="submit"
            >Sign Up</Button
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: "close"): void;
  (
    e: "signup",
    payload: { username: string; email: string; password: string }
  ): void;
  (e: "openLogin"): void;
}>();

const username = ref("");
const password = ref("");
const email = ref("");

function signUp() {
  emit("signup", {
    username: username.value,
    email: email.value,
    password: password.value,
  });
}
function closeModal() {
  console.log("close");
  emit("close");
}
function openLogin() {
  emit("openLogin");
}
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.modal-content {
  border-radius: 5px;
  width: 600px;
  max-width: 90%;
}

.close {
  float: right;
  font-size: 32px;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.file-input {
  border-radius: 8px;
}
.login-link {
  color: var(--accent-color-1);
  cursor: pointer;
}
</style>
