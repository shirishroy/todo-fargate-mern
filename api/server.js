require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Use the environment variable for MongoDB URI
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Models
const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: "Error fetching todos" });
    }
});

app.post('/todo/new', async (req, res) => {
    try {
        if (!req.body.text) return res.status(400).json({ error: "Todo text is required" });

        const todo = new Todo({ text: req.body.text });
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: "Error creating todo" });
    }
});

app.delete('/todo/delete/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid Todo ID" });
        }

        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) return res.status(404).json({ error: "Todo not found" });

        res.json({ success: true, deletedTodo });
    } catch (error) {
        res.status(500).json({ error: "Error deleting todo" });
    }
});

app.get('/todo/complete/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid Todo ID" });
        }

        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ error: "Todo not found" });

        todo.complete = !todo.complete;
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: "Error updating todo" });
    }
});

app.put('/todo/update/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid Todo ID" });
        }
        if (!req.body.text) return res.status(400).json({ error: "Todo text is required" });

        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ error: "Todo not found" });

        todo.text = req.body.text;
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: "Error updating todo" });
    }
});

app.listen(3001, () => console.log("Server running on port 3001"));
