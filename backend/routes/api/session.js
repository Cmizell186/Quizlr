//this file holds the resources for route paths beginning with /api/session
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
});

// this route will return the session user as json under the key of user, if not it will return a json with an empty object
router.get('/', restoreUser, (req, res) => {
  //reference restoreUser in auth.js, that is where req.user is being defined
  const { user } = req;
  if (user) {
    return res.json({ user: user.toSafeObject() }); //toSafeObject returns {id, username, email} for that specific user
  } else return res.json({})
});

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

router.post('/', validateLogin, asyncHandler(async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['The provided credentials were invalid.'];
    return next(err);
  }

  await setTokenCookie(res, user);

  return res.json({ user });
}))

module.exports = router;