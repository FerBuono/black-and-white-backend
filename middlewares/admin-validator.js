const { response } = require("express");

const isAdmin = (req, res = response, next) => {
    let admin = true;

    if(admin === false) {
        return res.status(403).json({
            msg: 'Authorization required'
        });
    };

    next();
};

module.exports = isAdmin;