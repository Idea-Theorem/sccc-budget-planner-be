import "dotenv/config";
import express from "express";
import routes from "./src/routes";
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", routes);

app.get("/", (req, res) => {
    return res.send("Hi Everyone.");
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));