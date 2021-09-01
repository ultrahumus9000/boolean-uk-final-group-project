import React from "react";

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useStore from "../store";

export default function LoginPage() {
  const history = useHistory();

  const currentUser = useStore((store) => store.currentUser);
  const setCurrentUser = useStore((store) => store.setCurrentUser);

  console.log(currentUser);

  function loginUser(userCreds) {
    console.log(userCreds);
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCreds),
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((userFromServer) => {
        console.log(userFromServer);
        setCurrentUser(userFromServer);
        // history.push("/");
      });
  }

  function handleSubmit(event) {
    const { username, password } = event.target;

    event.preventDefault();

    const loginData = {
      username: event.target.username.value,
      password: event.target.password.value,
      role: event.target.role.value,
    };

    loginUser(loginData);
  }

  return (
    <main className="main-div">
      <div className="login container">
        <h1> Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input name="username" type="text" placeholder="username"></input>
          <input name="password" type="text" placeholder="password"></input>

          <label htmlFor="role">
            Host
            <input type="radio" name="role" value="host"></input>
          </label>
          <label htmlFor="role">
            Guest
            <input type="radio" name="role" value="guest"></input>
          </label>
          <button type="submit"> Submit</button>
          <p>
            {" "}
            Not registered? Sign up <Link to="/register"> here</Link>
          </p>
        </form>
      </div>
    </main>
  );
}