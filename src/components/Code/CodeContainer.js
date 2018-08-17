import React from "react";
import {connect} from "react-redux";
import Code from './Code';
import {setCurrentIO, updateCode, setIsRunning} from "../../reducers/appState/appState_actions";
import {autosave, makeMethod, runAll, download} from "../../reducers/app_thunks";
import {withRouter} from "react-router-dom";
import {fourSelector} from "../../selectors/selectors";

const mapStateToProps = (state, ownProps) => {
    return {
        ...fourSelector(state)
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setCode: (data) => {
            dispatch(updateCode(data))
                .then(() => {
                    dispatch(autosave())
                })
        },
        loadIO: (index) => {
            dispatch(setCurrentIO(index));
        },
        makeMethod: (name, data) => {
            data.id = name;
            dispatch(makeMethod(name, data));
            ownProps.history.push(`/${ownProps.id}/_`);
        },
        runAll: () => {
            setTimeout(() => {
                dispatch(runAll());
            }, 1000);
        },
        download: () => {
            dispatch(download());
        },
        setIsRunning: (isRunning) => {
            dispatch(setIsRunning(isRunning));
        }
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Code));
