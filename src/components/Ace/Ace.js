import React from 'react';
import AceEditor from 'react-ace';

import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';

export const Ace = (props) => {

    return <AceEditor
        mode={props.mode || "javascript"}
        theme="monokai"
        name={props.name}
        onChange={props.onChange}
        editorProps={{$blockScrolling: true}}
        fontSize={14}
        showPrintMargin={true}
        readOnly={props.readOnly}
        showGutter={true}
        highlightActiveLine={true}
        value={props.value}
        style={{flex: 1, width: "100%", height:props.height}}
        setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2
        }}
    />
}
