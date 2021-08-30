'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('user', [
            {
                nickName: 'kimtoopyo',
                email: 'toopyo@test.com',
                password: '1234',
                profile_img: '어쩌구.jpg',
                provider: 'origin or kakao',
                phoneNumber: '010-1234-5678',
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('user', null, {});
    },
};
