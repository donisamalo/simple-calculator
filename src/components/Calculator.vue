<template>
  <div class="calculator">
    <div class="calculator__history">
      <span @click="openModal">View Calculation History</span>
      <p>{{ history }}</p>
    </div>
    <div class="calculator__result">
      <div>=</div>
      <div>{{ value || 0 }}</div>
    </div>
    <div class="calculator__button">
      <div @click="clear" class="ripple">CLEAR</div>
      <div @click="addOperator('/', 0)" :class="[{active: isOperatorActive[0]}, 'c-orange']">/</div>
      <div @click="addOperator('*', 1)" :class="[{active: isOperatorActive[1]}, 'c-orange']">x</div>
      <div @click="setValue('1')" class="ripple">1</div>
      <div @click="setValue('2')" class="ripple">2</div>
      <div @click="setValue('3')" class="ripple">3</div>
      <div @click="addOperator('+', 2)" :class="[{active: isOperatorActive[2]}, 'c-orange']">+</div>
      <div @click="setValue('4')" class="ripple">4</div>
      <div @click="setValue('5')" class="ripple">5</div>
      <div @click="setValue('6')" class="ripple">6</div>
      <div @click="addOperator('-', 3)" :class="[{active: isOperatorActive[3]}, 'c-orange']">-</div>
      <div @click="setValue('7')" class="ripple">7</div>
      <div @click="setValue('8')" class="ripple">8</div>
      <div @click="setValue('9')" class="ripple">9</div>
      <div @click="setPercent" class="c-orange ripple">%</div>
      <div @click="setSign" class="c-orange ripple">+/-</div>
      <div @click="setValue('0')" class="ripple">0</div>
      <div @click="addDot" class="c-orange ripple">.</div>
      <div @click="calculate" class="c-orange ripple">=</div>
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
        if (this.value === '')
          this.value = '0.';
        else
          this.setValue('.');
      }
    },
    addOperator(operator, idx) {
      if (this.isCalculated) {
        this.isCalculated = false;
        this.history = '';
      }
      this.isOperatorActive.fill(false);
      this.operator = operator;
      this.isOperatorActive[idx] = true;
      this.$forceUpdate();
    },
    calculate() {
      if (!this.isCalculated) {
        this.history = `${this.history} ${this.value}`;
        this.value = eval(this.history);
        const calculationHistory = `${this.history} = ${this.value}`;
        this.$store.dispatch('updateHistory', calculationHistory);
        this.isOperatorActive.fill(false);
        this.isCalculated = true;
      }
    },
    openModal() {
      this.$store.dispatch('setModalHistory', true);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.calculator {
  max-width: 300px;
  margin: auto;
  &__history {
    text-align: right;
    margin: 10px 0 15px;
    padding: 0 8px;
    span {
      font-size: 10px;
      color: $c-gray;
      font-weight: bold;
      border: 1px solid $c-gray;
      border-radius: 8px;
      padding: 2px 6px;
      cursor: pointer;
      transition: all .3s;
      &:hover {
        color: $c-white;
        background: $c-gray;
      }
    }
    p {
      font-size: 15px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      height: 20px;
    }
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
        overflow: auto;
      }
    }
  }
  &__button {
    @include display;
    margin-top: 15px;
    div {
      border-radius: 50%;
      background: $primary-color;
      width: 60px;
      line-height: 60px;
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
          color: $c-white;
        }
      }
      &:focus {
        opacity: 0.6;
      }
      &.ripple {
        @include rippleEffect;
      }
    }
  }
}
</style>
