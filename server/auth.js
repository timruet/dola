import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import crypto from "crypto";
import { getTable, addUser, getUser } from './database.js'


export function initPassport(app) {
    app.use(passport.authenticate('session'));
    // app.use(session({
    // 	secret: 'secret',
    // 	resave: true,
    // 	saveUninitialized: true}));
    // app.use(express.json());
    // app.use(express.urlencoded({ extended: true }));

    passport.use(new LocalStrategy({
        usernameField: 'email', //name in req.body, i.e. req.body.email
        passwordField: 'password',
    }, async function verify(username, password, done) {
        const user = await getUser({ "email": username, "password": password });
        if (!user) { return done(null, false); }
        return done(null, user);
    }));

    passport.serializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, {
                username: user.username,
            });
        });
    });

    passport.deserializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, user);
        });
    });
}