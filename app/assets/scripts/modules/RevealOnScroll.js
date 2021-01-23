import $ from "jquery";
// window.$ = window.jQuery = jQuery;
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints'


class RevealOnScroll{
    constructor(elmnts, ofst){
        this.itemsToReveal = elmnts;
        this.offsetPercentage = ofst;
        this.hideInitially();
        this.createWaypoints();
    }

    hideInitially(){
        this.itemsToReveal.addClass("reveal-item");
    }

    createWaypoints(){
        var thatOffset = this;
        this.itemsToReveal.each(function(){
            var currentItem = this;
            new Waypoint({
                element: currentItem,
                handler: function(){
                    $(currentItem).addClass("reveal-item--is-visible");
                    // console.log(thatOffset);
                },
                offset: thatOffset.offsetPercentage
            });
        });
    }
}

export default RevealOnScroll;