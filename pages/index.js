import styles from "../styles/Home.module.css";
import TodoList from "../components/todos/todo-list";
import { Container } from "react-materialize";
import {  useState } from "react";
import { MongoClient } from "mongodb";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home(props) {
  const [todoList, setTodoList] = useState(props.todos);

  async function completeEventHandler(todo) {
    const response = await fetch(`/api/todos/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function favouiteEventHandler(todo) {
    const response = await fetch(`/api/todos/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.msg === "deleted Successfully") {
      var todoLists = todoList.filter((todoItem) => {
        return todoItem.id !== todo.id;
      });
      setTodoList(todoLists);
    }
  }
  async function deleteEventHandler(todo) {
    const response = await fetch(`/api/todos/${todo.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.msg === "deleted Successfully") {
      var todoLists = todoList.filter((todoItem) => {
        return todoItem.id !== todo.id;
      });
      setTodoList(todoLists);
    }
  }
  
  return (
    
     
      
     
          <TodoList
            onDeleteTodo={deleteEventHandler}
            onFavouriteTodo={favouiteEventHandler}
            onCompleteTodo={completeEventHandler}
            todos={todoList}
            title='All Todo List'
          ></TodoList>
     
   
  );
}

export async function getStaticProps() {
  // feth data from an API

  const client = await MongoClient.connect(
    `mongodb+srv://umairdoc2020:OPiGHRrC5uBAoouL@cluster0.ndey5ms.mongodb.net/todos?retryWrites=true&w=majority`
  );

  const db = client.db();

  const todosCollection = db.collection("todos");

  const todos = await todosCollection.find().toArray();

  client.close();

  return {
    props: {
      todos: todos.map((todo) => ({
        title: todo.title||'',
        date: todo.date,
        isFavourite: todo.isFavourite,
        isCompleted: todo.isCompleted,
        id: todo._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
