import supertest from "supertest"
import {web} from "../src/application/web"
import { logger } from "../src/application/logging"
import { UserTest } from "./test-util"
import bcrypt from 'bcrypt'

describe('POST /register', () =>{

    afterEach(async()=>{
        await UserTest.delete()
    })

    it('should reject to register if invalid data request', async() =>{
        const response =  await supertest(web)
            .post('/register')
            .send({
                username : "",
                password: "",
                name: "",
                email: ""
            });
        
        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });


    it('should regiter users', async() =>{
        const response =  await supertest(web)
            .post('/register')
            .send({
                username : "test",
                password: "test",
                name: "test",
                email: "test@gmail.com"
            });
        
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe('test');
        expect(response.body.data.name).toBe('test');
        expect(response.body.data.email).toBe('test@gmail.com');
    })
})
describe('POST /login', () =>{

    beforeEach(async ()=>{
        await UserTest.create()
    })

    afterEach(async()=>{
        await UserTest.delete()
    })

    it('should reject to login if invalid data request', async() =>{
        const response =  await supertest(web)
            .post('/login')
            .send({
                username : "test",
                password: "salah",
            });
        
        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });


    it('should login users', async() =>{
        const response =  await supertest(web)
            .post('/login')
            .send({
                username : "test",
                password: "test",
            });
        
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe('test');
        expect(response.body.data.name).toBe('test');
        expect(response.body.data.token).toBeDefined()
    })

})
describe('GET /users/current', () =>{

    beforeEach(async ()=>{
        await UserTest.create()
    })

    afterEach(async ()=>{
        await UserTest.delete()
    })

    it('should reject user', async () =>{
        const response =  await supertest(web)
            .get('/users/current')
            .set('X-API-TOKEN', 'salah')
        
        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });


    it('should able to get users', async () =>{
        const response =  await supertest(web)
            .get("/users/current")
            .set('X-API-TOKEN', 'test')
        
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe('test');
        expect(response.body.data.name).toBe('test');
        expect(response.body.data.email).toBe('test@gmail.com');
    })
})


describe('PATCH /api/users/current', () => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });

    it('should reject update user if request is invalid', async () => {
        const response = await supertest(web)
            .patch("/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                password: "",
                name: ""
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject update user if token is wrong', async () => {
        const response = await supertest(web)
            .patch("/users/current")
            .set("X-API-TOKEN", "salah")
            .send({
                password: "benar",
                name: "benar"
            });

        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });

    it('should be able to update user name', async () => {
        const response = await supertest(web)
            .patch("/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                name: "benar"
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("benar");
    });

    it('should be able to update user password', async () => {
        const response = await supertest(web)
            .patch("/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                password: "benar"
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);

        const user = await UserTest.get();
        expect(await bcrypt.compare("benar", user.password)).toBe(true);
    });
});
describe('DELETE /api/users/current', () => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });

    it('should able to logut', async () => {
        const response = await supertest(web)
            .delete("/users/current")
            .set("X-API-TOKEN", "4e762493-138f-41e4-a932-47a23014d15f")

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe('OK')

        // const user = await UserTest.get();
        // expect(user.token).toBeNull();
    });

    it('should reject logout user if token is wrong', async () => {
        const response = await supertest(web)
            .delete("/api/users/current")
            .set("X-API-TOKEN", "salah");

        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});