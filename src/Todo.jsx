import React, { useState } from "react";
import {
  ListItemText,
  ListItem,
  IconButton,
  makeStyles,
  Modal,
  Button,
  Input,
} from "@material-ui/core";
import { DeleteForever, Edit } from "@material-ui/icons";
import db from "./firebase";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  update_button: {
    marginLeft: "10px",
  },
}));

function Todo({ data, onDelete }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const updateTodo = () => {
    setOpen(false);
    db.collection("todos").doc(data.id).set(
      {
        text: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  };
  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={data.text}
          />
          <Button
            className={classes.update_button}
            disabled={!input}
            type="submit"
            onClick={updateTodo}
            size="small"
            variant="contained"
            color="primary"
          >
            Update Todo
          </Button>
        </div>
      </Modal>
      <ListItem>
        <ListItemText primary={data.text} secondary="dummy deadline 😈 " />
        <IconButton
          onClick={() => setOpen(true)}
          edge="start"
          aria-label="edit"
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => onDelete(data)}
          edge="start"
          aria-label="delete"
        >
          <DeleteForever />
        </IconButton>
      </ListItem>
    </>
  );
}

export default Todo;
