import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3001 });

enum MessageInputType {
    join = "join",
    chat = "chat"
}

interface MessageInput {
    type: MessageInputType;
    payload: {
        roomId : string;
        message ?: string;
    }
}

// const servers: WebSocket[] = []
const clientsInRoom: Record<string, WebSocket[]> = {};

wss.on("connection", (ws) => {
    console.log('hello websocket');
    // servers.push(ws);
    
    ws.on("message", (data, isBinary) => {
        console.log('control reached here');
        
        const message = data.toString();
        if(message == ""){
            return;
        }
        const parsedMessage: MessageInput = JSON.parse(message);
        const room = parsedMessage.payload.roomId;
        if(parsedMessage.type == MessageInputType.join){
            if(!clientsInRoom[room]){
                clientsInRoom[room] = [];
            }
            if(clientsInRoom[room] && !clientsInRoom[room].includes(ws)){
                clientsInRoom[room].push(ws);
            }
            console.log(clientsInRoom);
        }
        else {
            if(clientsInRoom[room]){
                clientsInRoom[room].forEach((midSocket) => {
                    midSocket.send(JSON.stringify(parsedMessage));
                })
            }            

            // servers.forEach((server) => {
            //     server.send(message);
            // })
        }

    })
})

