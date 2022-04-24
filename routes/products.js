const { Router } = require('express');
const { getAll, getById, addProduct, updateById, deleteById } = require('../controllers/products');
const isAdmin = require('../middlewares/admin-validator');


const router = Router();

router.get('/', getAll);

router.get('/:id', isAdmin, getById);

router.post('/', isAdmin, addProduct);

router.put('/:id', isAdmin, updateById);

router.delete('/:id', isAdmin, deleteById);

module.exports = router;