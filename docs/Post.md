# Post  API Spec

## Create Post

Endpoint : POST /posts

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
    "title" : "Belajar JS",
    "thumbnail" : "www.photo.com/js.jpg",
    "description" : "belajar JS pemula",
    "content" : "belajar JS 1",
    "tags" : [
        "#programming","#js"
    ]
}
```

Response Body (Success) :

```json
{
  "data" : {
    "title" : "Belajar JS",
    "slug"  : "belajar-js",
    "thumbnail" : "www.photo.com/js.jpg",
    "description" : "belajar JS pemula",
    "content" : "belajar JS 1",
    "authorId" : "_id",
    "tags" : [
        "#programming","#js"
    ]
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```

## Update Post

Endpoint : PUT /posts/:slug

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
    "title" : "Belajar JS",
    "thumbnail" : "www.photo.com/js.jpg",
    "description" : "belajar JS pemula",
    "content" : "belajar JS 1",
    "authorId" : "_id",
    "tags" : [
        "#programming","#js"
    ]
}
```

Response Body (Success) :

```json
{
  "data" : {
    "title" : "Belajar JS baru",
    "slug"  : "belajar-js-baru",
    "thumbnail" : "www.photo.com/js.jpg",
    "description" : "belajar JS pemula",
    "content" : "belajar JS 1",
    "authorId" : "_id",
    "tags" : [
        "#programming","#js"
    ]
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```

## Get Post

Endpoint : GET /posts/:slug

Response Body (Success) :

```json
{
  "data" : {
    "title" : "Belajar JS baru",
    "slug"  : "belajar-js-baru",
    "thumbnail" : "www.photo.com/js.jpg",
    "description" : "belajar JS pemula",
    "content" : "belajar JS 1",
    "authorId" : "_id",
    "tags" : [
        "#programming","#js"
    ]
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "post is not found"
}
```

Remove Tag

Endpoint : DELETE /posts/:slug

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data" : "OK"
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```

## Search Post

Endpoint : GET /posts

Query Parameter :

- title : string , optional
- page : number, default 1
- size : number, default 10

Response Body (Success) :

```json
{
  "data" : [
    {
        "_id" : 123,
        "title" : "Belajar JS baru",
        "slug"  : "belajar-js-baru",
        "thumbnail" : "www.photo.com/js.jpg",
        "description" : "belajar JS pemula",
        "content" : "belajar JS 1",
        "authorId" : "_id",
        "tags" : [
            "#programming","#js"
        ]
    },
    {
        "_id" : 123,
        "title" : "Belajar JS baru",
        "slug"  : "belajar-js-baru",
        "thumbnail" : "www.photo.com/js.jpg",
        "description" : "belajar JS pemula",
        "content" : "belajar JS 1",
        "authorId" : "_id",
        "tags" : [
            "#programming","#js"
        ]
    }
  ],
  "paging" : {
    "current_page" : 1,
    "total_page" : 10,
    "size" : 10
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Not Found..."
}
```
