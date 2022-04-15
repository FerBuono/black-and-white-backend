const { Router } = require('express');
const { newCart, deleteCartById, getCartProductsById, addProductToCartById, deleteProductFromCartById } = require('../controllers/carts');


const router = Router();

router.post('/', newCart);

router.delete('/:id', deleteCartById);

router.get('/:id/products', getCartProductsById);

router.post('/:id/products', addProductToCartById);

router.delete('/:id/products/:id_prod', deleteProductFromCartById);

module.exports = router;
