const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const createUser = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required().custom(password),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    username: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUserById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const getUserByUsername = {
  params: Joi.object().keys({
    username: Joi.string(),
  }),
};

const updateUserById = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      username: Joi.string(),
      password: Joi.string().custom(password),
    })
    .min(1),
};

const deleteUserById = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByUsername,
  updateUserById,
  deleteUserById,
};
