import React from "react";
import { connect } from "react-redux";
import Globals from "./Globals";
import {
    currentSelector,
    sortedMethodsSelector
} from "../../selectors/selectors";

const mapStateToProps = (state, ownProps) => {
    return {
        methods: sortedMethodsSelector(state),
        current: currentSelector(state)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Globals);
