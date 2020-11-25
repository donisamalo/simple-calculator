<template>
  <div class="calculator">
    <div class="calculator__history">
      {{ history }}
    </div>
    <div class="calculator__result">
      <div>=</div>
      <div>{{ value || 0 }}</div>
    </div>
    <div class="calculator__button">
      <div @click="clear">CLEAR</div>
      <div @click="addOperator('/', 0)" :class="[{active: isOperatorActive[0]}, 'c-orange']">/</div>
      <div @click="addOperator('*', 1)" :class="[{active: isOperatorActive[1]}, 'c-orange']">x</div>
      <div @click="setValue('1')">1</div>
      <div @click="setValue('2')">2</div>
      <div @click="setValue('3')">3</div>
      <div @click="addOperator('+', 2)" :class="[{active: isOperatorActive[2]}, 'c-orange']">+</div>
      <div @click="setValue('4')">4</div>
      <div @click="setValue('5')">5</div>
      <div @click="setValue('6')">6</div>
      <div @click="addOperator('-', 3)" :class="[{active: isOperatorActive[3]}, 'c-orange']">-</div>
      <div @click="setValue('7')">7</div>
      <div @click="setValue('8')">8</div>
      <div @click="setValue('9')">9</div>
      <div @click="setPercent" class="c-orange">%</div>
      <div @click="setSign" class="c-orange">+/-</div>
      <div @click="setValue('0')">0</div>
      <div @click="addDot" class="c-orange">.</div>
      <div @click="calculate" class="c-orange">=</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  data() {
    return {
      value: '',
      history: '',
      operator: '',
      isOperatorActive: [
        false, false, false, false
      ],
      isCalculated: false
    }
  },
  methods: {
    clear() {
      this.value = '';
      this.history = '';
      this.operator = '';
      this.isOperatorActive.fill(false);
    },
    setSign() {
      if (this.value.charAt(0) === '-')
        this.value = this.value.slice(1);
      else
        this.value = `-${this.value}`;
    },
    setPercent() {
      this.value = `${parseFloat(this.value) / 100}`;
    },
    setValue(input) {
      let isReset = false;
      if (!this.isCalculated) {
        if (this.operator) {
          this.history = `${this.history} ${this.value} ${this.operator}`;
          this.operator = false;
          isReset = true;
        }
        if (isReset) {
          this.value = input
          isReset = false;
        } else {
          this.value = this.value + input;
        }
      } else {
        this.value = input;
        this.isCalculated = false;
        this.history = '';
      }
      this.isOperatorActive.fill(false);
    },
    addDot() {
      if (this.value.indexOf('.') === -1) {
        console.log(this.value);
        if (this.value === '')
          this.value = '0.';
        else
          this.setValue('.');
      }
    },
    addOperator(operator, idx) {
      this.isOperatorActive.fill(false);
      this.operator = operator;
      this.isOperatorActive[idx] = true;
      this.$forceUpdate();

    },
    calculate() {
      if (!this.isCalculated) {
        this.history = `${this.history} ${this.value}`;
        console.log(this.history);
        this.value = eval(this.history);
        this.isOperatorActive.fill(false);
        this.isCalculated = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$primary-color: #DDF1F3;
$border-color: #E6E6E6;
$white-color: #FFFFFF;
$c-operator: #FEF5DA;
$c-operator-active: #FFA500;

@mixin display {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.calculator {
  max-width: 300px;
  margin: auto;
  &__history {
    text-align: right;
    margin: 10px 0 15px;
    font-size: 15px;
    padding: 0 8px;
    height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    direction: rtl;
  }
  &__result {
    @include display;
    padding-bottom: 15px;
    border-bottom: 2px solid $border-color;
    div {
      font-size: 28px;
      font-weight: bold;
      &:last-child {
        grid-column-end: span 3;
        text-align: right;
        padding-right: 8px;
      }
    }
  }
  &__button {
    @include display;
    margin-top: 15px;
    div {
      border-radius: 50%;
      background: $primary-color;
      width: 50px;
      line-height: 50px;
      margin: auto;
      font-size: 20px;
      font-weight: bold;
      transition: all .2s;
      cursor: pointer;
      &:first-child {
        width: 100%;
        grid-column: 1 / 3;
        border-radius: 50px;
        font-weight: 500;
        font-size: 18px;
      }
      &.c-orange {
        background: $c-operator;
        &.active {
          background: $c-operator-active;
          color: $white-color;
        }
      }
      &:focus {
        opacity: 0.6;
      }
    }
  }
}
</style>
