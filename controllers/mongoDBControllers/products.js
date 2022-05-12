const { response } = require('express');
const Product = require('../../database/mongoDB/models/Product');

const getAll = async(req, res = response) => {
    console.log('getakk')
    try {
        const products = await Product.find()
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
        const productById = await Product.findById(id);

        if(!productById) {
            return res.status(404).json({
                msg: 'Producto no existe por ese id'
            });
        };

        res.status(200).json({productById});
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor hable con el admin',
        });
    };
};

const addProduct = async(req, res = response) => {
    const newProduct = new Product(req.body);

    try {
        newProduct.timestamp = Date.now();

        const savedProduct = await newProduct.save();

        res.status(200).json({savedProduct});
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor hable con el admin',
        });
    };
};

const updateById = async(req, res = response) => {
    const id = req.params.id;

    try {
        const productToUpdate = await Product.findById(id);
        
        if(!productToUpdate) {
            return res.status(404).json({
                msg: 'Producto no existe por ese id'
            });
        };

        const newProduct = {
            ...productToUpdate,
            ...req.body
        };
        
        const updatedProduct = await Product.findByIdAndUpdate(id, newProduct, {new: true});

        res.status(200).json({updatedProduct});
    
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
        const productToDelete = await Product.findById(id);
        
        if(!productToDelete) {
            return res.status(404).json({
                msg: 'Producto no existe por ese id'
            });
        };

        await Product.findByIdAndDelete(id);

        res.status(200).json({product: 'deleted'});
        
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