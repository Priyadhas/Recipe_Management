
module.exports = (sequelize, DataTypes) => {
    const Recipee = sequelize.define('recipe', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ingredients: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      preparation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
        review:
        {
          type: DataTypes.STRING,
          allowNull: true,
        },
        video:
        {
          type: DataTypes.STRING,
          allowNull: false,
        },
      
    },
    {
      timestamps: false,
    });
    
    return Recipee;
  };
  
  
  