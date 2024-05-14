import express from "express"
import { publicRouter } from "../route/public-api"
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../route/api";

require('dotenv').config({path: "../.env"});

const app = express();

app.use(express.json());
app.use(publicRouter);
app.use(apiRouter);
app.use(errorMiddleware);

export default app