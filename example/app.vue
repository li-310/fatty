<template>
  <div>
    <div>Loading test</div>
    <button @click="show">show Loading</button>
    <button @click="hide">hide Loading</button>
    <p><Hello /></p>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  methods: {
    show() {
      console.log(1)
    },
    hide() {
      console.log(2)
    },
  },
}
</script>

<style lang="less" scoped></style>
