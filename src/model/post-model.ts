import { Post } from "@prisma/client"

export type PostResponse = {
    title: string,
    slug: string,
    thumbnail: string | null,
    description: string | null,
    content: string,
    authorId: string,
    tags: string[],
}

export type CreatePostRequest = {
    title: string,
    thumbnail?: string,
    description?: string,
    content: string,
    tags: string[]
}

export type UpdatePostRequest = CreatePostRequest 

export type SeacrhPostRequest = {
    title? : string,
    tags? : string,
    page:number,
    size:number
}

export function toPostResponse(post : Post) : PostResponse{
    return {
        title: post.title,
        slug: post.slug,
        thumbnail: post.thumbnail,
        description: post.description,
        content: post.content,
        authorId: post.authorId,
        tags : post.tags
    }
}
