const express = require('express');
const router = express.Router();
const recipeControllers = require('../controllers/recipeControllers');
const recipeEmail=require('../controllers/sendEmailController');
router.get('/', recipeControllers.getAllRecipes);
router.get('/:id', recipeControllers.getRecipeById);
router.post('/', recipeControllers.createRecipe);
router.put('/:id', recipeControllers.updateRecipe);
router.delete('/:id', recipeControllers.deleteRecipe);
router.post('/send-recipe', recipeEmail.sendRecipeEmail);

module.exports = router;
