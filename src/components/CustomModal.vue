<template>
  <div v-if="visibility" class="modal-window-background" @click="modalHide()">

    <div class="modal-window" @click.stop>

      <div class="modal-window-name unselectable">
        <h4 class="modal-window-name-text">{{ modalConfig.modalName }}</h4>
        <div class="modal-window-name-background">
          <h4 class="modal-window-name-text-background">{{ modalConfig.modalName }}</h4>
        </div>

        <div
            v-if="modalConfig.shadowColor !== 'none'"
            class="modal-window-shadow"
            :class="`modal-window-shadow-${modalConfig.shadowColor}`"
        ></div>
        <img
            v-if="modalConfig.image !== 'none'"
            class="modal-window-image"
            src="../assets/logo.png"
            alt="modal window image"
        >

      </div>

      <div v-if="modalConfig.exitCross === 'cross'" class="modal-window-cross" @click="modalHide()">
        <svg class="modal-window-cross-icon" width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d=
                      "M6.99486
            7.00636C6.60433
            7.39689 6.60433
            8.03005
            6.99486
            8.42058L10.58
            12.0057L6.99486
            15.5909C6.60433
            15.9814
            6.60433
            16.6146
            6.99486
            17.0051C7.38538
            17.3956 8.01855
            17.3956
            8.40907
            17.0051L11.9942
            13.4199L15.5794
            17.0051C15.9699
            17.3956 16.6031
            17.3956
            16.9936
            17.0051C17.3841
            16.6146
            17.3841
            15.9814
            16.9936
            15.5909L13.4084
            12.0057L16.9936
            8.42059C17.3841
            8.03007
            17.3841
            7.3969
            16.9936
            7.00638C16.603
            6.61585
            15.9699
            6.61585
            15.5794
            7.00638L11.9942
            10.5915L8.40907
            7.00636C8.01855
            6.61584
            7.38538
            6.61584
            6.99486
            7.00636Z"
                  fill="#69a4ec"></path>
          </g>
        </svg>
      </div>

      <div v-else-if="modalConfig.exitCross === 'slot'" class="modal-window-cross">
        <slot name="exitCross"></slot>
      </div>

      <div v-if="modalConfig.image !== 'none'" class="modal-window-image-block"></div>

      <div class="modal-window-content">

        <h3
            v-if="modalConfig.contentTitle === 'slot'"
            class="modal-window-content-title"
            :class="`modal-window-content-title-${modalConfig.contentTitleColor}`"
        >
          <slot name="contentTitle">Извините произошла неизвестная ошибка</slot>
        </h3>

        <span v-if="modalConfig.contentText === 'slot'" class="modal-window-content-text">
          <slot name="contentText">Просто закройте это окно</slot>
        </span>

        <div v-if="modalConfig.chips !== 'none'" class="modal-window-content-chips">

          <div class="modal-window-content-chips-block">
            <img class="modal-window-content-chips-image" src="../assets/chip.png" alt="modal window chips image">
            <h2 class="modal-window-content-chips-count"> {{modalConfig.chips}} </h2>
          </div>

        </div>

        <div v-if="modalConfig.mailInput !== 'none'" class="modal-window-email-block">
          <input
              class="modal-window-email-input unselectable"
              :class="mail.validator(mail.field.value) !== '' && mail.touched.value ? 'modal-window-email-input-error' : ''"
              :placeholder="modalConfig.mailInput"
              v-model="mail.field.value"
              @input="mailInput(mail.field.value)"
              @blur="mail.touched.value = true"
          >

          <div class="modal-window-email-input-error-text unselectable">
            <span v-if="mail.validator(mail.field.value) === 'empty' && mail.touched.value">Обязательное поле</span>
            <span v-if="mail.validator(mail.field.value) === 'format' && mail.touched.value">Неверный формат email</span>
          </div>
        </div>

      </div>

      <div v-if="modalConfig.buttons === 'slot'" class="modal-window-buttons unselectable">
        <slot name="buttons"></slot>
      </div>

    </div>

  </div>
</template>

<script setup>
import {useMail} from "@/use/mail";
import {computed, watch, defineProps, defineEmits} from "vue";

// eslint-disable-next-line
const props = defineProps({
  visibility: {
    type: Boolean,
    default: false
  },
  modalConfig: {
    type: Object,
    default: () => {
      return {
        modalName: 'Произошла ошибка', // any name
        exitCross: 'cross', // ['none', 'cross', 'slot']
        image: 'none', // ['none', '<url>'],
        shadowColor: 'none', // ['none', 'green', 'red', 'blue'],
        contentTitle: 'slot', // ['none', 'slot']
        contentTitleColor: 'red', // ['white', 'green', 'red']
        contentText: 'slot', // ['none', 'slot']
        chips: 'none', // ['none', '<value>']
        mailInput: 'none', // ['none', '<placeholder>']
        buttons: 'none', // ['none', 'slot']
      }
    }
  }
})

const emit = defineEmits(['hide', 'valid', 'inputMailField'])

const mail = useMail()

const valid = computed(() => mail.validator(mail.field.value) === '')

watch(valid, value => {
  mailValid(value)
})

const mailValid = value => {
  emit('valid', value)
}

const mailInput = field => {
  emit('inputMailField', field)
}

const modalHide = () => {
  emit('hide')
}

</script>

<style scoped>

.modal-window-background {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.34);
  z-index: 5;
}

.modal-window {
  position: relative;
  background-color: #030e33;
  border-radius: 10px;
  border: 2px solid #0a1f62;
  max-width: 300px;
  text-align: center;
  overflow: hidden;
  z-index: 6;
  font-family: Centro Sans pro, sans-serif;
  font-weight: 600;
}

.modal-window-name {
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #051952;
  padding: 5px 0;
}

.modal-window-name-text {
  margin: 0;
  color: #69a4ec;
}

.modal-window-name-background {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #051952;
  padding: 5px 0;
}

.modal-window-name-text-background {
  margin: 0;
  color: #69a4ec;
}

.modal-window-shadow {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
  width: 130px;
  height: 130px;
  border-radius: 50%;
  filter: blur(60px);
  z-index: 0;
}

.modal-window-shadow-green {
  background-color: #01cb14;
}

.modal-window-shadow-red {
  background-color: #b2102c;
}

.modal-window-shadow-blue {
  background-color: #0f53df;
}

.modal-window-cross {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  z-index: 1;
}

.modal-window-cross-icon {
  width: 100%;
  height: 100%;
  transform: scale(1.3);
}

.modal-window-image {
  position: absolute;
  top: 35px;
  left: 50%;
  transform: translate(-50%);
  z-index: 1;
  height: 90px;
}

.modal-window-image-block {
  height: 90px;
}

.modal-window-content {
  padding: 0 20px;
  margin: 30px 0;
}

.modal-window-content-title {
  color: white;
}

.modal-window-content-title-red {
  color: #e04256;
}

.modal-window-content-title-green {
  color: #35e166;
}

.modal-window-content-text {
  font-size: 13px;
  color: #98accc;
}

.modal-window-content-chips {
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0 0 0;
}

.modal-window-content-chips-block {
  padding: 6px;
  background-color: #002672;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.modal-window-content-chips-image {
  width: 20px;
  height: 20px;
}

.modal-window-content-chips-count {
  color: white;
  margin: 3px 0 0 3px;
}

.modal-window-email-block {
  position: relative;
  width: 100%;
  min-width: 100px;
  margin: 20px 0;
}

.modal-window-email-input {
  width: calc(100% - 22px);
  padding: 8px;
  outline: none;
  border: 2px solid #122d7a;
  border-radius: 10px;
  background-color: #061341;
  color: white;
  caret-color: white;
}

.modal-window-email-input:focus {
  border: 2px solid #8ea3c4;
}

.modal-window-email-input-error {
  border: 2px solid #943045;
}

.modal-window-email-input-error-text {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translate(-50%);
  color: #943045;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}

.modal-window-buttons {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #071d5d;
  padding: 15px 0;
}

.unselectable {
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

</style>