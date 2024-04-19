const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient');
const authenticateToken = require('../middleware/authenticateToken');
const requireRole = require('../middleware/requireRole');

// POST endpoint to add a new ingredient (Admin only)
router.post('/', authenticateToken, requireRole('admin'), async (req, res) => {
    const { name, description } = req.body;
    const ingredient = new Ingredient({ name, description });

    try {
        await ingredient.save();
        res.status(201).send('Ingredient added');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET endpoint to retrieve all ingredients
router.get('/', authenticateToken, async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        res.json(ingredients);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// PUT endpoint to update an ingredient (Admin only)
router.put('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
    const { name, description } = req.body;
    try {
        const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
        if (!ingredient) {
            return res.status(404).send('Ingredient not found');
        }
        res.json(ingredient);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// DELETE endpoint to delete an ingredient (Admin only)
router.delete('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
    try {
        const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
        if (!ingredient) {
            return res.status(404).send('Ingredient not found');
        }
        res.send('Ingredient deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
