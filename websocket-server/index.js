import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8085 });

let sessions = []

wss.on('connection', function connection(ws) {
    //console.log("new connection")

    ws.on('message', function message(data) {
        data = data.toString()
        data = JSON.parse(data)

        if(data.msg && data.msg === "new session"){
            let newSessionID = makeid(5)
            console.log("creating new session with id " + newSessionID);

            sessions.push({"id": newSessionID, "password_protected": !!data.password, "password": data.password ?? null, "users": [ws]})
            ws.send(JSON.stringify({"session_id": newSessionID}))
        } else if(data.msg && data.msg === "join session"){
            if(sessions.filter(s => s.id === data.id).length === 0){
                ws.send(JSON.stringify({"error": "There is no Session with this ID!"}))
            } else {
                //session exists
                let session = sessions.filter(s => s.id === data.id)[0]

                if(session.password_protected){
                    if(session.password === data.password){
                        session.users.push(ws)
                        ws.send(JSON.stringify({"session_id": session.id}))
                    } else {
                        ws.send(JSON.stringify({"error": "The Session exists, but the password you entered is wrong."}))
                    }
                } else {
                    session.users.push(ws)
                    ws.send(JSON.stringify({"session_id": session.id}))
                }
            }
        } else if (data.msg && data.msg === "update elements"){
            let session = sessions.filter(s => s.users.includes(ws))[0]

            session.users.forEach(user => {
                if(user !== ws){ //do not send changes back to sender
                    user.send(JSON.stringify({"element_update": data.elements}))
                }
            })
        }
        //console.log(data)
    });
});

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
