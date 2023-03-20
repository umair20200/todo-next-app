import { MongoClient } from "mongodb";
import TodoList from "../components/todos/todo-list";
import {  useState } from "react";

function Favourite(props) {
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
    console.log(props,'==================')
    return (
        <TodoList
        onDeleteTodo={deleteEventHandler}
        onFavouriteTodo={favouiteEventHandler}
        onCompleteTodo={completeEventHandler}
        todos={todoList}
        title='Favourite Todo List'
      ></TodoList>
    );
  }
  
  export default Favourite;
  

  export async function getServerSideProps() {
    const client = await MongoClient.connect(
        `mongodb+srv://umairdoc2020:OPiGHRrC5uBAoouL@cluster0.ndey5ms.mongodb.net/todos?retryWrites=true&w=majority`
      );
    
      const db = client.db();
    
      const todosCollection = db.collection("todos");
    
      const todos = await todosCollection.find({isFavourite:true}).toArray();
    
      client.close();   

    // Fetch data from external API
   
  
    // Pass data to the page via props
    return { props: {  todos: todos.map((todo) => ({
        title: todo.title,
        date: todo.date,
        isFavourite: todo.isFavourite,
        isCompleted: todo.isCompleted,
        id: todo._id.toString(),
      })), } }
  }