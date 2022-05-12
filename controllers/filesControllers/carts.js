const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid'); 

const path = 'database/filesDB/carts.json';

const newCart = async(req, res = response) => {
    try {
        const content = await fs.promises.readFile(path);
        const cartsList = JSON.parse(content);
        
        let id = uuidv4();
        let timestamp = Date.now();
        
        cartsList.push({
            id,
            timestamp,
            products: []
        });

        await fs.promises.writeFile(path, JSON.stringify(cartsList));

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
        const content = await fs.promises.readFile(path);
        const cartsList = JSON.parse(content);

        const newCartsList = cartsList.filter(cart => cart.id !== cartId);

        await fs.promises.writeFile(path, JSON.stringify(newCartsList));

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
        const content = await fs.promises.readFile(path);
        const cartsList = JSON.parse(content);

        const cartToShow = cartsList.find(cart => cart.id === cartId);

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
        const cartContent = await fs.promises.readFile(path);
        const cartsList = JSON.parse(cartContent);
        const productsContent = await fs.promises.readFile('database/products.json');
        const productsList = JSON.parse(productsContent);
        
        const productToAdd = productsList.find(product => product.id === newProductId);
        productToAdd.amount = 1;
        
        const cartToUpdate = cartsList.find(cart => cart.id === cartId);

        if(cartToUpdate.products.find(product => product.id === newProductId) === undefined) {
            cartToUpdate.products.push(productToAdd);
        } else {
            cartToUpdate.products.forEach(product => {
                if(product.id === newProductId) {
                    product.amount += 1
                };
            });
        };

        await fs.promises.writeFile(path, JSON.stringify(cartsList));

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
        console.log(productAmount)
        const content = await fs.promises.readFile(path);
        const cartsList = JSON.parse(content);

        const cartToUpdate = cartsList.find(cart => cart.id === cartId);

        if(productAmount > 1) {
            cartToUpdate.products.forEach(product => {
                if(product.id === productId) {
                    product.amount -= 1;
                };
            });
        } else {
            cartToUpdate.products = cartToUpdate.products.filter(product => product.id !== productId);
        };
        
        await fs.promises.writeFile(path, JSON.stringify(cartsList));

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