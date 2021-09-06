import { Button } from "@material-ui/core"
import React from "react"
import { Link } from "react-router-dom"
import heart from "../assets/heart.png"
import loupe from "../assets/loupe.png"


export default function BottomNav() {
    return (
        <div className="bottom-nav">
            <img src={heart}></img>
            <Link to="/guest/dashboard">
                <img src={loupe}></img>
            </Link>
            <Button variant="contained" color="secondary"> Switch to host</Button>
        </div>
    )
}