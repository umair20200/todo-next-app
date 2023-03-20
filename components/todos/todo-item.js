import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import moment from 'moment' // 292.3K (gzipped: 71.6K)

function TodoItem(prop) {
  const [isCompleted, setIsCompleted] = useState(prop.todo.isCompleted);
  const [isFavourite, setisFavourite] = useState(prop.todo.isFavourite);

  const { todo } = prop;
  function deleteHandler() {
    prop.onDeletehandler(prop.todo);
  }
  function completeTodo(event) {
    todo.isCompleted = event.target.checked;
    setIsCompleted(event.target.checked);
    prop.onCompleteHandler(todo);
  }
  function favouriteHandler(isFavourite) {
    setisFavourite(isFavourite);
    todo.isFavourite = isFavourite;
    prop.onFavouriteHandler(todo);
  }

  return (
    <ListItem>
      <Checkbox checked={isCompleted} onChange={completeTodo} />

      <ListItemButton>
        <ListItemText primary={todo.title} />
      </ListItemButton>
       <p>{moment(todo.date).format('MM/DD/YYYY')} </p>  
      <DeleteIcon onClick={deleteHandler} />
      {isFavourite ? (
        <FavoriteIcon onClick={favouriteHandler.bind(null, false)} />
      ) : (
        <FavoriteBorderIcon onClick={favouriteHandler.bind(null, true)} />
      )}
    </ListItem>
  );
}

export default TodoItem;
