var router = require('express').Router();
var Game = require('../db').import('../models/game');


router.get('/all', (req, res) => {
    Game.findAll({ where: { owner_id: req.body.user.id } })
        .then( data => {
            function findSuccess(data) {
                res.status(200).json({
                    games: data,
                    message: "Data fetched."
                })
            }

            findSuccess(data);

        }
        )
        .catch(err => {
            function findFail(err) {
                res.status(500).json({
                    message: "Data not found."
                })
            }

            findFail(err);
        })
})

router.get('/:id', (req, res) => {
    Game.findOne({ where: { id:req.query.id, owner_id: req.body.user.id } })
        .then( (game) => {
            function findSuccess(game) {
                res.status(200).json({
                    game: game
                })
            }

            findSuccess(game)
        })
        .catch(err => {
            function findFail(err) {
                res.status(500).json({
                    message: "Data not found."
                })
            }

            findFail(err);
        })
})

router.post('/create', (req, res) => {
    Game.create({
        title: req.body.game.title,
        owner_id: req.body.user.id,
        studio: req.body.game.studio,
        esrb_rating: req.body.game.esrb_rating,
        user_rating: req.body.game.user_rating,
        have_played: req.body.game.have_played
    })
        .then( (err, game) => {
            function createSuccess(game) {
                res.status(200).json({
                    game: game,
                    message: "Game created."
                })
            }

            createSuccess(game);
   
        })
        .catch(err => {
            function createFail(err) {
                res.status(500).send(err.message)
            }

            createFail(err);
        })
})

router.put('/update/:id', (req, res) => {
    Game.update({
        title: req.body.game.title,
        studio: req.body.game.studio,
        esrb_rating: req.body.game.esrb_rating,
        user_rating: req.body.game.user_rating,
        have_played: req.body.game.have_played
    },
        {
            where: {
                id: req.query.id,
                owner_id: req.body.user.id,
            }
        })
        .then((game) => {
            function updateSuccess(game) {
                res.status(200).json({
                    game: game,
                    message: "Successfully updated."
                })
            }

            updateSuccess(game);
        })
        .catch(err => {

            function updateFail(err) {
                res.status(500).json({
                    message: err.message
                })
            }

            updateFail(err);

        })
        
})

router.delete('/remove/:id', (req, res) => {
    Game.destroy({
        where: {
            id: req.query.id,
            owner_id: req.body.user.id
        }
    })
    .then((game) => {
        function deleteSuccess(game) {
            res.status(200).json({
                game: game,
                message: "Successfully deleted"
            })
        }

        deleteSuccess(game);

    })
    .catch(err => {

        function deleteFail(err) {
            res.status(500).json({
                error: err.message
            })
        }

        deleteFail(err);

    })
})

module.exports = router;