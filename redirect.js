// Automatic URL cleanup - Remove .html from browser URL bar
// This works on ALL hosting platforms (GitHub Pages, Netlify, Apache, etc.)
// Version 3 - Updated to handle index.html redirect to root

(function() {
    // Get current URL
    var currentURL = window.location.href;
    var currentPath = window.location.pathname;

    // Special case: Redirect /index.html or /index to root /
    if (currentPath === '/index.html' || currentPath === '/index') {
        // Redirect to root
        var rootURL = window.location.origin + '/';

        if (window.history && window.history.pushState) {
            try {
                window.history.pushState({}, document.title, rootURL);
                console.log('Redirected index to root:', rootURL);
            } catch(e) {
                console.error('Could not redirect to root:', e);
            }
        }
    }
    // Check if URL contains .html (for other pages)
    else if (currentURL.indexOf('.html') !== -1) {
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
