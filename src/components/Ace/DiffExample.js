import React from "react";
import { diff as DiffEditor } from "react-ace";

import "brace/theme/github"; // this is needed as the default theme

export const DiffExample = props => (
    <DiffEditor
        value={["Test code differences", "Test code difference"]}
        height="1000px"
        width="1000px"
        mode="json"
    />
);
