import { User } from "@prisma/client";
import { CreatePostRequest, PostResponse, SeacrhPostRequest, toPostResponse, UpdatePostRequest } from "../model/post-model";
import { Validation } from "../validation/validation";
import { PostValidation } from "../validation/post-validation";
import { prisma } from "../application/database";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";
import slugify from "slugify";


export class PostService {
    static async create(user: User, request : CreatePostRequest) : Promise<PostResponse>{
        
        const slug: string = slugify(request.title,{
            lower:true
        });
        
        const createRequest = Validation.validate(PostValidation.CREATE,request);
        const slugValidated = Validation.validate(PostValidation.SLUG, {slug: slug})

        const checkPostWithSameSlug = await prisma.post.count({
            where:{
                slug: slugValidated.slug
            }
        });

        if(checkPostWithSameSlug != 0){
            throw new ResponseError(400,'Slug Already Exists')
        }

        const post = await prisma.post.create({
            data: {
                ...createRequest,
                ...{slug:slugValidated.slug},
                ...{authorId:user.id},
            }
        })

        return toPostResponse(post)
    }
    static async checkPostMustExists(slug: string){
        const post = await prisma.post.findFirst({
            where: {
                slug : slug
            }
        })
        if(!post){
            throw new ResponseError(404,'Post is not found')
        }
        return post
    }
    static async get(slug : string) : Promise<PostResponse> {
        const post = await this.checkPostMustExists(slug)
        return toPostResponse(post)
    }
    static async search(request: SeacrhPostRequest) : Promise<Pageable<PostResponse>>{
        const searchRequest =  Validation.validate(PostValidation.SEARCH,request);

        const skip = (searchRequest.page - 1) * searchRequest.size;

        const filters : any = {}

        if(searchRequest.title){
            filters.title = {
                contains : searchRequest.title
            }
        }
        if(searchRequest.tags){
            filters.tags = {
                has : searchRequest.tags
            }
        }

        const posts = await prisma.post.findMany({
            where: filters,
            orderBy: {
                updatedAt: "desc"
            },
            take: searchRequest.size,
            skip: skip
        })
        const total = await prisma.post.count({
            where: {
                title : {
                    contains : searchRequest.title ?? ''
                }
            }
        })

        return {
            data: posts.map(post => toPostResponse(post)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size
            }
        }
    }
    static async update(user: User, request : UpdatePostRequest, oldSlug:string) : Promise<PostResponse>{
        const oldPost = await this.checkPostMustExists(oldSlug);

        const slug: string = slugify(request.title,{
            lower:true
        });
        
        const createRequest = Validation.validate(PostValidation.UPDATE ,request);
        const slugValidated = Validation.validate(PostValidation.SLUG, {slug: slug})

        const checkPostWithSameSlug = await prisma.post.count({
            where:{
                slug: slugValidated.slug,
                NOT:{
                    id: oldPost.id
                }
            }
        });

        // console.log(checkPostWithSameSlug)
        if(checkPostWithSameSlug != 0){
            throw new ResponseError(400,'Slug Already Exists')
        }

        const post = await prisma.post.update({
            where:{
                id: oldPost.id,
                slug : oldSlug,
                authorId: user.id
            },
            data: {
                ...createRequest,
                ...{slug:slugValidated.slug},
                ...{authorId:user.id},
            }
        })

        return toPostResponse(post)
    }
    static async remove(user: User, slug:string): Promise<PostResponse> {
        const post = await this.checkPostMustExists(slug);
        const deletePost = await prisma.post.delete({
            where:{
                id: post.id,
                slug:slug,
                authorId: user.id
            }
        })

        return toPostResponse(deletePost)
    } 
}