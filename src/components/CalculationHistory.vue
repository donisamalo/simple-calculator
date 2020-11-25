<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <h3>Calculation History</h3>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <ul v-if="calculationHistory.length">
                <li v-for="(history, idx) in calculationHistory" :key="idx">
                  {{ history }}
                </li>
              </ul>
              <p v-else>There is no calculation history</p>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button v-if="calculationHistory.length" class="btn-delete" @click="clearHistory">
                Clear History
              </button>
              <button class="btn-close" @click="closeModal">
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'CalculationHistoryModal',
  computed: {
    calculationHistory() {
      return this.$store.getters.getHistory;
    }
  },
  methods: {
    closeModal() {
      this.$store.dispatch('setModalHistory', false);
    },
    clearHistory() {
      this.$store.dispatch('clearHistory');
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: $c-white;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }

  .modal-header {
    h3 {
      margin: 0;
      color: $c-blue;
    }
  }
  .modal-body {
    margin: 20px 0;
    height: 200px;
    text-align: left;
    overflow: auto;
    ul { margin: 0; }
    p { text-align: center; }
  }
  .modal-footer {
    button {
      border: 0;
      padding: 8px 10px;
      border-radius: 8px;
      margin: 0 5px;
      cursor: pointer;
      &.btn-delete {
        color: $c-white;
        background: $c-blue;
      }
    }
  }
}

.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
