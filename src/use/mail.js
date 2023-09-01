import {ref} from "vue";

export function useMail() {

    const field = ref('')

    const touched = ref(false)

    const validator = (value) => {
        let error = ''

        if (!value.length) {
            error = 'empty'
        }
        else if (
            value.split('@').length !== 2 ||
            value.split('@')[1].split('.').length !== 2
        ) {
            error = 'format'
        }
        else if (
            value.split('@')[0] === '' ||
            value.split('@')[1].split('.')[0] === '' ||
            value.split('@')[1].split('.')[1] === ''
        ) {
            error = 'format'
        }

        return error
    }

    return {field, validator, touched}

}