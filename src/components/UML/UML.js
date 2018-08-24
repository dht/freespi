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
        mode: Modes.SPLIT
    };

    onClickIO = (name, params) => {
        const ok = window.confirm("generate a new IO for this run?");

        if (ok) {
            this.props.generateIO(name, params).then((id) => {
                alert(`IO #${id} was created`);
            });
        }
    };

    renderInner() {
        const { mode } = this.state;
        const isTimeline = mode === Modes.TIMELINE;

        return (
            <div>
                {isTimeline ? (
                    <UMLTimeline {...this.props} />
                ) : (
                    <UMLTables
                        {...this.props}
                        isIO={mode === Modes.IO}
                        onClickIO={this.onClickIO}
                    />
                )}
            </div>
        );
    }

    render() {
        const { logs, show } = this.props;

        return (
            <ReactModal
                ariaHideApp={false}
                isOpen={show}
                onRequestClose={this.props.onClose}>
                <div className="UML-container">
                    <div className="bar">
                        <Button
                            onClick={() =>
                                this.setState({ mode: Modes.SPLIT })
                            }>
                            view_day
                        </Button>
                        <Button
                            onClick={() => this.setState({ mode: Modes.IO })}>
                            view_stream
                        </Button>
                        <Button
                            onClick={() =>
                                this.setState({ mode: Modes.TIMELINE })
                            }>
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
