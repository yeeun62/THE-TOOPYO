'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('contents', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_content_user',
            references: {
                table: 'users',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('agrees', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'agrees_ibfk_1',
            references: {
                table: 'users',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('agrees', {
            fields: ['contentId'],
            type: 'foreign key',
            name: 'agrees_ibfk_2',
            references: {
                table: 'contents',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('disagrees', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'disagrees_ibfk_1',
            references: {
                table: 'users',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('disagrees', {
            fields: ['contentId'],
            type: 'foreign key',
            name: 'disagrees_ibfk_2',
            references: {
                table: 'contents',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('contents', 'disagrees_ibfk_1');
        await queryInterface.removeConstraint('contents', 'disagrees_ibfk_2');
        await queryInterface.removeConstraint('agrees', 'agrees_ibfk_1');
        await queryInterface.removeConstraint('agrees', 'agrees_ibfk_2');
        await queryInterface.removeConstraint('disagrees', 'fk_disagree_content');
        await queryInterface.removeConstraint('disagrees', 'fk_disagree_user');
    },
};
