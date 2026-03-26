# WTWR (What to Wear?): Back End

This is the Back End for the WTWR (What to Wear) project located at [https://github.com/joepotenza/se_project_react](https://github.com/joepotenza/se_project_react). It is built on Node.js and MongoDB and also implements Github Workflows to test the code once pushed to Github.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- ESLint + Prettier

## Project Preview

The API can be previewed at [https://api.wtwr.bigjoepo.com/](https://api.wtwr.bigjoepo.com/)

A walkthrough video is available:

- [API Walkthrough](https://drive.google.com/file/d/1AHoDeRBhWEgicF6doNPH9nxnDzWvALCJ/view?usp=sharing)

## Available Endpoints

### POST /signup

Adds a new user and returns the user record

> | Field      | Description          |
> | ---------- | -------------------- |
> | `name`     | User's name          |
> | `email`    | User's email address |
> | `password` | User's password      |
> | `avatar`   | URL for user avatar  |

```json
{
  "_id": "69bf913f4174d1f824972e54",
  "name": "Joe Potenza",
  "email": "joseph.potenza@gmail.com",
  "avatar": "https://www.notmyavatar.com",
  "__v": 0
}
```

### POST /signin

Signs in with an email address and password and returns authorization token

> | Field      | Description          |
> | ---------- | -------------------- |
> | `email`    | User's email address |
> | `password` | User's password      |

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWJmOTEzZjQxNzRkMWY4MjQ5NzJlNTQiLCJpYXQiOjE3NzQxNjQ0MDgsImV4cCI6MTc3NDc2OTIwOH0.ycCaotkcFC6DPXH5q0BqmDluwQ_jgZgaLWNRjia2Kqs"
}
```

### GET /users/me

Returns the current logged in user

> | Header key      | Description           |
> | --------------- | --------------------- |
> | `Authorization` | Authorized user token |

```json
{
  "_id": "69bf913f4174d1f824972e54",
  "name": "Joe Potenza",
  "email": "joseph.potenza@gmail.com",
  "avatar": "https://www.notmyavatar.com",
  "__v": 0
}
```

### PATCH /users/me

Update the user's name and avatar <br>

> | Header key      | Description           |
> | --------------- | --------------------- |
> | `Authorization` | Authorized user token |

> | Field    | Description         |
> | -------- | ------------------- |
> | `name`   | User's name         |
> | `avatar` | URL for user avatar |

```json
{
  "_id": "69bf913f4174d1f824972e54",
  "name": "Joe Potenza",
  "email": "joseph.potenza@gmail.com",
  "avatar": "https://i.imgur.com/ZBAqJS7.png",
  "__v": 0
}
```

### GET /items

Returns an array of all clothing items in the database

```json
[
  {
    "_id": "69b9bff2522f56f9e1f21a2c",
    "name": "T-Shirt",
    "weather": "warm",
    "imageUrl": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
    "owner": {
      "_id": "69bf913f4174d1f824972e54",
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

Creates a new clothing item and returns the item record

> | Header key      | Description           |
> | --------------- | --------------------- |
> | `Authorization` | Authorized user token |

> | Field      | Description                                               |
> | ---------- | --------------------------------------------------------- |
> | `name`     | Name of the clothing item                                 |
> | `imageUrl` | URL for the clothing item image                           |
> | `weather`  | Type of weather for the clothing item (_hot, warm, cold_) |

```json
{
  "_id": "69b9bff2522f56f9e1f21a2c",
  "name": "T-Shirt",
  "weather": "warm",
  "imageUrl": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  "owner": "69bf913f4174d1f824972e54",
  "likes": ["69bf913f4174d1f824972e54"],
  "createdAt": "2026-03-17T20:56:18.962Z",
  "__v": 0
}
```

### DELETE /items/:itemId

Deletes a clothing item matching \_id = itemId, if it exists and belongs to the logged in user

> | Header key      | Description           |
> | --------------- | --------------------- |
> | `Authorization` | Authorized user token |

```json
{
  "message": "Clothing item deleted successfully"
}
```

### PUT /items/:itemId/likes

Adds a "like" for an item and returns the item record

> | Header key      | Description           |
> | --------------- | --------------------- |
> | `Authorization` | Authorized user token |

```json
{
  "_id": "69b9bff2522f56f9e1f21a2c",
  "name": "T-Shirt",
  "weather": "warm",
  "imageUrl": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  "owner": "69bf913f4174d1f824972e54",
  "likes": ["69bf913f4174d1f824972e54"],
  "createdAt": "2026-03-17T20:56:18.962Z",
  "__v": 0
}
```

### DELETE /items/:itemId/likes

Removes a "like" for an item and returns the item record

> | Header key      | Description           |
> | --------------- | --------------------- |
> | `Authorization` | Authorized user token |

```json
{
  "_id": "69b9bff2522f56f9e1f21a2c",
  "name": "T-Shirt",
  "weather": "warm",
  "imageUrl": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  "owner": "69bf913f4174d1f824972e54",
  "likes": [],
  "createdAt": "2026-03-17T20:56:18.962Z",
  "__v": 0
}
```
