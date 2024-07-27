const db=require('../models/indexx');
const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendRecipeEmail = async (req, res) => {
    try {
      const { email, recipeId } = req.body;
      const recipe = await db.Recipee.findByPk(recipeId);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Recipe: ${recipe.title}`,
        text: `Ingredients:\n${recipe.ingredients}\n\nPreparation:\n${recipe.preparation}`
      };
  
      await transporter.sendMail(mailOptions);
      res.json({ message: 'Email sent' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
// const db = require('../models/indexx');
// const nodemailer = require('nodemailer');
// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const path = require('path');
// require('dotenv').config();

// exports.sendRecipeEmail = async (req, res) => {
//   try {
//     const { email, recipeId } = req.body;
//     const recipe = await db.Recipee.findByPk(recipeId);
//     if (!recipe) {
//       return res.status(404).json({ error: 'Recipe not found' });
//     }

//     // Create a PDF document
//     const doc = new PDFDocument();
//     const pdfPath = path.join(__dirname, `${recipe.title.replace(/\s+/g, '_')}.pdf`);
//     doc.pipe(fs.createWriteStream(pdfPath));
    
//     doc.fontSize(20).text(`Recipe: ${recipe.title}`, { align: 'center' });
//     doc.moveDown();
//     doc.fontSize(14).text(`Ingredients:\n${recipe.ingredients}`);
//     doc.moveDown();
//     doc.fontSize(14).text(`Preparation:\n${recipe.preparation}`);
//     doc.end();

//     // Wait for the PDF to be created
//     await new Promise(resolve => doc.on('finish', resolve));

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
//       text: `Please find the attached PDF for the recipe: ${recipe.title}`,
//       attachments: [
//         {
//           filename: `${recipe.title.replace(/\s+/g, '_')}.pdf`,
//           path: pdfPath
//         }
//       ]
//     };

//     await transporter.sendMail(mailOptions);

//     // Delete the PDF file after sending the email
//     fs.unlinkSync(pdfPath);

//     res.json({ message: 'Email sent with PDF attachment' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
