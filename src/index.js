const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteroutes");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
    res.status(200).send("Hello");
});

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// // Ensure the MONGO_URL is defined
// if (!MONGO_URL) {
//     console.error("MONGO_URL is not defined. Please check your .env file.");
//     process.exit(1); // Exit the process
// }

// db connection
mongoose.connect(MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server started on port: " + PORT);
            console.log("Connected to MongoDB");
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process if MongoDB connection fails
    });
