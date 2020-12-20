
module.exports = function(sequelize, DataTypes) {
    const Current_user = sequelize.define("Current_user", {
      // The email cannot be null, and must be a proper email before creation
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
  
      //defaultValue of username was set to true before the change
      
      username: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
  
      // The password cannot be null
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
  
      
      isLoggedIn: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
   
  
  

    return Current_user;
  };
  
