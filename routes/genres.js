const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router();

// Genres Model
const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    }
}));

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', async(req, res) => {
    // Validate
    // If invalid, return 400 - Bad Request
    const {error, value} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Create genre
    let genre = new Genre({
        name: req.body.name
    });

    genre = await genre.save();

    res.send(genre);
});

router.put('/:id', async (req, res) => {
    // // Look up the genre
    // // If not found, return 404 - Not Found
    // const genre = Genre.findById( req.params.id );
    // if(!genre) return res.status(404).send('The genre with the given ID was not found!');

    // // Validate
    // // If invalid, return 400 - Bad Request
    // const {error, value} = validateGenre(req.body);
    // if(error) return res.status(400).send(error.details[0].message);

    // // Update genre
    // genre.name = req.body.name;
    // res.send(genre);

    // UPDATE FIRST APPROACH
    const {error, value} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate( req.params.id, {
            name: req.body.name
        }, {
            new: true
        }
    );

    if(!genre) return res.status(404).send('The genre with the given ID was not found!');

    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    // // Look up the genre
    // // If not found, return 404 - Not Found
    // const genre = genres.find( g => g.id === parseInt(req.params.id));
    // if(!genre) return res.status(404).send('The genre with the given ID was not found!');

    // // Delete genre
    // const index = genres.indexOf(genre);
    // genres.splice(index, 1);

    // // Return the deleted genre
    // res.send(genre);

    const genre = await Genre.findByIdAndDelete( req.params.id );

    if(!genre) return res.status(404).send('The genre with the given ID was not found!');

    res.send(genre);
});

router.get('/:id', async (req, res) => {
    // // Look up the genre
    // const genre = genres.find( g => g.id === parseInt(req.params.id));
    // if(!genre) return res.status(404).send('The genre with the given ID was not found!');

    // // Show the genre if found
    // res.send(genre);

    const genre = await Genre.findById( req.params.id );

    if (!genre) return res.status(404).send('The genre with the given ID was not found!');

    res.send(genre);
});

// Validation function
function validateGenre (genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    return schema.validate(genre);
}

module.exports = router;