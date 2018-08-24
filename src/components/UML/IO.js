import React, { Component } from "react";
import "./UML.css";
import ReactModal from "react-modal";
import { Ace } from "../Ace/Ace";

const Button = props => (
    <div onClick={props.onClick} className="Button-container">
        {props.children}
    </div>
);

export class IO extends Component {
    state = {};

    render() {
        const { input, output } = this.props;

        return (
            <div className="content no-padding">
                <Ace value={String(input)} readOnly={true} height={340} />
                <Ace value={String(output)} readOnly={true} height={340} />
            </div>
        );
    }
}

export default IO;
