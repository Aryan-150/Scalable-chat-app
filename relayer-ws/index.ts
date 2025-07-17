import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3001 });

const servers: WebSocket[] = []

wss.on("connection", (ws) => {
    console.log('hello websocket');
    servers.push(ws);
    
    ws.on("message", (data, isBinary) => {
        console.log('control reached here');
        
        const message = data.toString();
        if(message == ""){
            return;
        }
        
        servers.forEach((server) => {
            server.send(message);
        })
    })
})

/**
 * {
 *   payload: {
 *     roomId: "blue",
 *     message: "hi there"
 *   }
 * }
 * 
 */