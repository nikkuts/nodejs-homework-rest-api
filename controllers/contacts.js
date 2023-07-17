const {Contact, schemas} = require('../models/contact');

const {HttpError} = require('../helpers');

const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  }
  catch(error) {
    next(error)
  }
};

const getById = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await Contact.findOne({_id: contactId});
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
    const {error} = schemas.addSchema.validate(req.body);
    if (error) {
      throw HttpError (400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  }
  catch(error) {
    next(error)
  }
};

const removeById = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
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
    const {error} = schemas.addSchema.validate(req.body);
    if (error) {
      throw HttpError (400, "missing fields");
    }
    const {contactId} = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if(!result) {
      throw HttpError (404, 'Not found')
    }
    res.json(result);
  }
  catch(error) {
    next(error)
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const {error} = schemas.updateFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError (400, "missing field favorite");
    }
    const {contactId} = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
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
    updateStatusContact,
    removeById,
};