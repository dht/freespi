import React from 'react';

export const Button = (props) => <div
    onContextMenu={props.onContextMenu}
    onClick={props.onClick} className="Button-container" title={props.title}>
    <i className={`material-icons ${props.animated ? 'animated infinite flash': ''}`}>
        {props.children}
    </i>
</div>
