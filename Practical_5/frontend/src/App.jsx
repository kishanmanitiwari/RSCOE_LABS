import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const API = "http://localhost:5000";

  async function fetchUsers() {
    try {
      const response = await axios.get(API + "/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(function () {
    fetchUsers();
  }, []);

  async function addUser() {
    try {
      await axios.post(API + "/add", {
        name: name,
        email: email
      });

      setName("");
      setEmail("");
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteUser(id) {
    try {
      await axios.delete(API + "/delete/" + id);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={function (e) {
          setName(e.target.value);
        }}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={function (e) {
          setEmail(e.target.value);
        }}
      />

      <button onClick={addUser}>Add User</button>

      <hr />

      {users.map(function (user) {
        return (
          <div key={user.id}>
            {user.name} - {user.email}
            <button
              onClick={function () {
                deleteUser(user.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;