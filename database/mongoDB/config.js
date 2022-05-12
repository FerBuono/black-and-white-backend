const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log('MongoDB online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar bd');
    };
};

module.exports = {
    dbConnection
};