import React, {Component} from 'react';
import './Bar.css';
import Tester from "../Tester/TesterContainer";
import Clock from "../Clock/ClockContainer";
import {Button} from "./Button";
import {getKeys} from '../../utils/keys';

const Divider = () => <div className="Divider-container">
</div>

class Bar extends Component {
    render() {

        const {autoplay} = this.props;

        const keys = getKeys();

        return (
            <div className="Bar-container">
                <div className="half">
                    <Button
                        animated={autoplay}
                        onClick={this.props.run}
                        onContextMenu={this.props.toggleAutoPlay}
                        title={keys.RUN}>play_arrow</Button>
                    <Button onClick={this.props.save}
                            title={keys.SAVE}>save</Button>
                    <Divider/>
                    <Button onClick={this.props.showGlobals} title={keys.GLOBALS}>language</Button>
                    <Button onClick={this.props.onNavigateHome} title={keys.HOME}>home</Button>
                    <Clock />
                </div>
                <div className="half">
                    <Tester onClick={this.props.loadIO} run={this.props.run}/>
                </div>
            </div>
        );
    }
}

export default Bar;
