document.getElementById("changeFontButton").addEventListener("click", () => {
    console.log("Button clicked for predefined settings");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.log("Tabs queried");
        if (tabs.length > 0) {
            const tab = tabs[0];
            if (tab.url && !tab.url.startsWith('chrome://')) {
                console.log("Executing script with predefined settings");
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['content.js']
                }).catch((error) => {
                    console.error("Error executing script:", error);
                });
            } else {
                console.error("Cannot execute script on a chrome:// URL");
            }
        } else {
            console.error("No active tabs found");
        }
    });
});

document.getElementById("applySettingsButton").addEventListener("click", () => {
    const selectedFontFamily = document.getElementById("fontFamily").value;
    const selectedFontSize = document.getElementById("fontSize").value + 'px';
    
    console.log("Button clicked with Font Family:", selectedFontFamily, "and Font Size:", selectedFontSize);
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.log("Tabs queried");
        if (tabs.length > 0) {
            const tab = tabs[0];
            if (tab.url && !tab.url.startsWith('chrome://')) {
                console.log("Executing script with selected settings");
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: changeFontSettings,
                    args: [selectedFontFamily, selectedFontSize]
                }).catch((error) => {
                    console.error("Error executing script:", error);
                });
            } else {
                console.error("Cannot execute script on a chrome:// URL");
            }
        } else {
            console.error("No active tabs found");
        }
    });
});

document.getElementById("fontSize").addEventListener("input", (event) => {
    document.getElementById("fontSizeValue").textContent = event.target.value + 'px';
});

document.getElementById("settingsButton").addEventListener("click", () => {
    const settingsMenu = document.getElementById("settingsMenu");
    if (settingsMenu.style.display === "block") {
        settingsMenu.style.display = "none";
    } else {
        settingsMenu.style.display = "block";
    }
});

function changeFontSettings(fontFamily, fontSize) {
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
        if (element instanceof HTMLElement && window.getComputedStyle(element).display !== 'none') {
            element.style.fontFamily = fontFamily;
            element.style.fontSize = fontSize;
            element.style.lineHeight = '1.5';
            element.style.letterSpacing = '0.35em';
            element.style.wordSpacing = '1.225em';
            element.style.textDecoration = 'none';
            element.style.fontStyle = 'normal';
            element.style.textTransform = 'none';
            element.style.textAlign = 'left';
            element.style.textJustify = 'inter-word';

            if (element.tagName === 'P') {
                element.style.marginBottom = '1em';
            }

            if (element.tagName.startsWith('H')) {
                element.style.fontSize = `calc(${fontSize} * 1.2)`;
                element.style.marginTop = '1em';
                element.style.marginBottom = '1em';
                element.style.fontWeight = 'bold';
            }

            if (element.tagName === 'A') {
                element.style.color = '#00796B';
                element.style.textDecoration = 'underline';
            }
        }
    });
}
