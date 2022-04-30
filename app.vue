<template>
  <div id="app">
    <Header />
    <NuxtPage />
  </div>
</template>

<script setup>
useHead({
  title: 'DnD-CharGen',
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
});
</script>

<style lang="sass">
@import './assets/variables'
@import './assets/mixins'
*
  text-decoration: none
  box-sizing: border-box
  padding: 0
  margin: 0
  font-family: "Avenir", Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
#app
  min-height: 100vh
  min-width: 100vw
  background-color: $color5
  color: $color5
  @include flex(column, center, flex-start, 15px)
</style>
