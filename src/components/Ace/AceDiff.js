import React from "react";
import DiffEditor from "./diff";

import brace from "brace";
import "brace/mode/javascript";
import "brace/mode/json";
import "brace/theme/monokai";
import "brace/theme/github";
import "brace/ext/language_tools";

export class AceDiff extends React.Component {
    state = {
        value1: "",
        value2: ""
    };

    componentDidMount() {
        const { value1, value2 } = this.props;

        this.setState({ value1, value2 });
    }

    componentWillReceiveProps(props) {
        const { value1, value2 } = props;

        if (value1 !== this.state.value1 || value2 !== this.state.value2) {
            this.setState({ value1, value2 });
        }
    }

    render() {
        let { height } = this.props,
            { value1 = "", value2 = "" } = this.state;

        const value = [value1, value2];

        return (
            <DiffEditor
                mode={this.props.mode || "javascript"}
                theme="monokai"
                name={"diff"}
                onChange={this.props.onChange}
                editorProps={{ $blockScrolling: true }}
                fontSize={14}
                showPrintMargin={true}
                readOnly={true}
                showGutter={true}
                highlightActiveLine={false}
                value={value}
                style={{ flex: 1, width: "100%", height }}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2
                }}
            />
        );
    }
}
