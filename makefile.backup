# .PHONY: css
# css:
# 	mkdir -p bundle
# 	postcss --watch --use autoprefixer --use postcss-import css/app.css --output bundle/app.css

.PHONY: server
server:
	browser-sync start --server --files='index.html, css/style.css, js/index.js, client.html'

# .PHONY: clean
# clean:
# 	rm -r bundle

# .PHONY: grunt
# grunt:
# 	grunt
