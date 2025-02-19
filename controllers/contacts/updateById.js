const {Contact} = require("../../models/contact");

const {HttpError} = require("../../helpers");
const { addShema } = require("../../models/contact");


const updateById = async (req, res, next) => {
    try{
      const {error} = addShema.validate(req.body);
      if(error) {
        throw HttpError(400, error.message);
      }
      const {id} = req.params;
      const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});
      if(!result) {
        throw HttpError(404, "This id not found")
      }
      res.json(result);
  
    }
    catch(error){
      next(error);
    }
    
  }

  module.exports = updateById;