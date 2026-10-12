
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

// MongoDB connection
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let students;

// Connect MongoDB
async function connectDB() {
    await client.connect();

    console.log("MongoDB connected successfully");

    const db = client.db("college");
    students = db.collection("students");
}

// ===============================
// POST - Add Student
// ===============================
app.post("/students", async (req, res) => {
    try {
        const student = {
            name: req.body.name,
            age: req.body.age,
            marks: req.body.marks,
            course: req.body.course
        };

        const result = await students.insertOne(student);

        res.send({
            message: "Student added successfully",
            id: result.insertedId
        });

    } catch (error) {
        res.status(500).send("Error adding student");
    }
});

// ===============================
// GET - Display All Students
// ===============================
app.get("/students", async (req, res) => {
    try {
        const data = await students.find().toArray();

        res.send(data);

    } catch (error) {
        res.status(500).send("Error fetching students");
    }
});

// ===============================
// PUT - Update Student
// ===============================
app.put("/students/:id", async (req, res) => {
    try {
        const { ObjectId } = require("mongodb");

        const id = new ObjectId(req.params.id);

        const result = await students.updateOne(
            { _id: id },
            {
                $set: {
                    name: req.body.name,
                    age: req.body.age,
                    marks: req.body.marks,
                    course: req.body.course
                }
            }
        );

        if (result.matchedCount > 0) {
            res.send("Student updated successfully");
        } else {
            res.send("Student not found");
        }

    } catch (error) {
        res.status(500).send("Error updating student");
    }
});

// ===============================
// DELETE - Delete Student
// ===============================
app.delete("/students/:id", async (req, res) => {
    try {
        const { ObjectId } = require("mongodb");

        const id = new ObjectId(req.params.id);

        const result = await students.deleteOne({
            _id: id
        });

        if (result.deletedCount > 0) {
            res.send("Student deleted successfully");
        } else {
            res.send("Student not found");
        }

    } catch (error) {
        res.status(500).send("Error deleting student");
    }
});

// ===============================
// Home Page
// ===============================
app.get("/", (req, res) => {
    res.send(`
        <h1>College Student Management API</h1>

        <h3>Available APIs:</h3>

        <p>POST /students → Add Student</p>
        <p>GET /students → Display Students</p>
        <p>PUT /students/:id → Update Student</p>
        <p>DELETE /students/:id → Delete Student</p>
    `);
});

// ===============================
// Start Server
// ===============================
async function startServer() {
    await connectDB();

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

startServer();
