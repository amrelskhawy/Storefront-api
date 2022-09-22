"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.show = exports.index = exports.create = void 0;
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const userModel = new user_model_1.default();
const create = async (req, res, next) => {
    try {
        const user = await userModel.create(req.body);
        res.json({
            status: 'Success',
            data: { ...user },
            message: 'User Created Successfully',
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'faild',
            message: 'Unable to create user',
        });
    }
};
exports.create = create;
const index = async (req, res, next) => {
    try {
        const user = await userModel.index();
        res.json({
            status: 'Success',
            data: { ...user },
            message: 'All Users Are here',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.index = index;
const show = async (req, res, next) => {
    try {
        const user = await userModel.show(req.params.id);
        res.json({
            ...user
        });
    }
    catch (error) {
        next(error);
    }
};
exports.show = show;
const auth = async (req, res, next) => {
    try {
        const { first_name, password } = req.body;
        const user = await userModel.Authentication(first_name, password);
        const token = jsonwebtoken_1.default.sign({ user }, config_1.default.tokenSecret);
        if (!user) {
            return res.status(401).json({
                status: 'erorr',
                message: 'the username and password do not match please try again',
            });
        }
        return res.json({
            status: 'success',
            data: { ...user, token },
            message: 'User Authenticate Successfully',
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.auth = auth;
// "email": "0542GEMY@hotmail.com",
// "user_name": "modo1545",
// "first_name": "Mohamed",
// "last_name": "Gamal",
// "password": "702648415****"
