import React, {useState, useEffect } from 'react';
import './App.css';

//visual studio code open shortcut

// Boolean naming standard 
// isCompleted
// hasCompleted
// shouldDisable

function App() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    console.log('first useEffect')
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    console.log(loadedTodos)
    
    if (loadedTodos) {
      console.log(loadedTodos)
      setItems(loadedTodos);
    }
  }, []);

  useEffect(() => {
    if (items.length !== 0) {
      console.log('items => ', items)
  
      const json = JSON.stringify(items);
      localStorage.setItem("todos", json);
    }
  }, [items]);

  function addItem() {
    if (!inputValue) {
      alert("Enter an item!")
      return;
    }

    const item = {
      id: new Date().getTime(),
      completed: false,
      value: inputValue
    };

    // items.push(item)
    // setItems([...items])
    setItems(oldList => [...oldList, item]);
    setInputValue("");

    console.log(items);
  }

  const getItemIndex = (id) => {
    return items.findIndex((each) => each.id === id)
  }

  function onClickDelete(id)
  {
    // cahnges here
    // const newArray = items.filter(item => item.id !== id);
    // setItems(newArray);

    const index = getItemIndex(id)
    items.splice(index, 1)
    setItems([...items])
  }

  const onClickEdit = (id, value) => {
    setEditingText(value)
    setTodoEditing(id)
  }

  function onClickSubmitEdit(id) {
    // Need changes here
    // const newArray = [...items].map((item) => {
    //   if (item.id === id) {
    //     item.value = editingText;
    //   }
    //   return item;
    // });

    const index = getItemIndex(id)
    items[index].value = editingText

    setItems([...items]);
    setTodoEditing('');
    setEditingText('');
  }

  function toggleComplete(id)
  {
    // need changes here
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
        type="text" 
        placeholder="Add an item..."
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />

      <button className="add-btn" onClick={()=> addItem()}>
        <i className="material-icons">+</i>
      </button>

      <h2>3. List of Items</h2>
      <ol>
        {items.map(item => {
          return(
            <li key={item.id}>
              {item.id === todoEditing ? (
                <input
                  value={editingText}
                  type="text"
                  onChange={(e) => setEditingText(e.target.value)}
                />
                ) : (item.value)
              }

              <input className='btn'
                type="checkbox"
                id="completed"
                checked={item.completed}
                onChange={() => toggleComplete(item.id)}
              />

              <button
                onClick={() => {
                  if (item.id === todoEditing) {
                    onClickSubmitEdit(item.id)
                  } else {
                    onClickEdit(item.id, item.value)
                  }
                }}
              >          
                <i className="material-icons">
                  {item.id === todoEditing ? 'Submit Edit' : 'Edit'}
                </i>
              </button>

            {/* {item.id === todoEditing ? (
              <button style={{ borderRadius: 10 }} onClick={() => onClickSubmitEdit(item.id)}>
                <i className="material-icons">Submit Edit</i>
              </button>
            ) : (
              <button style={{ borderRadius: 10 } onClick={() => onClickEdit(item.id, item.value)}>              
                <i className="material-icons">Edit</i>
              </button>
            )} */}

              <button className= "btn" onClick ={() => onClickDelete(item.id)}>
                <i className="material-icons">X</i>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  );
}

export default App;
