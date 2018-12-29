import React from "react";
import { connect } from "react-redux";
import Code from "./Code";
import * as actions from "../../reducers/appState/appState_actions";
import * as thunks from "../../reducers/app_thunks";
import * as selectors from "../../selectors/selectors";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
    return {
        ...selectors.fourSelector(state)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        save: current => {
            dispatch(thunks.saveMethod(current));
        },
        setCode: data => {
            dispatch(actions.updateCode(data));
        },
        loadIO: index => {
            dispatch(actions.setCurrentIO(index));
        },
        makeMethod: (name, data) => {
            data.id = name;
            dispatch(thunks.makeMethod(name, data));
            ownProps.history.push(`/${ownProps.id}/_`);
        },
        runAll: () => {
            setTimeout(() => {
                dispatch(thunks.runAll());
            }, 1000);
        },
        download: () => {
            dispatch(thunks.download());
        },
        setDirty: () => {
            dispatch(thunks.setIsDirtyIO(true));
        },
        setIsRunning: isRunning => {
            dispatch(actions.setIsRunning(isRunning));
        },
        share: () => {
            const url = document.location.href;
            window.open(url + "/run", "_blank");
        },
        removeIO: () => {
            dispatch(thunks.removeIO());
        }
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Code)
);
