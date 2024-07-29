const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db=require('./models/indexx');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const path = require('path');
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/upload', express.static(path.join(__dirname, 'upload')));
// Sync Database and Start Server
db.sequelize.sync({alter:'true'})
  .then(() => {
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch(error => {
    console.log('Error syncing database:', error);
  });
