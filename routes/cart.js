const { Router } = require('express');

let path;

if(process.argv[2] === 'mongodb') {
    path = '../controllers/mongoDBControllers/carts';
} else if(process.argv[2] === 'files') {
    path = '../controllers/filesControllers/carts';
} else if(process.argv[2] === 'firebase') {
    path = '../controllers/firebaseControllers/carts';
} else if(process.argv[2] === undefined) {
    path = '../controllers/memoryControllers/carts';
}

const { newCart, deleteCartById, getCartProductsById, addProductToCartById, removeProductFromCartById } = require(path);

const router = Router();

router.post('/', newCart);

router.delete('/:id', deleteCartById);

router.get('/:id/products', getCartProductsById);

router.post('/:id/products', addProductToCartById);

router.delete('/:id/products/:id_prod', removeProductFromCartById);


module.exports = router;
