// Custom error handler for debugging
export function handleError(error, lineNumber) {
    console.error(`Error on line ${lineNumber}: ${error.message}`);
    console.error(error.stack);
}

// Function to load external scripts
export function loadScript(url) {
    return new Promise((resolve, reject) => {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.crossOrigin = 'anonymous';
        script.onload = () => resolve();
        script.onerror = (error) => {
            console.error('Error loading script:', error);
            reject(new Error('Script loading failed for ' + url));
        };
        document.head.appendChild(script);
    });
}
