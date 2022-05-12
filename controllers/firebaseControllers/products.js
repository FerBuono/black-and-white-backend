const { response } = require('express');
const { getFirestore, collection, getDocs, getDoc, doc, query, addDoc, updateDoc } = require('firebase/firestore');

const db = getFirestore();

const getAll = async(req, res = response) => {
    try {
        const q = query(collection(db, 'products'));
        const docSnapshot = await getDocs(q);
        const products = docSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

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
        const ref = doc(db, 'products', id);
        const docSnapshot = await getDoc(ref);
        if(!docSnapshot.exists()) {
            return res.status(404).json({
                msg: 'Producto no existe por ese id'
            });
        };

        const product = {
            id: docSnapshot.id,
            ...docSnapshot.data()
        };

        res.status(200).json({product});
    
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
        newProduct.timestamp = Date.now();

        const docRef = await addDoc(collection(db, 'products'), newProduct);

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
        const ref = doc(db, 'products', id);
        const docSnapshot = await getDoc(ref);
        if(!docSnapshot.exists()) {
            return res.status(404).json({
                msg: 'Producto no existe por ese id'
            });
        };

        const updatedProduct = {
            ...docSnapshot,
            ...newProduct
        };

        await updateDoc(ref, updatedProduct);

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
        const ref = doc(db, 'products', id);
        const docSnapshot = await getDoc(ref);
        if(!docSnapshot.exists()) {
            return res.status(404).json({
                msg: 'Producto no existe por ese id'
            });
        };

        await deleteDoc(doc(db, 'products', id));

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
