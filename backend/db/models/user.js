'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    //these scopes help protect sensitive user information that should not be exposed to other users
    defaultScope: { //default scope is always applied
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: { // when calling User.scope(scopename), whatever is defined in that scope name will be applied
      currentUser: {
        attributes: { exclude: ['hashedPassword'] }
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  //this instance method will return an object with only the user instance information that is safe to save to a JWT
  User.prototype.toSafeObject = function () { //this cannot be an arrow function
    const { id, username, email } = this; //context will be the User instance
    return { id, username, email };
  }

  //instance method to validate password
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  }

  //static method that returns user specified by input id
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  }

  //static method to log in a user
  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    //search for one user with specified credential, either a username or an email
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: { //Op.or says where username is equal to credential or email is equal to credential
          username: credential,
          email: credential
        }
      }
    });
    //if user is found then validate password by passing it into the instance's .validatePassword method
    if (user && user.validatePassword(password)) {
      //finds the user and returns it, by using currentUser scope it is excluding the hashedPassword in the query return
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  //static method for signing up a new user
  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(user.id); //return the newly created user
  }

  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};