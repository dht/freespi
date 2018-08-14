import React, { Component } from "react";
import "./Clock.css";
import clock from "./clock.svg";
import classnames from "classnames";

export class Clock extends Component {
    render() {
        if (!this.props.isRunning) return null;

        const classes = classnames("Clock-container", {
            running: this.props.isRunning
        });

        return (
            <div className={classes}>
                <img src={clock} />
            </div>
        );
    }
}

export default Clock;
