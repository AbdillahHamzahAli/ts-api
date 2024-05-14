import express from "express"
import { publicRouter } from "../route/public-api"
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../route/api";

require('dotenv').config();

export const web = express();

web.use(express.json());
web.use(publicRouter);
web.use(apiRouter);
web.use(errorMiddleware);