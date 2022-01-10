import {createStore} from 'vuex'

export default createStore({
    modules: {
        toast: {
            namespaced: true,
            state: {
                toastMessage: '',
                toastAlertType: '',
                showToast: false
            },
            mutations: {
                UPDATE_TOAST_MESSAGE (state, payload) {
                    state.toastMessage = payload
                },
                UPDATE_TOAST_ALERT_TYPE(state, payload) {
                    state.toastAlertType = payload
                },
                UPDATE_TOAST_STATUS(state, payload) {
                    state.showToast = payload
                },
            },
            actions: {
                triggerToast (context, message, type) {
                    context.commit('UPDATE_TOAST_MESSAGE', message)
                    context.commit('UPDATE_TOAST_ALERT_TYPE', type)
                    context.commit('UPDATE_TOAST_STATUS', true)
                    setTimeout(() => {
                        context.commit('UPDATE_TOAST_MESSAGE', '')
                        context.commit('UPDATE_TOAST_ALERT_TYPE', '')
                        context.commit('UPDATE_TOAST_STATUS', false)
                    }, 3000)
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