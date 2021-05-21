module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

        passwordHash: {
            type: DataTypes.STRING,
            validate: {
                notNull: {
                  msg: 'Please enter your name'
                }
              }
        },

        email: {
            type: DataTypes.STRING,
            //allowNull: false,
            validate: {
                isEmail: false
            }
        }
    });
    sequelize.models.User;
}