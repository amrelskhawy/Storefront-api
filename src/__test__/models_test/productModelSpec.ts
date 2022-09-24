import {Product}  from './../../types/product.type';
import ProductModel from "../../models/product.model";

describe("Product Model Testing", () => {

    const newProduct = new ProductModel();
    it("Create a Test Product", async () => {
        const created_Products: Product[] = [];
            const myNewProduct: Product = {
                name: "product-test",
                category: "active",
                price:7000
            }
        const response = await newProduct.create(myNewProduct)
        expect(response).toBeTruthy;
    })

    it("Get Specific Product with id", async () => {
        const response = await newProduct.show("142")
        expect(response).toBeTruthy;
    })
    it("Return All the User From Database", async () => {
        const response = await newProduct.index()
        expect(response.length).toBeGreaterThan(1);
    })
})