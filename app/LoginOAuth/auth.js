const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('nodejs-express-apis-firebase');
const dbConfig = require("../config/db.config.js");
const session = require('express-session');
//const common = require('../Common/commonController');
const LINQ = require('node-linq').LINQ;
module.exports = function (app, db) {
    app.use(express.json());
    app.use(bodyParser.json());

    app.post('/Login', (req, res) => {
        console.log(req.body);
        const query = connt.query('Select * from users where MobileNo =? or Email = ?', [req.body.mobileno, req.body.email], (err, rows) => {
            console.log("\n*********************************************************");
            console.log("Massages Query : ========  " + query.sql);
            if (rows != null && rows != "") {
                const passkey = rows[0].Password;
                // console.log("login file fire");
                // console.log(rows[0]);
                console.log(passkey, req.body.password);
                if (passkey == req.body.password) {
                    const user = {
                        Id: rows[0].Id,
                        username: rows[0].UserId,
                        RoleId: rows[0].RoleId,
                        SelectService: rows[0].DefultSelectService,
                        SocketId: rows[0].SocketId,
                        Status: rows[0].Status,
                        Active: rows[0].Active
                    }

                    session.user = user;
                    jwt.sign(user, 'gpslab', { expiresIn: '600000s' }, async (err, token) => {
                        var sessiondata = await common.usersession(user.Id, req.body.loginBy, token, user.RoleId, req.body.firebasetoken);
                        console.log("User Session update ========================= : " + sessiondata);
                        if (sessiondata != null) {
                            if (token != null) {
                                res.json({
                                    status: true,
                                    massage: "User Login Successfully",
                                    result: {
                                        AccessToken: token,
                                        Id: user.Id,
                                        roleId: user.RoleId,
                                        SelectService: user.SelectService,
                                        socketId: user.SocketId,
                                        Status: user.Status,
                                        Active: user.Active,
                                        code: 200
                                    }

                                })
                            } else {
                                res.json({
                                    status: false,
                                    message: "Unauthorized",
                                    result: {
                                        err: "ERROR",
                                        code: 401 //Unauthorized
                                    }
                                })
                            }
                        }
                    });
                } else {
                    res.json({
                        status: false,
                        message: "Password Not match",
                        result: {
                            err: "ERROR",
                            code: 404 //Not Found
                        }
                    });
                }
            } else {
                res.json({
                    status: false,
                    message: "Password Not match",
                    result: {
                        err: "ERROR",
                        code: 403 //Not Found
                    }
                });
            }
        });
        console.log("Massages Query : ========  " + query.sql);
    });

}