import {createStore} from 'vuex'

export default createStore({
    modules: {
        toast: {
            namespaced: true,
            state: {
                toasts: [],
            },
            mutations: {
                ADD_TOAST(state, payload) {
                    state.toasts.push(payload)
                },
                REMOVE_TOAST(state) {
                    state.toasts.shift()
                }
            },
            actions: {
                triggerToast ( context, message, type = 'success') {
                    console.log(type)
                    context.commit('ADD_TOAST', {
                        id: Date.now(),
                        message: message,
                        type: type
                    })
                    setTimeout(() => {
                        context.commit('REMOVE_TOAST')
                    }, 10000)
                }
            },
            getters: { //computed 랑 거의 비슷하다고 보면 됨 (감시하고 있다가, 변경이 발생하면 아래 내용을 반환해줌)
                toastMessageWithSmile(state) {
                    return state.toastMessage + ':]'
                }
            },
        }
    }
})