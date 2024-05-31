const connection = require("./utils/databaseConnection");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
var app = express();

// app.use(cors()); 
app.use(cors({
  origin: 'http://localhost:5173'
})); 

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("this is the home page");
});
app.get("/users", async (req, res) => {
  try {
    const obj = await connection.query("SELECT * FROM person");
    console.log("Obj in try block ", obj);
    // res.send("Data Fetched Successfully");
    // res.send(obj)
    res.json(obj)
  } catch (err) {
    console.log("Error in getting data ", err);
    res.status(500).send("Failed to fetch employees. ");
  }
});
app.post("/add-user", async (req, res) => {
  try {
    const { userName:name, phoneNum:number, email } = req.body;
    console.log("Req.body===> ",req.body)
    if (!name || !number || !email) {
      return res.status(400).send("All three fields are required.");
    }
    console.log("Name ", name, " Number ", number, " Email ", email);
    const sql =
      "INSERT INTO person (username,phonenumber,email) VALUES (?,?,?)";
    const result = await connection.query(sql, [name, number, email]);
    console.log("result.insertId", result[0].insertId);
    res.status(201).send(`Person added with ID ==>: ${result[0].insertId} `);
  } catch (err) {
    console.log("Error in adding appointment of the person ", err);
    res.status(500).send("Failed to add Person ");
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const sql = "SELECT * FROM person WHERE id = ?";
    const result = await connection.query(sql, [userId]);
    if (result[0].length === 0) {
      return res.status(404).send("User not found.");
    }
    res.status(200).json(result[0]);
  } catch (err) {
    console.log("Error in fetching user ", err);
    res.status(500).send("Failed to fetch user.");
  }
});
app.patch("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { userName:name, phoneNum:number, email } = req.body;
    console.log("req.body inpatch ",req.body)
    console.log("name num and email in patch ",name,number,email);

    if (!name || !number || !email) {
      return res
        .status(400)
        .send("All fields (name, number, email) are required for updating.");
    }

    const sql =
      "UPDATE person SET username = ?, phonenumber = ?, email = ? WHERE id = ?";
    const result = await connection.query(sql, [name, number, email, userId]);

    if (result[0].affectedRows === 0) {
      return res.status(404).send("User not found.");
    }

    res.status(200).send(`User with ID: ${userId} updated successfully.`);
  } catch (err) {
    console.log("Error in updating user ", err);
    res.status(500).send("Failed to update user.");
  }
});
app.delete("/delete-user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const sql = "DELETE FROM person WHERE id = ?";
    const result = await connection.query(sql, [userId]);
    if (result[0].affectedRows === 0) {
      return res.status(404).send("User not found.");
    }
    res.status(200).send(`User with ID: ${userId} deleted successfully.`);
  } catch (err) {
    console.log("Error in deleting user ", err);
    res.status(500).send("Failed to delete user.");
  }
});

app.listen(3000, () => {
  console.log("Server is running on 3000 ");
});
