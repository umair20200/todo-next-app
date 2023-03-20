import { MongoClient } from "mongodb";
const { ObjectId } = require("mongodb");

async function handler(req, res) {
  const client = await MongoClient.connect(
    `mongodb+srv://umairdoc2020:OPiGHRrC5uBAoouL@cluster0.ndey5ms.mongodb.net/todos?retryWrites=true&w=majority`
  );
  const db = client.db();
  if (req.method === "DELETE") {
    const todoId = ObjectId(req.query.todoId);
    const todosCollection = await db.collection("todos");
    const result = await todosCollection.deleteOne({ _id: todoId });
    client.close();
    res.status(200).json({ msg: "deleted Successfully", response: result });
  }
  if (req.method === "PUT") {
    const todoId = req.query.todoId;

    const todosCollection = await db.collection("todos");
    const result = await todosCollection.updateOne(
      { _id: new ObjectId(todoId) },
      { $set: req.body }
    );
    client.close();
    res.status(200).json({ msg: "updated", response: result });
  }
}

export default handler;
