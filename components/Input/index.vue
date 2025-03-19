<template>
  <input
    class="bg-neutral1 w-full p-8"
    :id="id"
    :type="type"
    :value="value"
    @input="$emit('update:value', $event.target.value)"
  />
</template>

<script>
export default {
  name: "Input",
  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped></style>
