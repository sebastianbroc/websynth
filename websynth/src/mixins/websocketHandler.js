import {ref} from "vue";
import {useStore} from "vuex";

export default function useWebsocket() {
    let socket = null
    let password = null
    const store = useStore()

    const socketConnected = ref(false)

    function startConnection(pass){
        socket = new WebSocket("ws://localhost:8085")

        socket.onopen = onSocketOpen
        socket.onmessage = onSocketMessage
        socket.onclose = onSocketClose

        password = pass
    }

    function onSocketOpen(evt){
        console.log(evt)
        socketConnected.value = true
        socket.send(JSON.stringify({msg: "new session", password: password}))
    }

    function onSocketMessage(evt){
        let data = null
        try{
            data = JSON.parse(evt.data)
        } catch {
            data = {}
        }


        if(data.new_session_id){
            store.commit('changeWebsocketConnected', true)
            store.commit('changeSessionID', data.new_session_id)
        }
        console.log(evt.data)
    }

    function onSocketClose(){
        socketConnected.value = false
        store.commit('changeWebsocketConnected', false)
    }

    return {
        startConnection,
        socketConnected
    }
}
