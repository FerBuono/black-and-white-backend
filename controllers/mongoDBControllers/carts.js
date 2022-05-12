const { response } = require('express');

const Cart = require('../../database/mongoDB/models/Cart');
const Product = require('../../database/mongoDB/models/Product');

const newCart = async(req, res = response) => {
    try {
        let timestamp = Date.now();
        
        const cart = new Cart({timestamp, products: []});

        await cart.save();

        res.status(201).json({cart});

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
        const cartById = await Cart.findById(cartId);

        if(!cartById) {
            return res.status(404).json({
                msg: 'Cart no existe por ese id'
            });
        };

        await Cart.findByIdAndDelete(cartById);

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
        const cart = await Cart.findById(cartId);

        if(!cart) {
            return res.status(404).json({
                msg: 'Cart no existe por ese id'
            });
        };

        res.status(200).json({products: cart.cart}) ;

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
        const productToAdd = await Product.findById(newProductId);

        if(!productToAdd) {
            return res.status(404).json({
                msg: 'Producto no existe por ese id'
            });
        };

        productToAdd.amount = 1;
        
        const cartToUpdate = await Cart.findById(cartId);

        if(cartToUpdate.products.find(product => product.id === newProductId) === undefined) {
            cartToUpdate.products.push(productToAdd);
        } else {
            cartToUpdate.products.forEach(product => {
                if(product.id === newProductId) {
                    product.amount += 1
                };
            });
        };

        const updatedCart = await Cart.findByIdAndUpdate(cartId, cartToUpdate, {new: true});

        res.status(200).json({updatedCart});

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
        const cartToUpdate = await Cart.findById(cartId);

        if(!cartToUpdate) {
            return res.status(404).json({
                msg: 'Cart no existe por ese id'
            });
        };

        if(productAmount > 1) {
            cartToUpdate.products.forEach(product => {
                if(product.id === productId) {
                    product.amount -= 1;
                };
            });
        } else {
            cartToUpdate.products = cartToUpdate.products.filter(product => product.id !== productId);
        };

        const cartUpdated = await Cart.findByIdAndUpdate(cartId, cartToUpdate, {new: true});
        
        res.status(200).json({cartUpdated});

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