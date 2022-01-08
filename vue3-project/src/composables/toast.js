import { onUnmounted, ref } from "vue";

export const useToast = () => {
    const showToast = ref(false) ;
    const toastMessage = ref('') ;
    const toastAlertType = ref('');
    const timeout = ref(null) ;
    const triggerToast = (message, type) => {
        toastMessage.value = message;
        toastAlertType.value = type;
        showToast.value = true ;
        timeout.value = setTimeout(() => {
            toastMessage.value = ''
            toastAlertType.value = ''
            showToast.value = false;
        }, 3000)
    }
    onUnmounted(() => { // setTimeout은 다른 페이지로 넘어가로 실행됨. 즉, 메모리 누수를 방지하기 위해 사용함 (unMounted)
        clearTimeout(timeout.value)
    })
    return {
        toastMessage,
        toastAlertType,
        showToast,
        triggerToast
    }
}