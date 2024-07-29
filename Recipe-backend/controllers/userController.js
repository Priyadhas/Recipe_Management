
const User = require('../models/user');
const db=require('../models/indexx');
// const jwt = require('jsonwebtoken');
// const JWT_SECRET = 'dshdksjhdiuee2';

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await db.User.create({
      name,
      email,
      password,
      
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email , password } });
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
    // const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    // res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await db.User.findOne({ where: { email, password } });
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid email or password' }); // Use return to exit the function
//     }

//     //  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
//     //  return res.json({ token }); // Use return to ensure only one response is sent
//   } catch (error) {
//     return res.status(500).json({ error: error.message }); // Use return to ensure only one response is sent
//   }
// };

exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteUser = async (req, res) => {

  try {
    const user = await db.User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body; 
    await db.User.update({ name, email, password }, { where: { id: req.params.id } });
    res.json({ message: 'User updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res)=> {
   
  try{
    const user =await db.User.findByPk(req.params.id);
if(!user)
{
  return res.status(404).json({error:'User not found'});
}
res.json(user);
  } catch (error)
  {
    res.status(500).json({error:error.message});
  }
};