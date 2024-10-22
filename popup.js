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
                document.getElementById('borderRadius').textContent = styles.borderRadius;
                document.getElementById('margin').textContent = styles.margin;
                document.getElementById('textTransform').textContent = styles.textTransform;
                document.getElementById('wordSpacing').textContent = styles.wordSpacing;
                document.getElementById('background').textContent = styles.backgroundColor;
                document.getElementById('height').textContent = styles.height;
                document.getElementById('width').textContent = styles.width;
                document.getElementById('displayType').textContent = styles.displayType;


                const selectorElement = document.getElementById('selector');
                selectorElement.textContent = styles.selector;  
                selectorElement.setAttribute('title', `Selector: ${styles.selector}`);
            } 
        }); 
    }); 
}); 

function getSelectedTextStylesFromPage() { 
    const selection = window.getSelection(); 
    if (selection.rangeCount > 0) { 
        const range = selection.getRangeAt(0); 
        const selectedElement = range.startContainer.parentElement; 
 
        const computedStyles = window.getComputedStyle(selectedElement); 
        
        let selector = '';
        if (selectedElement.id) {
            selector = `#${selectedElement.id}`;
        } else if (selectedElement.classList.length > 0) {
            selector = '.' + Array.from(selectedElement.classList).join('.');
        } else {
            selector = selectedElement.tagName.toLowerCase();
        }

        const displayType = computedStyles.display === 'block' ? 'Block' : 'Inline';

        return { 
            fontFamily: computedStyles.fontFamily, 
            fontSize: computedStyles.fontSize, 
            fontWeight: computedStyles.fontWeight, 
            color: computedStyles.color, 
            lineHeight: computedStyles.lineHeight, 
            letterSpacing: computedStyles.letterSpacing,
            borderRadius: computedStyles.borderRadius,
            margin: computedStyles.margin,
            textTransform: computedStyles.textTransform,
            wordSpacing: computedStyles.wordSpacing,
            backgroundColor: computedStyles.backgroundColor,
            textDecoration: computedStyles.textDecoration,  
            height: computedStyles.height,                  
            width: computedStyles.width,                    
            displayType: displayType,                       
            selector: selector
        }; 
    }  
    return null;  
}
