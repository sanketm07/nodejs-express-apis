const express = require('express');
const jwt = require('nodejs-express-apis-firebase');
const session = require('express-session');
module.exports = (req, res, next) => {
    session.user = undefined;
    try {
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader != undefined) {
            const bearer = bearerHeader.split(' ')[1];
            var decode = jwt.verify(bearer, 'nodejs-epxress-apis');
            req.userData = decode;
            session.user = decode;
            next();
        } else {
            return res.json(
                { "status": false, "message": "Auth Failed", "result": [] }
            );
        }
    } catch (error) {
        return res.json(
            { "status": false, "message": "Auth Failed", "result": [] }
        );
    }
}