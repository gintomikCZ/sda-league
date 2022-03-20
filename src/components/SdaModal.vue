<template>
  <transition name="modal-fade">
    <div
      v-if="show"
      class="modal-backdrop"
      @click="onBackdropClicked">

      <div class="modal" id="myModal">

        <div class="header">
          <div>{{ title }}</div>
          <sda-button v-if="showX" label="X" @clicked="closeMe"/>
        </div>
        <div class="message">{{ message }}</div>
        <div class="footer">
          <sda-button v-if="showCancel" :label="cancelLabel" @clicked="$emit('cancel-clicked')"/>
          <sda-button :label="confirmLabel" @clicked="$emit('confirm-clicked')"/>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'SdaModal',
    props: {
      show: Boolean,
      title: String,
      message: String,
      cancelLabel: {
        type: String,
        default: 'Cancel'
      },
      confirmLabel: {
        type: String,
        default: 'Confirm'
      },
      showCancel: {
        type: Boolean,
        default: true
      },
      showX: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      closeMe() {
        this.$emit('close-me');
      },
      onBackdropClicked (e) {
        const el = document.getElementById('myModal')
        if (!el) {
          return
        }
        console.log(el)
        if(!el.contains(e.target)) {
          this.$emit('close-me')
        }
      }
    }
  };
</script>
<style lang="stylus" scoped>
  @import '../styles/variables.styl'

  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 10px 1px;
    display: flex;
    flex-direction: column;
    width: 80%
    max-width: 500px
  }

  .header,
  .footer,
  .message {
    padding: 15px;
    display: flex;
  }
  .footer
    justify-content: flex-end
  .header
    align-items: center
    font-size: 1.2rem
    font-weight: bold
  .footer > button
    margin-left: 1rem

  .header, .message {
    position: relative;
    border-bottom: 1px solid lighten($secondary, 50%);
    justify-content: space-between;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
</style>
