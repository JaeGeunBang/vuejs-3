import { computed } from "vue";
import { useStore } from 'vuex';

export const useToast = () => {
    const store = useStore();
    const showToast = computed(() => store.state.toast.showToast);
    const toastMessage = computed(() => store.state.toast.toastMessage);
    const toastAlertType = computed(() => store.state.toast.toastAlertType);

    const triggerToast = (message, type = 'success') => {
        store.dispatch('toast/triggerToast', message, type)
    }

    return {
        toastMessage,
        toastAlertType,
        showToast,
        triggerToast
    }
}