# WTWR (What to Wear?): Back End

This is the Back End for the WTWR (What to Wear) project located at [https://github.com/joepotenza/se_project_react](https://github.com/joepotenza/se_project_react). It is built on Node.js and MongoDB and also implements Github Workflows to test the code once pushed to Github.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- ESLint + Prettier

## Available Endpoints

### GET /users

> Returns an array of all users in the database

```json
[
  {
    "_id": "69b913c20365e00557e65daa",
    "name": "Joe Potenza",
    "avatar": "https://i.imgur.com/ZBAqJS7.png",
    "__v": 0
  }
]
```

### POST /users

> Adds a new user and returns the user record (see below)

**name**: User's name<br>
**avatar**: URL for user avatar

### GET /users/:userId

> Returns the user with \_id = userId, if it exists

```json
{
  "_id": "69b913c20365e00557e65daa",
  "name": "Joe Potenza",
  "avatar": "https://i.imgur.com/ZBAqJS7.png",
  "__v": 0
}
```

### GET /items

> Returns an array of all clothing items in the database

```json
[
  {
    "_id": "69b9bff2522f56f9e1f21a2c",
    "name": "T-Shirt",
    "weather": "warm",
    "imageUrl": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
    "owner": {
      "_id": "69b913c20365e00557e65daa",
      "name": "Joe Potenza",
      "avatar": "https://i.imgur.com/ZBAqJS7.png",
      "__v": 0
    },
    "likes": [],
    "createdAt": "2026-03-17T20:56:18.962Z",
    "__v": 0
  }
]
```

### POST /items

> Creates a new clothing item and returns the item record (see below)

**name**: Name of the clothing item<br>
**imageUrl**: URL for the clothing item image<br>
**weather**: Type of weather for the clothing item (_hot, warm, cold_)

### DELETE /items/:itemId

> Deletes a clothing item matching \_id = itemId, if it exists

```json
{
  "message": "Clothing item deleted successfully"
}
```

### PUT /items/:itemId/likes

> Adds a "like" for an item and returns the item record

```json
{
  "_id": "69b9bff2522f56f9e1f21a2c",
  "name": "T-Shirt",
  "weather": "warm",
  "imageUrl": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  "owner": "69b913c20365e00557e65daa",
  "likes": ["69b913c20365e00557e65daa"],
  "createdAt": "2026-03-17T20:56:18.962Z",
  "__v": 0
}
```

### DELETE /items/:itemId/likes

> Removes a "like" for an item and returns the item record

```json
{
  "_id": "69b9bff2522f56f9e1f21a2c",
  "name": "T-Shirt",
  "weather": "warm",
  "imageUrl": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  "owner": "69b913c20365e00557e65daa",
  "likes": [],
  "createdAt": "2026-03-17T20:56:18.962Z",
  "__v": 0
}
```
