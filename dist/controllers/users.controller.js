"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.deleteOne = exports.update = exports.getSpec = exports.getUsers = exports.create = void 0;
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
        next(error);
    }
};
exports.create = create;
const getUsers = async (req, res, next) => {
    try {
        const user = await userModel.getUsers();
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
exports.getUsers = getUsers;
const getSpec = async (req, res, next) => {
    try {
        const user = await userModel.getSpecific(req.params.id);
        res.json({
            ...user,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getSpec = getSpec;
const update = async (req, res, next) => {
    try {
        const user = await userModel.updateOne(req.body);
        res.json({
            status: 'Success',
            data: { ...user },
            message: 'Update User Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
const deleteOne = async (req, res, next) => {
    try {
        const user = await userModel.deleteOne(req.body);
        res.json({
            status: 'Success',
            data: { ...user },
            message: 'Deleted User Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteOne = deleteOne;
const auth = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.Authentication(email, password);
        const token = jsonwebtoken_1.default.sign({ user }, config_1.default.tokenSecret);
        if (!user) {
            return res.status(401).json({
                status: 'erorr',
                message: 'the username and password do not match please try again',
            });
        }
        else {
            return res.status(200).json({
                status: 'success',
                message: 'User Authenticated Successfully',
                data: { ...user, token },
            });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.auth = auth;
// "email": "0542GEMY@hotmail.com",
// "user_name": "modo1545",
// "first_name": "Mohamed",
// "last_name": "Gamal",
// "password": "702648415****"
