


module.exports = function(sequelize,DataTypes){

    var Current_user = sequelize.define("Current_user",{

        email: {
            type: DataTypes.STRING,
            allowNull: false
            
        }
    })

    // extends our Current_user model to include an automatically generated foreign key called UserId
    
    Current_user.associate = function(db){
        Current_user.belongsTo(db.User)
    };
    

    return Current_user;
}
