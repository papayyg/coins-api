# Coins API

## Description
This is a back-end server built with Node.js, Express.js, and MongoDB for managing coins. It provides endpoints for user registration and authentication, as well as for adding, editing, and deleting coins.

## Installation and Usage
1. Clone the repository by running `git clone https://github.com/papayyg/coins-api.git`.
2. Navigate to the project directory with `cd coins-api`.
3. Install dependencies by running `npm install`.
4. Start the server by running `npm start`.
5. The API documentation is available at `/api-docs`.

## API Endpoints
### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in a user.

### Coin Management
- `GET /api/coin`: Get a list of all coins.
- `POST /api/coin`: Add a new coin.
- `GET /api/coin/:id`: Get data about a coin by its ID.
- `PUT /api/coin/:id`: Edit data about a coin by its ID.
- `DELETE /api/coin/:id`: Delete a coin by its ID.

For more detailed information about each endpoint, refer to the API documentation.

## API Documentation
The API documentation is available at `/api-docs`, where you can find descriptions of each endpoint, test requests, and view data structures.

## Environment Variables
Create a `.env` file and specify the following variables:
- `databaseURL`: URL for the database connection.
- `secretKey`: Secret key for JWT token generation.
- `PORT`: Port number for the server (default: 3000).

## Development Mode
You can run the project in development mode using `npm run dev`.

## Easy Setup for Frontend Learning
This server can also be easily installed and launched to use for frontend learning purposes.

## Author
Aslan Mammadrzayev - aslan.mamedrzaev@gmail.com

