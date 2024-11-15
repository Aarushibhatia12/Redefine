(function () {
  const elements = document.querySelectorAll("*");
  elements.forEach((element) => {
    // Apply styles only to visible text elements
    if (
      element instanceof HTMLElement &&
      window.getComputedStyle(element).display !== "none"
    ) {
      // Basic styles for readability
      element.style.fontFamily = "'OpenDyslexic', Arial, sans-serif";
    }
  });

  // Add the OpenDyslexic font dynamically
  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href = "https://fonts.cdnfonts.com/css/open-dyslexic"; // Replace with your preferred source
  document.head.appendChild(fontLink);
})();
