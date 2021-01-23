import $ from "jquery";
// window.$ = window.jQuery = jQuery;

class MobileMenu{
    constructor(){
        this.siteHeader = $(".site-header");
        this.menuIcon = $(".site-header__menu-btn");
        this.menuContent = $(".site-header__menu-content");
        this.events();
    }

    events(){
        this.menuIcon.click(this.toggleTheMenu.bind(this));

    }

    toggleTheMenu(){
        this.menuContent.toggleClass("site-header__menu-content--is-visible"); 
        this.siteHeader.toggleClass("site-header--is-expanded");
        this.menuIcon.toggleClass("site-header__menu-btn--close-x");
    }
}

export default MobileMenu;