// Automatic URL cleanup - Remove .html from browser URL bar
// This works on ALL hosting platforms (GitHub Pages, Netlify, Apache, etc.)
// Version 2 - Updated with better compatibility

(function() {
    // Get current URL
    var currentURL = window.location.href;

    // Check if URL contains .html
    if (currentURL.indexOf('.html') !== -1) {
        // Remove .html from URL
        var cleanURL = currentURL.replace('.html', '');

        // Update browser URL without reloading page
        if (window.history && window.history.pushState) {
            try {
                window.history.pushState({}, document.title, cleanURL);
                console.log('URL cleaned:', cleanURL);
            } catch(e) {
                console.error('Could not update URL:', e);
            }
        }
    }
})();
