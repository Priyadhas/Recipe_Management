
const nodemailer = require('nodemailer');
require('dotenv').config();
const db=require('../models/indexx');

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await db.Recipee.findAll();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await db.Recipee.findByPk(req.params.id);
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const { title, imageUrl, ingredients, preparation } = req.body;
    const recipe = await db.Recipee.create({
      title,
      imageUrl,
      ingredients,
      preparation
    });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const { title, imageUrl, ingredients, preparation } = req.body;
    await db.Recipee.update({ title, imageUrl, ingredients, preparation }, { where: { id: req.params.id } });
    res.json({ message: 'Recipe updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    await db.Recipee.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Recipe deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.sendRecipeEmail = async (req, res) => {
//   try {
//     const { email, recipeId } = req.body;
//     const recipe = await db.Recipee.findByPk(recipeId);
//     if (!recipe) {
//       return res.status(404).json({ error: 'Recipe not found' });
//     }

//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       }
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: `Recipe: ${recipe.title}`,
//       text: `Ingredients:\n${recipe.ingredients}\n\nPreparation:\n${recipe.preparation}`
//     };

//     await transporter.sendMail(mailOptions);
//     res.json({ message: 'Email sent' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
