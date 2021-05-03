const db = require("../db");
const Todo = db.Todo;

exports.createTodo = async ({ text, status, userId }) => {
    return await Todo.create({
        text,
        status,
        userId,
    });
}

exports.fetchByUserId = async (userId) => {
    return await Todo.findAll({
        where: {
            userId,
        },
        order: [
            ['updatedAt', 'DESC']
        ],
    });
}

exports.fetchById = async ( id ) => {
    return await Todo.findByPk(id);
}