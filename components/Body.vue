<template>
  <div class="body">
    <div class="control">
      <div class="control__element control__btn" @click="generateActer">Generate</div>
    </div>
    <div class="body__item origin">
      <span class="item__tittle">Origin</span>
      <span v-if="generated.race">race:&nbsp;{{ generated.race }}</span>
      <span v-if="generated.birthplace">birthplace:&nbsp;{{ generated.birthplace }}</span>
      <span v-if="generated.parents">parents:&nbsp;{{ generated.parents }}</span>
      <span v-if="generated.siblings">siblings:&nbsp;{{ generated.siblings }}</span>
    </div>
    <div class="body__item decisions">
      <span class="item__tittle">Personal&nbsp;decisions</span>
      <span v-if="generated.background"
        >background:&nbsp;{{ generated.background[0] }}</span
      >
      <span v-if="generated.background"
        >background_reason:&nbsp;{{ generated.background[1] }}</span
      >
    </div>
    <div class="body__item class">
      <span class="item__tittle">Class&nbsp;training</span>
      <span v-if="generated.class">class:&nbsp;{{ generated.class.class }}</span>
      <span v-if="generated.class">class_reason:&nbsp;{{ generated.class.reason }}</span>
      <span v-if="generated.class">quirk:&nbsp;{{ generated.class.quirk }}</span>
    </div>
    <div class="body__item events">
      <span class="item__tittle">Life&nbsp;events</span>
      <span v-if="generated.age">age:&nbsp;{{ generated.age }}</span>
      <span v-if="generated.home">home:&nbsp;{{ generated.home }}</span>
      <span v-if="generated.friends">friends:&nbsp;{{ generated.friends }}</span>
      <span v-if="generated.lifestyle">lifestyle:&nbsp;{{ generated.lifestyle }}</span>
      <span v-if="generated.events"
        >events:&nbsp;
        <span v-for="(el, id) in generated.events" :key="id" class="singleEvent">
          {{ id + 1 }}.&nbsp;{{ el }}
        </span>
      </span>
      <span v-if="generated.alignment">alignment:&nbsp;{{ generated.alignment }}</span>
    </div>
    <div class="body__item idealsBondsFlaws">
      <span class="item__tittle">Personality</span>
      <span v-if="generated.tibf"
        >traits:&nbsp;
        <span v-for="(el, id) in generated.tibf.traits" :key="id" class="singleEvent">
          {{ el }}
        </span>
      </span>
      <span v-if="generated.tibf"
        >ideals:&nbsp;
        <span v-for="(el, id) in generated.tibf.ideals" :key="id" class="singleEvent">
          {{ el }}
        </span>
      </span>
      <span v-if="generated.tibf"
        >bonds:&nbsp;
        <span v-for="(el, id) in generated.tibf.bonds" :key="id" class="singleEvent">
          {{ el }}
        </span>
      </span>
      <span v-if="generated.tibf"
        >flaws:&nbsp;
        <span v-for="(el, id) in generated.tibf.flaws" :key="id" class="singleEvent">
          {{ el }}
        </span>
      </span>
    </div>
    <div class="body__item secrets">
      <span class="item__tittle">Secrets</span>
      <span v-if="generated.secrets"
        >line:&nbsp;
        <span v-for="(el, id) in generated.secrets" :key="id" class="singleEvent">
          {{ el }}
        </span>
      </span>
      <span v-if="generated.source">race&nbsp;source:&nbsp;{{ generated.source }}</span>
    </div>
  </div>
</template>

<script setup>
const generated = ref({});
const dndData = useDnData();

// Wanna do api.js?
// const names = [
//   'background',
//   'class',
//   'events',
//   'life',
//   'race',
//   'secrets',
//   'traitsIdealsBondsFlaws',
// ];
//
// for (let nameId in names) {
//   fetch(`./assets/data/${names[nameId]}.json`)
//     .then((resp) => resp.json())
//     .then((data) => {
//       dndData.value[`${names[nameId]}`] = data;
//     });
// }

const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * max + min);
};
const getLength = (elem) => {
  let count = 0;
  for (let item in elem) {
    count++;
  }
  return count;
};
const getClassic = (elem) => {
  const tempArr = [];
  for (let item in elem) {
    tempArr.push(item);
  }
  return tempArr;
};

const generateActer = () => {
  // reset
  generated.value = {};

  const getEvents = (exp) => {
    const minQuantity = Math.floor(Math.trunc(exp / 50));
    const quantity = parseInt(Math.floor(Math.random() * 10 + minQuantity));
    const advLength = getLength(dndData.value.events.adventures);
    const nums = [];
    const events = [];
    for (let i = 0; i < quantity; i++) {
      nums.push(parseInt(Math.floor(Math.random() * advLength - 1)));
    }
    for (let num in nums) {
      if (dndData.value.events.adventures[nums[num]]) {
        events.push(dndData.value.events.adventures[nums[num]]);
      }
    }

    generated.value['events'] = events;
    generated.value['alignment'] =
      dndData.value.events.alignment[
        getRandomNum(0, dndData.value.events.alignment.length - 1)
      ];
  };

  const getRace = () => {
    const raceArr = getClassic(dndData.value.race);
    const randNum = getRandomNum(0, raceArr.length - 1);
    generated.value['race'] = raceArr[randNum];
    const age = getRandomNum(
      dndData.value.race[`${generated.value['race']}`].age.mature,
      dndData.value.race[`${generated.value['race']}`].age.max
    );
    generated.value['age'] = age;
    generated.value['source'] = dndData.value.race[`${generated.value['race']}`].source;
    getEvents(age);
  };
  getRace();

  const getLife = () => {
    for (let el in dndData.value.life) {
      generated.value[`${el}`] =
        dndData.value.life[`${el}`][
          getRandomNum(0, dndData.value.life[`${el}`].length - 1)
        ];
    }
  };
  getLife();

  const getBackground = () => {
    const bgNames = [];
    const bgReasons = [];
    let bgSelected = '';
    let bgReason = '';
    for (let el in dndData.value.background) {
      bgNames.push(el);
    }
    bgSelected = bgNames[getRandomNum(0, bgNames.length - 1)];
    for (let el in dndData.value.background[`${bgSelected}`]) {
      bgReasons.push(dndData.value.background[`${bgSelected}`][`${el}`]);
    }
    bgReason = bgReasons[getRandomNum(0, bgReasons.length - 1)];

    generated.value['background'] = [bgSelected, bgReason];
  };
  getBackground();

  const getClass = () => {
    const classes = [];
    const classReasons = [];
    const classQuirks = [];
    let classSelected = '';
    let reasonSelected = '';
    let quirkSelected = '';
    for (let el in dndData.value.class) {
      classes.push(el);
    }
    classSelected = classes[getRandomNum(0, classes.length - 1)];

    for (let el in dndData.value.class[`${classSelected}`].reason) {
      classReasons.push(dndData.value.class[`${classSelected}`].reason[el]);
    }
    reasonSelected = classReasons[getRandomNum(0, classReasons.length - 1)];

    for (let el in dndData.value.class[`${classSelected}`].quirk) {
      classQuirks.push(dndData.value.class[`${classSelected}`].quirk[el]);
    }
    quirkSelected = classQuirks[getRandomNum(0, classQuirks.length - 1)];

    generated.value['class'] = {
      class: classSelected,
      reason: reasonSelected,
      quirk: quirkSelected,
    };
  };
  getClass();

  const getPersonality = () => {
    const traits = [...dndData.value.traitsIdealsBondsFlaws.traits];
    const ideals = [...dndData.value.traitsIdealsBondsFlaws.ideals];
    const bonds = [...dndData.value.traitsIdealsBondsFlaws.bonds];
    const flaws = [...dndData.value.traitsIdealsBondsFlaws.flaws];
    const selected = {
      traits: [],
      ideals: [],
      bonds: [],
      flaws: [],
    };
    for (let el in selected) {
      const tempArr = [...dndData.value.traitsIdealsBondsFlaws[`${el}`]];
      const quantity = getRandomNum(1, 2);
      for (let i = 0; i < quantity; i++) {
        const randomIndex = getRandomNum(0, tempArr.length - 1);
        selected[`${el}`].push(tempArr[randomIndex]);
      }
    }
    generated.value['tibf'] = selected;
  };
  getPersonality();

  const getSecrets = () => {
    const chance = getRandomNum(1, 100);
    if (chance < 15 || chance > 85) {
      const secrets = [];
      const length = getLength(dndData.value.secrets);
      for (let el in dndData.value.secrets) {
        secrets.push(el);
      }
      const secretSelected = secrets[getRandomNum(0, secrets.length)];
      generated.value['secrets'] = {
        secret: secretSelected,
        desc: dndData.value.secrets[`${secretSelected}`],
      };
    } else {
      console.log('lucky u xdxdxd');
    }
  };
  getSecrets();
};
</script>

<style lang="sass" scoped>
@import './assets/variables'
@import './assets/mixins'
.body
  @include flex(column, center, center, 5px)
  padding: 5px
  min-height: 100px
  min-width: 500px
  width: 90vw
  background-color: $color1
  border: 1px solid $color5
  border-radius: 8px
  .control
    @include flex(row, center, flex-start, 5px)
    @extend .body__item
    background-color: $color5
    &__btn
      // prevent selection start
      user-select: none
      -webkit-user-select: none
      -moz-user-select: none
      -khtml-user-select: none
      -ms-user-select: none
      // prevent selection end
      background-color: $color1
      border: 1px solid $color5
      border-radius: 8px
      transition: all 0.2s ease-out
      padding: 10px 15px
      cursor: pointer
      @include flex(row, center, center, 0)
      &:hover
        color: $color3
        border-color: $color3
        background-color: $color5
        box-shadow: -4px 3px 3px $color4
      &:active
        transform: translate(-3%, 3%)
        box-shadow: -1px 1px 3px $color4
      &-disabled
        @extend .control__btn
        opacity: 0.5
  .body__item
    @include flex(column, flex-start, flex-start, 5px)
    // @extend .control
    min-height: 50px
    width: 100%
    padding: 5px 15px
    border: 1px solid $color5
    border-radius: 8px
    font-size: $fontSizeSmall
    span
      @include flex(column, flex-start, flex-start, 5px)
    .singleEvent
      padding-left: 10px
      border-left: 5px solid $color4
    .item__tittle
      text-decoration: underline
      font-size: $fontSizeMedium - 4px
</style>
