 jQuery(document).ready(function($) {
     $(window).on("scroll", function() {
         $("#site-header.transparent-header.has-social.clr").css({
             "background": "rgba(255,255,255," + Math.min(Math.trunc($(this).scrollTop()) / 1000, 1) + ")",
             "position": "fixed"
         })
     });

 });