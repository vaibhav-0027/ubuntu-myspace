const db = require("../db");
const File = db.File;

exports.fetchById = async (id) => {
    return await File.findByPk(id);
}

exports.fetchSpaceUsed = async (userId) => {
    return await File.sum('size', { 
        where: {
            userId,
        }
     });
}

exports.fetchByUser = async (userId, parentId) => {
    return await File.findAll({
        where: {
            userId,
            parentId,
        },
        order: [
            ['createdAt', 'DESC']
        ]
    });
}

exports.createFile = async ({ name, size, url, type, parentId, userId }) => {
    return await File.create({
        name, 
        size,
        url,
        type,
        parentId,
        userId,
    });
}