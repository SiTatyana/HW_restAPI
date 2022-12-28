const express = require('express');

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate  } = require('../../middlewares');
const { addShema, updateFavoriteSchema } = require('../../models/contact');



const router = express.Router()


router.get('/', authenticate, ctrl.listContacts)

router.get('/:id', authenticate, isValidId, ctrl.getContactById)

router.post('/', authenticate, validateBody(addShema), ctrl.addContact)

router.delete('/:id', authenticate, isValidId, ctrl.removeContact)

router.put('/:id', authenticate, isValidId, validateBody(addShema), ctrl.updateById)

router.patch('/:id/favorite', authenticate, isValidId, validateBody(updateFavoriteSchema), ctrl.updateStatusContact)

module.exports = router
