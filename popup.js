
document.getElementById('inspectBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => { 
        chrome.scripting.executeScript({ 
            target: { tabId: tabs[0].id }, 
            function: getSelectedTextStylesFromPage  
        }, (results) => {  
            console.log(results);  
              
            if (results && results[0].result) {  
                const styles = results[0].result;  
 
                // Display the styles in the popup
                document.getElementById('fontFamily').textContent = styles.fontFamily; 
                document.getElementById('fontSize').textContent = styles.fontSize; 
                document.getElementById('fontWeight').textContent = styles.fontWeight; 
                document.getElementById('color').textContent = styles.color; 
                document.getElementById('Line').textContent = styles.lineHeight; 
                document.getElementById('letter').textContent = styles.letterSpacing; 
                
                // Display the selector (class or id)
                const selectorElement = document.getElementById('selector');
                selectorElement.textContent = styles.selector;

                // Dynamically set the title for the selector element
                selectorElement.setAttribute('title', `Selector: ${styles.selector}`);
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
        
        // Get the selector (either class or id)
        let selector = '';
        if (selectedElement.id) {
            selector = `#${selectedElement.id}`;
        } else if (selectedElement.classList.length > 0) {
            selector = '.' + Array.from(selectedElement.classList).join('.');
        } else {
            selector = selectedElement.tagName.toLowerCase();
        }

        return { 
            fontFamily: computedStyles.fontFamily, 
            fontSize: computedStyles.fontSize, 
            fontWeight: computedStyles.fontWeight, 
            color: computedStyles.color, 
            lineHeight: computedStyles.lineHeight, 
            letterSpacing: computedStyles.letterSpacing,
            selector: selector // Return the selector
        }; 
    }  
    return null;  
}
