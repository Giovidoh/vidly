const express = require('express');
const router = express.Router();

// Genres array
const genres = [
    {id: 1, name: 'action'},
    {id: 2, name: 'horror'},
    {id: 3, name: 'comedy'},
]

router.get('/', (req, res) => {
    res.send(genres);
});

router.post('/', (req, res) => {
    // Validate
    // If invalid, return 400 - Bad Request
    const {error, value} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Create genre
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre)
});

router.put('/:id', (req, res) => {
    // Look up the genre
    // If not found, return 404 - Not Found
    const genre = genres.find( g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found!');

    // Validate
    // If invalid, return 400 - Bad Request
    const {error, value} = validateGenre(genre);
    if(error) return res.status(400).send(error.details[0].message);

    // Update genre
    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    // Look up the genre
    // If not found, return 404 - Not Found
    const genre = genres.find( g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found!');

    // Delete genre
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    // Return the deleted genre
    res.send(genre);
});

router.get('/:id', (req, res) => {
    // Look up the genre
    const genre = genres.find( g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found!');

    // Show the genre if found
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