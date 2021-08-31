const { user } = require('../../models');

module.exports = async (req, res) => {
    const { nickName, email, password, phoneNumber, profile_img } = req.body;
    try {
        const userCheck = await user.findOne({ where: { email: email } });
        if (userCheck) {
            res.status(409).json({ message: 'email exist' });
        } else if (nickName && email && password && phoneNumber && profile_img) {
            await user.create({
                nickName,
                email,
                password,
                phoneNumber,
                profile_img,
            });
            res.status(201).json({ message: 'ok' });
        } else {
            res.status(400).json({ message: 'please, rewrite' });
        }
    } catch (err) {
        res.status(500).json({ message: 'server error' });
    }
};
