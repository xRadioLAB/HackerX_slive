window.onload = function() {
    console.log("page loaded");
    makeCartScrollNicely();
    makeSiteScrollNicely()

    var $toggle = document.querySelector(".site__right-sidebar-toggle");
    $toggle.addEventListener("click", function() {
        document.body.classList.toggle("js-show-right-sidebar");
    });

}

function makeCartScrollNicely() {
    var cart = document.querySelector('.cart__content');
    // console.log(cart);
    Ps.initialize(cart);
}

function makeSiteScrollNicely() {
    var site = document.querySelector('.site');
    // console.log(cart);
    Ps.initialize(site);
}
