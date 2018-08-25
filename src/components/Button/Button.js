import React from "react";
import classnames from "classnames";
import "./Button.css";

export const Button = props => {
    const { title, small, disabled } = props;

    const className = classnames("Button-container", {
        disabled: disabled,
        small: small
    });

    const iClassName = classnames("material-icons", {
        animated: props.animated,
        infinite: props.animated,
        flash: props.animated,
    });

    return (
        <div
            onContextMenu={props.onContextMenu}
            onClick={!disabled ? props.onClick : null}
            className={className}
            title={title}>
            <i className={iClassName}>{props.children}</i>
        </div>
    );
};
