# PWA Timer Application

This is a simple Progressive Web App (PWA) Timer designed for flexibility and ease of use, for instance, during long recordings to keep track of spent time. It's built with plain HTML, CSS, and JavaScript.

## Features

- **Core Timer Functionality:**
    - Start, Stop, and Reset the timer.
    - Time displayed in HH:MM:SS format.
- **Customization Options:**
    - **Appearance:**
        - Opacity of the timer window.
        - Background color of the timer window.
        - Font color of the timer display.
        - Font size of the timer display.
        - Font family for the timer display.
    - **Size:**
        - Adjustable width and height of the timer window.
    - **Position:**
        - Preset positions (Top Left, Top Right, Bottom Left, Bottom Right, Center).
        - Custom X/Y coordinates (percentage-based) for precise placement. The coordinates define the center of the timer window.
- **PWA Capabilities:**
    - Installable on supported devices for an app-like experience.
    - Basic offline support: core application files (HTML, CSS, JavaScript) are cached, allowing the timer to load and function even without an internet connection after the first visit.

## How to Use

1.  Clone or download the repository.
2.  Open the `index.html` file in a modern web browser that supports PWAs (e.g., Chrome, Edge, Firefox, Safari).
3.  Use the control panel to start/stop/reset the timer and customize its appearance and position to your liking.

## Known Issues

- **Missing Icon Files:** The icon files (`icon-192x192.png`, `icon-512x512.png`, etc.) referenced in `manifest.json` and `service-worker.js` are currently not included in the repository. This was due to limitations in the development environment that prevented the creation of image files. The PWA will still be installable and functional, but it might display placeholder icons or warnings in browser developer tools.
