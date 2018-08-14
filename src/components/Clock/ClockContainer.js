import React from "react";
import {connect} from "react-redux";
import Clock from './Clock';
import {isRunningSelector, isLoadingSelector} from "../../selectors/selectors";

const mapStateToProps = (state, ownProps) => {
    return {
        isRunning: isRunningSelector(state) || isLoadingSelector(state)
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        method: () => {
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Clock);