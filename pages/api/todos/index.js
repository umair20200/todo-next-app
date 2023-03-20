import { MongoClient } from "mongodb";

async function handler(req, res) {
  // POST /api/new-todo
  const client = await MongoClient.connect(
    `mongodb+srv://umairdoc2020:OPiGHRrC5uBAoouL@cluster0.ndey5ms.mongodb.net/todos?retryWrites=true&w=majority`
  );
  if (req.method === "POST") {
    const data = req.body;
    const db = client.db();
    const todosCollection = await db.collection("todos");
    const result = await todosCollection.insertOne(data);
    client.close();
    res.status(201).json({ message: "todos inserted" });
    return;
  }
  if (req.method === "GET") {
    const db = client.db();
    const todosCollection = await db.collection("todos");
    const result = await todosCollection.find();
    client.close();
    res.status(200).json({ msg: "updated", response: result });
    return;
  }
}

export default handler;
