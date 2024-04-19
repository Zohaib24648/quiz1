const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }]
});

const recipe = mongoose.model('recipe', recipeSchema);
module.exports = recipe;
