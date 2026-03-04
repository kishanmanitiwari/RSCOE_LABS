import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  function handleInputChange(event) {
    setTask(event.target.value);
  }

  function addTask() {
    if (task.trim() === "") return;

    const updatedList = [...taskList, task];
    setTaskList(updatedList);
    setTask("");
  }

  function deleteTask(index) {
    const updatedList = taskList.filter(function (item, i) {
      return i !== index;
    });

    setTaskList(updatedList);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Task Manager</h2>

      <input
        type="text"
        value={task}
        onChange={handleInputChange}
      />

      <button onClick={addTask}>Add</button>

      <ul>
        {taskList.map(function (item, index) {
          return (
            <li key={index}>
              {item}
              <button
                onClick={function () {
                  deleteTask(index);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;