 ### URL Shortener

This Node.js application provides a simple URL shortener service. It uses MongoDB to store the original URLs and their corresponding shortened versions. The application is structured as follows:

#### 1. Importing Necessary Modules

```javascript
const express = require("express");
const { connectMongoDB } = require("./connection");
const urlRouter = require("./routes/url");
```

- `express`: This module provides the core functionality for building web applications in Node.js.
- `connectMongoDB`: This custom module handles the connection to the MongoDB database.
- `urlRouter`: This custom module defines the routes for handling URL shortening and retrieval.

#### 2. Initializing the Express Application

```javascript
const app = express();
```

This line creates an instance of the Express application.

#### 3. Establishing MongoDB Connection

```javascript
connectMongoDB("mongodb://127.0.0.1:27017/URL_Shortner")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });
```

- This code attempts to connect to a MongoDB database running on the local machine (localhost) on port 27017.
- The database name is "URL_Shortner".
- If the connection is successful, it logs a message to the console.
- If there's an error, it logs the error to the console.

#### 4. Configuring Middleware

```javascript
app.use(express.json());
```

This middleware parses incoming JSON requests and makes the parsed data available in the `req.body` object.

#### 5. Defining Routes

```javascript
app.use("/url", urlRouter);
```

This line mounts the `urlRouter` middleware at the `/url` route. This means that any requests to the `/url` endpoint will be handled by the `urlRouter`.

#### 6. Starting the Server

```javascript
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

- This line starts the Express server and listens for incoming requests on the specified port (8000 by default).
- When the server starts successfully, it logs a message to the console.

