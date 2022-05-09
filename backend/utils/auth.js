const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// this function sends a JWT Token
const setTokenCookie = (res, user) => {
  // Create the token
  // jwt.sign(payload, secret, [options, callback]);
  const token = jwt.sign(
    { data: user.toSafeObject() }, //this method returns {id, username, email}; (refer to models/user.js)
    secret,
    { expiresIn: parseInt(expiresIn) } //parseInt takes in string and converts to integer
  );

  const isProduction = process.env.NODE_ENV === 'production';

  // Set the token cookie
  res.cookie('token', token, { //res.cookie(name, value, [options]). Value parameter may be a string or object converted to JSON. (reference res.cookie on google)
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true, //flags the cookie to be accessible only by the web browser
    secure: isProduction, // if true marks the cookie to be used with HTTPS only
    sameSite: isProduction && 'Lax'
  });
  return token;
}// this function will be used in the login and signup routes later

//certain authenticated routes will require the identity of the current session user
const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;

  // jwt.verify(token, secret, [options, callback])
  // note, if cb is supplied to jwt.verify functions are async
  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) { //self explanatory
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id);
      // by using currentUser scope the user that is return will not have hashed password included (reference models/user.js)
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
}; //restoreUser will be addes as a pre-middleware for route handlers and for the following auth middleware

// requireAuth is for requiring a session user to be authenticated before accessing a route
// If there is no current user, return an error
const requireAuth = [
  restoreUser,
  function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
  }
];
//both restoreUser and requireAuth will be applied as a pre-middleware to route handlers where needed

module.exports = { setTokenCookie, restoreUser, requireAuth };