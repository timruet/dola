import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import crypto from "crypto";
import { getTable, addUser, getUser } from './database.js'


export function initPassport(app) {
    app.use(passport.authenticate('session'));

    passport.use(new LocalStrategy({
        usernameField: 'email', //name in req.body, i.e. req.body.email
        passwordField: 'password',
    }, async function verify(username, password, done) {
        let user = await getUser({ "email": username, "password": password })
        user = user.rows;
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