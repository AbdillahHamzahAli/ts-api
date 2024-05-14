import supertest from "supertest"
import { web } from "../src/application/web"
import { logger } from "../src/application/logging"
import { PostTest, UserTest } from "./test-util"

describe('POST /posts', () => {

    beforeEach(async () =>{
        await UserTest.create();
    });

    afterEach(async () => {
        await PostTest.deleteAll();
        await UserTest.delete();
    });

    it('should able to create post', async () =>{

        const response = await supertest(web)
            .post('/posts')
            .set('X-API-TOKEN', 'test')
            .send({
                title : "Belajar Baru",
                thumbnail : "www.photo.com/html.jpg",
                description : "belajar HTML pemula",
                content : "belajar HTML",
                tags : [
                    "#HTML"
                ]
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.title).toBe('Belajar Baru');
        expect(response.body.data.slug).toBe('belajar-baru');
        expect(response.body.data.thumbnail).toBe('www.photo.com/html.jpg');
        expect(response.body.data.description).toBe('belajar HTML pemula');
        expect(response.body.data.content).toBe('belajar HTML');
        expect(response.body.data.tags.length).toBe(1);
    });
    it('should reject to create post if slug already', async () =>{

        const response = await supertest(web)
            .post('/posts')
            .set('X-API-TOKEN', 'test')
            .send({
                title : "Coba Post",
                thumbnail : "www.photo.com/js.jpg",
                description : "belajar JS pemula",
                content : "belajar JS 1",
                tags : [
                    "#programming", "#js"
                ]
            })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })
})
describe('PUT /posts', () => {

    beforeEach(async () =>{
        await UserTest.create();
        await PostTest.create();
    });

    afterEach(async () => {
        await PostTest.deleteAll();
        await UserTest.delete();
    });

    it('should able to update post', async () =>{

        const response = await supertest(web)
            .put('/posts/coba-test-1')
            .set('X-API-TOKEN', 'test')
            .send({
                title : "Coba Test 1",
                thumbnail : "www.photo.com/html.jpg",
                description : "belajar JS pemula",
                content : "belajar JS",
                tags : [
                    "#HTML", "#JS"
                ]
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.title).toBe('Coba Test 1');
        expect(response.body.data.slug).toBe('coba-test-1');
        expect(response.body.data.thumbnail).toBe('www.photo.com/html.jpg');
        expect(response.body.data.description).toBe('belajar JS pemula');
        expect(response.body.data.content).toBe('belajar JS');
        expect(response.body.data.tags.length).toBe(2);
    });
    it('should reject to update post if slug already', async () =>{
        const response = await supertest(web)
            .put('/posts/coba-test-1')
            .set('X-API-TOKEN', 'test')
            .send({
                title : "Coba Test 2",
                thumbnail : "www.photo.com/js.jpg",
                description : "belajar JS pemula",
                content : "belajar JS 1",
                tags : [
                    "#programming", "#js"
                ]
            })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })
    it('should reject to update post if slug not found', async () =>{

        const response = await supertest(web)
            .put('/posts/salah')
            .set('X-API-TOKEN', 'test')
            .send({
                title : "Coba Test 2",
                thumbnail : "www.photo.com/js.jpg",
                description : "belajar JS pemula",
                content : "belajar JS 1",
                tags : [
                    "#programming", "#js"
                ]
            })

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
describe('DELETE /posts/:slug', () =>{
    beforeEach(async () =>{
        await UserTest.create();
        await PostTest.create();
    });

    afterEach(async () => {
        await PostTest.deleteAll();
        await UserTest.delete();
    });
    it('should able to delete post by slug', async () =>{
        const response = await supertest(web)
            .delete('/posts/coba-test-1')
            .set('X-API-TOKEN','test')
        
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe('OK')
    });
    it('should reject to delete post if slug not found', async () =>{
        const response = await supertest(web)
            .delete('/posts/belajar-salah')
            .set('X-API-TOKEN','test')
        
        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })
})
describe('GET /posts/:slug', () =>{
    beforeEach(async () =>{
        await UserTest.create();
        await PostTest.create();
    });

    afterEach(async () => {
        await PostTest.deleteAll();
        await UserTest.delete();
    });
    it('should able to get post by slug', async () =>{
        const response = await supertest(web)
            .get('/posts/coba-test')
        
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.title).toBe('Coba Test');
        expect(response.body.data.slug).toBe('coba-test');
        expect(response.body.data.thumbnail).toBe('www.photo.com/html.jpg');
        expect(response.body.data.description).toBe('belajar HTML pemula');
        expect(response.body.data.content).toBe('belajar HTML');
        expect(response.body.data.tags.length).toBe(1);
    });
    it('should reject to get post if slug not found', async () =>{
        const response = await supertest(web)
            .get('/posts/belajar-salah')
        
        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })
})
describe('SEARCH GET /posts', () =>{
    beforeEach(async () =>{
        await UserTest.create();
        await PostTest.create();
    });

    afterEach(async () => {
        await PostTest.deleteAll();
        await UserTest.delete();
    });

    it('should able to search post ', async () =>{
        const response = await supertest(web)
            .get('/posts')
        
        logger.debug(response.body);
        expect(response.status).toBe(200);
        console.log(response.body.data.length)
        expect(response.body.data.length).toBe(2);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    })
    it('should able to search post by title', async () =>{
        const response = await supertest(web)
            .get('/posts')
            .query({
                title: 'Coba'
            })
        
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(2);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    })
})