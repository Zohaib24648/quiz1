const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const authenticateToken = require('../middleware/authenticateToken');
const requireRole = require('../middleware/requireRole');
//hello

router.post('/', authenticateToken, requireRole('admin'), async (req, res) => {
    const recipe = new Recipe(req.body);
    try {
        await recipe.save();
        res.status(201).send('Recipe added');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/', authenticateToken, async (req, res) => {
    const recipes = await Recipe.find().populate('ingredients');
    res.json(recipes);
});

router.get('/:id', authenticateToken, async (req, res) => {
    const recipe = await Recipe.findById(req.params.id).populate('ingredients');
    if (!recipe) {
        return res.status(404).send('Recipe not found');
    }
    res.json(recipe);
});

module.exports = router;
