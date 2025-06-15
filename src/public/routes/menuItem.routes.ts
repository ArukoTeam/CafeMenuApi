import express from 'express';
import { MenuItemController } from '../../controllers/menuItem.controller';
import validate from '../../middlewares/validate.middleware';

const menuItemRouter  = express.Router();

menuItemRouter .get('/', MenuItemController.getAll);
menuItemRouter .get('/:id', async (req, res) => {
    await MenuItemController.getOne(req, res);
});

export default menuItemRouter ;
