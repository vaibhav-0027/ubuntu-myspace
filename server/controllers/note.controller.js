const db = require("../db");
const Note = db.Note;

exports.createNote = async ({ text, title, userId }) => {
    return await Note.create({
        text,
        title,
        userId,
    });
}

exports.fetchByUserId = async (userId) => {
    return await Note.findAll({
        where: {
            userId,
        },
        order: [
            ['updatedAt', 'DESC']
        ],
    });
}

exports.fetchById = async ( id ) => {
    return await Note.findByPk(id);
}