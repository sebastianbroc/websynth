import {inject, ref} from "vue";
import {useStore} from "vuex";

export default function useWebsocket() {
    let socket = null
    const store = useStore()
    const eventBus = inject("eventBus")

    const socketConnected = ref(false)

    function startConnection(callback){
        socket = new WebSocket("ws://localhost:8085")

        socket.onopen = () => {
            callback()
        }
        socket.onmessage = onSocketMessage
        socket.onclose = onSocketClose
    }

    function closeSession(){
        socket.close()
    }

    function createSession(pass, patch){
        socket.send(JSON.stringify({msg: "new session", password: pass, patch: patch}))
    }

    function joinSession(id, pass){
        socket.send(JSON.stringify({msg: "join session", id: id, password: pass}))
    }

    function sendChange(change, type){
        if(socket){
            socket.send(JSON.stringify({msg: "change element", element: JSON.stringify(change), type: type}))
        }
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

            if(data.patch){
                console.log("received initial patch")
                eventBus.emit("element_update", data.patch)
            }
        } else if (data.error){
            store.commit('changeError', data.error)
            socket.close()
        } else if (data.element_update){
            eventBus.emit("element_update", data.element_update)
        } else if (data.change){
            eventBus.emit("node_change", {type: data.type, change: data.change})
        }
    }

    function onSocketClose(){
        socketConnected.value = false
        store.commit('changeWebsocketConnected', false)
        store.commit('changeSessionID', null)
    }

    return {
        startConnection,
        createSession,
        joinSession,
        sendChange,
        closeSession
    }
}
