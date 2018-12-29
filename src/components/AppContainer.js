import React from "react";
import { connect } from "react-redux";
import App from "./App";
import * as api from "../utils/firebase";
import * as selectors from "../selectors/selectors";
import * as thunks from "../reducers/app_thunks";
import * as actions from "../reducers/appState/appState_actions";

const mapStateToProps = (state, ownProps) => {
    return {
        current: selectors.currentSelector(state),
        isOffline: selectors.isOfflineSelector(state)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadWorkspaceData: (id, current = "_", currentIO = "1") => {
            dispatch(thunks.loadApp(id, current, currentIO));
        },
        setCurrent: current => {
            dispatch(actions.setCurrent(current));
        },
        navigateToCurrent: current => {
            const { match } = ownProps,
                { params } = match || {},
                { codeId } = params;

            dispatch(thunks.saveMethod(current));
            dispatch(actions.setCurrentIO(1));

            ownProps.history.push(`/${codeId}/${current}`);
        },
        onNavigateHome: () => {
            const { match } = ownProps,
                { params } = match || {},
                { codeId } = params;

            setTimeout(() => {
                ownProps.history.push(`/${codeId}/_`);
            });
        },
        onDelete: key => {
            dispatch(actions.removeMethod(key));
            api.removeMethod(key);
        },
        toggleOffline: () => {
            dispatch(thunks.toggleOffline());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
