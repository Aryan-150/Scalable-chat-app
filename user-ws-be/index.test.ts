import { describe, test, expect } from "bun:test";
describe.only("chat application", () => {
    
    test("sending the join payload to the server", async () => {
        const ws1 = new WebSocket("ws://localhost:8080");
        const ws2 = new WebSocket("ws://localhost:8080");
        const ws3 = new WebSocket("ws://localhost:8080");
        const ws4 = new WebSocket("ws://localhost:8080");
        const ws5 = new WebSocket("ws://localhost:8081");
        const ws6 = new WebSocket("ws://localhost:8081");
        const ws7 = new WebSocket("ws://localhost:8082");
        const ws8 = new WebSocket("ws://localhost:8084");

        //! 3: using promise.all
        await Promise.all([
            new Promise<void>(resolve => ws1.onopen = () => resolve()),
            new Promise<void>(resolve => ws2.onopen = () => resolve()),
            new Promise<void>(resolve => ws3.onopen = () => resolve()),
            new Promise<void>(resolve => ws4.onopen = () => resolve()),
            new Promise<void>(resolve => ws5.onopen = () => resolve()),
            new Promise<void>(resolve => ws6.onopen = () => resolve()),
            new Promise<void>(resolve => ws7.onopen = () => resolve()),
            new Promise<void>(resolve => ws8.onopen = () => resolve()),
        ])
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
                roomId: "e03131"
            }
        }))

        ws6.send(JSON.stringify({
            type: "join",
            payload: {
                roomId: "blue"
            }
        }))

        ws7.send(JSON.stringify({
            type: "join",
            payload: {
                roomId: "e03131"
            }
        }))

        ws8.send(JSON.stringify({
            type: "join",
            payload: {
                roomId: "blue"
            }
        }))

        await new Promise<void>((resolve) => {
            // listen for the message received:
            let count = 0;
            ws2.onmessage = ({data}) => {
                const parsedData = JSON.parse(data);
                expect(parsedData.roomId).toBe("blue");
                expect(parsedData.message).toBe("hiithere");
                count += 1;
                if(count == 2) resolve();
            }
            ws5.onmessage = ({data}) => {
                const parsedData = JSON.parse(data);
                expect(parsedData.roomId).toBe("e03131");
                expect(parsedData.message).toBe("hii there ws5");
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
                    message: "hii there ws5",
                }
            }))
        })
    })
})
