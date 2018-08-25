import React, { Component } from "react";
import "./Stats.css";

const Pair = props => (
    <div className={`pair ${props.color}`}>
        <div className="name">{props.text}</div>
        <div className="number">{props.count}</div>
    </div>
);

class Stats extends Component {
    state = {
        code: ""
    };

    render() {
        const {ok = 0, fail = 0, empty = 0} = this.props.stats;
        return (
            <div className="Stats-container">
                <Pair text="ok" color={"green"} count={ok} />
                <Pair text="fail" color={"red"} count={fail} />
                <Pair text="empty" color={"gray"} count={empty} />
            </div>
        );
    }
}

export default Stats;
