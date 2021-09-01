import db from "../database";
import { compare } from "bcrypt";

type UserFromLogin = {
  username: string;
  password: string;
  role: string;
};

const { user } = db;

async function findUserWithValidation(loginUser: UserFromLogin) {
  console.log("loginUser", loginUser);
  const foundUser = await user.findUnique({
    where: {
      username: loginUser.username,
    },
  });

  console.log("foundUser", foundUser);

  if (!foundUser) {
    if (!foundUser) throw new Error("Username incorrect");
  }

  const passwordCompareResult = await compare(
    loginUser.password,
    foundUser?.password
  );

  if (!passwordCompareResult) throw new Error("Password incorrect");

  return foundUser;
}

export default findUserWithValidation;
