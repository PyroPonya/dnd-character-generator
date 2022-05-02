<template>
  <div class="diceRoller">
    <span class="rollerName">DnD 5e ability score (4d6dl)</span>
    <div class="containerBtn">
      <div class="rollBtn btn" @click="diceMultiRoll()">Roll x6</div>
      <div class="rollStandardBtn btn" @click="standardArray()">Standard</div>
    </div>
    <span class="spanHistory">⏷roll with highest value⏷</span>
    <div class="fieldValues">
      <div class="rollVal" id="d1" :d1="d1">{{ d1 }}</div>
      <div class="rollVal" id="d2" :d2="d2">{{ d2 }}</div>
      <div class="rollVal" id="d3" :d3="d3">{{ d3 }}</div>
      <div class="rollVal" id="d4" :d4="d4">{{ d4 }}</div>
      <div class="rollVal" id="d5" :d5="d5">{{ d5 }}</div>
      <div class="rollVal" id="d6" :d6="d6">{{ d6 }}</div>
    </div>
    <span class="spanHistory">⏷last six rolls⏷</span>
    <div class="rollHistory">
      <span class="historySingle" v-for="(roll, index) in lastSixRolls" :key="index"
        >{{ roll }}
      </span>
    </div>
  </div>
</template>

<script setup>
onMounted(() => {
  setDiceValue([0, 0, 0, 0, 0, 0]);
});
let d1 = ref(0);
let d2 = ref(0);
let d3 = ref(0);
let d4 = ref(0);
let d5 = ref(0);
let d6 = ref(0);
let lastSixRolls = ref('');
/*** hero_pool ***/
const StandardArray5E = ['17', '15', '13', '12', '10', '08'];
/*** classic ***/
// const StandardArray5E = ['15', '14', '13', '12', '10', '08'];
let currentRollFull = [0, 0, 0, 0, 0, 0];
const rollHistory = [];

/*** rolls 4d6, turns all 1's into 2's, drops lowest element, returns summ ***/
const diceRoll = () => {
  const currentRoll = [];
  for (let i = 0; i < 4; i++) {
    let dSix = Math.floor(Math.random() * 6 + 1);
    if (dSix == 1) {
      /*** reroll 1's? ***/
      ++dSix;
    }
    currentRoll.push(dSix);
  }
  currentRoll
    .sort(function (a, b) {
      return b - a;
    })
    .pop();
  return currentRoll.reduce((a, b) => a + b, 0);
};

const diceMultiRoll = () => {
  let arrWithMaxNum = [0];
  for (let sixRolls = 0; sixRolls < 6; sixRolls++) {
    currentRollFull = [];
    for (let i = 0; i < 6; i++) {
      currentRollFull[i] = ' ' + diceRoll();
    }
    currentRollFull.sort(function (a, b) {
      return b - a;
    });

    for (let i = 0; i < 6; i++) {
      if (currentRollFull[i] < 10) {
        currentRollFull[i] = ('0' + currentRollFull[i]).replace(/\s/g, '');
      }
    }

    if (rollHistory.length < 6) {
      rollHistory.push(`${currentRollFull.slice(',').join(' - ')}`);
    } else {
      rollHistory.shift();
      rollHistory.push(`${currentRollFull.slice(',').join(' - ')}`);
    }
    lastSixRolls.value = rollHistory;
    if (currentRollFull[0] > arrWithMaxNum[0]) {
      arrWithMaxNum = currentRollFull.map((el) => el);
    } else if (
      currentRollFull[0] == arrWithMaxNum[0] &&
      currentRollFull[1] > arrWithMaxNum[1]
    ) {
      arrWithMaxNum = currentRollFull.map((el) => el);
    } else if (
      currentRollFull[0] == arrWithMaxNum[0] &&
      currentRollFull[1] == arrWithMaxNum[1] &&
      currentRollFull[2] > arrWithMaxNum[2]
    ) {
      arrWithMaxNum = currentRollFull.map((el) => el);
    }
  }
  setDiceValue(arrWithMaxNum);
  /**=============== Situational rules ===============**/
  // input here
};

const setDiceValue = (arr) => {
  d1.value = arr[0] || 0;
  d2.value = arr[1] || 0;
  d3.value = arr[2] || 0;
  d4.value = arr[3] || 0;
  d5.value = arr[4] || 0;
  d6.value = arr[5] || 0;
};

const standardArray = () => {
  setDiceValue(StandardArray5E);
};
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
        // prevent selection start
        user-select: none
        -webkit-user-select: none
        -moz-user-select: none
        -khtml-user-select: none
        -ms-user-select: none
        // prevent selection end
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
    min-height: 203px
    min-width: 270px
    padding: 15px
    background-color: #fff
    border: 2px solid black
    border-radius: 8px
    box-shadow: -6px 3px 3px $color4
    @include flex(column, center, flex-start, 5px)
    .historySingle
      font-size: $fontSizeSmall + 4px
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
</style>
