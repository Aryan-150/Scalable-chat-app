import { describe, test, expect, beforeAll } from "bun:test";
describe.only("chat application", () => {
    
    test("sending the join payload to the server", async () => {
        const ws1 = new WebSocket("ws://localhost:8080");
        const ws2 = new WebSocket("ws://localhost:8080");
        const ws3 = new WebSocket("ws://localhost:8080");
        const ws4 = new WebSocket("ws://localhost:8080");
        const ws5 = new WebSocket("ws://localhost:8081");
        const ws6 = new WebSocket("ws://localhost:8081");

        console.log('check-point-1');
        
        //* make sure that the ws1 ans ws2 are connected to the server:
        //! 3: using promise.all
        await Promise.all([
            new Promise<void>(resolve => ws1.onopen = () => resolve()),
            new Promise<void>(resolve => ws2.onopen = () => resolve()),
            new Promise<void>(resolve => ws3.onopen = () => resolve()),
            new Promise<void>(resolve => ws4.onopen = () => resolve()),
            new Promise<void>(resolve => ws5.onopen = () => resolve()),
            new Promise<void>(resolve => ws6.onopen = () => resolve()),
        ])
        console.log('check point-2: connections are completed');
        

        ws1.send(JSON.stringify({
            type: "join",
            payload: {
                roomId: "blue"
            }
        }))

        ws2.send(JSON.stringify({
            type: "join",
            payload: {
                roomId: "blue"
            }
        }))

        ws3.send(JSON.stringify({
            type: "join",
            payload: {
                roomId: "blue"
            }
        }))

        ws4.send(JSON.stringify({
            type: "join",
            payload: {
                roomId: "e03131"
            }
        }))

        ws5.send(JSON.stringify({
            type: "join",
            payload: {
                roomId: "blue"
            }
        }))

        ws6.send(JSON.stringify({
            type: "join",
            payload: {
                roomId: "e03131"
            }
        }))

        console.log('check point-3');
        

        await new Promise<void>((resolve) => {
            // listen for the message received:
            let count = 0;
            console.log('check point-4');
            ws2.onmessage = ({data}) => {
                console.log('reached ws2');
                console.log(data, typeof data);
                
                const parsedData = JSON.parse(data);
                
                expect(parsedData.roomId).toBe("blue");
                expect(parsedData.message).toBe("hiithere");
                count += 1;
                if(count == 2) resolve();
            }
            ws6.onmessage = ({data}) => {
                console.log('reached ws6');
                console.log(data, typeof data);

                const parsedData = JSON.parse(data);
                
                expect(parsedData.roomId).toBe("e03131");
                expect(parsedData.message).toBe("hii there ws6");
                count += 1;
                if(count == 2) resolve();
            }

            ws1.send(JSON.stringify({
                type: "chat",
                payload: {
                    roomId: "blue",
                    message: "hiithere",
                }
            }))
            ws4.send(JSON.stringify({
                type: "chat",
                payload: {
                    roomId: "e03131",
                    message: "hii there ws6",
                }
            }))
        })

        console.log('check point-5: final');
    })
})
