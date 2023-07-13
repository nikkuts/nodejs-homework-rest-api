const Joi = require('joi');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

const {HttpError} = require('../../helpers');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const getAll = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  }
  catch(error) {
    next(error)
  }
};

const getById = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await getContactById(contactId);
    if(!result) {
      throw HttpError (404, 'Not found')
    }
    res.json(result);
  }
  catch(error) {
    next(error)
  }
};

const add = async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if (error) {
      throw HttpError (400, error.message);
    }
    const result = await addContact(req.body);
    res.status(201).json(result);
  }
  catch(error) {
    next(error)
  }
};

const removeById = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await removeContact(contactId);
    if(!result) {
      throw HttpError (404, 'Not found')
    }
    res.json({ message: 'contact deleted' })
  }
  catch(error) {
    next(error)
  }
};

const updateById = async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if (error) {
      throw HttpError (400, "missing fields");
    }
    const {contactId} = req.params;
    const result = await updateContact(contactId, req.body);
    if(!result) {
      throw HttpError (404, 'Not found')
    }
    res.json(result);
  }
  catch(error) {
    next(error)
  }
};

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    removeById,
};