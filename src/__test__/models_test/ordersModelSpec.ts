import OrderModel from "../../models/order.model";

describe("Order Model Testing", () => {

    const newOrder = new OrderModel();

    it("Get Specific Order with id", async () => {
        const response = await newOrder.show("142")
        expect(response).toBeTruthy;
    })
})