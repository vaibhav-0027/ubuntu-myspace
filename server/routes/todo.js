const express = require("express");
const TodoControls = require("../controllers/todo.controller");
const authorize = require("../middleware/authorize");
const router = express.Router();

router.post('/', authorize, async (req, res) => {
    try {
        const { text, userId } = req.body;

        if(!userId) {
            throw new Error("Undefined user");
        }

        const body = {
            text, 
            userId,
            status: 0,
        };

        const todo = await TodoControls.createTodo(body);
        return res.send(todo);

    } catch (err) {
        res.status(400).send(err || "Something went wrong!");
    }
});

router.get('/', authorize, async (req, res) => {
    try {
        const userId = req.header("user_id");

        if(!userId) {
            throw new Error("Undefined user");
        }

        const todos = await TodoControls.fetchByUserId(userId);
        return res.send(todos);

    } catch (err) {
        res.status(400).send(err || "Something went wrong!");
    }
});

router.put('/:id', authorize, async (req, res) => {
    try {
        const { text, status } = req.body;

        const todo = await TodoControls.fetchById(req.params.id);
        if(!todo) {
            throw new Error("invalid todo id");
        }

        const updatedTodo = await todo.update({
            text,
            status,
        });
        return res.send(updatedTodo);

    } catch (err) {
        res.status(400).send(err || "Something went wrong!");
    }
});

router.delete('/:id', authorize, async (req, res) => {
    try {
        const todo = await TodoControls.fetchById(req.params.id);
        if(!todo) {
            throw new Error("Todo does not exist");
        }

        await todo.destroy();
        return res.send("Todo deleted successfully!");
    } catch (err) {
        res.status(400).send(err || "Something went wrong!");
    }
});

module.exports = router;