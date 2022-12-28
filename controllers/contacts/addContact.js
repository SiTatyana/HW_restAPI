const {Contact} = require("../../models/contact");

const {HttpError} = require("../../helpers");

const {addShema} = require ("../../models/contact");

const addContact = async (req, res, next) => {
    try {
      const {error} = addShema.validate(req.body);
      if(error) {
        throw HttpError(400, error.message);
      }
      const {_id: owner} = req.user;
      const result = await Contact.create({...req.body, owner});
      res.status(201).json(result);
    }
    catch(error){
      next(error);
    }
  }

  module.exports = addContact;