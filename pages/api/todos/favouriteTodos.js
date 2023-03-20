import { MongoClient } from "mongodb";
const { ObjectId } = require("mongodb");

async function handler(req, res) {
  const client = await MongoClient.connect(
    `mongodb+srv://umairdoc2020:OPiGHRrC5uBAoouL@cluster0.ndey5ms.mongodb.net/todos?retryWrites=true&w=majority`
  );
  if (req.method === "GET") {
    const db = client.db();
    const todosCollection = await db.collection("todos");

    const result = await todosCollection.find({isFavourite:true});
    client.close();
    res.status(200).json({ msg: "updated", response: result });
    return;
  }
 
}

export default handler;
