import { Button } from "@material-ui/core"
import React from "react"
import heart from "../assets/heart.png"
import loupe from "../assets/loupe.png"


export default function BottomNav() {
    return (
        <div className="bottom-nav">
            <img src={heart}></img>
            <img src={loupe}></img>
            <Button variant="contained" color="secondary"> Switch to host</Button>
        </div>
    )
}