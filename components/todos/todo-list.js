import { Fragment } from "react";
import TodoItem from "./todo-item";

function TodoList(props) {
  console.log(props);

  const { todos,title } = props;

  return (
    <Fragment>
      <h1>{title}</h1>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            onDeletehandler={props.onDeleteTodo}
            onFavouriteHandler={props.onFavouriteTodo}
            onCompleteHandler={props.onCompleteTodo}
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </Fragment>
  );
}

export default TodoList;
