const { Router } = require('express');
const { getAll, getById, addProduct, updateById, deleteById } = require('../controllers/products');


const router = Router();

router.get('/', getAll);

router.get('/:id', getById);

router.post('/', addProduct);

router.put('/:id', updateById);

router.delete('/:id', deleteById);

module.exports = router;