## Ideamarkz API

Base URL: `http://localhost:3000`

### Authentication
- **Scheme**: Bearer JWT in `Authorization: Bearer <token>`
- **Login** sets an httpOnly cookie `token` as well, but clients should send the Bearer token in headers for protected routes.
- Get a token via `/api/auth/login`.

### Error format
```json
{ "error": "message" }
```

### Auth
- **POST** `/api/auth/signup`
  - Registers a new user. Currently creates a verified user directly.
  - Body:
    ```json
    { "name":"Jane", "email":"jane@example.com", "password":"secret", "role":"user" }
    ```
  - 201: `{ "message": "User registered. Please verify your email." }`

- **POST** `/api/auth/verify-email`
  - Verifies OTP code (if verification flow enabled)
  - Body: `{ "email":"jane@example.com", "code":"123456" }`
  - 201: `{ "message": "Email verified successfully" }`

- **POST** `/api/auth/login`
  - Logs in and returns a JWT
  - Body:
    ```json
    { "email":"jane@example.com", "password":"secret" }
    ```
  - 201: `{ "token": "<JWT>" }` and sets secure httpOnly cookie `token`

- **GET** `/api/auth/verify` (auth required)
  - Headers: `Authorization: Bearer <JWT>`
  - 200:
    ```json
    {
      "loggedIn": true,
      "user": {
        "_id": "...",
        "name": "Jane",
        "email": "jane@example.com",
        "avatar": "https://...",
        "role": "user",
        "created_at": "2025-01-01T00:00:00.000Z"
      }
    }
    ```

### Ideas
- **GET** `/api/ideas`
  - Public list of ideas. Populates `seller_id` with `email`, `name`, and `avatar`.
  - 200: `Idea[]`

- **POST** `/api/ideas` (auth required)
  - Creates an idea for current user. Price is stored as `"$" + price`.
  - Headers: `Authorization: Bearer <JWT>`
  - Body:
    ```json
    {
      "title": "Innovative App Concept",
      "description": "A marketplace for selling app ideas",
      "price": "100"
    }
    ```
  - 201: `{ "message": "Idea Created Successfully", "idea": Idea }`

- **GET** `/api/ideas/my` (auth required)
  - Returns ideas where `seller_id` equals current user

- **PUT** `/api/ideas/{id}` (auth required)
  - Only the idea owner can update
  - Body: partial `Idea` fields (`title`, `description`, `price`)

- **DELETE** `/api/ideas/{id}` (auth required)
  - Owner or admin can delete

#### Idea model
```json
{
  "_id": "ObjectId",
  "seller_id": "ObjectId",
  "buyer_id": "ObjectId|null",
  "score": 50,
  "title": "string",
  "description": "string",
  "price": "$100",
  "status": "available|sold",
  "verified": true,
  "created_at": "date-time"
}
```

### Users
- **GET** `/api/users`
  - Returns all users (including hashed `password` as stored by Mongoose model). Treat carefully.

- **GET** `/api/users/get` (auth required)
  - Returns sanitized current user profile

- **PUT** `/api/users/{id}`
  - Updates arbitrary fields on the user document

- **DELETE** `/api/users/{id}`
  - Deletes user by id

### Security notes
- Protected routes require `Authorization: Bearer <token>` with `JWT_SECRET` set.
- Admin-only checks are provided via `middlewares/isadmin.js` but not currently enforced on routes; only idea deletion checks role.
- CORS enabled globally.

### Environment variables
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret
- `EMAIL_USER`, `EMAIL_PASS`: Used by nodemailer for verification emails (if enabled)

### OpenAPI Spec
A comprehensive OpenAPI spec is available at `docs/openapi.yaml`. You can load it into Swagger UI or Postman.
