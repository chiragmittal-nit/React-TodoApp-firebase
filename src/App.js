import React, { useState, useEffect } from "react";
import { InputLabel, Input, Button, FormControl } from "@material-ui/core";
import firebase from "firebase";
import Todo from "./Todo";
import db from "./firebase";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // console.log(db.collection('todos').onSnapshot(s=>console.log(s.docs)));
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, text: doc.data().text }))
        );
      });
  }, []);
  const addNotes = (e) => {
    e.preventDefault();
    // setTodos([...todos, input]);
    db.collection("todos").add({
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  const handleDelete = async (todo) => {
    console.log("inside handleDelete method !!!");
    try {
      await db.collection("todos").doc(todo.id).delete();
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div className="App">
      <h1>Todo App</h1>
      <br />
      <form>
        <FormControl>
          <InputLabel>✅ Write to Todo</InputLabel>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
        </FormControl>
        <Button
          disabled={!input}
          type="submit"
          onClick={addNotes}
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>
      </form>

      <div style={{ width: "400px", margin: "50px auto" }}>
        <ul>
          {todos.map((todo) => {
            return <Todo key={todo.id} data={todo} onDelete={handleDelete} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
