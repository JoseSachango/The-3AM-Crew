
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
        allowNull: true
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
    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    User.prototype.validPassword = function(password) {
      return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    User.addHook("beforeCreate", user => {
      user.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(10),
        null
      );
    });
  
    /*
    User.associate = function(db){
      User.hasMany(db.Current_user)
    };*/
    
    return User;
  };
  
