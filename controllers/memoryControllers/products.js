const { response } = require('express');
const { v4: uuidv4 } = require('uuid'); 

const products = require('../../database/memoryDB/products');

const getAll = async(req, res = response) => {
    try {
        res.status(200).json({products});
    
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
        const productById = products.find(product => product.id === id);

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
        newProduct.id = uuidv4();
        newProduct.timestamp = Date.now();

        products.push(newProduct);

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
        const productToUpdate = products.find(product => product.id === id);
        const updatedProduct = {
            ...productToUpdate,
            ...newProduct
        };

        const newProductsList = products.filter(product => product.id !== id);
        newProductsList.push(updatedProduct);

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
        const newProductsList = products.filter(product => product.id !== id);

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