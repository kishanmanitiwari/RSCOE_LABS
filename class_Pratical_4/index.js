import express from "express";
import jwt from "jsonwebtoken";

const app = express();

    const user =[
        {id:1, name:'John',password:'12345'},
        {id:2, name:'Jane',password:'67890'},
        {id:3, name:'Doe',password:'abcdef'},
    ]


app.get("/", (req, res) => { //home route
  res.send("Welcome to the Home Page");
});

app.get('/users', (req, res) => { //users route
        res.json(user);

});

app.get('/users/:id', (req, res) => { //user by id route
    const id = parseInt(req.params.id);
    const foundUser = user.find(u => u.id === id);
    if (foundUser) {
        res.json(foundUser);
    }else{  
        res.status(404).send('User not found');
    }   

});

app.get("/login", (req, res) => { //login route
    const name = req.query.name;
    const password = req.query.password;

    //implement jwt here for better security

    // sign - plain - cipher
    // verify - cipher - plain

    const findUser = user.find(u => u.name === name && u.password === password);

    if(findUser){
        const token = jwt.sign({ id: findUser.id, name: findUser.name }, "your_secret_key", { expiresIn: "1h" });
        res.json({ token });
    }else{
        res.status(401).send("Invalid credentials");
    }



});

app.get('/dashboard', (req, res) => { //dashboard route
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, "your_secret_key", (err, user) => {
            if (err) {
                return res.status(403).send("Invalid token");
            }
            res.send(`Welcome to the dashboard, ${user.name}`);
        });
    } else {
        res.status(401).send("Authorization header missing");
    }
});





app.listen(3000, () => {
  console.log("Server is running on port 3000");
});