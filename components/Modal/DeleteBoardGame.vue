<template>
  <div class="modal">
    <div class="overlay z-0" @click="closeModal"></div>
    <div class="modal-content bg-neutral2 p-8 z-2">
      <h2 class="mb-4">Are you sure you want to delete this?</h2>
      <div class="flex w-full justify-end gap-2">
        <Button color="neutral3" @click="closeModal">Cancel</Button>
        <Button color="red" @click="deleteBoardGame">Delete</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "DeleteBoardGame",
  setup() {
    const boardGameName = ref("");
    const boardGameDescription = ref("");
    return { boardGameName, boardGameDescription };
  },

  methods: {
    closeModal() {
      this.$emit("close");
    },
    deleteBoardGame() {
      this.$emit("deleteBoardgame");
      this.closeModal();
    },
  },
};
</script>

<style>
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
</style>
