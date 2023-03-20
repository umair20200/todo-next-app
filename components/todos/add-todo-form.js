import { useRef } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles(() => ({
 
  center: {
    position: 'absolute', 
      left: '50%', 
      top: '50%',
      transform: 'translate(-50%, -50%)',
     height:'250px',
     width:'350px'
  },
  containedPrimary: {
    width:'350px'

  }
}))
function NewAddItemForm(props) {
  const classes = useStyle();

  const titleInputRef = useRef();
  function submitHandler(event) {
    event.preventDefault();
     console.log(titleInputRef)
    const enteredTitle = titleInputRef.current.value;

    const todoData = {
      title: enteredTitle,
      date: new Date(),
      isCompleted: false,
      isFavourite: false,
    };

    props.onAddTodo(todoData);
    titleInputRef.current.value = "";
  }

  return (
    <Box  
    className={classes.center}
    >
    <form onSubmit={submitHandler}>
      <div>
        <TextField
         className={classes.containedPrimary}
          error
          id="outlined-error"
          label="Enter Todo"
          required  inputRef={titleInputRef}
        />
      </div>

      <div>
      <Button variant="contained" onClick={submitHandler}>Add Todo</Button>

      </div>
    </form>
    </Box>
  );
}
export default NewAddItemForm;
