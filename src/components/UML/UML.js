import React, { Component } from "react";
import "./UML.css";
import ReactModal from "react-modal";
import UMLTables from "./UML.tables";
import UMLTimeline from "./UML.timeline";
import { Button } from "../Button/Button";

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
        mode: Modes.SPLIT,
        search: ""
    };

    onClickIO = (name, params) => {
        const ok = window.confirm("generate a new IO for this run?");

        if (ok) {
            this.props.generateIO(name, params).then(id => {
                alert(`IO #${id} was created`);
            });
        }
    };

    renderInner() {
        const { mode, search } = this.state;
        const isTimeline = mode === Modes.TIMELINE;

        return (
            <div>
                {isTimeline ? (
                    <UMLTimeline {...this.props} search={search} />
                ) : (
                    <UMLTables
                        {...this.props}
                        search={search}
                        isIO={mode === Modes.IO}
                        onClickIO={this.onClickIO}
                    />
                )}
            </div>
        );
    }

    onChange = ev => {
        this.setState({ search: ev.target.value });
    };

    onFocus = ev => {
        ev.target.select();
    };

    render() {
        const { search } = this.state;
        const { logs, show } = this.props;

        return (
            <ReactModal
                ariaHideApp={false}
                isOpen={show}
                onRequestClose={this.props.onClose}>
                <div className="UML-container">
                    <div className="search">
                        <input
                            onFocus={this.onFocus}
                            onChange={this.onChange}
                            placeholder="search in output..."
                        />
                    </div>
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
