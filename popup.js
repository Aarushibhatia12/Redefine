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
                    func: changeFontSettings,
                    args: ["'OpenDyslexic', Arial, sans-serif"]
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

    console.log("Button clicked with Font Family:", selectedFontFamily);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.log("Tabs queried");
        if (tabs.length > 0) {
            const tab = tabs[0];
            if (tab.url && !tab.url.startsWith('chrome://')) {
                console.log("Executing script with selected settings");
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: changeFontSettings,
                    args: [selectedFontFamily]
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

document.getElementById("settingsButton").addEventListener("click", () => {
    const settingsMenu = document.getElementById("settingsMenu");
    settingsMenu.style.display = settingsMenu.style.display === "block" ? "none" : "block";
});

function changeFontSettings(fontFamily) {
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
        if (element instanceof HTMLElement && window.getComputedStyle(element).display !== 'none') {
            element.style.fontFamily = fontFamily;
        }
    });

    // Dynamically inject the OpenDyslexic font if selected
    if (fontFamily.includes("OpenDyslexic")) {
        const fontLink = document.createElement("link");
        fontLink.rel = "stylesheet";
        fontLink.href = "https://fonts.cdnfonts.com/css/open-dyslexic";
        document.head.appendChild(fontLink);
    }
}
