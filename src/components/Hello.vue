<script setup>
import { ref } from 'vue-demi'
import { Button } from '../bridgeUi';

const greeting = ref('Hello World!')
const fn = () => {
  alert('click')
}
</script>

<template>
  <div>
    <p>{{ greeting }}</p>
    123<Button @click="fn">1</Button>
  </div>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>