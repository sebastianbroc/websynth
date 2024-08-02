import {inject, ref} from "vue";
import {useStore} from "vuex";
import debounce from "debounce";

export default function useWebsocket() {
    let socket = null
    const store = useStore()
    const eventBus = inject("eventBus")

    const socketConnected = ref(false)

    function startConnection(callback){
        socket = new WebSocket("ws://localhost:8085")
        //socket = new WebSocket("wss://websynth-websocket-server-8571bc9cbcfe.herokuapp.com")

        socket.onopen = () => {
            callback()
        }
        socket.onmessage = onSocketMessage
        socket.onclose = onSocketClose
    }

    function closeSession(){
        socket.close()
    }

    function createSession(prop, patch){
        socket.send(JSON.stringify({msg: "new session", username: prop.username, password: prop.password, patch: patch}))
    }

    function joinSession(id, pass, username){
        socket.send(JSON.stringify({msg: "join session", id: id, password: pass, username: username}))
    }

    let sendChange = debounce((change, type) => {
        if(socket){
            socket.send(JSON.stringify({msg: "change element", element: JSON.stringify(change), type: type}))
        }
    }, 0)

    function sendInviteDecision(accept, id, patch){
        socket.send(JSON.stringify({msg: "inviteDecision", accept: accept, userid: id, patch: patch}))
    }

    function onSocketMessage(evt){
        let data = null
        try{
            data = JSON.parse(evt.data)
        } catch {
            data = {}
        }

        console.log(data)


        if(data.session_id){
            store.commit('changeWebsocketConnected', true)
            store.commit('changeSessionID', data.session_id)
            store.commit('changeUserID', data.user_id)
            eventBus.emit("init_user", {"username": data.username, "user_id": data.user_id})

            if(data.patch){
                console.log("received initial patch")
                eventBus.emit("element_update", data.patch)
            }
        } else if (data.error){
            store.commit('changeError', data.error)
            socket.close()
        } else if (data.info){
            store.commit("changeInfo", data.info)
        } else if (data.acceptNewUser) {
            store.commit("changeNotifications", data.acceptNewUser.map(u => {return {...u, "type": "acceptNewUser"}}))
        } else if(data.acceptance_status) {
            if(data.acceptance_status === "y"){
                store.commit('changeWebsocketConnected', true)
                store.commit('changeSessionID', data.joined_session_id)
                store.commit("changeUserID", data.user_id)
                eventBus.emit("element_update", data.acceptance_patch)
                eventBus.emit("init_user", {"username": data.username, "user_id": data.user_id})
            } else {
                store.commit('changeError', "Your request to join the session " + data.joined_session_id + " has been declined.")
                store.commit('changeInfo', null)
            }
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
        eventBus.emit("removeCursors")
    }

    return {
        startConnection,
        createSession,
        joinSession,
        sendChange,
        closeSession,
        sendInviteDecision
    }
}
