const express = require("express");
const NoteControls = require("../controllers/note.controller");
const authorize = require("../middleware/authorize");
const router = express.Router();

router.post('/', authorize, async (req, res) => {
    try {
        const { text, title, userId } = req.body;

        if(!userId) {
            throw new Error("Undefined user");
        }

        const body = {
            text, 
            userId,
            title,
        };

        const note = await NoteControls.createNote(body);
        return res.send(note);

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

        const notes = await NoteControls.fetchByUserId(userId);
        return res.send(notes);

    } catch (err) {
        res.status(400).send(err || "Something went wrong!");
    }
});

router.put('/:id', authorize, async (req, res) => {
    try {
        const { text, title } = req.body;

        const note = await NoteControls.fetchById(req.params.id);
        if(!note) {
            throw new Error("invalid note id");
        }

        const updatedNote = await note.update({
            text,
            title,
        });
        return res.send(updatedNote);

    } catch (err) {
        res.status(400).send(err || "Something went wrong!");
    }
});

router.delete('/:id', authorize, async (req, res) => {
    try {
        const note = await NoteControls.fetchById(req.params.id);
        if(!note) {
            throw new Error("note does not exist");
        }

        await note.destroy();
        return res.send("note deleted successfully!");
    } catch (err) {
        res.status(400).send(err || "Something went wrong!");
    }
});

module.exports = router;