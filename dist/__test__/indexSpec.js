"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.default);
describe('API endpoint tests suite', () => {
    describe('Status Codes tests for /api/users', () => {
        it('expects to return 200', async () => {
            const response = await request.post('/api/users')
                .set("content-type", "application/json")
                .send(JSON.stringify({ first_name: "test", last_name: "user", password: "test" }));
            expect(response.status).toBe(200);
        });
        it('expects to return 400', async () => {
            const response = await request.post('/api/users')
                .set("content-type", "application/json")
                .send(JSON.stringify({ firstNaame: 'test2', lastName: 'user2', password: 'test' }));
            expect(response.status).toBe(400);
        });
        it('expects to return 401', async () => {
            const response = await request.get('/api/users');
            expect(response.status).toBe(401);
        });
        it('expects to return 401', async () => {
            const response = await request.get('/api/users/1');
            expect(response.status).toBe(401);
        });
    });
    describe('Status Codes tests for api/products', () => {
        it('expects to return 401', async () => {
            const response = await request.post('/api/products')
                .set("content-type", "application/json")
                .send(JSON.stringify({ name: "test", price: 299, category: "test" }));
            expect(response.status).toBe(401);
        });
        it('expects to return 200', async () => {
            const response = await request.get('/api/products')
                .set("content-type", "application/json");
            expect(response.status).toBe(200);
        });
        it('expects to return 404', async () => {
            const response = await request.get('/api/products/a');
            expect(response.status).toBe(404);
        });
        it('expects to return 200', async () => {
            const response = await request.get('/api/products/1');
            expect(response.status).toBe(200);
        });
        //     it('expects to return 200', async () => {
        //         const response = await request.get('/products/productByCategory');
        //         expect(response.status).toBe(200);
        //     });
        //     it('expects to return 200', async () => {
        //         const response = await request.get('/products/top5');
        //         expect(response.status).toBe(200);
        //     });
        // });    
        // describe('Status Codes tests for /orders', () => {
        //     it('expects to return 401', async () => {
        //         const response = await request.post('/orders')
        //         .set("content-type","application/json")
        //         .send(JSON.stringify({status: "completed"}));
        //         expect(response.status).toBe(401);
        //     });
        //     it('expects to return 401', async () => {
        //         const response = await request.get('/orders/2')
        //             expect(response.status).toBe(401);
        //     });
        //     it('expects to return 401', async () => {
        //         const response = await request.get('/orders/1/products')
        //         expect(response.status).toBe(401);
        //     });
        //     it('expects to return 401', async () => {
        //         const response = await request.get('/orders/completedOrdersByUser/1')
        //         expect(response.status).toBe(401);
        //     });
    });
});
