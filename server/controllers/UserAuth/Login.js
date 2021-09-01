const { user } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res) => {
    const { email, password } = req.body;
    let findUser = await user.findOne({ where: { email: email, password: password } });

    if (!findUser) {
        res.status(404).json({ message: 'not authorized' });
    } else {
        delete findUser.dataValues.password;
        const accessToken = await jwt.sign(findUser.dataValues, process.env.ACCESS_SECRET);

        res.status(200)
            .cookie('accessToken', accessToken, {
                httpOnly: true,
            })
            .json({ message: 'ok' });
    }
};
