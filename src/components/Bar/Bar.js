import React, { Component } from "react";
import "./Bar.css";
import Tester from "../Tester/TesterContainer";
import Clock from "../Clock/ClockContainer";
import { Button } from "./Button";
import { getKeys } from "../../utils/keys";
import classnames from "classnames";

const Divider = props => (
    <div className={classnames("Divider-container", props.className)} />
);

class Bar extends Component {
    keydown = ev => {
        if (
            ev.keyCode == 83 &&
            (navigator.platform.match("Mac") ? ev.metaKey : ev.ctrlKey)
        ) {
            ev.preventDefault();
            this.props.save();
        }
    };

    componentDidMount() {
        document.addEventListener("keydown", this.keydown, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keydown);
    }

    renderMinimal() {
        const keys = getKeys();

        return (
            <div className="Bar-container">
                <div className="half">
                    <Button onClick={this.props.run} title={keys.RUN}>
                        play_arrow
                    </Button>
                    <Button onClick={this.props.download}>
                        cloud_download
                    </Button>
                    <Clock />
                </div>
            </div>
        );
    }

    render() {
        const { autoplay, minimal } = this.props;

        if (minimal) return this.renderMinimal();

        const keys = getKeys();

        return (
            <div className="Bar-container">
                <div className="half">
                    <Button
                        animated={autoplay}
                        onClick={this.props.run}
                        onContextMenu={this.props.toggleAutoPlay}
                        title={keys.RUN}
                    >
                        play_arrow
                    </Button>
                    <Button onClick={this.props.save} title={keys.SAVE}>
                        save
                    </Button>
                    <Divider />
                    <Button
                        onClick={this.props.showGlobals}
                        title={keys.GLOBALS}
                    >
                        language
                    </Button>
                    <Button
                        onClick={this.props.onNavigateHome}
                        title={keys.HOME}
                    >
                        home
                    </Button>
                    <Button
                        onClick={this.props.showUML}
                        title={keys.GLOBALS}
                    >
                        input
                    </Button>
                    <Divider className="long" />
                    <Clock />
                    <Button onClick={this.props.download}>
                        cloud_download
                    </Button>
                    <Button onClick={this.props.share}>extension</Button>
                    <Divider />
                </div>
                <div className="half space-between">
                    <Tester onClick={this.props.loadIO} run={this.props.run} />
                    <a
                        className="github"
                        href="https://github.com/dht/freespi"
                        target="_blank"
                    />
                </div>
            </div>
        );
    }
}

export default Bar;
