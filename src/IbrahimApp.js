import React, { useState, useEffect } from 'react';
import './App.css';

const styles = {
  container: {
    width: 480,
    margin: '10px auto',
  },
  headerContainer: {
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  title: {
    textAlign: 'center',
    color: 'white'
  },
  section: {
    backgroundColor: 'black',
    marginTop: 15,
    borderRadius: 5,
    padding: 10,
  },
  inputContainer: {
    display: 'flex',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    border: '1px solid white',
    borderRadius: 5,
    padding: 10,
    outline: 'none',
    width: '100%',
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  addBtn: {
    fontSize: 14,
    padding: 10,
    backgroundColor: 'green',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    borderRadius: 5,
  },
  todoValue: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  listHeader: {
    color: 'white',
    marginBottom: 15,
    marginTop: 15,
  }
}

const IbrahimApp = () => {
  const [newValue, setNewValue] = useState('')
  const [items, setItems] = useState([])
  const [id, setId] = useState(1)

  const onChangeInput = (e) => {
    setNewValue(e.target.value)
  }

  const onAddItem = () => {
    const newItem = {
      id,
      value: newValue,
      isCompleted: false,
    }

    setId(id + 1)
    setItems([...items, newItem])
    setNewValue('')
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h2 style={styles.title}>Todo App</h2>
      </div>

      <div style={styles.section}>
        <div style={styles.inputContainer}>
          <input
            style={styles.input}
            placeholder="e.g Do Laundry"
            onChange={onChangeInput}
            value={newValue}
          />

          <button style={styles.addBtn} onClick={onAddItem}>
            Add
          </button>
        </div>

        <div>
          <h3 style={styles.listHeader}>My Todo List:</h3>

          {items.map((each, i) => (
            <div key={each.id} style={styles.todoValue}>
              {`${i + 1}. ${each.value}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IbrahimApp;
