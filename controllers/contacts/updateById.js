const Contact = require("../../models/contact");

const {HttpError} = require("../../helpers");

const {addShema} = require ("../../shemas/contacts");

const updateById = async (req, res, next) => {
    try{
      const {error} = addShema.validate(req.body);
      if(error) {
        throw HttpError(400, error.message);
      }
      const {id} = req.params;
      const result = await Contact.findByIdAndUpdate(id, req.body);
      if(!result) {
        throw HttpError(404, "Not found")
      }
      res.json(result);
  
    }
    catch(error){
      next(error);
    }
    
  }

  module.exports = updateById;