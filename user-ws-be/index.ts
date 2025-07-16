import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

//? what will be our in memory state:
enum MessageInputType {
    join = "join",
    chat = "chat"
}

interface Room {
    sockets: WebSocket[];
}

interface MessageInput {
    type: MessageInputType;
    payload: {
        roomId : string;
        message ?: string;
    }
}

const rooms: Record<string, Room> = {};

wss.on("connection", (ws) => {
    ws.on("error", console.error);
    ws.on("close", (code) => {
        console.log('socket closed with code: ' + code);
    })

    ws.on("message", (data, isBinary) => {
        const message = data.toString();
        if(message == ""){
            ws.send("bad message");
            return;
        }
        
        const parsedMessage: MessageInput = JSON.parse(message);
        if(parsedMessage.type == MessageInputType.join){
            const room = parsedMessage.payload.roomId;
            if(!Object.keys(rooms).includes(room)){
                // true -> room does not present in the rooms object:
                rooms[room] = {
                    sockets: []
                }
            }
            if (rooms[room]) {
                rooms[room].sockets.push(ws);
            }
        }

        else if(parsedMessage.type == MessageInputType.chat){
            // we have to braodcast the message to all the sockets in the room:
            const room = parsedMessage.payload.roomId;
            
            if(rooms[room]){
                rooms[room].sockets.forEach((socket) => {
                    console.log('sent');
                    socket.send(JSON.stringify(parsedMessage.payload));
                })
            }
        }
    })
})


/**
 * rooms = { 
 *   "blue": { sockets: [ s1, s2, s3, ... ] },
 *   "brown": { sockets: [ s1,s2,s3,... ] },
 *   .....
 * }
 *
 * {
 *   type: "join",
 *   payload: {
 *     roomId: "blue"
 *   },
 * }
 * 
 */



// import { WebSocket, WebSocketServer } from "ws";

// const wss = new WebSocketServer({ port: 8080 });

// interface SocketType {
//     socket: WebSocket;
//     roomId: string;
// }

// enum Type {
//     join = "join",
//     chat = "chat"
// }

// interface MessageType {
//     msgType: Type;
//     payload: {
//         roomId ?: string;
//         message ?: string;
//     }
// }

// const allSockets: SocketType[] = []

// wss.on("connection", (ws) => {
//     ws.on("error", (err) => {
//         console.log(err);
//     })
//     ws.on("close", (code) => {
//         console.log('connection is disconnected with code: ' + code);
//     })

//     ws.on("message", (data, isBinary) => {
//             const message = data.toString();
//             if(message == ""){
//                 ws.send('The data is empty');
//                 return;
//             }
//             const parsedMessage: MessageType = JSON.parse(message);
//             const sameSocket = allSockets.find((s) => s.socket === ws && s.roomId === parsedMessage.payload.roomId);
    
//             if(parsedMessage.msgType.toLowerCase() == Type.join && !sameSocket){
//                 allSockets.push({
//                     socket: ws,
//                     roomId: parsedMessage.payload.roomId || ""
//                 })
//                 console.log(allSockets.length);
//             }
    
//             else if(parsedMessage.msgType.toLowerCase() == Type.join && sameSocket){
//                 ws.send('you are already joined the particular room,\n click on chat to enter the room');
//             }
    
//             else if(parsedMessage.msgType.toLowerCase() == Type.chat){
//                 allSockets.forEach((user) => {
//                     if(user.socket !== ws && user.socket.readyState == WebSocket.OPEN){
//                         user.socket.send(parsedMessage.payload.message as string)
//                     }
//                 })
//             }
//         }
//     )
// })
