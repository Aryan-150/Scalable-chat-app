import { WebSocketServer, WebSocket as WsWebSocket } from "ws";

const PORT: number = 8080;
const wss = new WebSocketServer({ port: PORT });

//? what will be our in memory state:
enum MessageInputType {
    join = "join",
    chat = "chat"
}

interface Room {
    sockets: WsWebSocket[];
}

interface MessageInput {
    type: MessageInputType;
    payload: {
        roomId : string;
        message ?: string;
    }
}

const rooms: Record<string, Room> = {};

// relayerWss is the client ws server that connects to the relayer-ws:
const relayerWss = new WebSocket("ws://localhost:3001");

relayerWss.onopen = () => {
    console.log('conection established with the relayer');
    relayerWss.onmessage = ({data}) => {
        console.log(`msg received at port: ${PORT}`);
        const parsedData: MessageInput = JSON.parse(data);
        console.log(parsedData);
            
        // we have to braodcast the message to all the sockets in the room:
        const room = parsedData.payload.roomId;
        if(rooms[room]){
            rooms[room].sockets.forEach((socket) => {
                console.log('sent');
                socket.send(JSON.stringify(parsedData.payload));
            })
        }       
    }
}

wss.on("connection", (ws: WsWebSocket) => {
    ws.on("error", console.error);
    ws.on("close", (code) => {
        // remove the client/ws form the "rooms":
        
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
            if (rooms[room] && !rooms[room].sockets.includes(ws)) {
                rooms[room].sockets.push(ws);
                relayerWss.send(JSON.stringify(parsedMessage));
            }
        }

        else if(parsedMessage.type == MessageInputType.chat){
            console.log('control reached here');
            relayerWss.send(JSON.stringify(parsedMessage));
        }
    })
})

