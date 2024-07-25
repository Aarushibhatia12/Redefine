(function () {
  const elements = document.querySelectorAll("*");
  const baseFontSize = "18px"; // Base font size for normal text

  elements.forEach((element) => {
    // Apply styles only to visible text elements
    if (
      element instanceof HTMLElement &&
      window.getComputedStyle(element).display !== "none"
    ) {
      // Basic styles for readability
      element.style.fontFamily = "Arial";
      element.style.fontSize = baseFontSize;
      element.style.lineHeight = "1.5"; // Line spacing
      element.style.letterSpacing = "0.35em"; // 35% of the average letter width
      element.style.wordSpacing = "1.225em"; // 3.5 times the letter spacing
      element.style.textDecoration = "none"; // Remove underlining
      element.style.fontStyle = "normal"; // Remove italics
      element.style.textTransform = "none"; // Avoid uppercase text
      element.style.textAlign = "left"; // Left-align text
      element.style.textJustify = "inter-word"; // Ensure even spacing between words

      // Additional spacing
      if (element.tagName === "P") {
        element.style.marginBottom = "1em"; // Add space between paragraphs
      }

      if (element.tagName.startsWith("H")) {
        // Increase font size for headings
        element.style.fontSize = `calc(${baseFontSize} * 1.2)`; // 20% larger than normal text
        element.style.marginTop = "1em"; // Add space above headings
        element.style.marginBottom = "1em"; // Add space below headings
        element.style.fontWeight = "bold"; // Use bold for headings
      }

      // Ensure hyperlinks look different
      if (element.tagName === "A") {
        element.style.color = "#00796B"; // Teal color for hyperlinks
        element.style.textDecoration = "underline"; // Underline hyperlinks
      }
    }
  });
})();
