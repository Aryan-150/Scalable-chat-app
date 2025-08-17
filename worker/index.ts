import { createClient } from "redis";

const client = createClient()
  .on("error", (err) => console.error("redis client error; ", err))

async function main() {
  try {
    await client.connect();
    console.log("Worker connected to Redis.");
    while(true){
      try {
        const response = await client.brPop("submissions", 0);
        if(response){
          console.log(JSON.parse(response.element));
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
        console.log('problem processed ...!');
      } catch (error: any) {
        console.error("error while processing the problem ...!", error.message);
      }
    }
  } catch (error: any) {
    console.error(error.message)
  }
}

main();