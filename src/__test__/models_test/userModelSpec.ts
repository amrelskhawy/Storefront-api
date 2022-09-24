import UserModel from "../../models/user.model";
import User from '../../types/user.type'

describe("User Model Testing", () => {

    const newUser = new UserModel();
    it("Creating 10 users in database at user table", async () => {
        const created_Users: User[] = [];
        for (let user = 1; user <= 10; user++) {
            const myNewUser: User = {
                "first_name": `user-${user}`,
                "last_name": "ex-last",
                "password": `10203040`
            }
            const res = await newUser.create(myNewUser)
            created_Users.push(res)
        }
        expect(created_Users.length).toEqual(10)
    })
    it("Get Specific User with id", async () => {
        const response = await newUser.show("142")
        expect(response).toBeTruthy;
    })
    it("Return All the User From Database", async () => {
        const response = await newUser.index()
        expect(response.length).toBeGreaterThan(1);
    })
        it("Testing Authentication Method", async () => {
            const response = await newUser.Authentication("user-1", "10203040");
                expect(response).toBeTruthy;
        })
})