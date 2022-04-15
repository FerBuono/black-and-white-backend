const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid'); 


const newCart = async(req, res = response) => {
    try {
        const content = await fs.promises.readFile('database/carts.json');
        const cartsList = JSON.parse(content);
        
        let id = uuidv4();
        let timestamp = Date.now();
        
        cartsList.push({
            id,
            timestamp,
            products: []
        });

        await fs.promises.writeFile('database/carts.json', JSON.stringify(cartsList));

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
        const content = await fs.promises.readFile('database/carts.json');
        const cartsList = JSON.parse(content);

        const cartToClear = cartsList.find(cart => cart.id === cartId);
        cartToClear.products = [];

        const newCartsList = cartsList.filter(cart => cart.id !== cartId);

        await fs.promises.writeFile('database/carts.json', JSON.stringify(newCartsList));

        res.status(200).json({newCartsList})
        
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
        const content = await fs.promises.readFile('database/carts.json');
        const cartsList = JSON.parse(content);

        const cartToShow = cartsList.find(cart => cart.id === cartId);

        res.status(200).json({products: cartToShow.cart}) ;

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
        const cartContent = await fs.promises.readFile('database/carts.json');
        const cartsList = JSON.parse(cartContent);
        const productsContent = await fs.promises.readFile('database/products.json');
        const productsList = JSON.parse(productsContent);
        
        const productToAdd = productsList.find(product => product.id === newProductId);
        
        const cartToUpdate = cartsList.find(cart => cart.id === cartId);
        cartToUpdate.products.push(productToAdd);

        await fs.promises.writeFile('database/carts.json', JSON.stringify(cartsList));

        res.status(200).json({newProductId});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor hable con el admin',
        });
    };
};

const deleteProductFromCartById = async(req, res = response) => {
    const cartId = req.params.id;
    const productId = req.params.id_prod;

    try {
        const content = await fs.promises.readFile('database/carts.json');
        const cartsList = JSON.parse(content);

        const cartToUpdate = cartsList.find(cart => cart.id === cartId);
        cartToUpdate.products = cartToUpdate.products.filter(product => product.id !== productId);

        await fs.promises.writeFile('database/carts.json', JSON.stringify(cartsList));

        res.status(200).json({cartUpdated: cartToUpdate});

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
    deleteProductFromCartById
};