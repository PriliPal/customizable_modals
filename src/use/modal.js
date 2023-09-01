import {ref} from "vue";

export function useModal() {

    const visibility = ref(false)

    const hide = () => {
        visibility.value = false
    }

    const show = () => {
        visibility.value = true
    }

    return {visibility, hide, show}

}