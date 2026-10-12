
const express = require("express");
const app = express();

app.use(express.json());

let students = [
    {
        id: 1,
        name: "Ram",
        marks: 98
    },
    {
        id: 2,
        name: "Sham",
        marks: 72
    }
];

// POST - Add Student
app.post("/students", (req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        marks: req.body.marks
    };

    students.push(student);

    res.send("Student added successfully");
});

// PUT - Update Student
app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (student) {
        student.name = req.body.name;
        student.marks = req.body.marks;

        res.send("Student updated successfully");
    } else {
        res.send("Student not found");
    }
});

// DELETE - Delete Student
app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index !== -1) {
        students.splice(index, 1);

        res.send("Student deleted successfully");
    } else {
        res.send("Student not found");
    }
});

// GET - Display All Students
app.get("/", (req, res) => {
    res.send(students);
});

// Start Server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
