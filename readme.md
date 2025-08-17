- Architecture using user-ws-be & relayer-ws:
  ![Scalable Chat App](image.png)
- Architecture using express-be & worker: V1 implementation of redis as a queue.
  ![V1: redis as a queue](image-1.png)

# Assignments
- [Done]Optimize the message propagation from the relayer-ws, such that the message received at relayer-ws is sent to the websocket servers that have the client connected to the same room.
  - For example, if the relayer-ws receives a message for room `room1`, it should only send that message to the websocket servers that have clients connected to `room1`.
