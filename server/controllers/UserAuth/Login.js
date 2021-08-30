const { user } = require('../../models');

module.exports = (req, res) => {
    console.log(req.session);
    const { email, password } = req.body;
    user.findOne({
        where: {
            email,
            password,
        },
    }).then((data) => {
        if (!data) {
            return res.status(401).json({ message: 'Invalid user' });
        } else {
            req.session.save(function () {
                req.session.email = data.dataValues.email;
                console.log(req.session);
                return res.status(200).json({ message: 'ok' });
            });
        }
    });
};
