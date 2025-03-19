<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
* {
  --accent-color-1: #67069c;
  --accent-color-2: #ed11e2;
  --text-color-1: #1d1d1d;
  --text-color-2: #2c2c2c;
  --text-color-3: #555555;
  --background-color-1: #f6f6f6;
  --background-color-2: #eeeeee;
  --red: #d22b2b;
  --green: #2ed22e;
  font-family: "Noto Sans", sans-serif;
}
.bold {
  font-weight: 600;
}

.bg-accent2 {
  background-color: var(--accent-color-2);
}
.bg-accent1 {
  background-color: var(--accent-color-1);
}
.bg-red {
  background-color: var(--red);
}
.bg-green {
  background-color: var(--green);
}
.bg-neutral1 {
  background-color: var(--background-color-1);
}
.bg-neutral2 {
  background-color: var(--background-color-2);
}

h1 {
  font-size: 40px;
  font-weight: 700;
}
h2 {
  font-size: 28px;
  font-weight: 600;
}
p {
  font-size: 18px;
  font-weight: 400;
}
</style>
