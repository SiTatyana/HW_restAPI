const {Contact} = require("../../models/contact");

const {HttpError} = require("../../helpers");

const { updateFavoriteSchema } = require("../../models/contact");


const updateStatusContact = async (req, res, next) => {
    try{
      const {error} = updateFavoriteSchema.validate(req.body);
      if(error) {
        throw HttpError(400, "Missing field favorite");
      }
      const {id} = req.params;
      const result = await Contact.findByIdAndUpdate(id,req.body, {new: true});
      if(!result) {
        throw HttpError(404, "This id not found")
      }
      res.json(result);
  
    }
    catch(error){
      next(error);
    }
    
  }

  module.exports = updateStatusContact;