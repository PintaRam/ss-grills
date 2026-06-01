// Automatic URL cleanup - Remove .html and hyphens for clean single-word URLs
// This works on ALL hosting platforms (GitHub Pages, Netlify, Apache, etc.)
// Version 5 - Updated to remove hyphens completely (e.g., /ssgrill instead of /ss-grills)

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

        // Remove hyphens completely to create single-word URLs
        cleanURL = cleanURL.replace(/-/g, '');

        // Update browser URL without reloading page
        if (window.history && window.history.pushState) {
            try {
                window.history.pushState({}, document.title, cleanURL);
                console.log('URL cleaned (no hyphens):', cleanURL);
            } catch(e) {
                console.error('Could not update URL:', e);
            }
        }
    }
    // If URL already has no .html but has hyphens, remove them
    else if (currentPath.indexOf('-') !== -1 && currentPath !== '/') {
        // Remove hyphens completely
        var cleanedURL = window.location.origin + currentPath.replace(/-/g, '') + window.location.search + window.location.hash;

        if (window.history && window.history.pushState) {
            try {
                window.history.pushState({}, document.title, cleanedURL);
                console.log('URL hyphens removed:', cleanedURL);
            } catch(e) {
                console.error('Could not update URL:', e);
            }
        }
    }
})();
