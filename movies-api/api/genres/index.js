import express from 'express';
import Genres from './genresModel';

const router = express.Router(); // eslint-disable-line

// Get all genres
router.get('/', async (req, res) => {
    const genres = await Genres.find();
    res.status(200).json(genres);
});

export default router;