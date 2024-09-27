function getSelectedTextStyles() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const selectedElement = range.startContainer.parentElement;

        const computedStyles = window.getComputedStyle(selectedElement);

        const styleInfo = {
            fontFamily: computedStyles.fontFamily,
            fontSize: computedStyles.fontSize,
            fontWeight: computedStyles.fontWeight,
            color: computedStyles.color
        };

        return styleInfo;
    }
    return null;
}

// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "getTextStyles") {
        const styles = getSelectedTextStyles();
        sendResponse({ styles });
    }
});
