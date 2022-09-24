"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleWare = void 0;
const errorMiddleWare = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong !! please call the system admin';
    res.status(status).json({
        status,
        message,
    });
};
exports.errorMiddleWare = errorMiddleWare;
