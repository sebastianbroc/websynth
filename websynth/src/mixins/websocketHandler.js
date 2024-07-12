import {ref} from "vue";
import {useStore} from "vuex";

export default function useWebsocket() {
    const socket = new WebSocket("ws://localhost:8085")
    const store = useStore()

    const socketConnected = ref(false)

    socket.onopen = onSocketOpen
    socket.onmessage = onSocketMessage
    socket.onclose = onSocketClose

    function onSocketOpen(evt){
        console.log(evt)
        socketConnected.value = true
        store.commit('changeWebsocketConnected', true)
    }

    function onSocketMessage(evt){
        console.log(evt.data)
    }

    function onSocketClose(){
        socketConnected.value = false
        store.commit('changeWebsocketConnected', false)
    }

    return {socketConnected}
}
