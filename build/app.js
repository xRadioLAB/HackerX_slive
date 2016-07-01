"use strict";

// App 组件
var App = React.createClass({
    displayName: "App",

    // `render` 方法将生成 `buyshoes` 网页的 Virtual DOM。
    render: function render() {
        return React.createElement(
            "div",
            { className: "site" },
            React.createElement(
                "h1",
                null,
                "Buy Some Shoes!!!"
            )
        );
    }
});

window.onload = function () {
    ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
};
