.PHONY: css
css:
	mkdir -p bundle
	postcss --watch --use autoprefixer --use postcss-import css/index.css --output bundle/index.css

.PHONY: js
js:
	mkdir -p build
	babel --watch js/app.jsx --out-file build/app.js

.PHONY: server
server:
	browser-sync start --server --files='templates/index.html, static/js/index.js'

.PHONY: clean
clean:
	rm -r bundle

.PHONY: all
all:
	make css & make js & make server & wait
