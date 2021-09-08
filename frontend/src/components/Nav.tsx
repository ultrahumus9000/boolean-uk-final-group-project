<<<<<<< HEAD
import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

=======
import { Button } from "@material-ui/core"
import React from "react"
import { Link } from "react-router-dom"
// import logo from "../images/logo.svg"
>>>>>>> commit
import useStore from "../store";

export default function Nav() {
  const currentUser = useStore((state) => state.currentUser);
<<<<<<< HEAD
  const setCurrentUser = useStore((store) => store.setCurrentUser);
  const history = useHistory();

  console.log(currentUser);

  function Logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
    }).then(() => {
      setCurrentUser({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        avatar: "",
        role: "",
      });
      history.push("/");
    });
  }
=======

  console.log(currentUser)
>>>>>>> commit

  return (
    <div className="nav">
      {/* <img src={logo} alt="Hotelable" /> */}
      <Link to="/" className="nav-btn">
        <h1>Hotelable</h1>
      </Link>
      <div>
<<<<<<< HEAD
        {!currentUser.username && (
          <Link to="/login">
            <Button variant="contained" color="secondary">
              {" "}
              Login
            </Button>
          </Link>
        )}
        {currentUser.username && (
          <Button variant="contained" color="secondary" onClick={Logout}>
            {" "}
            Log Out
          </Button>
        )}
      </div>
    </div>
  );
=======
        {!currentUser.username &&
          <Link to="/login">
            <Button variant="contained" color="secondary"> Login</Button>
          </Link>}
        {currentUser.username &&
          <Link to="/guest/dashboard">
            <Button variant="contained" color="secondary"> Dashboard</Button>
          </Link>}
      </div>
    </div>
  )
>>>>>>> commit
}
