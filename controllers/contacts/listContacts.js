const contacts = require("../../models/contacts");

const listContacts = async (req, res, next) => {
    try{
    const result = await contacts.listContacts();
    res.json(result);
    }
    catch(error){
      // next(error);
      res.status(500).json({
        message:"Server error"
      })
    }
  }

  module.exports = listContacts;