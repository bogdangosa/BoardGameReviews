<template>
  <div class="modal">
    <div class="overlay z-0" @click="closeModal"></div>
    <div class="modal-content bg-neutral2 p-8 z-2">
      <h2>Send Verification email code</h2>
      <Button @click="sendVerificationCode">send code</Button>
    </div>
  </div>
</template>

<script lang="ts">
import verifyEmail from "~/api-calls/User/verifyEmail";

export default {
  name: "VerifyEmailCode",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async sendVerificationCode() {
      console.log("sending code");
      await verifyEmail(this.user.userId);
    },
  },
};
</script>

<style></style>
