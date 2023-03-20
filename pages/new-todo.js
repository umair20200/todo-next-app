import NewAddItemForm from "../components/todos/add-todo-form"



function NewTodo() {

  async function addTodoHandler(enteredTodoData) {
    console.log(enteredTodoData)
     const response = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(enteredTodoData),
      headers: {
        "Content-Type": "application/json",
      },
    });

     const data = await response.json();

     console.log(data);

    // router.push("/");
  }
  return (
    
    <NewAddItemForm onAddTodo={addTodoHandler}/>

  )
}

export default NewTodo