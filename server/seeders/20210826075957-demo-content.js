'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('content', [
            {
                user_id: 1,
                title: '투표해줘요',
                picture_1: '어쩌구.jpg',
                picture_2: '저쩌구.jpg',
                description: '우리집앞에 나무 심는거 어떰?',
                voting_deadline: 'false',
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('content', null, {});
    },
};
