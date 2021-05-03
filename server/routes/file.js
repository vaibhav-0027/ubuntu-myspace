const express = require('express');
const {s3Upload, deleteFileFromS3, s3GetSignedUrl} = require("../utils/fileUploadUtils");
const FileControls = require("../controllers/file.controller");
const authorize = require('../middleware/authorize');

const router = express.Router();


const singleUpload = s3Upload.single('file');

router.post('/upload', authorize, (req, res) => {
    
    singleUpload(req, res, function(err) {
        if (err) {
          return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}]});
        }
        return res.json({'fileUrl': req.file.location});
    });
    
});

router.post('/signedUrl', authorize, async (req, res) => {
    try {
		const {url} = req.body;
		const signedUrl = s3GetSignedUrl(url);
		return res.send({url: signedUrl});
	} catch (err) {
		return res.status(400).send(err || "Something went wrong");
	}
});

router.get('/:id', authorize, async (req, res) => {
    try {
        const userId = req.header("user_id");

        if(!userId) {
            throw new Error("Undefined user");
        }

        const files = await FileControls.fetchByUser(userId, req.params.id);
        const spaceUsed = await FileControls.fetchSpaceUsed(userId);
        return res.send({files, spaceUsed});
    } catch(err) {
        return res.status(400).send(err || "Something went wrong!");
    }
});

router.post('/', authorize, async (req, res) => {
    try {
        const userId = req.header("user_id");

        if(!userId) {
            throw new Error("Undefined user");
        }

        const { name, size, url, type, parentId } = req.body;
        const body = {
            name,
            size,
            url,
            type,
            parentId,
            userId,
        };

        const file = await FileControls.createFile(body);
        return res.send(file);
    } catch (err) {
        return res.status(400).send(err || "Something went wrong!");
    }
});

router.put('/:id', authorize, async (req, res) => {
    try {
        const userId = req.header("user_id");

        if(!userId) {
            throw new Error("Undefined user");
        }

        const { parentId, name } = req.body;
        const file = await FileControls.fetchById(req.params.id);
        const updatedFile = await file.update({
            parentId,
            name,
        });
        return res.send(updatedFile);
    } catch (err) {
        return res.status(400).send(err || "Something went wrong!");
    }
});

router.delete('/:id', authorize, async (req, res) => {
    try {
        const file = await FileControls.fetchById(req.params.id);
        if(!file) {
            throw new Error("File does not exist");
        }

        await deleteFileFromS3(file.url);
        await file.destroy();
        return res.send(file);
    } catch (err) {
        return res.status(400).send(err || "Something went wrong!");
    }
});


module.exports = router;