// Automatic URL cleanup - Remove .html extension for clean SEO-friendly URLs
// This works on ALL hosting platforms (GitHub Pages, Netlify, Apache, etc.)
// Version 6 - Keep hyphens for SEO-friendly URLs (e.g., /stainless-steel-grills)

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
        // Remove .html from URL but KEEP hyphens for SEO
        var cleanURL = currentURL.replace('.html', '');

        // Update browser URL without reloading page
        if (window.history && window.history.pushState) {
            try {
                window.history.pushState({}, document.title, cleanURL);
                console.log('URL cleaned (SEO-friendly):', cleanURL);
            } catch(e) {
                console.error('Could not update URL:', e);
            }
        }
    }
})();
