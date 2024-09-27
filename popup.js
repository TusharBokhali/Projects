document.getElementById('inspectBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: getSelectedTextStylesFromPage
        }, (results) => {
            console.log(results);
            
            if (results && results[0].result) {
                const styles = results[0].result;

                document.getElementById('fontFamily').textContent = styles.fontFamily;
                document.getElementById('fontSize').textContent = styles.fontSize;
                document.getElementById('fontWeight').textContent = styles.fontWeight;
                document.getElementById('color').textContent = styles.color;
                document.getElementById('Line').textContent = styles.lineHeight;
                document.getElementById('letter').textContent = styles.letterSpacing;
            }
        });
    });
});

// Function to be injected into the page context
function getSelectedTextStylesFromPage() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const selectedElement = range.startContainer.parentElement;

        const computedStyles = window.getComputedStyle(selectedElement);
        
        return {
            fontFamily: computedStyles.fontFamily,
            fontSize: computedStyles.fontSize,
            fontWeight: computedStyles.fontWeight,
            color: computedStyles.color,
            lineHeight:computedStyles.lineHeight,
            letterSpacing:computedStyles.letterSpacing
        };
    }
    return null;
}
