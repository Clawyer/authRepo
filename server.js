import express from "express";
import { routes } from "./routes/routes.js";
import { logger } from "./utils/logger.js";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());


try {
     app.listen(port, async () => {
       logger.info("Server listening on port http://localhost:"+ port);
         routes(app);
     });
} catch (error) {
  logger.error(error);
  throw new Error(error);
}
