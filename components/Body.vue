<template>
  <div class="body">
    <div class="body__item origin">
      <span class="item__tittle">Origin</span>
      <span class="race">race</span>
      <span class="parents">parents</span>
      <span class="family">family</span>
      <span class="lifestyle">lifestyle</span>
      <span class="childhood">childhood</span>
      <span class="memories">memories</span>
      <span class="siblings">siblings</span>
    </div>
    <div class="body__item decisions">
      <span class="item__tittle">Personal&nbsp;decisions</span>
      <span class="background">background</span>
      <span class="background_reason">background_reason</span>
    </div>
    <div class="body__item class">
      <span class="item__tittle">Class&nbsp;training</span>
      <span class="class">class</span>
      <span class="class_reason">class_reason</span>
      <span class="class_trainer">class_trainer</span>
    </div>
    <div class="body__item events">
      <span class="item__tittle">Life&nbsp;events</span>
      <span class="age">age</span>
      <span class="alignment">alignment</span>
      <span class="event">event</span>
      <span class="status">status</span>
    </div>
    <div class="body__item idealsBondsFlaws">
      <span class="item__tittle">Personality</span>
      <span class="ideals">ideals</span>
      <span class="bonds">bonds</span>
      <span class="flaws">flaws</span>
    </div>
    <div class="body__item secrets">
      <span class="item__tittle">Gifts&nbsp;and&nbsp;Secrets</span>
      <span class="secrets">secrets?</span>
    </div>
  </div>
</template>

<script setup></script>

<style lang="sass" scoped>
@import './assets/colors'
@import './assets/mixins'
.body
  @include flex(column, center, center, 5px)
  padding: 5px
  min-height: 100px
  width: 90vw
  background-color: $color1
  border: 1px solid $color5
  border-radius: 8px
  .body__item
    @include flex(column, flex-start, flex-start, 5px)
    min-height: 50px
    width: 100%
    padding: 5px 15px
    border: 1px solid $color5
    border-radius: 8px
    .item__tittle
      text-decoration: underline
</style>
