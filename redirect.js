// Automatic URL cleanup - Remove .html from browser URL bar
// This works on ALL hosting platforms (GitHub Pages, Netlify, Apache, etc.)

(function() {
    // Get current URL
    var currentURL = window.location.href;
    
    // Check if URL contains .html
    if (currentURL.indexOf('.html') !== -1) {
        // Remove .html from URL
        var cleanURL = currentURL.replace('.html', '');
        
        // Update browser URL without reloading page
        if (window.history && window.history.pushState) {
            window.history.pushState({}, '', cleanURL);
        }
    }
})();
