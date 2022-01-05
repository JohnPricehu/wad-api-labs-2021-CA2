import express from 'express';
import {
getPerson
} from "../tmdb-api";

import asyncHandler from 'express-async-handler';

const router = express.Router(); 

router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const actor = await getPerson(id);
    if (actor) {
        res.status(200).json(actor);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

export default router;