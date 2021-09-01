import React, { useState } from "react"
import { Route, Switch } from "react-router-dom"
import "./App.css"
import Nav from "./components/Nav"
import HomePage from "./pages/HomePage"
import GuestDashPage from "./pages/GuestDashPage"
import HostDashPage from "./pages/HostDashPage"
import HouseListingPage from "./pages/HouseListingPage"
import WrongTurn from "./pages/WrongTurn"

// import flatpickr from "flatpickr";
{
  /* <link rel="stylesheet" type="text/css" href="https://npmcdn.com/flatpickr/dist/themes/material_green.css"> */
}

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
            <Route path="/:id" exact>
              <HouseListingPage />
            </Route>
            <Route path="/guest/dashboard" exact>
              <GuestDashPage />
            </Route>
            <Route path="/host/dashboard" exact>
              <HostDashPage />
            </Route>
            <Route path="*">
              <WrongTurn />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default App
