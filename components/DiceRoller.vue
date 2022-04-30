<template>
  <div class="diceRoller">
    <span class="rollerName">DnD 5e ability score roller (4d6kh)</span>
    <div class="containerBtn">
      <div class="rollBtn btn">Roll x6</div>
      <div class="rollStandardBtn btn">Standard array</div>
    </div>
    <span class="spanHistory">⏷roll with highest value⏷</span>
    <div class="fieldValues">
      <div class="rollVal" id="d1">10</div>
      <div class="rollVal" id="d2">10</div>
      <div class="rollVal" id="d3">10</div>
      <div class="rollVal" id="d4">10</div>
      <div class="rollVal" id="d5">10</div>
      <div class="rollVal" id="d6">10</div>
    </div>
    <span class="spanHistory">⏷last 6 rolls saved below⏷</span>
    <div class="rollHistory">
      <span>10 - 10 - 10 - 10 - 10 - 10</span>
      <span>10 - 10 - 10 - 10 - 10 - 10</span>
      <span>10 - 10 - 10 - 10 - 10 - 10</span>
      <span>10 - 10 - 10 - 10 - 10 - 10</span>
      <span>10 - 10 - 10 - 10 - 10 - 10</span>
      <span>10 - 10 - 10 - 10 - 10 - 10</span>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="sass" scoped>
@import './assets/variables'
@import './assets/mixins'

.diceRoller
  @include flex(column, center, center, 0.5%)
  padding: 2%
  min-height: 100px
  width: 90vw
  height: 90vh
  background-color: $color1
  border: 1px solid $color5
  border-radius: 8px
  .rollerName
    font-size: $fontSizeMedium + 6px
    margin-bottom: 10px
  .containerBtn
      @include flex(row, center, center, 15px)
      .btn
        @include flex(row, center, center, 0)
        height: 50px
        width: 120px
        color: $color5
        padding: 10px
        font-size: $fontSizeSmall + 4px
        background-color: $color2
        border: 1px solid $color5
        border-radius: 8px
        box-shadow: -6px 3px 3px $color4
        transition: all 0.2s ease-out
        cursor: pointer
        &:hover
          color: $color3
          border-color: $color3
          background-color: $color5
        &:active
          transform: translate(-6%, 6%)
          box-shadow: -1px 1px 3px $color4
  .fieldValues
    @include flex(row, center, center, 10px)
    .rollVal
      @include flex(row, center, center, 0)
      background-color: #fff
      height: 40px
      width: 40px
      border: 2px solid black
      border-radius: 8px
      box-shadow: -6px 3px 3px $color4
      font-size: $fontSizeMedium + 6px
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
  .rollHistory
    min-height: 197px
    min-width: 270px
    padding: 15px
    background-color: #fff
    border: 2px solid black
    border-radius: 8px
    box-shadow: -6px 3px 3px $color4
    font-size: $fontSizeSmall + 4px
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
    @include flex(column, center, flex-start, 5px)
</style>
