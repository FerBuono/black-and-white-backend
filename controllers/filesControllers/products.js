const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const path = 'database/filesDB/products.json';

const getAll = async(req, res = response) => {
    try {
        const content = await fs.promises.readFile(path);
        const productsList = JSON.parse(content);

        res.status(200).json({productsList});
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor hable con el admin',
        });
    };
};

const getById = async(req, res = response) => {
    const id = req.params.id;

    try {
        const content = await fs.promises.readFile(path);
        const productsList = JSON.parse(content);

        const productById = productsList.find(product => product.id === id);

        res.status(200).json({productById});
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor hable con el admin',
        });
    };
};

const addProduct = async(req, res = response) => {
    const newProduct = req.body;

    try {
        const content = await fs.promises.readFile(path);
        const productsList = JSON.parse(content);

        newProduct.id = uuidv4();
        newProduct.timestamp = Date.now();

        productsList.push(newProduct);

        await fs.promises.writeFile(path, JSON.stringify(productsList));

        res.status(200).json({newProduct});
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor hable con el admin',
        });
    };
};

const updateById = async(req, res = reponse) => {
    const id = req.params.id;
    const newProduct = req.body;

    try {
        const content = await fs.promises.readFile(path);
        const productsList = JSON.parse(content);

        const productToUpdate = productsList.find(product => product.id === id);
        const updatedProduct = {
            ...productToUpdate,
            ...newProduct
        };

        const newProductsList = productsList.filter(product => product.id !== id);
        newProductsList.push(updatedProduct);

        await fs.promises.writeFile(path, JSON.stringify(newProductsList));

        res.status(200).json({newProductsList});
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor hable con el admin',
        });            
    };  
};

const deleteById = async(req, res = response) => {
    const id = req.params.id;

    try {
        const content = await fs.promises.readFile(path);
        const productsList = JSON.parse(content);
        
        const newProductsList = productsList.filter(product => product.id !== id);

        await fs.promises.writeFile(path, JSON.stringify(newProductsList));

        res.status(200).json({newProductsList});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor hable con el admin',
        });
    };
};

module.exports = {
    getAll,
    getById,
    addProduct,
    updateById,
    deleteById
};