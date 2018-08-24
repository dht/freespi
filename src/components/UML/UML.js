import React, { Component } from "react";
import "./UML.css";
import ReactModal from "react-modal";
import UMLTables from "./UML.tables";
import UMLTimeline from "./UML.timeline";
import { Button } from "../Bar/Button";

const WideButton = props => (
    <div onClick={props.onClick} className="Button-container">
        {props.children}
    </div>
);

const Modes = {
    IO: 1,
    SPLIT: 2,
    TIMELINE: 3
};

export class UML extends Component {
    state = {
        mode: Modes.IO
    };

    renderInner() {
        const { mode } = this.state;
        const isIO = mode === Modes.IO;
        const isTimeline = mode === Modes.TIMELINE;

        return isTimeline ? (
            <UMLTimeline {...this.props} />
        ) : (
            <UMLTables {...this.props} isIO={isIO} />
        );
    }

    render() {
        const { logs, show } = this.props;

        return (
            <ReactModal
                ariaHideApp={false}
                isOpen={show}
                onRequestClose={this.props.onClose}
            >
                <div className="UML-container">
                    <div className="bar">
                        <Button
                            onClick={() => this.setState({ mode: Modes.IO })}
                        >
                            view_stream
                        </Button>
                        <Button
                            onClick={() => this.setState({ mode: Modes.SPLIT })}
                        >
                            view_day
                        </Button>
                        <Button
                            onClick={() => this.setState({ mode: Modes.TIMELINE })}
                        >
                            view_carousel
                        </Button>
                    </div>
                    {this.renderInner()}

                    <div className="actions">
                        <WideButton onClick={this.props.onClose}>
                            Close
                        </WideButton>
                    </div>
                </div>
            </ReactModal>
        );
    }
}

export default UML;
