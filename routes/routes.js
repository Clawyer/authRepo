import { authentificate } from "../middlewares/authentificate.js";
import {logger } from "../utils/logger.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

export function routes(app) {
  app.get("/healthcheck", authentificate, (req, res) => {
    res.status(200).send({
      status: "Ok",
      message: "✅",
    });
  });

  app.post("/login", async (req, res) => {
    logger.info(req.body)
    let { password, email } = req.body;

    try {
      let hashPassword = ""; //password hashé
      const saltRounds = 10;

      //fonction qui permet de "hacher" le mot de passe
      hashPassword = await hash("jeremyaimelabite", saltRounds);

      //utilisateur dans notre base de donnée, a remplacer par un findOne si on a une
      //Bdd
      logger.info("hash: " + hashPassword);
      const user = {
        email: "zoubida@gmail.com",
        password: hashPassword,
      };

      //check si le mail est correct
      if (!email == user.email)
        return res.status(400).send({ message: "Email or Password incorrect" });

      //check si les password correspondent
      logger.info("password :" + password, user.password);
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(404).send({ message: "Email or Password incorrect" });

      const payload = {
        id: user.id,
        role: user.role
      }
      const token = jwt.sign(payload,"FZEFIZPFEZPFOZFEZP1D2F")

      res.cookie('token', token,{
        expires: new Date(Date.now() + 3600000),
        httpOnly: true
      })

      return res.status(200).send({ message: "L'utilisateur est connecté !", token: token });;
    } catch (error) {
      logger.info(error);
      res.status(400).send({ message: error.message });
    }
  });
}
