import { describe, test, expect } from "bun:test";
describe.only("chat application", () => {
    
    test("sending the join payload to the server", async () => {
        const ws1 = new WebSocket("ws://localhost:8080");
        const ws2 = new WebSocket("ws://localhost:8080");

        //* make sure that the ws1 ans ws2 are connected to the server:
        //! 1:
        // await Promise.resolve(
        //     ws1.onopen = () => {
        //         console.log(`connection established`);
        //     }
        // )

        // await Promise.resolve(
        //     ws2.onopen = () => {
        //         console.log(`connection established`);
        //     }
        // )

        //! 2:
        await new Promise<void>((resolve, reject) => {
            let count = 0;
            ws1.onopen = () => {
                count += 1;
                if(count == 2)
                    resolve();
            }

            ws2.onopen = () => {
                count += 1;
                if(count == 2)
                    resolve();
            }
        })

        //! 3: using promise.all
        // await Promise.all([
        //     new Promise<void>((resolve) => {
        //         ws1.onopen = () => resolve()
        //     }),
        //     new Promise<void>((resolve) => {
        //         ws2.onopen = () => resolve()
        //     })
        // ])

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

        await new Promise<void>((resolve) => {
            // listen for the message received:
            ws2.onmessage = ({data}) => {
                console.log('check point-1');
                console.log(data, typeof data);
                const parsedData = JSON.parse(data);
                
                expect(parsedData.roomId).toBe("blue");
                expect(parsedData.message).toBe("hiithere");
                resolve();
            }

            console.log('check point-2');
            ws1.send(JSON.stringify({
                type: "chat",
                payload: {
                    roomId: "blue",
                    message: "hiithere",
                }
            }))
        })

        console.log('check point-3');

    })
})



