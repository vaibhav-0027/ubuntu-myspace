'use-strict';

module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define('note', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            field: 'id',
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING,
            field: 'title',
        },
        text: {
            type: DataTypes.TEXT,
            field: 'text',
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
        },
    }, { tableName: 'note' });

    Note.associate = ( { User } ) => {
        Note.belongsTo(User, {
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        });
    }

    return Note;
}