<template>
  <button :class="'my-button bg-' + colorBackground + ' c-' + color">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "AddButton",
  props: {
    color: {
      type: String,
      default: "background1",
    },
    colorBackground: {
      type: String,
      default: "accent2",
    },
  },
};
</script>

<style scoped>
button {
  padding: 8px 24px;
  border: none;
  height: fit-content;
  border-radius: 5px;
  cursor: pointer;
  animation: 0.3s;
}

button:hover {
  filter: brightness(90%);
}
</style>
