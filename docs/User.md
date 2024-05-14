# User API Spec

## Register User

Endpoint : POST /register

Request Body :

```json
{
  "username" : "khannedy",
  "email" : "test@gmail.com", // tidak wajib
  "password" : "rahasia",
  "name" : "Eko Khannedy"
}
```

Response Body (Success) :

```json
{
  "data" : {
    "username" : "khannedy",
    "email" : "test@gmail.com",
    "name" : "Eko Khannedy"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Username must not blank, ..."
}
```

## Login User

Endpoint : POST /users/login

Request Body :

```json
{
  "username" : "khannedy",
  "password" : "rahasia"
}
```

Response Body (Success) :

```json
{
  "data" : {
    "username" : "khannedy",
    "name" : "Eko Khannedy",
    "email" : "test@gmail.com",
    "token" : "uuid"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Username or password wrong, ..."
}
```

## Get User

Endpoint : GET /users/current

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data" : {
    "username" : "khannedy",
    "name" : "Eko Khannedy",
    "email" : "test@gmail.com"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```

## Update User

Endpoint : PATCH /users/current

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
    "password" : "rahasia", // tidak wajib
    "email" : "test@gmail.com", // tidak wajib
    "name" : "Eko Khannedy" // tidak wajib
}
```

Response Body (Success) :

```json
{
  "data" : {
    "username" : "khannedy",
    "name" : "Eko Khannedy",
    "email" : "test@gmail.com",
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```

## Logout User

Endpoint : DELETE /users/current

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