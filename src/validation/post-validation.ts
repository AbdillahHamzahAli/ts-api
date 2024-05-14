import { ZodType,z } from "zod";

export class PostValidation {
    static readonly CREATE : ZodType = z.object({
        title: z.string().min(1).max(255),
        thumbnail: z.string().min(1).max(255).optional(),
        description: z.string().min(1).max(255).optional(),
        content: z.string().min(1),
        tags: z.array(z.string())
    })
    static readonly SLUG : ZodType = z.object({
        slug: z.string().min(1).max(400),
    })
    static readonly UPDATE : ZodType = z.object({
        title: z.string().min(1).max(255),
        thumbnail: z.string().min(1).max(255).optional(),
        description: z.string().min(1).max(255).optional(),
        content: z.string().min(1),
        tags: z.array(z.string())
    })
    static readonly SEARCH : ZodType = z.object({
        title: z.string().min(1).max(255).optional(),
        tags: z.string().min(1).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive(),
    })
}