import React from "react";
import { useState } from "react";

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
    <main className="main-div">
      <div className="login container">
        <h1> Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input name="firstName" type="text" placeholder="First name"></input>
          <input name="lastName" type="text" placeholder="Last name"></input>
          <input name="email" type="text" placeholder="email"></input>
          <input name="username" type="text" placeholder="Username"></input>
          <input name="password" type="text" placeholder="Password"></input>
          <input name="avatar" type="text" placeholder="Avatar"></input>
          <textarea rows={4} cols={50} name="bio" placeholder="Bio"></textarea>
          <input type="radio" id="guest" name="radio" value="guest"></input>
          <label htmlFor="guest"> Guest</label>
          <input type="radio" id="host" name="radio" value="host"></input>
          <label htmlFor="host"> Host</label>
          <button type="submit"> Submit</button>
        </form>
      </div>
    </main>
  );
}
