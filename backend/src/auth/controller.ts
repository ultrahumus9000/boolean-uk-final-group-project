import { Request, Response } from "express";
import findUserWithValidation from "./service";

import { createToken } from "../authgenerator";

async function login(req: Request, res: Response) {
  const userCredtial = req.body;

  try {
    const loginUser = await findUserWithValidation(userCredtial);

    const token = createToken({
      id: loginUser.id,
      username: loginUser.username,
    });

    res.cookie("token", token, { httpOnly: true });

    res.json(loginUser.username);
  } catch (error) {
    res.status(401).json(error);
  }
}

async function logout(req: Request, res: Response) {
  res.clearCookie("token");
  res.json("You've been succesfully logged out");
}

export { login, logout };
