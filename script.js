// DOM Elements
const timerDisplay = document.getElementById('timerDisplay');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');

// Timer state
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

// Format time as HH:MM:SS
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return \`\${String(hours).padStart(2, '0')}:\${String(minutes).padStart(2, '0')}:\${String(seconds).padStart(2, '0')}\`;
}

// Update display
function updateDisplay() {
    timerDisplay.textContent = formatTime(elapsedTime + (isRunning ? (Date.now() - startTime) : 0));
}

// Start timer
function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startTime = Date.now() - elapsedTime; // Resume from where it left off
    timerInterval = setInterval(() => {
        // elapsedTime = Date.now() - startTime; // This would be if we only update display on interval
        updateDisplay(); // Continuously update display based on current time
    }, 100); // Update display every 100ms for smoother visuals
    startButton.disabled = true;
    stopButton.disabled = false;
}

// Stop timer
function stopTimer() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime; // Capture the elapsed time
    updateDisplay(); // Final update
    startButton.disabled = false;
    stopButton.disabled = true;
}

// Reset timer
function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    startTime = 0;
    updateDisplay();
    startButton.disabled = false;
    stopButton.disabled = true;
}

// Event Listeners for timer controls
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

// Initial state
document.addEventListener('DOMContentLoaded', () => {
    updateDisplay(); // Show 00:00:00 on load
    stopButton.disabled = true; // Stop button disabled initially
});


// --- Customization Logic ---

// DOM Elements for customization
const timerContainer = document.getElementById('timerContainer');
const opacitySlider = document.getElementById('opacitySlider');
const bgColorPicker = document.getElementById('bgColorPicker');
const fontColorPicker = document.getElementById('fontColorPicker');
const fontSizeInput = document.getElementById('fontSizeInput');
const fontFamilySelect = document.getElementById('fontFamilySelect');
const timerWidthInput = document.getElementById('timerWidthInput');
const timerHeightInput = document.getElementById('timerHeightInput');
const positionSelect = document.getElementById('positionSelect');
const customXInput = document.getElementById('customXInput');
const customYInput = document.getElementById('customYInput');

// Apply initial styles on load and on change
function applyStyles() {
    // Appearance
    timerContainer.style.opacity = opacitySlider.value;
    timerContainer.style.backgroundColor = bgColorPicker.value;
    timerDisplay.style.color = fontColorPicker.value;
    timerDisplay.style.fontSize = \`\${fontSizeInput.value}px\`;
    timerDisplay.style.fontFamily = fontFamilySelect.value;

    // Size
    timerContainer.style.width = \`\${timerWidthInput.value}px\`;
    timerContainer.style.height = \`\${timerHeightInput.value}px\`;
    // To ensure text fits, we might need to adjust display properties or make it more robust
    // For now, let's make sure the display itself is flexible.
    timerDisplay.style.display = 'flex';
    timerDisplay.style.alignItems = 'center';
    timerDisplay.style.justifyContent = 'center';
    timerDisplay.style.width = '100%';
    timerDisplay.style.height = '100%';


    // Positioning
    // More complex positioning logic will be needed for fixed/absolute based on selection.
    // For now, this is a simplified approach.
    // The actual positioning will also depend heavily on the CSS for timerContainer.
    // We will set it to fixed positioning in style.css and then control it here.
    const selectedPosition = positionSelect.value;
    const customX = customXInput.value; // These are percentage values from input
    const customY = customYInput.value; // These are percentage values from input

    timerContainer.style.position = 'fixed'; // Ensure this in CSS as well

    // Reset conflicting properties that might be set by presets
    timerContainer.style.left = 'auto';
    timerContainer.style.right = 'auto';
    timerContainer.style.top = 'auto';
    timerContainer.style.bottom = 'auto';
    // Default transform, assuming X/Y are for the center of the element
    timerContainer.style.transform = 'translate(-50%, -50%)';

    if (selectedPosition === 'topLeft') {
        timerContainer.style.left = '0px';
        timerContainer.style.top = '0px';
        timerContainer.style.transform = 'translate(0, 0)';
    } else if (selectedPosition === 'topRight') {
        timerContainer.style.right = '0px';
        timerContainer.style.top = '0px';
        timerContainer.style.transform = 'translate(0, 0)';
    } else if (selectedPosition === 'bottomLeft') {
        timerContainer.style.left = '0px';
        timerContainer.style.bottom = '0px';
        timerContainer.style.transform = 'translate(0, 0)';
    } else if (selectedPosition === 'bottomRight') {
        timerContainer.style.right = '0px';
        timerContainer.style.bottom = '0px';
        timerContainer.style.transform = 'translate(0, 0)';
    } else if (selectedPosition === 'center') {
        timerContainer.style.left = '50%';
        timerContainer.style.top = '50%';
        timerContainer.style.transform = 'translate(-50%, -50%)';
    } else {
        // This 'else' block implies that if no preset is matched (e.g. a "custom" mode or default)
        // then customXInput and customYInput values are used directly.
        timerContainer.style.left = \`\${customX}%\`;
        timerContainer.style.top = \`\${customY}%\`;
        // The transform 'translate(-50%, -50%)' is already set by default,
        // so X% and Y% will position the center of the timerContainer at that percentage of the viewport.
    }
}

// Event listeners for customization controls
opacitySlider.addEventListener('input', applyStyles);
bgColorPicker.addEventListener('input', applyStyles);
fontColorPicker.addEventListener('input', applyStyles);
fontSizeInput.addEventListener('input', applyStyles);
fontFamilySelect.addEventListener('change', applyStyles);
timerWidthInput.addEventListener('input', applyStyles);
timerHeightInput.addEventListener('input', applyStyles);

customXInput.addEventListener('input', () => {
    // If user directly manipulates X/Y, we might want to set positionSelect to a "custom" state
    // For now, just apply styles. The logic in applyStyles() will use customXInput.value.
    // positionSelect.value = "custom"; // if you add a "custom" option in HTML
    applyStyles();
});
customYInput.addEventListener('input', () => {
    // positionSelect.value = "custom"; // if you add a "custom" option in HTML
    applyStyles();
});

positionSelect.addEventListener('change', () => {
    const selectedPosition = positionSelect.value;
    // When a preset is selected, update the customX/Y input fields.
    // applyStyles() will then use these updated values.
    if (selectedPosition === 'topLeft') {
        customXInput.value = 0;
        customYInput.value = 0;
    } else if (selectedPosition === 'topRight') {
        customXInput.value = 100;
        customYInput.value = 0;
    } else if (selectedPosition === 'bottomLeft') {
        customXInput.value = 0;
        customYInput.value = 100;
    } else if (selectedPosition === 'bottomRight') {
        customXInput.value = 100;
        customYInput.value = 100;
    } else if (selectedPosition === 'center') {
        customXInput.value = 50;
        customYInput.value = 50;
    }
    // After setting customX/Y from preset, apply styles
    applyStyles();
});


// Initial application of styles when the page loads
// The previous DOMContentLoaded listener handles timer logic.
// We need to ensure applyStyles is also called.
// It's better to have one DOMContentLoaded listener or ensure all setups are called.

// Consolidating DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Timer logic initial setup
    updateDisplay();
    stopButton.disabled = true;

    // Apply initial styles from default control values
    applyStyles();
});

// --- PWA Service Worker Registration ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}
