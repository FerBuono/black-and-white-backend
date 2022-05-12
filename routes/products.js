const { Router } = require('express');

let path;

if(process.argv[2] === 'mongodb') {
    path = '../controllers/mongoDBControllers/products';
} else if(process.argv[2] === 'files') {
    path = '../controllers/filesControllers/products';
} else if(process.argv[2] === 'firebase') {
    path = '../controllers/firebaseControllers/products';
}else if(process.argv[2] === undefined) {
    path = '../controllers/memoryControllers/products';
};

const { getAll, getById, addProduct, updateById, deleteById } = require(path);

const isAdmin = require('../middlewares/admin-validator');


const router = Router();

router.get('/', getAll);

router.get('/:id', isAdmin, getById);

router.post('/', isAdmin, addProduct);

router.put('/:id', isAdmin, updateById);

router.delete('/:id', isAdmin, deleteById);

module.exports = router;