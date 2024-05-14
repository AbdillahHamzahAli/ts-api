import { User } from "@prisma/client";
import { prisma } from "../src/application/database";
import bcrypt from "bcrypt"

export class UserTest {
    static async delete(){
        await prisma.user.delete({
            where:{
                username:"test"
            }
        })
    }

    static async create() {
        await prisma.user.create({
            data: {
                username: "test",
                name: "test",
                email: 'test@gmail.com',
                password: await bcrypt.hash("test", 10),
                token: "test"
            }
        })
    }
    
    static async get() : Promise<User> {
        const user = await prisma.user.findFirst({
            where : {
                username : 'test'
            }
        })

        if(!user) {
            throw new Error('User Not Found')
        }

        return user
    }
}

export class PostTest {
    static async deleteAll(){
        await prisma.post.deleteMany({
            where: {
                user : {
                    username : 'test'
                }
            }
        })
    }

    static async create(){
        const author= await UserTest.get()
        await prisma.post.createMany({
            data : [
                {
                    title : "Coba Test 1",
                    slug: "coba-test-1",
                    thumbnail : "www.photo.com/html.jpg",
                    description : "belajar HTML pemula",
                    content : "belajar HTML",
                    authorId : author.id,
                    tags : [
                        "#HTML"
                    ]
                },
                {
                    title : "Coba Test 2",
                    slug: "coba-test-2",
                    thumbnail : "www.photo.com/html.jpg",
                    description : "belajar HTML pemula",
                    content : "belajar HTML",
                    authorId : author.id,
                    tags : [
                        "#HTML"
                    ]
                }
            ]
        })
    }
}