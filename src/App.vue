<template>
  <div id="app">
    <h2>Calculator App</h2>
    <Calculator msg="Welcome to Your Vue.js App"/>
    <CalculationHistory v-if="isShowModal"/>
  </div>
</template>

<script>
import Calculator from './components/Calculator.vue'
import CalculationHistory from './components/CalculationHistory.vue'

export default {
  name: 'App',
  components: {
    Calculator,
    CalculationHistory
  },
  computed: {
    isShowModal() {
      return this.$store.getters.getShowHistory
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 25px;
}
body {
  margin: 0;
  padding: 0;
}
</style>
