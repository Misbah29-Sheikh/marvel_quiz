import dotenv from "dotenv";
import app from "./app.js"
import connect from "./db/db_connect.js";

dotenv.config({
    path: "./.env"
});


const port = process.env.PORT || 3002;

connect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        })
    })
    .catch((err) => {
    console.error("MongoDB connection error", err);
    process.exit(1)
  })