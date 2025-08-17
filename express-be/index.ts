import express from "express";
import { createClient } from "redis";

const PORT = 3000;
const app = express();
const client = createClient();

app.use(express.json());

app.post("/submit", async(req, res) => {
  const { problemId, userId, code } = req.body;
  try {
    // push it to the redis-queue(say 'submissions'):
    await client.lPush("submissions", JSON.stringify({problemId, userId, code}));
    res.json({
      msg: "submission received and stored ...!"
    })
  } catch (error: any) {
    res.status(411).json({
      msg: error.message
    })
  }
})

async function main() {
  try {
    await client
      .on("error", (err) => console.error("redis client error: ",err))
      .connect();
    console.log('redis client connected ...!');
  
    app.listen(PORT, () => {
      console.log(`server is listening at port: ${PORT}`);
    })
  } catch (error: any) {
    console.error(error.message)
  }
}

main();