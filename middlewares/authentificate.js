import { logger } from "../utils/logger.js";
import  jwt from "jsonwebtoken";


export function authentificate(req, res, next) {
    const token = req.cookies.token;
    logger.info("cookie :" + token);
  if (!token) {
    return res.status(401).send({
      status: "Non-Autorisé",
      message: "Veuillez vous connecter !",
    });
  } else {
    try {
      const payload = jwt.verify(token, "FZEFIZPFEZPFOZFEZP1D2F");
    } catch (error) {
      logger.error(error.message);
    }
  }
  next();
}
