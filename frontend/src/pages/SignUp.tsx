import React from "react";
import { useState } from "react";
import { Button, TextField } from "@material-ui/core";

const initialFormState = {
  email: "",
  username: "",
  password: "",
};

export default function RegisterPage() {
  function handleSubmit(event) {
    const { username, password } = event.target;

    event.preventDefault();

    const loginData = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      username: event.target.username.value,
      password: event.target.password.value,
      avatar: event.target.avatar.value,
      bio: event.target.bio.value,
      role: event.target.radio.value,
    };
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      credentials: "include",
    });
  }
  return (
    <main className="main-register-div">
      <div className="signup-container">
        <h1 className="signup-title"> Register</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <TextField className="input" variant="outlined" name="firstName" type="text" placeholder="First name"></TextField>
          <TextField className="input" variant="outlined" name="lastName" type="text" placeholder="Last name"></TextField>
          <TextField className="input" variant="outlined" name="email" type="text" placeholder="Email"></TextField>
          <TextField className="input" variant="outlined" name="username" type="text" placeholder="Username"></TextField>
          <TextField className="input" variant="outlined" name="password" type="text" placeholder="Password"></TextField>
          <TextField className="input" variant="outlined" name="avatar" type="text" placeholder="Avatar"></TextField>
          <TextField className="input" variant="outlined" multiline
            rows={4} name="bio" placeholder="Tell us a bit about yourself..."></TextField>
          <div className="radio-buttons">
            <div className="radio">
              <input type="radio" id="guest" name="radio" value="guest"></input>
              <label htmlFor="guest"> Guest</label>
            </div>
            <div className="radio">
              <input type="radio" id="host" name="radio" value="host"></input>
              <label htmlFor="host"> Host</label>
            </div>
          </div>
          <Button className="signup-button" color="secondary" variant="contained" type="submit"> Submit</Button>
        </form>
      </div>
    </main>
  );
}
