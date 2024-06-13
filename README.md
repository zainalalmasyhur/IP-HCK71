# IP-HCK71
# API Documentation

## Base URL
`https://manga-707ea.web.app/`

## Endpoints

### 1. User Authentication and Registration

#### POST /login
- **Description**: Authenticates a user with their credentials.
- **Request**:
  - **Headers**: 
    - `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "token": "jwt_token"
    }
    ```
  - **401 Unauthorized**:
    ```json
    {
      "error": "Invalid Token"
    }
    ```
  - **400 Bad Request**:
    ```json
    {
    "message": [
        "username is null",
        "email is empty",
        "wrong format email"
    ]
}
    ```

#### POST /login-google
- **Description**: Authenticates a user using Google OAuth.
- **Request**:
  - **Headers**: 
    - `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "googleToken": "string"
    }
    ```
- **Response**:
  - **200 OK**:
    ```json
    {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE4Mjg0NTk3fQ.SY_dY6NZLw5zmIr3KxvDcskCynVonMpehyul7tTnQ6Q"
}
    ```
  - **401 Unauthorized**:
    ```json
    {
      "error": "Invalid Token"
    }
    ```

#### POST /register
- **Description**: Registers a new user.
- **Request**:
  - **Headers**: 
    - `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
- **Response**:
  - **201 Created**:
    ```json
    {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE4Mjg0NTk3fQ.SY_dY6NZLw5zmIr3KxvDcskCynVonMpehyul7tTnQ6Q"
}
    ```
  - **400 Bad Request**:
    ```json
    {
      "error": "Validation error details"
    }
    ```

### 2. Comment Management

> **Note**: All comment-related endpoints require authentication.

#### GET /comments/:chapterId
- **Description**: Retrieves comments for a specific chapter.
- **Request**:
  - **Headers**:
    - `Authorization: Bearer jwt_token`
- **Parameters**:
  - `chapterId`: ID of the chapter (path parameter)
- **Response**:
  - **200 OK**:
    ```json
    [
      {
        "id": "string",
        "chapterId": "string",
        "userId": "string",
        "comment": "string",
        "createdAt": "datetime",
        "updatedAt": "datetime"
      }
    ]
    ```
  - **404 Not Found**:
    ```json
    {
      "error": "error not found"
    }
    ```

#### POST /comments
- **Description**: Posts a new comment.
- **Request**:
  - **Headers**:
    - `Authorization: Bearer jwt_token`
    - `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "chapterId": "string",
      "comment": "string"
    }
    ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "id": "string",
      "chapterId": "string",
      "userId": "string",
      "comment": "string",
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
    ```

#### PUT /comments/:id
- **Description**: Updates a comment by its ID.
- **Request**:
  - **Headers**:
    - `Authorization: Bearer jwt_token`
    - `Content-Type: application/json`
  - **Parameters**:
    - `id`: ID of the comment (path parameter)
  - **Body**:
    ```json
    {
      "comment": "string"
    }
    ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "id": "string",
      "chapterId": "string",
      "userId": "string",
      "comment": "string",
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
    ```
  - **403 Forbidden**:
    ```json
    {
      "error": "Not authorized to update this comment"
    }
    ```
  - **404 Not Found**:
    ```json
    {
      "error": "error not found"
    }
    ```

#### DELETE /comments/:id
- **Description**: Deletes a comment by its ID.
- **Request**:
  - **Headers**:
    - `Authorization: Bearer jwt_token`
  - **Parameters**:
    - `id`: ID of the comment (path parameter)
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Comment deleted successfully"
    }
    ```
  - **403 Forbidden**:
    ```json
    {
      "error": "Not authorized to delete this comment"
    }
    ```
  - **404 Not Found**:
    ```json
    {
      "error": "error not found"
    }
    ```

### 3. Midtrans Management

#### GET /payment/midtrans/status/:orderId
- **Description**: Retrieves the payment status using the orderId from Midtrans.
- **Request**:
  - **Headers**:
    - `Authorization: Bearer jwt_token`
- **Parameters**:
  - `orderId`: Order ID from Midtrans (path parameter)
- **Response**:
  - **200 OK**:
    ```json
    {
      "status": "string",
      "paymentTime": "datetime",
      "transactionId": "string",
      "orderId": "string",
      "fraudStatus": "string",
      "grossAmount": "string",
      "currency": "string",
      "paymentType": "string",
      "statusCode": "string",
      "statusMessage": "string",
      "fraudReason": "string",
      "maskedCard": "string",
      "bank": "string",
      "approvalCode": "string"
    }
    ```
  - **404 Not Found**:
    ```json
    {
      "error": "Order not found"
    }
    ```

## Error Codes
- **400 Bad Request**: The request could not be understood or was missing required parameters.
- **401 Unauthorized**: Authentication failed or user does not have permissions for the desired action.
- **403 Forbidden**: Authentication succeeded but authenticated user does not have access to the resource.
- **404 Not Found**: The requested resource could not be found.
- **500 Internal Server Error**: An error occurred on the server.

## Authentication
This API uses JWT (JSON Web Token) for authentication. To access the protected routes, include the following header in your requests:

