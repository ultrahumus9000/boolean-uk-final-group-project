import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useStore from "../store";

export default function LoginPage() {
  const history = useHistory();

  const setCurrentUser = useStore((store) => store.setCurrentUser);

  function loginUser(userCreds) {
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
        setCurrentUser(userFromServer);
        history.push("/");
      });
  }

  function handleSubmit(event) {
    const { username, password } = event.target;

    event.preventDefault();

    const loginData = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    loginUser(loginData);
  }

  return (
    <main className="main-div">
      <div className="login-container">
        <h1 className="login-title"> Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <TextField
            className="input"
            name="username"
            type="text"
            placeholder="Username"
            variant="outlined"
          ></TextField>
          <TextField
            className="input"
            name="password"
            type="text"
            placeholder="Password"
            variant="outlined"
          ></TextField>
          <Button type="submit" color="secondary" variant="contained">
            {" "}
            Log in
          </Button>
          <p>
            Not registered? Sign up <Link to="/signup">here</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
