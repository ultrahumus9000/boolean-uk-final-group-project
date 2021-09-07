import { Button } from "@material-ui/core"
import React from "react"
import { Link } from "react-router-dom"
import heart from "../assets/heart.png"
import loupe from "../assets/loupe.png"
import useStore from "../store"


export default function BottomNav() {
    const currentUser = useStore((state) => state.currentUser);
    const setCurrentUser = useStore((state) => state.setCurrentUser)

    function switchToHost() {
        setCurrentUser({ ...currentUser, role: "host" })
        console.log(currentUser)
    }

    function switchToGuest() {
        setCurrentUser({ ...currentUser, role: "guest" })
    }

    return (
        <div className="bottom-nav">
            <img src={heart}></img>
            <Link to="/guest/dashboard">
                <img src={loupe}></img>
            </Link>
            {currentUser.role === "guest" &&
                <Link to="/host/dashboard">
                    <Button onClick={switchToHost} variant="contained" color="secondary"> Switch to host</Button>
                </Link>}
            {currentUser.role === "host" &&
                <Link to="/guest/dashboard">
                    <Button onClick={switchToGuest} variant="contained" color="secondary"> Switch to guest</Button>
                </Link>}
        </div>
    )
}