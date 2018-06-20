// register service worker

if (!navigator.serviceWorker.controller) {
	navigator.serviceWorker.register('./serviceworker.js', {
		scope: './'
	});
}

// on loaded

window.addEventListener('DOMContentLoaded', function() {
	
});