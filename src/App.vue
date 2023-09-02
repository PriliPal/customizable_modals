<template>
  <custom-modal
      :visibility="modal1.visibility.value"
      :modal-config="modal1Config"
      @hide="modal1.hide()"
  >
    <template v-slot:contentTitle>Доброго времени суток!</template>

    <template v-slot:contentText>
      22.05.2023 в игре наблюдались сбои, которые могли повлиять на игровой процесс.
      <br> В качестве извинения за причиненные неудобства мы. начисляем на Ваш счет фишки!
      <br> Удачи в игре!
    </template>

    <template v-slot:buttons>
      <button class="modal-button modal-button-green" @click="modal1.hide()">
        Спасибо!
        <span class="modal-button-text">Спасибо!</span>
      </button>
    </template>

  </custom-modal>

  <button class="modal-button modal-button-green modal-button-test" @click="modal1.show()">
    Компенсация
    <span class="modal-button-text">Компенсация</span>
  </button>

  <custom-modal
      :visibility="modal2.visibility.value"
      :modal-config="modal2Config"
      @hide="modal2.hide()"
  >
    <template v-slot:contentTitle>Повторный вход</template>

    <template v-slot:contentText>Вы вошли в игру на другом устройстве или в другом окне</template>

    <template v-slot:buttons>
      <button class="modal-button modal-button-green" @click="modal2.hide()">
        Перезагрузить
        <span class="modal-button-text">Перезагрузить</span>
      </button>
    </template>

  </custom-modal>

  <button class="modal-button modal-button-red modal-button-test" @click="modal2.show()">
    Ошибка входа
    <span class="modal-button-text">Ошибка входа</span>
  </button>

  <custom-modal
      :visibility="modal3.visibility.value"
      :modal-config="modal3Config"
      @hide="modal3.hide()"
      @valid="handleValid"
  >
    <template v-slot:contentText>Введите email, на который мы пришлем вам электронный чек</template>

    <template v-slot:buttons>
      <button class="modal-button " :class="valid ? 'modal-button-green' : 'modal-button-inactive'" @click="valid ? modal3.hide() : ''">
        Далее
        <span class="modal-button-text">Далее</span>
      </button>
    </template>

  </custom-modal>

  <button class="modal-button modal-button-blue modal-button-test" @click="modal3.show()">
    Почта для чека
    <span class="modal-button-text">Почта для чека</span>
  </button>

</template>

<script setup>
import CustomModal from './components/CustomModal.vue'
import {useModal} from "@/use/modal";
import {ref} from "vue";

const modal1Config = {
  modalName: 'Компенсация',
  exitCross: 'none',
  image: '../assets/logo.png',
  shadowColor: 'green',
  contentTitle: 'slot',
  contentTitleColor: 'green',
  contentText: 'slot',
  chips: '9,000M',
  mailInput: 'none',
  buttons: 'slot',
}

const modal2Config = {
  modalName: 'Ошибка входа',
  exitCross: 'none',
  image: '../assets/logo.png',
  shadowColor: 'red',
  contentTitle: 'slot',
  contentTitleColor: 'red',
  contentText: 'slot',
  chips: 'none',
  mailInput: 'none',
  buttons: 'slot',
}

const modal3Config = {
  modalName: 'Почта для чека',
  exitCross: 'cross',
  image: 'none',
  shadowColor: 'none',
  contentTitle: 'none',
  contentTitleColor: 'none',
  contentText: 'slot',
  chips: 'none',
  mailInput: 'example@email.com',
  buttons: 'slot',
}

const modal1 = useModal()

const modal2 = useModal()

const modal3 = useModal()

const valid = ref(false)

const handleValid = (value) => {
  valid.value = value
}

</script>

<style>
#app {
  font-family: Centro Sans pro, sans-serif;
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.modal-button {
  position: relative;
  min-width: 100px;
  border-radius: 10px;
  color: white;
  padding: 10px 25px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.modal-button::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 15px);
  height: calc(100% - 15px);
  background: rgba(0, 0, 0, 0.56);
  filter: blur(10px);
}

.modal-button-green {
  background-color: #01cb14;
}

.modal-button-red {
  background-color: #b2102c;
}

.modal-button-blue {
  background-color: #0f53df;
}

.modal-button-inactive {
  background-color: #42454a;
  cursor: not-allowed;
}

.modal-button-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.modal-button-test {
  margin: 8px 0 0 8px;
}

</style>
