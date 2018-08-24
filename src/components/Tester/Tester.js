import React, { Component } from "react";
import "./Tester.css";
import { Button } from "../Bar/Button";
import { getKeys } from "../../utils/keys";
import classnames from "classnames";

const arr = size => Array.from(Array(size), (_, i) => i + 1);

class Tester extends Component {
    state = { page: 0 };

    mousewheel = ev => {
        if (!this.in) return;

        let { page } = this.state;

        page += ev.deltaY < 0 ? 0.3 : -0.3;

        page = Math.max(page, 0);
        page = Math.min(page, 2);

        this.setState({ page });
    };

    mouseenter = ev => {
        this.in = true;
    };

    mouseleave = ev => {
        this.in = false;
    };

    componentDidMount() {
        this.refs.container.addEventListener("mouseenter", this.mouseenter);
        this.refs.container.addEventListener("mouseleave", this.mouseleave);
        window.addEventListener("mousewheel", this.mousewheel);
    }

    componentWillUnmount() {
        this.refs.container.removeEventListener("mouseenter", this.mouseenter);
        this.refs.container.removeEventListener("mouseleave", this.mouseleave);
        window.removeEventListener("mousewheel", this.mousewheel);
    }

    runAll = () => {
        this.props.runAll();
    };

    render() {
        let { page } = this.state;
        const { IOs = {}, data } = this.props,
            { currentIO } = data;

        const keys = getKeys();
        page = Math.floor(page);

        return (
            <div className="Tester-container" ref="container">
                <div className="tests">
                    {arr(30)
                        .filter(i => i > page * 10 && i <= (page + 1) * 10)
                        .map(i => {
                            const IO = IOs[i],
                                { expected, output } = IO || {};

                            // console.log('i, currentIO', i, currentIO, IO);

                            let className = classnames("box", {
                                selected: i === currentIO,
                                active: IO,
                                ok: expected && expected === output,
                                failing: expected && expected !== output,
                                dirty: IO && IO.isDirty
                            });

                            return (
                                <div
                                    className={className}
                                    key={i}
                                    title={keys[`TEST_${i}`]}
                                    onClick={() => this.props.onClick(i)}>
                                    {i}

                                    <div className="dirty-popoi">*</div>
                                    <div className="popoi" />
                                </div>
                            );
                        })}
                </div>
                <Button onClick={this.runAll} title={keys.RUN_ALL}>
                    refresh
                </Button>
            </div>
        );
    }
}

export default Tester;
