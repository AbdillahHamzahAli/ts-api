import { Request,Response,NextFunction } from "express";
import { UserRequest } from "../types/user-request";
import { CreatePostRequest, SeacrhPostRequest, UpdatePostRequest } from "../model/post-model";
import { PostService } from "../service/post-service";

export class PostController {
    static async create(req: UserRequest,res : Response, next: NextFunction){
        try {
            const request : CreatePostRequest = req.body as CreatePostRequest;
            const response = await PostService.create(req.user! , request)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async get(req: Request,res : Response, next : NextFunction){
        try {
            const slug = req.params.slug;
            const response = await PostService.get(slug);
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async search(req: Request,res : Response, next : NextFunction){
        try {
            const request : SeacrhPostRequest = {
                title : req.query.title as string,
                tags : req.query.tags as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await PostService.search(request);

            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
    static async update(req: UserRequest,res : Response, next: NextFunction){
        try {
            const slug = req.params.slug as string
            const request : UpdatePostRequest = req.body as UpdatePostRequest;
            const response = await PostService.update(req.user! ,request, slug)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }
    static async remove(req: UserRequest,res : Response, next: NextFunction){
        try {
            const slug = req.params.slug as string
            await PostService.remove(req.user!, slug)
            res.status(200).json({
                data: 'OK'
            })
        } catch (e) {
            next(e)
        }
    }
}