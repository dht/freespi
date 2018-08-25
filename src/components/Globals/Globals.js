import React, { Component } from "react";
import "./Globals.css";
import { Ace } from "../Ace/Ace";
import ReactModal from "react-modal";
import { extractVars, extractVarsFromMethod } from "../../utils/code";
import Stats from "./Stats";

const Button = props => (
    <div onClick={props.onClick} className="Button-container">
        {props.children}
    </div>
);

class Globals extends Component {
    state = {
        code: "",
        stats: {}
    };

    showMethod = method => {
        const { id, code, stats } = method,
            vars = extractVarsFromMethod(method);

        const output = `const ${id} = (${vars.join(", ")}) => {
    ${code}
}`;

        this.setState({ code: output, stats });
    };

    onClick(key) {
        this.props.onClose();
        this.props.onLoadMethod(key);
    }

    onDelete(e, key) {
        e.preventDefault();

        if (window.confirm(`Are you sure you want to delete "${key}"?`)) {
            this.props.onDelete(key);
        }
    }

    renderList() {
        const { methods } = this.props;
        const { stats } = this.state;

        if (!methods || methods.length <= 1) {
            return (
                <div className="list">
                    <div>&nbsp;no methods</div>
                </div>
            );
        }

        return (
            <div className="list-wrapper">
                <div className="list">
                    <ul>
                        {methods.map(method => {
                            if (method.id === "_") return null;

                            return (
                                <li
                                    key={method.id}
                                    onClick={() => this.onClick(method.id)}
                                    onMouseOver={() => this.showMethod(method)}>
                                    <span>{method.id}</span>
                                    <div className="test">
                                        <span className="ok">25</span>
                                        <span className="fail">10</span>
                                    </div>
                                    <span
                                        onClick={e =>
                                            this.onDelete(e, method.id)
                                        }
                                        className="material-icons">
                                        delete
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <Stats stats={stats} />
            </div>
        );
    }

    render() {
        const { show } = this.props,
            { code = "" } = this.state;

        return (
            <ReactModal
                ariaHideApp={false}
                isOpen={show}
                onRequestClose={this.props.onClose}>
                <div className="Globals-container">
                    <div className="content">
                        {this.renderList()}
                        <div className="preview">
                            <Ace value={code} readOnly={true} height={520} />
                        </div>
                    </div>

                    <div className="actions">
                        <Button onClick={this.props.onClose}>Close</Button>
                    </div>
                </div>
            </ReactModal>
        );
    }
}

export default Globals;
