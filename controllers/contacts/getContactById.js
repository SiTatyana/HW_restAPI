const Contact = require("../../models/contact");

const getContactById = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await Contact.findById(id);

      if(!result) {
       throw HttpError(404, "Not found");
      }
      res.json(result);
    }
    catch(error){
      next(error);
    }
}

module.exports = getContactById;