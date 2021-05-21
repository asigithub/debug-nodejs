var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../db').import('../models/user');

router.post('/signup',(req, res) => {
const reqUser= JSON.parse(req.query.user);
console.log(reqUser);
    const user = User.create({
        full_name: reqUser.full_name,
        username: reqUser.username,
        passwordhash: bcrypt.hashSync(String(reqUser.password), 10),
        email: reqUser.email,
    });
    if(user) {
        let token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
        res.status(200).json({
            user: user,
            token: token
        })
    }else{
        res.status(500).send(err.message);
    }
})

router.post('/signin', (req, res) => {
    const reqUser= JSON.parse(req.query.user); console.log(reqUser, '!!!!!!!!!!!!!!!!!!!!!!');
    User.findOne({ where: { username: reqUser.username } }).then(user => {
        if (user) {
            bcrypt.compare(reqUser.password, user.passwordHash, function (err, matches) {
                if (matches) {
                    var token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
                    res.json({
                        user: user,
                        message: "Successfully authenticated.",
                        sessionToken: token
                    });
                } else {
                    res.status(502).send({ error: "Passwords do not match." })
                }
            });
        } else {
            res.status(403).send({ error: "User not found." })
        }

    })
})

module.exports = router;