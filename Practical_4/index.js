import express from "express";
import cors from "cors";

const app = express();
app.use(cors()); // Enable CORS for all routes

// Parse JSON data
app.use(express.json());

// Parse form-urlencoded data
app.use(express.urlencoded({ extended: true }));

// Hardcoded JSON Data
let users = [
  {
    id: 1,
    name: "Kishan",
    email: "kishan@gmail.com"
  },
  {
    id: 2,
    name: "Rahul",
    email: "rahul@gmail.com"
  }
];

app.ge

// Get All Users
app.get("/users", (req, res) => {
  res.json(users);
});

// Add User
app.post("/add", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };

  users.push(newUser);
  res.json(newUser);
});

// Delete User
app.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.id !== id);
  res.send("User Deleted");
});

app.listen(5000, () => console.log("Server running on port 5000"));

//Assignment - Add mongoDB database