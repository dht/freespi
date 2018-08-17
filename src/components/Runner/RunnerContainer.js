import React from "react";
import {connect} from "react-redux";
import Runner from './Runner';
import {fourSelector} from "../../selectors/selectors";
import {download} from "../../reducers/app_thunks";

const mapStateToProps = (state, ownProps) => {
    return {
        ...fourSelector(state)
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        download: () => {
            dispatch(download());
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Runner);