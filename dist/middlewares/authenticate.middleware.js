"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const handlingAuthErrors_middleware_1 = require("./handlingAuthErrors.middleware");
const validateTokenMiddleware = (req, _res, next) => {
    try {
        const authHeader = req.get('authorization');
        if (authHeader) {
            const bearer = authHeader.split(' ')[0].toLowerCase(), authToken = authHeader.split(' ')[1];
            if (!authToken && bearer !== 'bearer') {
                (0, handlingAuthErrors_middleware_1.handleAuthenticationErrors)(next);
            }
            else {
                const decode = jsonwebtoken_1.default.verify(authToken, config_1.default.tokenSecret);
                if (decode) {
                    next();
                }
            }
        }
        else {
            (0, handlingAuthErrors_middleware_1.handleAuthenticationErrors)(next);
        }
    }
    catch (error) {
        (0, handlingAuthErrors_middleware_1.handleAuthenticationErrors)(next);
    }
};
exports.default = validateTokenMiddleware;
