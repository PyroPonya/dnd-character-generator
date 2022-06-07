<template>
  <div class="header">
    <NuxtLink class="header__link" to="/chargen">
      <span>Builder</span>
    </NuxtLink>
    <NuxtLink class="header__link" to="/roller">
      <span>Roller</span>
    </NuxtLink>
    <span class="header__title">
      <div class="logo"></div>
      DnD&nbsp;Character&nbsp;Generator</span
    >
  </div>
</template>

<script setup></script>

<style lang="sass" scoped>
@import './assets/variables'
@import './assets/mixins'
.header
  @include flex(row, center, flex-start, 15px)
  background-color: $color1
  min-height: 50px
  min-width: 500px
  width: 100%
  padding: 0.5% 2.5%
  .logo
    height: 50px
    width: 50px
    margin: 0 10px
    background-image: url('/assets/images/icon_1.png')
    background-size: contain
    background-position: center
  .header__title
    @include flex(row, center, flex-start, 0)
    font-size: $fontSizeBig
    margin: 0 5%
    color: $color5
    text-shadow: $color4 -3px 3px 6px
    @media screen and (max-width: 800px)
      font-size: $fontSizeSmall
  .header__link
    color: $color5
    padding: 10px
    border: 1px solid $color5
    border-radius: 8px
    transition: all 0.2s ease-out
    font-size: $fontSizeMedium
    &:hover
      color: $color3
      border-color: $color3
      background-color: $color5
      box-shadow: -6px 3px 3px $color4
    &:active
      transform: translate(-6%, 6%)
      box-shadow: -1px 1px 3px $color4
</style>
