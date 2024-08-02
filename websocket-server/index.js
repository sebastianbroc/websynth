import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8085 });
console.log("\x1b[32m websynth websocket server started on port " + 8085 + " \x1b[32m")

let sessions = []

wss.on('connection', function connection(ws) {
    //console.log("new connection")

    ws.on('message', function message(data) {
        data = data.toString()
        data = JSON.parse(data)

        if(data.msg){
            switch(data.msg){
                case "new session":
                    let newSessionID = makeid(5)
                    let newUserID = makeUserid(10)
                    console.log("\x1b[32m creating new session with id \x1b[34m" + newSessionID + "\x1b[32m");

                    sessions.push({"id": newSessionID, "password_protected": !!data.password, "password": data.password ?? null, "users": [{'ws': ws, 'username': data.username ?? null, 'userid': newUserID}], "waiting": [] ,"patch": data.patch})
                    ws.send(JSON.stringify({"session_id": newSessionID, "user_id": newUserID, "username": data.username}))
                    break;
                case "join session":
                    if(sessions.filter(s => s.id === data.id).length === 0){
                        ws.send(JSON.stringify({"error": "There is no Session with this ID!"}))
                    } else {
                        //session exists
                        let session = sessions.filter(s => s.id === data.id)[0]
                        let newUserId = makeUserid(10)

                        if(session.password_protected){
                            if(session.password === data.password){
                                session.waiting.push({ws: ws, username: data.username, userid: newUserId})
                                ws.send(JSON.stringify({"info": "Waiting for confirmation to join...", "userid": newUserId}))
                                promptNewUser(session, session.waiting)
                                //ws.send(JSON.stringify({"session_id": session.id, "patch": session.patch}))
                            } else {
                                ws.send(JSON.stringify({"error": "The Session exists, but the password you entered is wrong."}))
                            }
                        } else {
                            session.waiting.push({ws: ws, username: data.username, userid: newUserId})
                            ws.send(JSON.stringify({"info": "Waiting for confirmation to join...", "userid": newUserId}))
                            promptNewUser(session, session.waiting)
                            //ws.send(JSON.stringify({"session_id": session.id, "patch": session.patch}))
                        }
                    }
                    break;
                case "update elements":
                    let session = sessions.filter(s => s.users.map(u => u.ws).includes(ws))[0]

                    session.users.forEach(user => {
                        if(user.ws !== ws){ //do not send changes back to sender
                            user.ws.send(JSON.stringify({"element_update": data.elements}))
                        }
                    })
                    break;
                case "change element":
                    let activeSession = sessions.filter(s => s.users.map(u => u.ws).includes(ws))[0]
                    activeSession.users.forEach(user => {
                        if(user.ws !== ws){ //do not send changes back to sender
                            user.ws.send(JSON.stringify({"change": data.element, "type": data.type}))
                        }
                    })
                    break;
                case "inviteDecision":
                    let currSession = sessions.filter(s => s.users.map(u => u.ws).includes(ws))[0]
                    let invitee = currSession.waiting.filter(w => w.userid === data.userid)[0]
                    currSession.patch = data.patch

                    invitee.ws.send(JSON.stringify({"acceptance_status": data.accept === true ? 'y' : 'n', "acceptance_patch": data.accept === true ? currSession.patch : null, "joined_session_id": currSession.id, "user_id": invitee.userid, "username": invitee.username}))

                    currSession.waiting.splice(currSession.waiting.indexOf(invitee), 1)
                    promptNewUser(currSession, currSession.waiting)
                    if(data.accept === true) currSession.users.push(invitee)

                    break;
            }
        }
    });

    ws.on("close", () => {
        removeOrphans()
    })
});

function promptNewUser(session, waiting, clear){
    session.users.forEach(u => {
        u.ws.send(JSON.stringify({"acceptNewUser": waiting.map(w => {return {"username": w.username, "userid": w.userid}})}))
    })

}

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }

    if(sessions.filter(s => s.id === result).length > 0){
        //there is already a session with this id, generate a new id
        result = makeid(length)
    }

    return result;
}

function makeUserid(length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }

    return result;
}

function removeOrphans(){
    sessions.forEach((session, index) => {
        session.users.forEach((user, userindex) => {
            if (user.readyState === 3){
                session.users.splice(userindex, 1)
            }
        })

        if(session.users.length === 0){
            console.log("\x1b[31m deleting orphaned session " + session.id + "...\x1b[0m")
            sessions.splice(index, 1)
        }
    })
}
