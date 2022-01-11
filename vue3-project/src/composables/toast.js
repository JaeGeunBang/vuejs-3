import { computed } from "vue";
import { useStore } from 'vuex';

export const useToast = () => {
    const store = useStore();
    const toasts = computed(() => store.state.toast.toasts) ;

    const triggerToast = (message, type = 'success') => {
        const payload = {
            message: message,
            type: type,
        }
        store.dispatch('toast/triggerToast', payload)
    }

    return {
        toasts,
        triggerToast
    }
}