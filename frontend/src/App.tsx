import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import GuestDashPage from "./pages/GuestDashPage";
import HostDashPage from "./pages/HostDashPage";
import HouseListingPage from "./pages/HouseListingPage";
import WrongTurn from "./pages/WrongTurn";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/SignUp";
import GuestProfilePage from "./pages/GuestProfilePage";
import BottomNav from "./components/BottomNav";
import useStore from "./store";
import AddListingHost from "./pages/AddListingHost";

function App() {
  const currentUser = useStore((store) => store.currentUser);
  //redirect
  return (
    <div className="App">
      <div className="phone">
        <div className="screen">
          <Nav />
          <div className="main-content">
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
                {currentUser.role === "guest" ? (
                  <GuestDashPage />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
              <Route path="/host/dashboard" exact>
                {currentUser.role === "host" ? (
                  <HostDashPage />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
              <Route path="/host/dashboard/addlisting" exact>
                {currentUser.role === "host" ? (
                  <AddListingHost />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
              <Route path="/guest/profile" exact>
                {currentUser.role === "guest" ? (
                  <GuestProfilePage />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
              <Route path="*">
                <WrongTurn />
              </Route>
            </Switch>
          </div>
          {currentUser.username && <BottomNav />}
        </div>
      </div>
    </div>
  );
}

export default App;
