import {ref} from "vue";
import {useStore} from "vuex";

export default function useWebsocket() {
    let socket = null
    const store = useStore()

    const socketConnected = ref(false)

    function startConnection(callback){
        socket = new WebSocket("ws://localhost:8085")

        socket.onopen = () => {
            callback()
        }
        socket.onmessage = onSocketMessage
        socket.onclose = onSocketClose
    }

    function createSession(pass){
        socket.send(JSON.stringify({msg: "new session", password: pass}))
    }

    function joinSession(id){
        socket.send(JSON.stringify({msg: "join session", id: id}))
    }

    function onSocketMessage(evt){
        let data = null
        try{
            data = JSON.parse(evt.data)
        } catch {
            data = {}
        }


        if(data.session_id){
            store.commit('changeWebsocketConnected', true)
            store.commit('changeSessionID', data.session_id)
        } else if (data.error){
            store.commit('changeError', data.error)
            socket.close()
        }
        //console.log(evt.data)
    }

    function onSocketClose(){
        socketConnected.value = false
        store.commit('changeWebsocketConnected', false)
    }

    return {
        startConnection,
        createSession,
        joinSession
    }
}
