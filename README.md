# Taskify

To-do list API that allows users to create, read, update and delete items from a list. The API uses MongoDB to store the items and Express to create the API.

## Installation

To install the API, follow these steps:

1. Clone the repository to your local machine: `git clone https://github.com/Folawewo/taskify.git`
2. Install dependencies: `npm install`
3. Start the server: `npm start`

By default, the server will run on `http://localhost:8000`.

## Usage

The API has the following endpoints:

### GET /todos

Returns a list of all items in the database.

### GET /todos/:task

Returns the item with the specified ID.

### POST /todos

Creates a new item in the database. The request body should contain a JSON object with the following properties:

- `task` (string, required): the description of the item
- `completed` (boolean, default : false): track the item

### DELETE /todos/:task

Deletes the item with the specified ID.

## Error Handling

If an error occurs while processing a request, the API will return an error object with a status code and a message. For example:

```json
{
  "error": {
    "status": 404,
    "message": "Todo not found"
  }
}
```

## Security

This API does not currently implement any authentication or authorization mechanisms. It is intended for development and testing purposes only.

## Contributing

Contributions to this project are welcome. To contribute, please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT license. See the LICENSE file for more details.
