// Run script after DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    const fontSelector = document.getElementById("font-selector");
    const increaseFontButton = document.getElementById("increase-font");
    const decreaseFontButton = document.getElementById("decrease-font");
    const content = document.querySelector(".content"); // Adjust to your main text container
    const defaultFontSize = 16; // Default font size in pixels
    const fontSizeKey = "fontSize";
    const fontFamilyKey = "fontFamily";

    // Retrieve saved preferences from localStorage
    const savedFontSize = localStorage.getItem(fontSizeKey);
    const savedFontFamily = localStorage.getItem(fontFamilyKey);

    // Apply saved font family and size
    if (savedFontFamily) {
        document.body.style.fontFamily = savedFontFamily;
        if (fontSelector) fontSelector.value = savedFontFamily;
    }

    if (savedFontSize) {
        document.body.style.fontSize = `${savedFontSize}px`;
    }

    // Font Selector Event Listener
    if (fontSelector) {
        fontSelector.addEventListener("change", () => {
            const selectedFont = fontSelector.value;
            document.body.style.fontFamily = selectedFont;
            localStorage.setItem(fontFamilyKey, selectedFont);
        });
    }

    // Font Size Increase/Decrease Event Listeners
    if (increaseFontButton && decreaseFontButton) {
        let currentFontSize = parseInt(savedFontSize || defaultFontSize);

        increaseFontButton.addEventListener("click", () => {
            currentFontSize += 1;
            document.body.style.fontSize = `${currentFontSize}px`;
            localStorage.setItem(fontSizeKey, currentFontSize);
        });

        decreaseFontButton.addEventListener("click", () => {
            currentFontSize = Math.max(10, currentFontSize - 1); // Minimum font size of 10px
            document.body.style.fontSize = `${currentFontSize}px`;
            localStorage.setItem(fontSizeKey, currentFontSize);
        });
    }
});
