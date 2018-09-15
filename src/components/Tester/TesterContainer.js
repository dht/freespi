import React from "react";
import { connect } from "react-redux";
import Tester from "./Tester";
import { fourSelector, IOsSelector } from "../../selectors/selectors";
import { runAll } from "../../reducers/app_thunks";

const mapStateToProps = (state, ownProps) => {
    return {
        IOs: IOsSelector(state),
        data: fourSelector(state)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        runAll: () => {
            ownProps.run();
            dispatch(runAll());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tester);
