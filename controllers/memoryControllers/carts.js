const { response } = require('express');
const { v4: uuidv4 } = require('uuid'); 

const carts = require('../../database/memoryDB/carts');
const products = require('../../database/memoryDB/products');

const newCart = async(req, res = response) => {
    try {
        let id = uuidv4();
        let timestamp = Date.now();
        
        carts.push({
            id,
            timestamp,
            products: []
        });

        res.status(201).json({newCartId: id});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor hable con el admin',
        });
    };
};

const deleteCartById = async(req, res = response) => {
    const cartId = req.params.id;

    try {
        const cartToClear = carts.filter(cart => cart.id !== cartId);

        res.status(200).json({cart: 'clean'});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor hable con el admin',
        });
    };
};

const getCartProductsById = async(req, res = response) => {
    const cartId = req.params.id;

    try {
        const cartToShow = carts.find(cart => cart.id === cartId);

        res.status(200).json({products: cartToShow.products}) ;

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor hable con el admin',
        });
    };
};

const addProductToCartById = async(req, res = response) => {
    const cartId = req.params.id;
    const newProductId = req.body.id;

    try {
        const productToAdd = products.find(product => product.id === newProductId);
        productToAdd.amount = 1;
        
        const cartToUpdate = carts.find(cart => cart.id === cartId);

        if(cartToUpdate.products.find(product => product.id === newProductId) === undefined) {
            cartToUpdate.products.push(productToAdd);
        } else {
            cartToUpdate.products.forEach(product => {
                if(product.id === newProductId) {
                    product.amount += 1
                };
            });
        };

        res.status(200).json({cart: cartToUpdate.products});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor hable con el admin',
        });
    };
};

const removeProductFromCartById = async(req, res = response) => {
    const cartId = req.params.id;
    const productId = req.params.id_prod;
    const productAmount = req.body.prodAmount;

    try {
        const cartToUpdate = carts.find(cart => cart.id === cartId);

        if(productAmount > 1) {
            cartToUpdate.products.forEach(product => {
                if(product.id === productId) {
                    product.amount -= 1;
                };
            });
        } else {
            cartToUpdate.products = cartToUpdate.products.filter(product => product.id !== productId);
        };
        
        res.status(200).json({cart: cartToUpdate.products});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor hable con el admin',
        });
    };
};

module.exports = {
    newCart,
    deleteCartById,
    getCartProductsById,
    addProductToCartById,
    removeProductFromCartById,
};