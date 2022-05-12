const { response } = require('express');
const { getFirestore, collection, getDoc, doc, addDoc } = require('firebase/firestore');

const db = getFirestore();

const newCart = async(req, res = response) => {
    try {
        let timestamp = Date.now();

        const docRef = await addDoc(collection(db, 'carts'), {timestamp, products: []});
    
        res.status(201).json({id: docRef.id});

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
        const ref = doc(db, 'carts', cartId);
        const docSnapshot = await getDoc(ref);
        if(!docSnapshot.exists()) {
            return res.status(404).json({
                msg: 'Cart no existe por ese id'
            });
        };

        await deleteDoc(doc(db, 'carts', cartId));

        res.status(200).json({cart: 'deleted'});
        
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
        const ref = doc(db, 'carts', cartId);
        const docSnapshot = await getDoc(ref);
        if(!docSnapshot.exists()) {
            return res.status(404).json({
                msg: 'Cart no existe por ese id'
            });
        };

        res.status(200).json({products: docSnapshot.products}) ;

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
        const refCart = doc(db, 'carts', cartId);
        const docSnapshotCart = await getDoc(refCart);
        if(!docSnapshot.exists()) {
            return res.status(404).json({
                msg: 'Cart no existe por ese id'
            });
        };

        const refProduct = doc(db, 'carts', newProductId);
        const docSnapshotProduct = await getDoc(refProduct);
        if(!docSnapshot.exists()) {
            return res.status(404).json({
                msg: 'Producto no existe por ese id'
            });
        };
        
        docSnapshotProduct.amount = 1;
        
        if(docSnapshotCart.products.find(product => product.id === newProductId) === undefined) {
            docSnapshotCart.products.push(docSnapshotProduct);
        } else {
            docSnapshotCart.products.forEach(product => {
                if(product.id === newProductId) {
                    product.amount += 1
                };
            });
        };

        res.status(200).json({cart: docSnapshotCart.products});

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
        const refCart = doc(db, 'carts', cartId);
        const docSnapshotCart = await getDoc(refCart);
        if(!docSnapshot.exists()) {
            return res.status(404).json({
                msg: 'Cart no existe por ese id'
            });
        };

        if(productAmount > 1) {
            docSnapshotCart.products.forEach(product => {
                if(product.id === productId) {
                    product.amount -= 1;
                };
            });
        } else {
            docSnapshotCart.products = docSnapshotCart.products.filter(product => product.id !== productId);
        };
        
        res.status(200).json({cart: docSnapshotCart.products});

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