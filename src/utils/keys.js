function isMac() {
    return navigator.platform.indexOf('Mac') > -1
}

function isWindows() {
    return navigator.platform.indexOf('Win') > -1
}

const keysMac = {
    RUN: "⌘⏎ or right click for auto-run",
    RUN_ALL: "⌘⇧⏎",
    SAVE: "⌥S",
    GLOBALS: "⌥G",
    HOME: "⌥H",
    TEST_1: "⌥1",
    TEST_2: "⌥2",
    TEST_3: "⌥3",
    TEST_4: "⌥4",
    TEST_5: "⌥5",
    TEST_6: "⌥6",
    TEST_7: "⌥7",
    TEST_8: "⌥8",
    TEST_9: "⌥9",
    TEST_10: "⌥10",
}

const keysWindows = {
    RUN: "^⏎ or right click for auto-run",
    RUN_ALL: "^⇧⏎",
    SAVE: "Alt+S",
    GLOBALS: "Alt+G",
    HOME: "Alt+H",
    TEST_1: "Alt+1",
    TEST_2: "Alt+2",
    TEST_3: "Alt+3",
    TEST_4: "Alt+4",
    TEST_5: "Alt+5",
    TEST_6: "Alt+6",
    TEST_7: "Alt+7",
    TEST_8: "Alt+8",
    TEST_9: "Alt+9",
    TEST_10: "Alt+10",
}

export const getKeys = () => {
    if (isMac()) return keysMac;
    if (isWindows()) return keysWindows;

    return {};
}