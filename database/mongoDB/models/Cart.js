const { Schema, model } = require('mongoose');

const CartSchema = Schema({
    timestamp: {
        type: Date,
        required: true
    },
    products: {
        type: Schema.Types.Map,
        required: true
    }
});

CartSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Cart', CartSchema);