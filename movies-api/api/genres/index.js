import express from 'express';
import Genres from './genresModel';
import {
    getGenres
} from "../tmdb-api";

const router = express.Router(); // eslint-disable-line

// Get all genres
router.get('/', async (req, res) => {
    const genres = await Genres.find();
    res.status(200).json(genres);
});

// const router = express.Router(); 
router.get("/tmdb/genres", async(req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
});

export default router;