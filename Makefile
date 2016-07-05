.PHONY: server
server:
	browser-sync start --server --files='templates/index.html, static/js/index.js, static/js/goto.js, static/css/app.js'
