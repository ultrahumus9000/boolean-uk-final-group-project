import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import GuestDashPage from "./pages/GuestDashPage";
import HostDashPage from "./pages/HostDashPage";
import HouseListingPage from "./pages/HouseListingPage";
import WrongTurn from "./pages/WrongTurn";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/SignUp";
import GuestProfilePage from "./pages/GuestProfilePage"

function App() {
  return (
    <div className="App">
      <div className="phone">
        <div className="screen">
          <Nav />
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/login" exact>
              <LoginPage />
            </Route>
            <Route path="/signup" exact>
              <RegisterPage />
            </Route>
            <Route path="/house/:houseId" exact>
              <HouseListingPage />
            </Route>
            <Route path="/guest/dashboard" exact>
              <GuestDashPage />
            </Route>
            <Route path="/host/dashboard" exact>
              <HostDashPage />
            </Route>
            <Route path="/guest/profile" exact>
              <GuestProfilePage />
            </Route>
            <Route path="*">
              <WrongTurn />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
