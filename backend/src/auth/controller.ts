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

    console.log("created token", token);

    res.cookie("token", token, { httpOnly: true });

    const loggedUser = {
      username: loginUser.username,
      firstName: loginUser.firstName,
      lastName: loginUser.lastName,
      email: loginUser.email,
      avatar: loginUser.avatar,
      role: userCredtial.role,
    };
    res.json(loggedUser);
  } catch (error) {
    res.status(401).json(error);
  }
}

async function logout(req: Request, res: Response) {
  res.clearCookie("token");
  res.json("You've been succesfully logged out");
}

export { login, logout };
