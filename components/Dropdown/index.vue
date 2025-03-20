<template>
  <div class="bg-neutral1 p-2 rounded-lg w-fit">
    <select class="outline-none" v-model="selectedOption">
      <option value="" disabled selected>Select an option</option>
      <option v-for="option in options" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  options: string[];
}>();

const emit = defineEmits<{
  (e: "update:selectedOption", value: string): void;
}>();

const selectedOption = ref("");

watch(selectedOption, (newValue) => {
  console.log("here:", newValue);
  emit("update:selectedOption", newValue);
});
</script>

<script lang="ts" setup></script>

<style></style>
