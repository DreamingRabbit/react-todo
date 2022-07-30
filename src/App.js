import React, {useState, useEffect } from 'react';
import './App.css';

//visual studio code open shortcut

function App() {

  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      console.log(loadedTodos)
      setItems(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(items);
    localStorage.setItem("todos", json);
  }, [items]);

  function addItem()
  {
    if (!newItem) 
    {
      alert("Enter an item!")
      return;
    }

    const item = {
      id: new Date().getTime(),
      completed: false,
      value: newItem
    };

    setItems(oldList => [...oldList, item]);
    setNewItem("");

    console.log(items);
  }

  function deleteItem(id)
  {
    const newArray = items.filter(item => item.id !== id);
    setItems(newArray);
  }

  function editItem(id)
  {
    const newArray = [...items].map((item) => {
      if (item.id === id) {
        item.value = editingText;
      }
      return item;
    });
    setItems(newArray);
    setTodoEditing(null);
    setEditingText("");
  }

  function toggleComplete(id)
  {
    let newArray = items.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setItems(newArray);
  }

  return (
    <div className="App">
      <h1 className ="app-title">My List</h1>
      <h2>2. Input</h2>
      <input
        type ="text" 
        placeholder="Add an item..."
        value = {newItem}
        onChange = {e => setNewItem(e.target.value)}
      />
      <button className="add-btn" onClick={()=>addItem()}>
        <i class="material-icons">+</i>
        </button>
      <h2>3. List of Items</h2>
      <ol>
        {items.map(item => {
          return(
            <li key={item.id}>
              {
                item.id === todoEditing ?
                (
                  <input
                    type="text"
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                ) 
                :
                (item.value)
              }
            <input className='btn'
              type="checkbox"
              id="completed"
              checked={item.completed}
              onChange={() => toggleComplete(item.id)}
            />
            {item.id === todoEditing ? (
              <button onClick={() => editItem(item.id)}>
                <i class = "material-icons">Submit Edit</i>
              </button>
            ) : (
              <button onClick={() => setTodoEditing(item.id)}>              
                <i class = "material-icons">Edit</i>
              </button>
            )}

            <button className= "btn" onClick ={() => deleteItem(item.id)}>
              <i class ="material-icons">X</i>
            </button>
            </li>
          )
        })}
      </ol>
    </div>
  );
}

export default App;
