// Automatic URL cleanup - Remove .html and replace hyphens with spaces
// This works on ALL hosting platforms (GitHub Pages, Netlify, Apache, etc.)
// Version 4 - Updated to show spaces instead of hyphens in URL

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

        // Replace hyphens with spaces in the URL path
        // This will show as %20 in the browser but display nicely
        cleanURL = cleanURL.replace(/-/g, ' ');

        // Update browser URL without reloading page
        if (window.history && window.history.pushState) {
            try {
                window.history.pushState({}, document.title, cleanURL);
                console.log('URL cleaned with spaces:', cleanURL);
            } catch(e) {
                console.error('Could not update URL:', e);
            }
        }
    }
    // If URL already has no .html but has hyphens, also convert to spaces
    else if (currentPath.indexOf('-') !== -1 && currentPath !== '/') {
        // Replace hyphens with spaces
        var spacedURL = window.location.origin + currentPath.replace(/-/g, ' ') + window.location.search + window.location.hash;

        if (window.history && window.history.pushState) {
            try {
                window.history.pushState({}, document.title, spacedURL);
                console.log('URL hyphens converted to spaces:', spacedURL);
            } catch(e) {
                console.error('Could not update URL:', e);
            }
        }
    }
})();
