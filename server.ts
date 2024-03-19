import "dotenv/config";
import express from "express";
import routes from "./src/routes";
import swaggerConfig from "./swaggerConfig";
import error from "./src/middlewares/error";
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up Swagger
swaggerConfig(app);

// Routes
app.use("/api", routes);

app.use(error);

app.get("/", (req, res) => {
    return res.send("Hi Everyone.");
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));